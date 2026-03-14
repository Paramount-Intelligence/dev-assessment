import React from 'react';

const STATUS_COLORS = {
  Applied: '#3b82f6',
  Interviewing: '#f59e0b',
  Hired: '#22c55e',
  Rejected: '#ef4444',
};

const ROLE_COLORS = {
  Frontend: '#8b5cf6',
  Backend: '#06b6d4',
  Fullstack: '#f97316',
};

export default function InternTable({ interns, onEdit, onDelete }) {
  if (interns.length === 0) {
    return <div className="empty-state">No interns found. Try adjusting your filters.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="intern-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Score</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern._id}>
              <td><strong>{intern.name}</strong></td>
              <td>{intern.email}</td>
              <td>
                <span className="badge" style={{ backgroundColor: ROLE_COLORS[intern.role] }}>
                  {intern.role}
                </span>
              </td>
              <td>
                <span className="badge" style={{ backgroundColor: STATUS_COLORS[intern.status] }}>
                  {intern.status}
                </span>
              </td>
              <td>
                <span className={`score ${intern.score >= 75 ? 'score-high' : intern.score >= 50 ? 'score-mid' : 'score-low'}`}>
                  {intern.score}
                </span>
              </td>
              <td>{new Date(intern.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-sm btn-edit" onClick={() => onEdit(intern)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(intern)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
