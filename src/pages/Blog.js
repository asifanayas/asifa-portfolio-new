import React, { useState } from 'react';
import { useData } from '../App';
import './Blog.css';

function PostEditor({ onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || { title: '', category: 'Reflection', content: '', readTime: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const estimateReadTime = (text) => {
    const words = text.split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min`;
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    onSave({
      ...form,
      id: initial?.id || Date.now(),
      date: initial?.date || new Date().toISOString().split('T')[0],
      readTime: estimateReadTime(form.content),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal blog-editor-modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{initial ? 'Edit Post' : 'Write New Post'}</h2>
        <div className="form-group">
          <label className="form-label">Post Title *</label>
          <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Give your post a title..." style={{ fontSize: '1rem' }} />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
            {['Reflection', 'Technical', 'Learning', 'IoT', 'Project Log', 'Life', 'Ideas'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Content *</label>
          <textarea
            className="form-textarea blog-editor"
            value={form.content}
            onChange={e => set('content', e.target.value)}
            placeholder="Write your thoughts here... Use blank lines to separate paragraphs."
          />
          <span className="word-count">{form.content.split(/\s+/).filter(Boolean).length} words · ~{estimateReadTime(form.content)} read</span>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>{initial ? 'Update Post' : 'Publish Post'}</button>
        </div>
      </div>
    </div>
  );
}

function PostView({ post, onClose, onEdit, onDelete }) {
  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal post-view-modal" onClick={e => e.stopPropagation()}>
        <div className="post-view-header">
          <span className="tag tag-gold">{post.category}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <h1 className="post-view-title">{post.title}</h1>
        <div className="post-view-meta">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} read</span>
        </div>
        <div className="post-view-body">
          {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div className="modal-actions" style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '1rem' }}>
          <button className="btn btn-danger" onClick={() => { onDelete(post.id); onClose(); }}>Delete</button>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={() => { onEdit(post); onClose(); }}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const { data, updateData } = useData();
  const posts = data.blogPosts;

  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [viewPost, setViewPost] = useState(null);
  const [filter, setFilter] = useState('All');

  const addPost = (post) => updateData('blogPosts', [post, ...posts]);
  const deletePost = (id) => updateData('blogPosts', posts.filter(p => p.id !== id));
  const saveEdit = (updated) => {
    updateData('blogPosts', posts.map(p => p.id === updated.id ? updated : p));
    setEditPost(null);
  };

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  const catColors = {
    Reflection: '#ce93d8',
    Technical: 'var(--accent)',
    Learning: 'var(--gold)',
    IoT: 'var(--success)',
    'Project Log': '#ffb74d',
    Life: '#f48fb1',
    Ideas: '#80cbc4',
  };

  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero">
        <p className="page-label">Personal Blog</p>
        <h1 className="page-title">My<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 300 }}>Thoughts & Notes</em></h1>
        <p className="page-subtitle">
          A space for reflections, technical notes, and ideas collected during my journey in IoT and engineering. Written by me, for me — and anyone curious.
        </p>
      </div>

      {/* Controls */}
      <div className="blog-controls">
        <div className="blog-filters">
          {categories.map(c => (
            <button key={c} className={`pmv-filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowEditor(true)}>✎ Write</button>
      </div>

      {/* Posts Grid */}
      {filtered.length > 0 ? (
        <div className="blog-grid">
          {filtered.map((post, i) => (
            <article
              key={post.id}
              className={`card blog-card ${i === 0 && filter === 'All' ? 'featured-post' : ''}`}
              onClick={() => setViewPost(post)}
            >
              <div className="blog-card-header">
                <span className="blog-cat" style={{ color: catColors[post.category] || 'var(--white-dim)', borderColor: catColors[post.category] || 'var(--white-dim)' }}>
                  {post.category}
                </span>
                <span className="blog-meta">{post.readTime} read</span>
              </div>
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-excerpt">
                {post.content.replace(/\n/g, ' ').slice(0, 160)}{post.content.length > 160 ? '…' : ''}
              </p>
              <div className="blog-footer">
                <span className="blog-date">{post.date}</span>
                <span className="blog-read-more">Read →</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ marginTop: '2rem' }}>
          <span className="empty-icon">✎</span>
          <p>{filter === 'All' ? "No posts yet. Write your first entry!" : `No posts in "${filter}" yet.`}</p>
        </div>
      )}

      {showEditor && <PostEditor onClose={() => setShowEditor(false)} onSave={addPost} />}
      {editPost && <PostEditor initial={editPost} onClose={() => setEditPost(null)} onSave={saveEdit} />}
      {viewPost && <PostView post={viewPost} onClose={() => setViewPost(null)} onEdit={(p) => { setEditPost(p); }} onDelete={deletePost} />}
    </div>
  );
}
