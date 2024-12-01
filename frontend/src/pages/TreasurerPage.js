import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

const TreasurerPage = () => {
    const [currentView, setCurrentView] = useState('membership');
    const [membershipRecords, setMembershipRecords] = useState([]);
    const [donationRecords, setDonationRecords] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };


    const styles = {
        container: {
            backgroundColor: '#007E94',
            minHeight: '100vh',
            padding: '2rem'
        },
        tabContainer: {
            display: 'flex',
            gap: '2rem',
            marginBottom: '2rem'
        },
        tab: {
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        activeTab: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        circle: {
            width: '20px',
            height: '20px',
            border: '2px solid white',
            borderRadius: '50%',
            display: 'inline-block'
        },
        activeCircle: {
            backgroundColor: 'white'
        },
        newButton: {
            backgroundColor: '#F7B84B',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 2rem',
            marginBottom: '2rem',
            cursor: 'pointer'
        },
        table: {
            backgroundColor: 'white',
            borderRadius: '10px',
            overflow: 'hidden'
        },
        tableHeader: {
            backgroundColor: '#F8F9FA'
        },
        paidBadge: {
            backgroundColor: '#E8F5E9',
            color: '#4CAF50',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.875rem'
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
            zIndex: 1000
        },
        formContainer: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '500px'
        }
    };

    const openForm = (record = null) => {
        setFormData(record);
        setIsFormOpen(true);
    };

    const handleFormSubmit = (newRecord) => {
        if (currentView === 'membership') {
            if (formData) {
                setMembershipRecords((prev) =>
                    prev.map((record) =>
                        record.ID === formData.ID ? { ...record, ...newRecord } : record
                    )
                );
            } else {
                setMembershipRecords((prev) => [
                    ...prev,
                    { ...newRecord, ID: (prev.length + 1).toString().padStart(2, '0') },
                ]);
            }
        } else {
            if (formData) {
                setDonationRecords((prev) =>
                    prev.map((record) =>
                        record.ID === formData.ID ? { ...record, ...newRecord } : record
                    )
                );
            } else {
                setDonationRecords((prev) => [
                    ...prev,
                    { ...newRecord, ID: (prev.length + 1).toString().padStart(2, '0') },
                ]);
            }
        }

        setIsFormOpen(false);
        setFormData(null);
    };

    const deleteRecord = (id) => {
        if (currentView === 'membership') {
            setMembershipRecords((prev) => prev.filter((record) => record.ID !== id));
        } else {
            setDonationRecords((prev) => prev.filter((record) => record.ID !== id));
        }
    };

    const Tab = ({ title, active, onClick }) => (
        <div
            onClick={onClick}
            style={{
                ...styles.tab,
                ...(active ? styles.activeTab : {})
            }}
        >
      <span
          style={{
              ...styles.circle,
              ...(active ? styles.activeCircle : {})
          }}
      ></span>
            {title}
        </div>
    );

    const renderTable = () => {
        const records = currentView === 'membership' ? membershipRecords : donationRecords;
        const columns = currentView === 'membership'
            ? ['ID', 'Name', 'PaymentDate', 'PaymentMethod', 'PaymentAmount', 'PaymentStatus']
            : ['ID', 'AmountDonated', 'Date', 'Source'];

        return (
            <div style={styles.table}>
                <table className="table table-hover mb-0">
                    <thead style={styles.tableHeader}>
                    <tr>
                        {columns.map(col => <th key={col}>{col}</th>)}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record) => (
                        <tr key={record.ID}>
                            {columns.map(col => (
                                <td key={col}>
                                    {col === 'PaymentStatus' ? (
                                        <span style={styles.paidBadge}>{record[col]}</span>
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
                                    onClick={() => deleteRecord(record.ID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
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
                        padding: '8px 20px'
                    }}
                    onClick={handleLogout}
                >
                    Log Out
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>

            <button
                style={styles.newButton}
                onClick={() => openForm()}
            >
                {currentView === 'membership' ? 'New Record' : 'New Donation'}
            </button>

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
                Name: '',
                PaymentDate: '',
                PaymentAmount: '',
                PaymentMethod: '',
                PaymentStatus: ''
            }
            : {
                AmountDonated: '',
                Date: '',
                Source: ''
            })
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <div>
            <h3 className="mb-4">
                {initialData ? 'Edit' : 'Add New'}{' '}
                {currentView === 'membership' ? 'Payment Record' : 'Donation Record'}
            </h3>
            <form onSubmit={handleSubmit}>
                {Object.keys(formState).filter(key => key !== 'ID').map((key) => (
                    <div className="mb-3" key={key}>
                        <label className="form-label">{key}:</label>
                        <input
                            type="text"
                            className="form-control"
                            name={key}
                            value={formState[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <div className="d-flex gap-2 justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TreasurerPage;