import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const SecretaryPage = () => {
  const [filters, setFilters] = useState({ date: '', voicePart: '' });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isCheckInMode, setIsCheckInMode] = useState(false);
  const [checkInData, setCheckInData] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0]; // Format the date as YYYY-MM-DD
  };

  const generateFutureDates = (weeks = 4) => {
    const today = new Date();
    const futureDates = [];
    for (let i = 1; i <= weeks; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i * 7); // Add one week at a time
      futureDates.push(formatDate(futureDate.toISOString()));
    }
    return futureDates;
  };

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        setError(null);
        const response = await axios.get('/api/attendance');
        const rawRecords = response.data.map(record => ({
          ...record,
          check_in_date: formatDate(record.check_in_date),
        }));

        const recordsWithRate = await Promise.all(
          rawRecords.map(async (record) => {
            const memberResponse = await axios.get(`/api/members/${record.name}/attendance-rate`);
            return {
              ...record,
              attendance_rate: memberResponse.data.attendance_rate,
            };
          })
        );

        setAttendanceRecords(recordsWithRate);

        const uniqueDates = [...new Set(rawRecords.map(record => record.check_in_date))];
        const futureDates = generateFutureDates();
        setAvailableDates([...uniqueDates, ...futureDates].sort());
      } catch (err) {
        console.error('Error fetching attendance records:', err);
        setError('Failed to fetch attendance records. Please try again later.');
      }
    };

    fetchAttendanceRecords();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!filters.date || !filters.voicePart) {
      alert('Please select both a date and a voice part to search.');
      return;
    }

    try {
      setError(null);
      const endpoint = `/api/attendance/voice-part/${encodeURIComponent(filters.voicePart)}/date/${encodeURIComponent(filters.date)}`;
      const response = await axios.get(endpoint);

      const recordsWithRate = await Promise.all(
        response.data.map(async (record) => {
          const memberResponse = await axios.get(`/api/members/${record.name}/attendance-rate`);
          return {
            ...record,
            attendance_rate: memberResponse.data.attendance_rate,
            check_in_date: formatDate(record.check_in_date),
          };
        })
      );

      setAttendanceRecords(recordsWithRate);
      setIsCheckInMode(false);
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      setError('No records found for the selected date and voice part.');
    }
  };

  const startNewCheckIn = async () => {
    if (!filters.date || !filters.voicePart) {
      alert('Please select both a date and a voice part before starting check-in.');
      return;
    }

    try {
      setError(null);
      const memberResponse = await axios.get(`/api/members/voice-part/${filters.voicePart}`);
      const members = memberResponse.data.map((member) => ({
        name: member.name,
        attendance: '',
        absent_reason: '',
      }));
      setCheckInData(members);
      setIsCheckInMode(true);
    } catch (err) {
      console.error('Error starting new check-in:', err);
      setError('Failed to start new check-in. Please try again later.');
    }
  };

  const handleCheckInChange = (index, field, value) => {
    setCheckInData((prev) =>
      prev.map((row, idx) =>
        idx === index ? { ...row, [field]: value } : row
      )
    );
  };

  const submitCheckIn = async () => {
    if (!filters.date || !filters.voicePart) {
      alert('Please select both a date and a voice part before submitting check-in.');
      return;
    }

    try {
      const attendanceRecordsToSubmit = checkInData.map((record) => ({
        name: record.name,
        attendance: record.attendance === 'Present',
        absent_reason: record.attendance === 'Absent' ? record.absent_reason : null,
      }));

      const endpoint = `/api/attendance/voice-part/${encodeURIComponent(filters.voicePart)}/date/${encodeURIComponent(filters.date)}`;
      await axios.post(endpoint, { attendance_records: attendanceRecordsToSubmit });

      alert('Attendance has been recorded successfully!');
      setIsCheckInMode(false);
      handleSearch();
    } catch (err) {
      console.error('Error submitting attendance records:', err);
      setError('Failed to submit attendance records. Please try again later.');
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#007E94' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-warning btn-lg rounded-pill px-4"
            onClick={startNewCheckIn}
          >
            New Check-in
          </button>
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            style={{ borderRadius: '25px', padding: '8px 20px' }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Date:</label>
                <select
                  className="form-select"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Voice Part:</label>
                <select
                  className="form-select"
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
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {attendanceRecords.length > 0 && (
          <div className="card">
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Attendance</th>
                    <th>Details</th>
                    <th>Attendance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, index) => (
                    <tr key={`${record.name}-${record.check_in_date}`}>
                      <td>{index + 1}</td>
                      <td>{record.name}</td>
                      <td>{record.check_in_date}</td>
                      <td>{record.attendance ? 'Present' : 'Absent'}</td>
                      <td>{record.absent_reason || '-'}</td>
                      <td>{record.attendance_rate ? `${record.attendance_rate}%` : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isCheckInMode && (
          <div
            className="modal show d-block"
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              overflowY: 'auto',
              maxHeight: '90vh',
            }}
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Attendance Check-In</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsCheckInMode(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {checkInData.map((row, index) => (
                    <div key={index} className="mb-3">
                      <label>{row.name}</label>
                      <select
                        className="form-select"
                        value={row.attendance}
                        onChange={(e) =>
                          handleCheckInChange(index, 'attendance', e.target.value)
                        }
                      >
                        <option value="">Select Attendance</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Absent Reason"
                        value={row.absent_reason}
                        onChange={(e) =>
                          handleCheckInChange(index, 'absent_reason', e.target.value)
                        }
                        disabled={row.attendance !== 'Absent'}
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={submitCheckIn}>
                    Submit
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsCheckInMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretaryPage;