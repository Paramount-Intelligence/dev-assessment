import React, { useState, useEffect, useCallback } from 'react';
import { getInterns, createIntern, updateIntern, deleteIntern } from './services/api';
import InternTable from './components/InternTable';
import InternForm from './components/InternForm';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import './App.css';

const EMPTY_FORM = { name: '', email: '', role: 'Frontend', status: 'Applied', score: '' };

export default function App() {
  const [interns, setInterns] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState({ search: '', role: '', status: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editIntern, setEditIntern] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchInterns = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getInterns({ ...filters, page, limit: 10 });
      setInterns(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load interns');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchInterns(1); }, [fetchInterns]);

  const handleAdd = async (formData) => {
    setFormLoading(true);
    setFormError('');
    try {
      await createIntern(formData);
      setShowAddModal(false);
      fetchInterns(1);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create intern');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (formData) => {
    setFormLoading(true);
    setFormError('');
    try {
      await updateIntern(editIntern._id, formData);
      setEditIntern(null);
      fetchInterns(pagination.page);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to update intern');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteIntern(deleteTarget._id);
      setDeleteTarget(null);
      fetchInterns(pagination.page);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete intern');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Intern Tracker</h1>
        <button className="btn btn-primary" onClick={() => { setShowAddModal(true); setFormError(''); }}>
          + Add Intern
        </button>
      </header>

      <main className="app-main">
        <Filters filters={filters} onChange={(f) => setFilters(f)} />

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading interns...</div>
        ) : (
          <>
            <InternTable
              interns={interns}
              onEdit={(intern) => { setEditIntern(intern); setFormError(''); }}
              onDelete={(intern) => setDeleteTarget(intern)}
            />
            <Pagination
              pagination={pagination}
              onPageChange={(p) => fetchInterns(p)}
            />
          </>
        )}
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <Modal title="Add New Intern" onClose={() => setShowAddModal(false)}>
          <InternForm
            initialData={EMPTY_FORM}
            onSubmit={handleAdd}
            onCancel={() => setShowAddModal(false)}
            error={formError}
            loading={formLoading}
            submitLabel="Add Intern"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editIntern && (
        <Modal title="Edit Intern" onClose={() => setEditIntern(null)}>
          <InternForm
            initialData={editIntern}
            onSubmit={handleEdit}
            onCancel={() => setEditIntern(null)}
            error={formError}
            loading={formLoading}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <Modal title="Confirm Delete" onClose={() => setDeleteTarget(null)}>
          <div className="delete-confirm">
            <p>Are you sure you want to delete <strong>{deleteTarget.name}</strong>?</p>
            <p className="delete-warn">This action cannot be undone.</p>
            <div className="form-actions">
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
