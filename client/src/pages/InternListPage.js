import React, { useEffect, useState, useCallback } from 'react';
import InternTable from '../components/InternTable';
import InternForm from '../components/InternForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function InternListPage() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [showForm, setShowForm] = useState(false);
  const [editingIntern, setEditingIntern] = useState(null);

  const fetchInterns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search) params.set('search', search);
      if (roleFilter) params.set('role', roleFilter);
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`${API_BASE}/interns?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch interns');
      setInterns(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, page]);

  useEffect(() => {
    fetchInterns();
  }, [fetchInterns]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this intern?')) return;
    try {
      const res = await fetch(`${API_BASE}/interns/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete intern');
      fetchInterns();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const url = editingIntern
        ? `${API_BASE}/interns/${editingIntern._id}`
        : `${API_BASE}/interns`;
      const method = editingIntern ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save intern');
      setShowForm(false);
      setEditingIntern(null);
      fetchInterns();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Intern Tracker</h1>

      <button onClick={() => { setEditingIntern(null); setShowForm(true); }}>
        + Add Intern
      </button>

      {showForm && (
        <InternForm
          initialData={editingIntern}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowForm(false); setEditingIntern(null); }}
        />
      )}

      <SearchBar
        search={search}
        onSearch={(v) => { setSearch(v); setPage(1); }}
        role={roleFilter}
        onRoleChange={(v) => { setRoleFilter(v); setPage(1); }}
        status={statusFilter}
        onStatusChange={(v) => { setStatusFilter(v); setPage(1); }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <InternTable
          interns={interns}
          onEdit={(intern) => { setEditingIntern(intern); setShowForm(true); }}
          onDelete={handleDelete}
        />
      )}

      <Pagination
        page={page}
        pages={pagination.pages}
        onPageChange={setPage}
      />
    </div>
  );
}
