# 🎓 Academia — Student Management System

A full-stack student management platform built with **React + Vite** on the frontend and **Express + MongoDB** on the backend. Manage students, courses, enrollments, and user accounts with a clean, responsive UI.

---

## 📸 Preview

| Courses Page | Student List |
|---|---|
| All 20 courses with live enrollment counts | Paginated table & grid view with search/filter |

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Axios | 1.x | HTTP client |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥ 20 | Runtime |
| Express | 5 | Web framework |
| MongoDB | — | Database |
| Mongoose | 9 | ODM |
| JWT | 9 | Authentication |
| bcryptjs | 2 | Password hashing |
| Multer | 2 | Avatar/file uploads |
| express-validator | 7 | Input validation |

---

## 📁 Project Structure

```
academia/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, login, getMe
│   │   └── studentController.js  # CRUD + pagination + search
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT protect + restrictTo
│   │   ├── errorMiddleware.js    # Global error handler
│   │   ├── uploadMiddleware.js   # Multer avatar upload
│   │   └── validateMiddleware.js # express-validator rules
│   ├── models/
│   │   ├── student.js            # Student schema
│   │   └── user.js               # User schema (admin/staff)
│   ├── routes/
│   │   ├── authRoutes.js         # /auth/*
│   │   └── studentRoutes.js      # /students/*
│   ├── uploads/profiles/         # Uploaded avatar images
│   ├── seed.js                   # Seed admin + staff users
│   ├── server.js                 # Express app entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── AvatarUpload.jsx   # Drag & drop photo upload
    │   │   ├── DashHeader.jsx     # Sticky nav + logout modal
    │   │   ├── Modal.jsx          # Reusable modal wrapper
    │   │   ├── Pagination.jsx     # Page controls
    │   │   ├── ProtectedRoute.jsx # Auth guard
    │   │   ├── StudentForm.jsx    # Enroll new student
    │   │   └── StudentList.jsx    # Table + grid view
    │   ├── context/
    │   │   ├── AuthContext.jsx    # JWT session management
    │   │   └── StudentContext.jsx # Global student state + counts
    │   ├── pages/
    │   │   ├── AuthPage.jsx       # Login / Register
    │   │   ├── CoursesPage.jsx    # 20 courses with enroll counts
    │   │   ├── EditStudent.jsx    # Edit student form
    │   │   ├── Home.jsx           # Dashboard with stats
    │   │   ├── LandingPage.jsx    # Public marketing page
    │   │   └── StudentsPage.jsx   # Full student list
    │   ├── routes/
    │   │   └── AppRoutes.jsx      # Route definitions
    │   ├── services/
    │   │   └── studentService.js  # Axios API calls
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css              # All custom styles + CSS vars
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js **v20+**
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/academia.git
cd academia
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGO_URL=mongodb://localhost:27017/academia
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
PORT=5000
```

> For MongoDB Atlas, replace `MONGO_URL` with your connection string:
> `mongodb+srv://<user>:<password>@cluster.mongodb.net/academia`

**Seed the database** (creates admin + staff accounts):

```bash
npm run seed
```

**Start the backend server:**

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Backend runs on **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

The frontend points to the live deployed backend by default. To use your local backend, update the base URL in these files:

**`src/context/AuthContext.jsx`** — line 6:
```js
const BASE = "http://localhost:5000";
```

**`src/services/studentService.js`** — line 3:
```js
const API = "http://localhost:5000/students";
```

**`src/components/AvatarUpload.jsx`** and **`src/components/StudentList.jsx`**:
```js
const AVATAR_URL = "http://localhost:5000/uploads/profiles/";
```

**Start the frontend dev server:**

```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🔐 Default Accounts (via Seed)

After running `npm run seed`:

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@academia.com | `Admin@Academia2025!` |
| **Staff** | staff@academia.com | `Staff@Academia2025!` |

> New accounts created via the Register form default to the **staff** role.

---

## 📝 Sample Register Accounts

Use these ready-made credentials to test the **Register** form (`/login` → Register tab).
All self-registered accounts receive the **staff** role automatically.

---
### 👨‍🔬 Account 1 — Science Faculty
```
Full Name:        Marcus Thorne
Email:            m.thorne@academia.edu
Password:         Thorne#2025
Confirm Password: Thorne#2025
```
## 🔑 Permissions

| Action | Admin | Staff |
|---|---|---|
| View students | ✅ | ✅ |
| Enroll student | ✅ | ✅ |
| Edit student | ✅ | ✅ |
| Delete student | ✅ | ❌ |
| View courses | ✅ | ✅ |
| View dashboard | ✅ | ✅ |

---

## 🌐 API Reference

### Auth

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Create new account | No |
| POST | `/auth/login` | Login, returns JWT | No |
| GET | `/auth/me` | Get current user | Yes |

### Students

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/students` | List with pagination, search, filter | Yes |
| POST | `/students` | Create student (supports avatar upload) | Yes |
| GET | `/students/:id` | Get single student | Yes |
| PUT | `/students/:id` | Update student | Yes |
| DELETE | `/students/:id` | Delete student | Admin only |

**Query parameters for `GET /students`:**

| Param | Type | Example | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Results per page (max 100) |
| `search` | string | `john` | Search name, email, course |
| `course` | string | `Mathematics` | Filter by course |

---

## 📚 Available Courses

The system includes 20 built-in courses:

Computer Science · Mathematics · Physics · Chemistry · Biology · Engineering · Business · Economics · Psychology · Design · Literature · History · Data Science · Medicine · Law · Architecture · Environmental Science · Sociology · Philosophy · Art & Music

---

## 🗂️ Features

- **Authentication** — JWT-based login/register with session persistence
- **Role-based access** — Admin vs Staff permissions
- **Student CRUD** — Create, read, update, delete with validation
- **Avatar upload** — Drag & drop profile photo (JPEG/PNG/WEBP/GIF, max 3MB)
- **Course management** — 20 courses with live enrollment counts
- **Search & filter** — Real-time search by name/email/course + course dropdown
- **Pagination** — Server-side pagination with smart page controls
- **Table & grid view** — Toggle between layouts
- **Responsive design** — Works on mobile, tablet, and desktop
- **Smooth loading** — Skeleton shimmer states, no flash of zero counts

---

## 🚢 Deployment

### Backend — Render / Railway

1. Push your `backend/` folder to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set environment variables (`MONGO_URL`, `JWT_SECRET`, `PORT`)
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend — Vercel

1. Push your `frontend/` folder to GitHub
2. Import to [Vercel](https://vercel.com)
3. Framework preset: **Vite**
4. The `vercel.json` rewrite rule is already included for SPA routing

> After deploying the backend, update the API base URLs in the frontend to point to your live backend URL.

---

## 🛠️ Scripts

### Backend
```bash
npm run dev     # Start with nodemon (hot reload)
npm start       # Start production server
npm run seed    # Seed admin + staff users
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

Built with ❤️ for managing academic institutions efficiently.

> For support or questions, reach out at **support@academia.edu**
