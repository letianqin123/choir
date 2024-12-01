import React, { useState } from 'react';
import Table from '../components/Table';
import BackToLoginButton from '../components/BackToLoginButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
  const [members, setMembers] = useState([
    {
      ID: "01",
      Name: "Abebe Kebede",
      Email: "123@xxx.com",
      Address: "xxx",
      Phone: "123456",
      JoinDate: new Date("2021-01-01").toISOString(), // Using ISO string for date storage
      VoicePart: "soprano",
      Status: "active"
    }
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
      setMembers([...members, { ...newMember, ID: String(members.length + 1).padStart(2, '0') }]);
    }
    setIsFormOpen(false);
    setFormData(null);
  };

  const deleteMember = (memberID) => {
    setMembers(members.filter((member) => member.ID !== memberID));
  };

  // Format date for display in table
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
      <div style={{ backgroundColor: '#007E94', minHeight: '100vh' }}>
        {/* Header Section */}
        <div className="container-fluid py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white mb-0">Member Management</h2>
            <button
                className="btn btn-warning d-flex align-items-center"
                onClick={() => openForm()}
            >
              <span className="me-2">Add a Member</span>
              <i className="fas fa-plus"></i>
            </button>
          </div>

          {/* Main Content Card */}
          <div className="card rounded-4 shadow">
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                  <tr className="bg-light">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Join Date</th>
                    <th>Voice Part</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {members.map((member) => (
                      <tr key={member.ID}>
                        <td>{member.ID}</td>
                        <td>{member.Name}</td>
                        <td>{member.Email}</td>
                        <td>{member.Address}</td>
                        <td>{member.Phone}</td>
                        <td>{formatDate(member.JoinDate)}</td>
                        <td>{member.VoicePart}</td>
                        <td>
                          <span className="badge bg-success rounded-pill">Active</span>
                        </td>
                        <td>
                          <button
                              className="btn btn-primary btn-sm"
                              onClick={() => openForm(member)}
                          >
                            Actions
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Member Form Modal */}
        {isFormOpen && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{formData ? "Edit Member" : "Add New Member"}</h5>
                    <button type="button" className="btn-close" onClick={() => setIsFormOpen(false)}></button>
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
              <label className="form-label">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
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
                  <input
                      type="date"
                      className="form-control"
                      name={key}
                      value={formState[key] ? new Date(formState[key]).toISOString().split('T')[0] : ''}
                      onChange={handleChange}
                  />
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