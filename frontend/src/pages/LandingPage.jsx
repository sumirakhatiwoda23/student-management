import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import StudentForm from "../components/StudentForm";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEnroll = (courseName) => {
    if (user) {
      setSelectedCourse(courseName);
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="landing">
      {/* ── Header ── */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-logo" onClick={() => navigate("/")}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Academia</span>
          </div>

          <nav className={`landing-nav ${menuOpen ? "open" : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            {user ? (
              <button className="nav-cta" onClick={() => navigate("/dashboard")}>Dashboard</button>
            ) : (
              <button className="nav-cta" onClick={() => navigate("/login")}>Sign In</button>
            )}
          </nav>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">🎓 Next-Gen Student Management</div>
          <h1 className="hero-title">
            Manage Students<br />
            <span className="hero-highlight">Smarter & Faster</span>
          </h1>
          <p className="hero-desc">
            Academia gives educators and administrators one powerful platform to track students, manage courses, and make data-driven decisions.
          </p>
          <div className="hero-btns">
            <button className="hero-btn-primary" onClick={() => handleEnroll(null)}>
              Enroll a Student
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round"/>
              </svg>
            </button>
            <a href="#courses" className="hero-btn-secondary">Explore Courses</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>500+</strong><span>Students</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>20+</strong><span>Courses</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>99%</strong><span>Uptime</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card floating">
            <div className="hc-header">
              <div className="hc-dot red"/><div className="hc-dot yellow"/><div className="hc-dot green"/>
            </div>
            <div className="hc-row"><div className="hc-avatar">SK</div><div className="hc-lines"><div/><div/></div><span className="hc-badge">Active</span></div>
            <div className="hc-row"><div className="hc-avatar" style={{background:"#10b981"}}>JD</div><div className="hc-lines"><div/><div/></div><span className="hc-badge">Active</span></div>
            <div className="hc-row"><div className="hc-avatar" style={{background:"#8b5cf6"}}>AM</div><div className="hc-lines"><div/><div/></div><span className="hc-badge" style={{background:"#fef3c7",color:"#92400e"}}>Away</span></div>
            <div className="hc-chart">
              <div className="hc-bar" style={{height:"60%"}}/>
              <div className="hc-bar" style={{height:"80%"}}/>
              <div className="hc-bar" style={{height:"45%"}}/>
              <div className="hc-bar" style={{height:"90%"}}/>
              <div className="hc-bar" style={{height:"70%"}}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-sub">One platform to manage your entire academic ecosystem</p>
        <div className="features-grid">
          {[
            { icon: "👥", title: "Student Profiles", desc: "Detailed profiles with photos, contact info, and academic history." },
            { icon: "📚", title: "Course Management", desc: "Create and manage courses, assign students, and track enrollment." },
            { icon: "📊", title: "Analytics Dashboard", desc: "Real-time stats and insights about your student population." },
            { icon: "🔐", title: "Role-Based Access", desc: "Admin and staff roles with appropriate permissions." },
            { icon: "🔍", title: "Smart Search", desc: "Instantly find any student with powerful search and filters." },
            { icon: "📱", title: "Mobile Friendly", desc: "Access from any device with a fully responsive design." },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="landing-courses" id="courses">
        <h2 className="section-title">Popular Courses</h2>
        <p className="section-sub">Explore the courses available in our system</p>
        <div className="landing-courses-grid">
          {[
            { name: "Computer Science", students: 120, duration: "4 years", icon: "💻", color: "#f59e0b" },
            { name: "Psychology",       students: 85,  duration: "3 years", icon: "🧠", color: "#8b5cf6" },
            { name: "Mathematics",      students: 95,  duration: "4 years", icon: "📐", color: "#10b981" },
            { name: "Data Science",     students: 110, duration: "2 years", icon: "📊", color: "#06b6d4" },
            { name: "Business",         students: 75,  duration: "3 years", icon: "💼", color: "#f43f5e" },
            { name: "Engineering",      students: 130, duration: "4 years", icon: "⚙️", color: "#3b82f6" },
          ].map((c) => (
            <div className="lc-card" key={c.name}>
              <div className="lc-icon" style={{ background: c.color + "20", color: c.color }}>{c.icon}</div>
              <h3>{c.name}</h3>
              <div className="lc-meta">
                <span>👥 {c.students} students</span>
                <span>⏱ {c.duration}</span>
              </div>
              <button
                className="lc-enroll"
                onClick={() => handleEnroll(c.name)}
                style={{ borderColor: c.color, color: c.color }}
              >
                {user ? "Enroll Student →" : "Sign In to Enroll →"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-text">
            <h2>Get In Touch</h2>
            <p>Have questions? We'd love to hear from you.</p>
            <div className="contact-info">
              <div>📧 support@academia.edu</div>
              <div>📞 +1 (800) 123-4567</div>
              <div>📍 123 University Ave, Education City</div>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows={4} />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="landing-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Academia</span>
            </div>
            <p>Empowering educators with modern student management tools.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Information</h4>
              <a href="#home">About Us</a>
              <a href="#courses">Courses</a>
              <a href="#contact">Blog</a>
              <a href="#contact">Careers</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#contact">Help Center</a>
              <a href="#contact">Documentation</a>
              <a href="#contact">Contact Us</a>
              <a href="#contact">System Status</a>
            </div>
            <div className="footer-col">
              <h4>Policy</h4>
              <a href="#home">Privacy Policy</a>
              <a href="#home">Terms of Service</a>
              <a href="#home">Cookie Policy</a>
              <a href="#home">GDPR</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Academia. All rights reserved.</span>
          <div className="footer-socials">
            <a href="#home">Twitter</a>
            <a href="#home">LinkedIn</a>
            <a href="#home">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Enroll Modal — only shown when logged in */}
      {showModal && (
        <Modal onClose={() => { setShowModal(false); setSelectedCourse(null); }}>
          <StudentForm
            defaultCourse={selectedCourse}
            onSuccess={() => { setShowModal(false); setSelectedCourse(null); }}
          />
        </Modal>
      )}
    </div>
  );
};

export default LandingPage;