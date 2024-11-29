import React, { useState } from 'react';
import Table from '../components/Table';
import BackToLoginButton from '../components/BackToLoginButton';

const AdminPage = () => {
  const [members, setMembers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  // Open the form for adding or editing
  const openForm = (member = null) => {
    setFormData(member);
    setIsFormOpen(true);
  };

  // Handle form submission
  const handleFormSubmit = (newMember) => {
    if (formData) {
      // Edit existing member
      setMembers(
        members.map((member) =>
          member.ID === formData.ID ? { ...member, ...newMember } : member
        )
      );
    } else {
      // Add new member
      setMembers([
        ...members,
        { ...newMember, ID: members.length + 1 },
      ]);
    }
    setIsFormOpen(false);
    setFormData(null);
  };

  // Delete a member
  const deleteMember = (memberID) => {
    setMembers(members.filter((member) => member.ID !== memberID));
  };

  return (
    <div>
      <h2>Admin - Member Management</h2>
      <button onClick={() => openForm()}>Add a Member</button>
      <Table
        columns={[
          "ID",
          "Name",
          "Email",
          "Address",
          "Phone",
          "Join Date",
          "Voice Part",
          "Status",
        ]}
        data={members}
        actions={[
          { label: "Edit", onClick: (row) => openForm(row) },
          { label: "Delete", onClick: (row) => deleteMember(row.ID) },
        ]}
      />
      {isFormOpen && (
        <MemberForm
          initialData={formData}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      <BackToLoginButton />
    </div>
  );
};

// Form Component for Adding/Editing Members
const MemberForm = ({ initialData, onSubmit, onClose }) => {
  const [formState, setFormState] = useState(
    initialData || {
      Name: "",
      Email: "",
      Address: "",
      Phone: "",
      "Join Date": "",
      "Voice Part": "",
      Status: "",
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
    <div>
      <h3>{initialData ? "Edit Member" : "Add Member"}</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(formState).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={formState[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminPage;