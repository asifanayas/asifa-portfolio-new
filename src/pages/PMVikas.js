import React, { useState } from 'react';
import { useData } from '../App';
import './PMVikas.css';

function LogModal({ onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || {
    week: '', title: '', date: '', learned: '', tools: '', status: 'Done',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({
      ...form,
      id: initial?.id || Date.now(),
      tools: typeof form.tools === 'string' ? form.tools.split(',').map(t => t.trim()).filter(Boolean) : form.tools,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{initial ? 'Edit Log Entry' : 'Add Learning Log'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Week / Session</label>
            <input className="form-input" value={form.week} onChange={e => set('week', e.target.value)} placeholder="Week 3" />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="form-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Session Title *</label>
          <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Introduction to MQTT Protocol" />
        </div>
        <div className="form-group">
          <label className="form-label">What I Learned</label>
          <textarea className="form-textarea" value={form.learned} onChange={e => set('learned', e.target.value)} placeholder="Describe what you covered, understood, or built in this session..." />
        </div>
        <div className="form-group">
          <label className="form-label">Tools / Tech Used (comma-separated)</label>
          <input className="form-input" value={typeof form.tools === 'string' ? form.tools : form.tools?.join(', ')} onChange={e => set('tools', e.target.value)} placeholder="Arduino, Raspberry Pi, MQTT" />
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
            {['Done', 'In Progress', 'Pending Review'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Entry</button>
        </div>
      </div>
    </div>
  );
}

export default function PMVikas() {
  const { data, updateData } = useData();
  const logs = data.pmvikasLogs;

  const [showModal, setShowModal] = useState(false);
  const [editLog, setEditLog] = useState(null);
  const [filter, setFilter] = useState('All');

  const addLog = (log) => updateData('pmvikasLogs', [...logs, log]);
  const deleteLog = (id) => updateData('pmvikasLogs', logs.filter(l => l.id !== id));
  const saveEdit = (updated) => {
    updateData('pmvikasLogs', logs.map(l => l.id === updated.id ? updated : l));
    setEditLog(null);
  };

  const statuses = ['All', 'Done', 'In Progress', 'Pending Review'];
  const filtered = filter === 'All' ? logs : logs.filter(l => l.status === filter);
  const done = logs.filter(l => l.status === 'Done').length;

  const statusColor = { 'Done': 'var(--success)', 'In Progress': 'var(--accent)', 'Pending Review': '#ffb74d' };

  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero">
        <p className="page-label">My Learning Journey</p>
        <h1 className="page-title">PM Vikas<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 300 }}>Tracker</em></h1>
        <p className="page-subtitle">
          Logging every session, lesson, and hands-on experiment from my IoT Assistant course at IIITK. A personal record of progress — not a general PM-VIKAS directory.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="pmv-stats">
        <div className="pmv-stat">
          <span className="pmv-stat-num">{logs.length}</span>
          <span className="pmv-stat-label">Sessions Logged</span>
        </div>
        <div className="pmv-stat">
          <span className="pmv-stat-num" style={{ color: 'var(--success)' }}>{done}</span>
          <span className="pmv-stat-label">Completed</span>
        </div>
        <div className="pmv-stat">
          <span className="pmv-stat-num" style={{ color: 'var(--accent)' }}>{logs.filter(l => l.status === 'In Progress').length}</span>
          <span className="pmv-stat-label">In Progress</span>
        </div>
        <div className="pmv-stat">
          <span className="pmv-stat-num" style={{ color: 'var(--gold)' }}>
            {logs.length > 0 ? Math.round((done / logs.length) * 100) : 0}%
          </span>
          <span className="pmv-stat-label">Completion Rate</span>
        </div>
      </div>

      {/* Progress bar */}
      {logs.length > 0 && (
        <div className="pmv-progress">
          <div className="pmv-progress-bar" style={{ width: `${Math.round((done / logs.length) * 100)}%` }} />
        </div>
      )}

      {/* Controls */}
      <div className="pmv-controls">
        <div className="pmv-filters">
          {statuses.map(s => (
            <button key={s} className={`pmv-filter-btn ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Session</button>
      </div>

      {/* Logs */}
      <div className="pmv-timeline">
        {filtered.map((log, i) => (
          <div key={log.id} className="pmv-entry">
            <div className="pmv-entry-indicator">
              <div className="pmv-dot" style={{ background: statusColor[log.status] || 'var(--white-dim)' }} />
              {i < filtered.length - 1 && <div className="pmv-line" />}
            </div>
            <div className="pmv-entry-card card">
              <div className="pmv-entry-header">
                <div>
                  <span className="pmv-week">{log.week}</span>
                  <h3 className="pmv-entry-title">{log.title}</h3>
                </div>
                <div className="pmv-entry-meta">
                  <span className="pmv-status" style={{ color: statusColor[log.status] || 'var(--white-dim)', borderColor: statusColor[log.status] || 'var(--white-dim)' }}>
                    {log.status}
                  </span>
                  <span className="pmv-date">{log.date}</span>
                </div>
              </div>

              {log.learned && (
                <div className="pmv-learned">
                  <span className="pmv-learned-label">What I learned</span>
                  <p>{log.learned}</p>
                </div>
              )}

              {log.tools?.length > 0 && (
                <div className="pmv-tools">
                  {log.tools.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              )}

              <div className="pmv-entry-actions">
                <button className="btn btn-ghost" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => setEditLog(log)}>Edit</button>
                <button className="btn btn-danger" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => deleteLog(log.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">◉</span>
            <p>{filter === 'All' ? 'No sessions logged yet. Add your first session!' : `No sessions with status "${filter}".`}</p>
          </div>
        )}
      </div>

      {showModal && <LogModal onClose={() => setShowModal(false)} onSave={addLog} />}
      {editLog && <LogModal initial={editLog} onClose={() => setEditLog(null)} onSave={saveEdit} />}
    </div>
  );
}
