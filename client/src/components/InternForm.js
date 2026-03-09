import React, { useState, useEffect } from 'react';

const ROLES = ['Frontend', 'Backend', 'Fullstack'];
const STATUSES = ['Applied', 'Interviewing', 'Hired', 'Rejected'];

const defaultForm = { name: '', email: '', role: '', status: '', score: '' };

export default function InternForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || '',
        status: initialData.status || '',
        score: initialData.score !== undefined ? String(initialData.score) : '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.role) errs.role = 'Role is required';
    if (!form.status) errs.status = 'Status is required';
    const score = Number(form.score);
    if (form.score === '') {
      errs.score = 'Score is required';
    } else if (isNaN(score)) {
      errs.score = 'Score must be a number';
    } else if (score < 0 || score > 100) {
      errs.score = 'Score must be between 0 and 100';
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...form, score: Number(form.score) });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
      <h3>{initialData ? 'Edit Intern' : 'Add Intern'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span style={{ color: 'red' }}> {errors.name}</span>}
        </div>
        <div>
          <label>Email: </label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span style={{ color: 'red' }}> {errors.email}</span>}
        </div>
        <div>
          <label>Role: </label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="">-- Select Role --</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.role && <span style={{ color: 'red' }}> {errors.role}</span>}
        </div>
        <div>
          <label>Status: </label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">-- Select Status --</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.status && <span style={{ color: 'red' }}> {errors.status}</span>}
        </div>
        <div>
          <label>Score (0-100): </label>
          <input name="score" type="number" min="0" max="100" value={form.score} onChange={handleChange} />
          {errors.score && <span style={{ color: 'red' }}> {errors.score}</span>}
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button type="submit">{initialData ? 'Update' : 'Create'}</button>{' '}
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
