import React, { useState } from 'react';
import Table from '../components/Table';
import BackToLoginButton from '../components/BackToLoginButton';

const TreasurerPage = () => {
  const [currentView, setCurrentView] = useState('membership'); // Toggle between "membership" and "donations"
  const [membershipRecords, setMembershipRecords] = useState([]);
  const [donationRecords, setDonationRecords] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const openForm = (record = null) => {
    setFormData(record);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (newRecord) => {
    if (currentView === 'membership') {
      if (formData) {
        // Update existing membership record
        setMembershipRecords((prev) =>
          prev.map((record) =>
            record.ID === formData.ID ? { ...record, ...newRecord } : record
          )
        );
      } else {
        // Add new membership record
        setMembershipRecords((prev) => [
          ...prev,
          { ...newRecord, ID: prev.length + 1 },
        ]);
      }
    } else {
      if (formData) {
        // Update existing donation record
        setDonationRecords((prev) =>
          prev.map((record) =>
            record.ID === formData.ID ? { ...record, ...newRecord } : record
          )
        );
      } else {
        // Add new donation record
        setDonationRecords((prev) => [
          ...prev,
          { ...newRecord, ID: prev.length + 1 },
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

  return (
    <div>
      <h2>Treasurer - {currentView === 'membership' ? 'Membership Management' : 'Donations Management'}</h2>

      {/* Toggle Button */}
      <button
        onClick={() => setCurrentView((prev) => (prev === 'membership' ? 'donations' : 'membership'))}
        style={{ marginBottom: '10px' }}
      >
        Switch to {currentView === 'membership' ? 'Donations' : 'Membership'}
      </button>

      {/* Add New Record Button */}
      <button onClick={() => openForm()} style={{ marginBottom: '10px' }}>
        Add New {currentView === 'membership' ? 'Payment Record' : 'Donation Record'}
      </button>

      {/* Table */}
      <Table
        columns={
          currentView === 'membership'
            ? ['ID', 'Name', 'PaymentDate', 'AmountPaid', 'PaymentMethod', 'PaymentStatus']
            : ['ID', 'DonatorName', 'AmountDonated', 'Date']
        }
        data={currentView === 'membership' ? membershipRecords : donationRecords}
        actions={[
          { label: 'Edit', onClick: (row) => openForm(row) },
          { label: 'Delete', onClick: (row) => deleteRecord(row.ID) },
        ]}
      />

      {/* Form */}
      {isFormOpen && (
        <RecordForm
          initialData={formData}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
          currentView={currentView}
        />
      )}

      <BackToLoginButton />
    </div>
  );
};

// Form Component for Adding/Editing Records
const RecordForm = ({ initialData, onSubmit, onClose, currentView }) => {
  const [formState, setFormState] = useState(
    initialData ||
      (currentView === 'membership'
        ? {
            Name: '',
            PaymentDate: '',
            AmountPaid: '',
            PaymentMethod: '',
            PaymentStatus: '',
          }
        : {
            DonatorName: '',
            AmountDonated: '',
            Date: '',
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
      <h3>
        {initialData ? 'Edit' : 'Add New'}{' '}
        {currentView === 'membership' ? 'Payment Record' : 'Donation Record'}
      </h3>
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

export default TreasurerPage;