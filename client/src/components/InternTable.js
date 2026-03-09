import React from 'react';

export default function InternTable({ interns, onEdit, onDelete }) {
  if (!interns || interns.length === 0) {
    return <p>No interns found.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Score</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {interns.map((intern) => (
          <tr key={intern._id}>
            <td>{intern.name}</td>
            <td>{intern.email}</td>
            <td>{intern.role}</td>
            <td>{intern.status}</td>
            <td>{intern.score}</td>
            <td>{new Date(intern.createdAt).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onEdit(intern)}>Edit</button>{' '}
              <button onClick={() => onDelete(intern._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
