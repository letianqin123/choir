// src/components/TreasurerPage.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance'; // Adjust the path based on your project structure

const TreasurerPage = () => {
    const [currentView, setCurrentView] = useState('membership');
    const [records, setRecords] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const styles = {
        container: {
            backgroundColor: '#007E94',
            minHeight: '100vh',
            padding: '2rem',
        },
        tabContainer: {
            display: 'flex',
            gap: '2rem',
            marginBottom: '2rem',
        },
        tab: {
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        activeTab: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        circle: {
            width: '20px',
            height: '20px',
            border: '2px solid white',
            borderRadius: '50%',
            display: 'inline-block',
        },
        activeCircle: {
            backgroundColor: 'white',
        },
        newButton: {
            backgroundColor: '#F7B84B',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 2rem',
            marginBottom: '2rem',
            cursor: 'pointer',
        },
        table: {
            backgroundColor: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
        },
        tableHeader: {
            backgroundColor: '#F8F9FA',
        },
        paidBadge: {
            backgroundColor: '#E8F5E9',
            color: '#4CAF50',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
        },
        formOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        formContainer: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '500px',
        },
    };

    // Fetch records from backend
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                setError(null); // Reset error state
                const endpoint = currentView === 'membership' ? '/api/membership' : '/api/donations';
                console.log(`Fetching data from: ${endpoint}`);
                const response = await axios.get(endpoint);
                console.log('Response data:', response.data);
                if (Array.isArray(response.data)) {
                    setRecords(response.data);
                } else {
                    setRecords([]); // Handle unexpected data format
                    setError('Unexpected response format from the server.');
                }
            } catch (error) {
                console.error('Error fetching records:', error);
                setError('Failed to fetch records. Please try again later.');
            }
        };
        fetchRecords();
    }, [currentView]);

    // Open form for add/edit
    const openForm = (record = null) => {
        setFormData(record);
        setIsFormOpen(true);
    };

