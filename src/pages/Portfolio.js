import React, { useState } from 'react';
import { useData } from '../App';
import './Portfolio.css';

// ── Add Project Modal ──────────────────────────
function ProjectModal({ onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || {
    title: '', description: '', tech: '', date: '', category: 'IoT', status: 'In Progress', highlight: false,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({
      ...form,
      id: initial?.id || Date.now(),
      tech: typeof form.tech === 'string' ? form.tech.split(',').map(t => t.trim()).filter(Boolean) : form.tech,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{initial ? 'Edit Project' : 'Add New Project'}</h2>
        <div className="form-group">
          <label className="form-label">Project Title *</label>
          <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Smart Home Sensor" />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="What did you build and why?" />
        </div>
        <div className="form-group">
          <label className="form-label">Technologies (comma-separated)</label>
          <input className="form-input" value={typeof form.tech === 'string' ? form.tech : form.tech?.join(', ')} onChange={e => set('tech', e.target.value)} placeholder="Arduino, Python, DHT11" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
              {['IoT', 'Embedded', 'Web', 'Python', 'Hardware', 'Other'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
              {['In Progress', 'Completed', 'Paused'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Date (YYYY-MM)</label>
          <input className="form-input" value={form.date} onChange={e => set('date', e.target.value)} placeholder="2025-03" />
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input type="checkbox" id="highlight" checked={form.highlight} onChange={e => set('highlight', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
          <label htmlFor="highlight" className="form-label" style={{ marginBottom: 0 }}>Feature on portfolio</label>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Project</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Achievement Modal ─────────────────────
function AchievementModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: '', description: '', date: '', type: 'Milestone' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({ ...form, id: Date.now() });
    onClose();
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Add Achievement</h2>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Won Hackathon" />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Tell more about this achievement..." style={{ minHeight: 80 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
              {['Award', 'Milestone', 'Certification', 'Recognition', 'Other'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date (YYYY-MM)</label>
            <input className="form-input" value={form.date} onChange={e => set('date', e.target.value)} placeholder="2025-03" />
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Add Achievement</button>
        </div>
      </div>
    </div>
  );
}

// ── Skill Bar ─────────────────────────────────
function SkillBar({ name, level }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

// ── Status Badge ──────────────────────────────
function StatusBadge({ status }) {
  const colors = {
    'Completed': '#81c784',
    'In Progress': '#4fc3f7',
    'Paused': '#ffb74d',
  };
  return (
    <span className="status-badge" style={{ color: colors[status] || 'var(--white-dim)', borderColor: colors[status] || 'var(--white-dim)' }}>
      {status}
    </span>
  );
}

// ── Portfolio Page ─────────────────────────────
export default function Portfolio() {
  const { data, updateData } = useData();
  const { profile, skills, projects, achievements } = data;

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const addProject = (project) => updateData('projects', [...projects, project]);
  const deleteProject = (id) => updateData('projects', projects.filter(p => p.id !== id));
  const saveEditProject = (updated) => {
    updateData('projects', projects.map(p => p.id === updated.id ? updated : p));
    setEditProject(null);
  };
  const addAchievement = (a) => updateData('achievements', [...achievements, a]);
  const deleteAchievement = (id) => updateData('achievements', achievements.filter(a => a.id !== id));

  const typeIcon = { Award: '🏆', Milestone: '⚡', Certification: '📜', Recognition: '✦', Other: '◈' };

  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero portfolio-hero">
        <div className="hero-content">
          <p className="page-label">Portfolio</p>
          <h1 className="page-title">
            {profile.name.split(' ')[0]}<br />
            <em>{profile.name.split(' ').slice(1).join(' ')}</em>
          </h1>
          <p className="page-subtitle">{profile.bio}</p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-icon">◉</span>
              <span>{profile.degree}</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">◈</span>
              <span>{profile.course}</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">◎</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
        <div className="hero-avatar">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <span className="avatar-initials">AE</span>
              <span className="avatar-course">IoT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="section">
        <h2 className="section-title">Skills & Proficiency</h2>
        <div className="skills-grid">
          {skills.map(skill => <SkillBar key={skill.name} {...skill} />)}
        </div>
      </div>

      {/* Projects */}
      <div className="section">
        <h2 className="section-title">
          Projects
          <button className="btn btn-primary" onClick={() => setShowProjectModal(true)}>+ Add Project</button>
        </h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className={`card project-card ${project.highlight ? 'featured' : ''}`}>
              {project.highlight && <span className="featured-badge">Featured</span>}
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <StatusBadge status={project.status} />
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tech?.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="project-footer">
                <span className="tag tag-gold">{project.category}</span>
                <span className="project-date">{project.date}</span>
                <div className="project-actions">
                  <button className="btn btn-ghost" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => setEditProject(project)}>Edit</button>
                  <button className="btn btn-danger" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => deleteProject(project.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">◈</span>
              <p>No projects yet. Add your first project!</p>
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="section">
        <h2 className="section-title">
          Achievements
          <button className="btn btn-primary" onClick={() => setShowAchievementModal(true)}>+ Add</button>
        </h2>
        <div className="achievements-list">
          {achievements.map(a => (
            <div key={a.id} className="achievement-item card">
              <div className="achievement-icon">{typeIcon[a.type] || '◈'}</div>
              <div className="achievement-body">
                <div className="achievement-header">
                  <h3 className="achievement-title">{a.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="tag tag-gold">{a.type}</span>
                    <span className="project-date">{a.date}</span>
                    <button className="btn btn-danger" style={{ padding: '0.2rem 0.6rem', fontSize: '0.76rem' }} onClick={() => deleteAchievement(a.id)}>×</button>
                  </div>
                </div>
                <p className="achievement-desc">{a.description}</p>
              </div>
            </div>
          ))}
          {achievements.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">🏆</span>
              <p>Your achievements will appear here. Add your first one!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showProjectModal && <ProjectModal onClose={() => setShowProjectModal(false)} onSave={addProject} />}
      {editProject && <ProjectModal initial={editProject} onClose={() => setEditProject(null)} onSave={saveEditProject} />}
      {showAchievementModal && <AchievementModal onClose={() => setShowAchievementModal(false)} onSave={addAchievement} />}
    </div>
  );
}
