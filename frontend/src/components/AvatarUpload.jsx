import { useRef, useState } from "react";

const AVATAR_URL = "https://student-management-1-a7x3.onrender.com/uploads/profiles/";

const AvatarUpload = ({ current, onChange }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(
    current ? `${AVATAR_URL}${current}` : null
  );
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    setError("");

    // Validate type
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("Only JPEG, PNG, WEBP or GIF images allowed");
      return;
    }
    // Validate size (3MB)
    if (file.size > 3 * 1024 * 1024) {
      setError("Image must be under 3 MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="avatar-upload-field">
      <label className="form-label">Profile Picture</label>

      <div
        className={`avatar-drop-zone ${dragOver ? "drag-over" : ""} ${preview ? "has-preview" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current.click()}
        aria-label="Upload profile picture"
      >
        {preview ? (
          <div className="avatar-preview-wrap">
            <img src={preview} alt="Preview" className="avatar-preview-img" />
            <div className="avatar-overlay">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round"/>
                <polyline points="17 8 12 3 7 8" strokeLinecap="round"/>
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
              </svg>
              <span>Change Photo</span>
            </div>
            <button
              type="button"
              className="avatar-remove-btn"
              onClick={handleRemove}
              title="Remove photo"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="avatar-placeholder">
            <div className="avatar-upload-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="avatar-upload-text">
              <p className="avatar-upload-main">
                <span className="avatar-upload-link">Click to upload</span> or drag & drop
              </p>
              <p className="avatar-upload-hint">JPEG, PNG, WEBP — max 3 MB</p>
            </div>
          </div>
        )}

        {dragOver && !preview && (
          <div className="avatar-drag-indicator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round"/>
              <polyline points="17 8 12 3 7 8" strokeLinecap="round"/>
              <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
            </svg>
            <p>Drop to upload</p>
          </div>
        )}
      </div>

      {error && (
        <span className="form-error" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
};

export default AvatarUpload;