// Submit form data
const handleFormSubmit = async (newRecord) => {
    try {
        setError(null); // Reset error state
        let endpoint;
        let method;

        if (formData) {
            // Editing an existing record
            if (currentView === 'membership') {
                endpoint = `/api/membership/${encodeURIComponent(formData.name)}`;
            } else {
                endpoint = `/api/donations/${encodeURIComponent(formData.donor_name)}/${encodeURIComponent(formData.donation)}`;
            }
            method = 'put';
        } else {
            // Creating a new record
            endpoint = `/api/${currentView}`;
            method = 'post';
        }

        console.log(`Sending ${method.toUpperCase()} request to: ${endpoint}`, newRecord);

        const response = await axios({
            method: method,
            url: endpoint,
            data: newRecord,
        });

        // Refresh data after submission
        const getEndpoint = `/api/${currentView}`;
        const getResponse = await axios.get(getEndpoint);
        console.log('Updated records:', getResponse.data);
        if (Array.isArray(getResponse.data)) {
            setRecords(getResponse.data);
        } else {
            setRecords([]);
            setError('Unexpected response format after saving.');
        }
        setIsFormOpen(false);
        setFormData(null);
    } catch (error) {
        console.error('Error saving record:', error);
        if (error.response) {
            if (error.response.data) {
                if (error.response.data.errors) {
                    // Handle validation errors
                    const backendErrors = error.response.data.errors.map(err => err.msg).join(', ');
                    setError(`Validation Error: ${backendErrors}`);
                } else if (error.response.data.message) {
                    // Handle other backend errors
                    setError(error.response.data.message);
                } else {
                    setError('An error occurred while saving the record.');
                }
            } else {
                setError('An error occurred while saving the record.');
            }
        } else {
            setError('Network Error: Unable to reach the server.');
        }
    }
};

    // Delete a record
    const deleteRecord = async (record) => {
        try {
            setError(null); // Reset error state
            let endpoint;
            if (currentView === 'membership') {
                endpoint = `/api/membership/${encodeURIComponent(record.name)}`;
            } else {
                endpoint = `/api/donations/${encodeURIComponent(record.donor_name)}/${encodeURIComponent(record.donation)}`;
            }
            console.log(`Deleting record at: ${endpoint}`);
            await axios.delete(endpoint);
            // Refresh data after deletion
            const response = await axios.get(currentView === 'membership' ? '/api/membership' : '/api/donations');
            console.log('Updated records after deletion:', response.data);
            if (Array.isArray(response.data)) {
                setRecords(response.data);
            } else {
                setRecords([]);
                setError('Unexpected response format after deletion.');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
            setError('Failed to delete the record. Please try again.');
        }
    };

    const Tab = ({ title, active, onClick }) => (
        <div
            onClick={onClick}
            style={{
                ...styles.tab,
                ...(active ? styles.activeTab : {}),
            }}
        >
            <span
                style={{
                    ...styles.circle,
                    ...(active ? styles.activeCircle : {}),
                }}
            ></span>
            {title}
        </div>
    );

    const renderTable = () => {
        const columns =
            currentView === 'membership'
                ? ['name', 'last_payment_date', 'payment_method', 'amount_paid', 'monthly_fee', 'status'] // Added 'monthly_fee'
                : ['donor_name', 'donation', 'address', 'email', 'on_donor_list', 'acknowledged', 'notes'];
    
        return (
            <div style={styles.table}>
                <table className="table table-hover mb-0">
                    <thead style={styles.tableHeader}>
                        <tr>
                            {columns.map((col) => (
                                <th key={col}>{col.replace(/_/g, ' ').toUpperCase()}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? (
                            records.map((record) => (
                                <tr key={record.id}> {/* Use 'id' instead of 'index' */}
                                    {columns.map((col) => (
                                        <td key={col}>
                                            {currentView === 'membership' && col === 'status' ? (
                                                record[col] ? 'Active' : 'Inactive'
                                            ) : col === 'last_payment_date' && record[col] ? (
                                                new Date(record[col]).toISOString().split('T')[0]
                                            ) : (
                                                record[col]
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => openForm(record)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deleteRecord(record)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.tabContainer}>
                <Tab
                    title="Membership Management"
                    active={currentView === 'membership'}
                    onClick={() => setCurrentView('membership')}
                />
                <Tab
                    title="Donations"
                    active={currentView === 'donations'}
                    onClick={() => setCurrentView('donations')}
                />
                <button
                    className="btn btn-danger d-flex align-items-center gap-2"
                    style={{
                        borderRadius: '25px',
                        padding: '8px 20px',
                    }}
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>

            <button
                style={styles.newButton}
                onClick={() => openForm()}
            >
                {currentView === 'membership' ? 'New Record' : 'New Donation'}
            </button>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {renderTable()}

            {isFormOpen && (
                <div style={styles.formOverlay}>
                    <div style={styles.formContainer}>
                        <RecordForm
                            initialData={formData}
                            onSubmit={handleFormSubmit}
                            onClose={() => setIsFormOpen(false)}
                            currentView={currentView}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const RecordForm = ({ initialData, onSubmit, onClose, currentView }) => {
    const [formState, setFormState] = useState(
        initialData ||
        (currentView === 'membership'
            ? {
                name: '',
                last_payment_date: '',
                payment_method: '',
                amount_paid: '',
                monthly_fee: '',
                status: false,
            }
            : {
                donor_name: '',
                donation: '',
                address: '',
                email: '',
                on_donor_list: false,
                acknowledged: false,
                notes: '',
            })
    );
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormState((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic frontend validation
        let errors = {};
        if (currentView === 'membership') {
            if (!formState.name) errors.name = 'Name is required';
            // Add other required field validations if necessary
        } else {
            if (!formState.donor_name) errors.donor_name = 'Donor name is required';
            if (!formState.donation) errors.donation = 'Donation amount is required';
            // Add other required field validations if necessary
        }
    
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
    
        // Set email to null if empty
        const modifiedFormState = { ...formState };
        if (modifiedFormState.email === '') {
            modifiedFormState.email = null;
        }
    
        setFormErrors({});
        onSubmit(modifiedFormState);
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(formState).map((key) => (
                <div className="mb-3" key={key}>
                    <label className="form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                    {typeof formState[key] === 'boolean' ? (
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name={key}
                                checked={formState[key]}
                                onChange={handleChange}
                                id={key}
                            />
                            <label className="form-check-label" htmlFor={key}>
                                {formState[key] ? 'Yes' : 'No'}
                            </label>
                        </div>
                    ) : (
                        <input
                            type={key.includes('date') ? 'date' : 'text'}
                            className={`form-control ${formErrors[key] ? 'is-invalid' : ''}`}
                            name={key}
                            value={formState[key]}
                            onChange={handleChange}
                            required={
                                currentView === 'membership'
                                    ? key === 'name'
                                    : key === 'donor_name' || key === 'donation'
                            }
                        />
                    )}
                    {formErrors[key] && (
                        <div className="invalid-feedback">
                            {formErrors[key]}
                        </div>
                    )}
                </div>
            ))}
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                    Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TreasurerPage;