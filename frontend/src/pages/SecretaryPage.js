import React, { useState, useEffect, useMemo } from 'react';
import Table from '../components/Table';
import BackToLoginButton from '../components/BackToLoginButton';

const SecretaryPage = () => {
  const [filters, setFilters] = useState({ date: '', voicePart: '' });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isCheckInMode, setIsCheckInMode] = useState(false);
  const [checkInData, setCheckInData] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  const FUTURE_WEEKS = 4; // Configurable number of future weeks

  // Mock member data for demonstration
  const MOCK_MEMBERS = useMemo(
    () => [
      { Name: 'John Doe', VoicePart: 'Tenor' },
      { Name: 'Jane Smith', VoicePart: 'Soprano' },
      { Name: 'Michael Brown', VoicePart: 'Tenor' },
    ],
    []
  );

  const MOCK_ATTENDANCE_DATA = useMemo(
    () => [
      {
        Date: '2024-11-07',
        'Voice Part': 'Tenor',
        Members: [{ Name: 'John Doe', Attendance: 'Present', Details: '' }],
      },
      {
        Date: '2024-11-14',
        'Voice Part': 'Soprano',
        Members: [{ Name: 'Jane Smith', Attendance: 'Absent', Details: 'Sick' }],
      },
    ],
    []
  );

  useEffect(() => {
    // Generate available dates dynamically
    const getAvailableDates = () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay() + 4); // Start with this week's Thursday
      const dates = new Set();

      // Include past dates from attendance records
      MOCK_ATTENDANCE_DATA.forEach((record) => dates.add(record.Date));

      // Include future dates for the next N weeks
      for (let i = 0; i < FUTURE_WEEKS; i++) {
        const futureThursday = new Date(startDate);
        futureThursday.setDate(startDate.getDate() + i * 7);
        dates.add(futureThursday.toISOString().split('T')[0]);
      }

      // Convert to sorted array
      setAvailableDates(Array.from(dates).sort());
    };

    getAvailableDates();
  }, [MOCK_ATTENDANCE_DATA]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    if (!filters.date || !filters.voicePart) {
      alert('Please select both a date and a voice part to search.');
      return;
    }

    // Filter attendance records based on selected date and voice part
    const filteredData = MOCK_ATTENDANCE_DATA.filter(
      (record) =>
        record.Date === filters.date && record['Voice Part'] === filters.voicePart
    );
    setAttendanceRecords(filteredData);
    setIsCheckInMode(false); // Exit check-in mode if previously active
  };

  const startNewCheckIn = () => {
    if (!filters.date || !filters.voicePart) {
      alert('Please select both a date and a voice part before starting check-in.');
      return;
    }

    // Pull members for the selected voice part
    const members = MOCK_MEMBERS.filter(
      (member) => member.VoicePart === filters.voicePart
    ).map((member) => ({
      Name: member.Name,
      Attendance: '',
      Details: '',
    }));

    setCheckInData(members);
    setIsCheckInMode(true); // Enable check-in mode
  };

  const handleCheckInChange = (index, field, value) => {
    setCheckInData((prev) =>
      prev.map((row, idx) =>
        idx === index ? { ...row, [field]: value } : row
      )
    );
  };

  const submitCheckIn = () => {
    const newRecord = {
      Date: filters.date,
      'Voice Part': filters.voicePart,
      Members: checkInData,
    };

    // Save to the database (simulated here with state)
    setAttendanceRecords((prev) => [...prev, newRecord]);
    setIsCheckInMode(false);
    setCheckInData([]);
    alert('Attendance has been recorded!');
  };

  return (
    <div>
      <h2>Secretary - Attendance Management</h2>

      {/* Filters Section */}
      <div>
        <label>Date (Week):</label>
        <select
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        >
          <option value="">Select Week</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <label>Voice Part:</label>
        <select
          name="voicePart"
          value={filters.voicePart}
          onChange={handleFilterChange}
        >
          <option value="">Select Voice Part</option>
          <option value="Soprano">Soprano</option>
          <option value="Alto">Alto</option>
          <option value="Tenor">Tenor</option>
          <option value="Bass">Bass</option>
        </select>
        <button onClick={handleSearch}>Search</button>
        <button onClick={startNewCheckIn} style={{ marginLeft: '10px' }}>
          New Check-in
        </button>
      </div>

      {/* Attendance Table */}
      {!isCheckInMode && (
        <Table
          columns={['Name', 'Date', 'Attendance', 'Details', 'Attendance Rate']}
          data={attendanceRecords}
        />
      )}

      {/* Check-In Form */}
      {isCheckInMode && (
        <div>
          <h3>New Attendance Check-In</h3>
          {checkInData.map((row, index) => (
            <div key={index}>
              <label>{row.Name} - Attendance:</label>
              <select
                value={row.Attendance}
                onChange={(e) =>
                  handleCheckInChange(index, 'Attendance', e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              <label>Details:</label>
              <input
                type="text"
                value={row.Details}
                onChange={(e) =>
                  handleCheckInChange(index, 'Details', e.target.value)
                }
              />
            </div>
          ))}
          <button onClick={submitCheckIn}>Submit</button>
          <button onClick={() => setIsCheckInMode(false)}>Cancel</button>
        </div>
      )}

      {/* Back to Login Button */}
      <BackToLoginButton />
    </div>
  );
};

export default SecretaryPage;