import React from 'react';

const ROLES = ['Frontend', 'Backend', 'Fullstack'];
const STATUSES = ['Applied', 'Interviewing', 'Hired', 'Rejected'];

export default function SearchBar({ search, onSearch, role, onRoleChange, status, onStatusChange }) {
  return (
    <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select value={role} onChange={(e) => onRoleChange(e.target.value)}>
        <option value="">All Roles</option>
        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All Statuses</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
}
