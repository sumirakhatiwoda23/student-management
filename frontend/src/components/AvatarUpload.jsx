import { useRef, useState } from "react";

const AVATAR_URL = "https://student-management-1-a7x3.onrender.com/uploads/profiles/";

const AvatarUpload = ({ current, onChange }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(
    current ? `${AVATAR_URL}${current}` : null
  );
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
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

  return (
    <div className="avatar-upload-field">
      <label className="form-label">Profile Picture</label>
      <div
        className={`avatar-drop-zone ${dragOver ? "drag-over" : ""}`}
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round"/>
                <polyline points="17 8 12 3 7 8" strokeLinecap="round"/>
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
              </svg>
              <span>Change</span>
            </div>
          </div>
        ) : (
          <div className="avatar-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round"/>
              <polyline points="17 8 12 3 7 8" strokeLinecap="round"/>
              <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
            </svg>
            <p>Drop image or <span>browse</span></p>
            <small>JPEG, PNG, WEBP — max 3 MB</small>
          </div>
        )}
      </div>
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