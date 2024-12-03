import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
    const [members, setMembers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    // Fetch members from the backend
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/members');
                const formattedMembers = response.data.map((member) => ({
                    ...member,
                    status: member.status === 1 ? 'active' : 'inactive', // Convert 0/1 to active/inactive
                }));
                setMembers(formattedMembers);
            } catch (error) {
                console.error('Error fetching members:', error.message);
            }
        };
        fetchMembers();
    }, []);

    const openForm = (member = null) => {
        setFormData(member);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (newMember) => {
        try {
            const formattedMember = {
                ...newMember,
                status: newMember.status === 'active' ? 1 : 0, // Convert active/inactive to 1/0
            };
            if (formData) {
                // Update member
                await axios.put(
                    `http://localhost:3000/api/members/${formData.name}`,
                    formattedMember
                );
            } else {
                // Add new member
                await axios.post('http://localhost:3000/api/members', formattedMember);
            }
            // Refresh members
            const response = await axios.get('http://localhost:3000/api/members');
            const formattedMembers = response.data.map((member) => ({
                ...member,
                status: member.status === 1 ? 'active' : 'inactive',
            }));
            setMembers(formattedMembers);
            setIsFormOpen(false);
            setFormData(null);
        } catch (error) {
            console.error('Error saving member:', error.message);
        }
    };

    const deleteMember = async (memberName) => {
        try {
            await axios.delete(`http://localhost:3000/api/members/${memberName}`);
            // Refresh members
            const response = await axios.get('http://localhost:3000/api/members');
            const formattedMembers = response.data.map((member) => ({
                ...member,
                status: member.status === 1 ? 'active' : 'inactive',
            }));
            setMembers(formattedMembers);
        } catch (error) {
            console.error('Error deleting member:', error.message);
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div style={{ backgroundColor: '#007E94', minHeight: '100vh' }}>
            <div className="container-fluid py-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center pb-4">
                    <h2 className="text-white m-0">Member Management</h2>
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn"
                            style={{
                                backgroundColor: '#FFD43B',
                                borderRadius: '25px',
                                padding: '8px 20px',
                            }}
                            onClick={() => openForm()}
                        >
                            Add a Member
                        </button>
                        <button
                            className="btn btn-danger"
                            style={{
                                borderRadius: '25px',
                                padding: '8px 20px',
                            }}
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Content Card */}
                <div className="card rounded-4 shadow">
                    <div className="card-body px-4 py-3">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr style={{ backgroundColor: '#F8F9FA' }}>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Voice Part</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map((member, index) => (
                                        <tr
                                            key={index}
                                            style={
                                                index % 2 === 1
                                                    ? { backgroundColor: '#F8F9FA' }
                                                    : {}
                                            }
                                        >
                                            <td>{member.name}</td>
                                            <td>{member.email}</td>
                                            <td>{member.address || 'N/A'}</td>
                                            <td>{member.phone || 'N/A'}</td>
                                            <td>{member.voice_part}</td>
                                            <td>
                                                <span
                                                    className={`badge rounded-pill ${
                                                        member.status === 'active'
                                                            ? 'bg-success'
                                                            : 'bg-secondary'
                                                    }`}
                                                >
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-sm btn-primary me-2"
                                                        onClick={() => openForm(member)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            deleteMember(member.name)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            {isFormOpen && (
                <div
                    className="modal show d-block"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {formData ? 'Edit Member' : 'Add Member'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsFormOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <MemberForm
                                    initialData={formData}
                                    onSubmit={handleFormSubmit}
                                    onClose={() => setIsFormOpen(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MemberForm = ({ initialData, onSubmit, onClose }) => {
    const [formState, setFormState] = useState(
        initialData || {
            name: '',
            email: '',
            address: '',
            phone: '',
            voice_part: '',
            status: 'active',
        }
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
        <form onSubmit={handleSubmit}>
            {Object.keys(formState).map((key) => (
                <div className="mb-3" key={key}>
                    <label className="form-label">
                        {key.replace(/_/g, ' ').toUpperCase()}
                    </label>
                    {key === 'voice_part' || key === 'status' ? (
                        <select
                            className="form-select"
                            name={key}
                            value={formState[key]}
                            onChange={handleChange}
                        >
                            {key === 'voice_part' ? (
                                <>
                                    <option value="">Select Voice Part</option>
                                    <option value="Soprano">Soprano</option>
                                    <option value="Alto">Alto</option>
                                    <option value="Tenor">Tenor</option>
                                    <option value="Bass">Bass</option>
                                </>
                            ) : (
                                <>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </>
                            )}
                        </select>
                    ) : (
                        <input
                            type={key === 'email' ? 'email' : 'text'}
                            className="form-control"
                            name={key}
                            value={formState[key]}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <div className="d-flex justify-content-end gap-2">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default AdminPage;