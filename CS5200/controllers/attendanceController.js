// controllers/attendanceController.js

const db = require('../db');
const { validationResult } = require('express-validator');

// Create a new attendance record
exports.createAttendanceRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, check_in_date, attendance, absent_reason } = req.body;

  // Check if member exists
  const memberSql = 'SELECT * FROM members WHERE name = ?';
  db.query(memberSql, [name], (err, memberResults) => {
    if (err) {
      console.error('Error checking member:', err);
      res.status(500).send('Server Error');
    } else if (memberResults.length === 0) {
      res.status(400).send('Member does not exist');
    } else {
      // Insert attendance record
      const attendanceSql = 'INSERT INTO attendance SET ?';
      const attendanceData = { name, check_in_date, attendance, absent_reason };
      db.query(attendanceSql, attendanceData, (err, result) => {
        if (err) {
          console.error('Error adding attendance record:', err);
          if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send('Attendance record already exists for this member on this date');
          } else {
            res.status(500).send('Server Error');
          }
        } else {
          res.status(201).json(attendanceData);
        }
      });
    }
  });
};

// Get all attendance records
exports.getAllAttendanceRecords = (req, res) => {
  const sql = 'SELECT * FROM attendance';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching attendance records:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
};

// Get attendance records for a member
exports.getAttendanceByMember = (req, res) => {
  const memberName = req.params.name;
  const sql = 'SELECT * FROM attendance WHERE name = ?';

  db.query(sql, [memberName], (err, results) => {
    if (err) {
      console.error('Error fetching attendance records:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
};

// Update an attendance record
exports.updateAttendanceRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, check_in_date } = req.params;
  const updatedRecord = req.body;

  const sql = 'UPDATE attendance SET ? WHERE name = ? AND check_in_date = ?';

  db.query(sql, [updatedRecord, name, check_in_date], (err, result) => {
    if (err) {
      console.error('Error updating attendance record:', err);
      res.status(500).send('Server Error');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Attendance record not found');
    } else {
      res.json({ name, check_in_date, ...updatedRecord });
    }
  });
};

// Delete an attendance record
exports.deleteAttendanceRecord = (req, res) => {
  const { name, check_in_date } = req.params;

  const sql = 'DELETE FROM attendance WHERE name = ? AND check_in_date = ?';

  db.query(sql, [name, check_in_date], (err, result) => {
    if (err) {
      console.error('Error deleting attendance record:', err);
      res.status(500).send('Server Error');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Attendance record not found');
    } else {
      res.json({ message: 'Attendance record deleted', name, check_in_date });
    }
  });
};

// Get attendance records for a specific voice part on a given date
exports.getAttendanceByVoicePartAndDate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const voicePart = req.params.voice_part;
  const checkInDate = req.params.check_in_date;

  // Step 1: Get members by voice part
  const getMembersQuery = 'SELECT name FROM members WHERE voice_part = ?';

  db.query(getMembersQuery, [voicePart], (err, members) => {
    if (err) {
      console.error('Error fetching members by voice part:', err);
      return res.status(500).send('Server Error');
    }

    if (members.length === 0) {
      return res.status(404).send('No members found for the specified voice part');
    }

    // Extract member names from the result
    const memberNames = members.map(member => member.name);

    // Step 2: Get attendance records for these members on the given date
    const getAttendanceQuery = `
      SELECT * FROM attendance
      WHERE name IN (?) AND check_in_date = ?
    `;

    db.query(getAttendanceQuery, [memberNames, checkInDate], (err, attendanceRecords) => {
      if (err) {
        console.error('Error fetching attendance records:', err);
        return res.status(500).send('Server Error');
      }
      res.json(attendanceRecords);
    });
  });
};

// Add attendance records for members of a specific voice part on a given date
exports.addAttendanceByVoicePartAndDate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const voicePart = req.params.voice_part;
  const checkInDate = req.params.check_in_date;
  const attendanceRecords = req.body.attendance_records;

  // Step 1: Check if members belong to the specified voice part
  const getMembersQuery = 'SELECT name FROM members WHERE voice_part = ?';

  db.query(getMembersQuery, [voicePart], (err, members) => {
    if (err) {
      console.error('Error fetching members by voice part:', err);
      return res.status(500).send('Server Error');
    }

    if (members.length === 0) {
      return res.status(404).send('No members found for the specified voice part');
    }

    // Extract member names from the result for validation
    const validMemberNames = members.map(member => member.name);
    const invalidMembers = attendanceRecords.filter(record => !validMemberNames.includes(record.name));

    if (invalidMembers.length > 0) {
      return res.status(400).json({ error: 'Invalid members provided', invalidMembers });
    }

    // Step 2: Insert attendance records
    const insertQuery = 'INSERT INTO attendance (name, check_in_date, attendance, absent_reason) VALUES ? ON DUPLICATE KEY UPDATE attendance = VALUES(attendance), absent_reason = VALUES(absent_reason)';

    // Convert attendance records into the format required for bulk insert
    const attendanceData = attendanceRecords.map(record => [
      record.name,
      checkInDate,
      record.attendance,
      record.absent_reason || null,
    ]);

    db.query(insertQuery, [attendanceData], (err, result) => {
      if (err) {
        console.error('Error adding attendance records:', err);
        return res.status(500).send('Server Error');
      }
      res.status(201).json({ message: 'Attendance records added or updated successfully', attendanceRecords });
    });
  });
};