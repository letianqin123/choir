import React, { useState, useEffect, useMemo } from 'react';
import Table from '../components/Table';
import BackToLoginButton from '../components/BackToLoginButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

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

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
      <div className="min-vh-100" style={{ backgroundColor: '#007E94' }}>
        <div className="container py-4">
          {/* New Check-in Button */}
          {/*<div className="mb-4">*/}
          {/*  <button*/}
          {/*      className="btn btn-warning btn-lg rounded-pill px-4"*/}
          {/*      onClick={startNewCheckIn}*/}
          {/*  >*/}
          {/*    New Check-in*/}
          {/*  </button>*/}
          {/*  <button*/}
          {/*      className="btn btn-danger d-flex align-items-center gap-2"*/}
          {/*      style={{*/}
          {/*        borderRadius: '25px',*/}
          {/*        padding: '8px 20px'*/}
          {/*      }}*/}
          {/*      onClick={handleLogout}*/}
          {/*  >*/}
          {/*    Log Out*/}
          {/*    <i className="fas fa-sign-out-alt"></i>*/}
          {/*  </button>*/}
          {/*</div>*/}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button
                className="btn btn-warning btn-lg rounded-pill px-4"
                onClick={startNewCheckIn}
            >
              New Check-in
            </button>

            <button
                className="btn btn-danger d-flex align-items-center gap-2"
                style={{
                  borderRadius: '25px',
                  padding: '8px 20px'
                }}
                onClick={handleLogout}
            >
              Log Out
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>

          {/* Filters Section */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label className="form-label">Date (Week):</label>
                    <select
                        className="form-select"
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
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb-3">
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
                </div>

                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-group mb-3">
                    <label className="form-label"></label>
                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Report Section */}
          {!isCheckInMode && attendanceRecords.length > 0 && (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-4">Subject Report</h3>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Attendance</th>
                        <th scope="col">Details</th>
                        <th scope="col">Attendance Rate</th>
                      </tr>
                      </thead>
                      <tbody>
                      {attendanceRecords.map((record, index) => (
                          record.Members.map((member, memberIndex) => (
                              <tr key={`${index}-${memberIndex}`}>
                                <td>{memberIndex + 1}</td>
                                <td>{member.Name}</td>
                                <td>{record.Date}</td>
                                <td>{member.Attendance}</td>
                                <td>{member.Details}</td>
                                <td>98%</td>
                              </tr>
                          ))
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          )}

          {/* Check-In Form */}
          {isCheckInMode && (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-4">New Attendance Check-In</h3>
                  {checkInData.map((row, index) => (
                      <div key={index} className="row mb-3">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">{row.Name} - Attendance:</label>
                            <select
                                className="form-select"
                                value={row.Attendance}
                                onChange={(e) => handleCheckInChange(index, 'Attendance', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <label className="form-label">Details:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={row.Details}
                                onChange={(e) => handleCheckInChange(index, 'Details', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                  ))}
                  <div className="mt-4">
                    <button
                        className="btn btn-success me-2"
                        onClick={submitCheckIn}
                    >
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
          )}
        </div>
      </div>
  );
};

export default SecretaryPage;