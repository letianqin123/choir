import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
    const [members, setMembers] = useState([
    ]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const openForm = (member = null) => {
        setFormData(member);
        setIsFormOpen(true);
    };

    const handleFormSubmit = (newMember) => {
        if (formData) {
            setMembers(members.map((member) =>
                member.ID === formData.ID ? { ...member, ...newMember } : member
            ));
        } else {
            setMembers([...members, {
                ...newMember,
                ID: String(members.length + 1).padStart(2, '0')
            }]);
        }
        setIsFormOpen(false);
        setFormData(null);
    };

    const deleteMember = (memberID) => {
        setMembers(members.filter((member) => member.ID !== memberID));
    };

    return (
        <div style={{ backgroundColor: '#007E94', minHeight: '100vh' }}>
            <div className="container-fluid py-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center pb-4">
                    <div className="d-flex align-items-center gap-4">
                        <h2 className="text-white m-0">Member Management</h2>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn d-flex align-items-center gap-2"
                            style={{
                                backgroundColor: '#FFD43B',
                                borderRadius: '25px',
                                padding: '8px 20px'
                            }}
                            onClick={() => openForm()}
                        >
                            Add a Member
                            <i className="fas fa-plus"></i>
                        </button>
                        <button
                            className="btn btn-danger d-flex align-items-center gap-2"
                            style={{
                                borderRadius: '25px',
                                padding: '8px 20px'
                            }}
                            onClick={() => window.location.href = '/'}
                        >
                            Log Out
                            <i className="fas fa-sign-out-alt"></i>
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
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Join Date (Optional)</th>
                                    <th>Voice Part</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {members.map((member, index) => (
                                    <tr key={member.ID} style={index % 2 === 1 ? { backgroundColor: '#F8F9FA' } : {}}>
                                        <td>{member.ID}</td>
                                        <td>{member.Name}</td>
                                        <td>{member.Email}</td>
                                        <td>{member.Address}</td>
                                        <td>{member.Phone}</td>
                                        <td>{member.JoinDate}</td>
                                        <td>{member.VoicePart}</td>
                                        {/*<td>*/}
                                        {/*    <span className="badge rounded-pill bg-success">{member.Status}</span>*/}
                                        {/*</td>*/}
                                        <td>
                                            <span className={`badge rounded-pill ${member.Status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                                {member.Status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() => openForm(member)}
                                                >
                                                    <i className="fas fa-edit me-1"></i> Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => deleteMember(member.ID)}
                                                >
                                                    <i className="fas fa-trash-alt me-1"></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                        {/*<td>*/}
                                        {/*    <div className="dropdown">*/}
                                        {/*        <button*/}
                                        {/*            className="btn btn-sm text-white"*/}
                                        {/*            style={{ backgroundColor: '#364F6B' }}*/}
                                        {/*            type="button"*/}
                                        {/*            id={`actionDropdown${member.ID}`}*/}
                                        {/*            data-bs-toggle="dropdown"*/}
                                        {/*            aria-expanded="false"*/}
                                        {/*        >*/}
                                        {/*            Actions <i className="fas fa-chevron-down ms-1"></i>*/}
                                        {/*        </button>*/}
                                        {/*        <ul className="dropdown-menu shadow-sm" aria-labelledby={`actionDropdown${member.ID}`}>*/}
                                        {/*            <li>*/}
                                        {/*                <button*/}
                                        {/*                    className="dropdown-item d-flex align-items-center"*/}
                                        {/*                    onClick={() => openForm(member)}*/}
                                        {/*                >*/}
                                        {/*                    <i className="fas fa-edit me-2"></i> Edit*/}
                                        {/*                </button>*/}
                                        {/*            </li>*/}
                                        {/*            <li><hr className="dropdown-divider"/></li>*/}
                                        {/*            <li>*/}
                                        {/*                <button*/}
                                        {/*                    className="dropdown-item d-flex align-items-center text-danger"*/}
                                        {/*                    onClick={() => deleteMember(member.ID)}*/}
                                        {/*                >*/}
                                        {/*                    <i className="fas fa-trash-alt me-2"></i> Delete*/}
                                        {/*                </button>*/}
                                        {/*            </li>*/}
                                        {/*        </ul>*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
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
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {formData ? "Edit Member" : "Add Member"}
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
            Name: "",
            Email: "",
            Address: "",
            Phone: "",
            JoinDate: "",
            VoicePart: "",
            Status: "active"
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
            {Object.keys(formState).filter(key => key !== 'ID').map((key) => (
                <div className="mb-3" key={key}>
                    <label className="form-label">
                        {key === 'VoicePart' ? 'Voice Part' : key}
                    </label>
                    {key === 'VoicePart' ? (
                        <select
                            className="form-select"
                            name={key}
                            value={formState[key]}
                            onChange={handleChange}
                        >
                            <option value="">Select Voice Part</option>
                            <option value="soprano">Soprano</option>
                            <option value="alto">Alto</option>
                            <option value="tenor">Tenor</option>
                            <option value="bass">Bass</option>
                        </select>
                    ) : key === 'Status' ? (
                        <select
                            className="form-select"
                            name={key}
                            value={formState[key]}
                            onChange={handleChange}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    ) : key === 'JoinDate' ? (
                        <div className="input-group">
                            <input
                                type="date"
                                className="form-control"
                                name={key}
                                value={formState[key]}
                                onChange={handleChange}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => {
                                    document.querySelector('input[type="date"]').showPicker();
                                }}
                            >
                                <i className="far fa-calendar-alt"></i>
                            </button>
                        </div>
                    ) : (
                        <input
                            type={key === 'Email' ? 'email' : 'text'}
                            className="form-control"
                            name={key}
                            value={formState[key]}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
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