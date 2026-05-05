import { useState } from "react";
import "../styles/AddProjectModal.css";

const defaultForm = {
  title: "",
  category: "",
  description: "",
  client: "",
  year: new Date().getFullYear().toString(),
  tags: "",
  color: "#E8F4FD",
  accentColor: "#2B7FBF",
  image: "branding",
};

export default function AddProjectModal({ onClose, onSubmit, categories }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.category) e.category = "Category is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.client.trim()) e.client = "Client name is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-panel">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">Add New Project</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className={`form-group ${errors.title ? "has-error" : ""}`}>
              <label htmlFor="title">Project Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Lumina Brand Identity"
              />
              {errors.title && <span className="error-msg">{errors.title}</span>}
            </div>

            <div className={`form-group ${errors.category ? "has-error" : ""}`}>
              <label htmlFor="category">Category *</label>
              <select id="category" name="category" value={form.category} onChange={handleChange}>
                <option value="">Select a category…</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {errors.category && <span className="error-msg">{errors.category}</span>}
            </div>
          </div>

          <div className={`form-group ${errors.description ? "has-error" : ""}`}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the project, its goals, and what was delivered…"
            />
            {errors.description && <span className="error-msg">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.client ? "has-error" : ""}`}>
              <label htmlFor="client">Client Name *</label>
              <input
                id="client"
                name="client"
                type="text"
                value={form.client}
                onChange={handleChange}
                placeholder="e.g. Miro Tech"
              />
              {errors.client && <span className="error-msg">{errors.client}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                id="year"
                name="year"
                type="number"
                min="2000"
                max="2099"
                value={form.year}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags <span className="label-hint">(comma-separated)</span></label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={form.tags}
              onChange={handleChange}
              placeholder="e.g. Logo Design, Typography, Brand Strategy"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="color">Card Background Color</label>
              <div className="color-input-row">
                <input type="color" id="color" name="color" value={form.color} onChange={handleChange} />
                <span className="color-value">{form.color}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="accentColor">Accent Color</label>
              <div className="color-input-row">
                <input type="color" id="accentColor" name="accentColor" value={form.accentColor} onChange={handleChange} />
                <span className="color-value">{form.accentColor}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
