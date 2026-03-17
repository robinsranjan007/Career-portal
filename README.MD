# 🏢 Job Portal — MERN Stack

> **Project 2 of 5** in my Full Stack Developer Placement Journey

---

## 🎯 About This Project

I am a Master's student in Information Systems at Northeastern University, actively building toward a software engineering role by 2026. This Job Portal is the **second project** in my structured 5-project MERN stack roadmap — designed to go from beginner to job-ready, one project at a time.

Each project is intentionally chosen to cover specific industry-relevant topics. I'm not following tutorials — I'm building these projects from scratch, making mistakes, debugging, and learning through doing.

---

## 🗺️ My 5-Project Placement Journey

| # | Project | Status | Focus |
|---|---------|--------|-------|
| 1 | MERN Blog | ✅ Completed | Auth, Redux, REST APIs, JWT |
| 2 | **Job Portal** | ✅ Completed | Search, Pagination, File Uploads, Refresh Tokens |
| 3 | E-Commerce | ⬜ Upcoming | Cart, Stripe, Orders, Modals |
| 4 | LMS | ⬜ Upcoming | Video Uploads, Subscriptions, Progress Tracking |
| 5 | Doctor Appointment | ⬜ Upcoming | Scheduling, Notifications |

---

## 🆕 New Topics in This Project

**Backend:** Refresh tokens, Multer, Cloudinary, Pagination, Search + Filter + Sort, Rate limiting, Owner checks, Stats endpoint

**Frontend:** React Hook Form, Redux Thunks, Pagination UI, Confirm Delete Modal, Toast notifications (react-hot-toast), Spinner component, Role-based routing

**General:** Railway + Vercel deployment, Cloudinary file management, MERN best practices

---

## 👥 User Roles

| Role | Permissions |
|------|------------|
| **Seeker** | Browse jobs, apply (resume required), manage profile, upload photo + resume, track applications |
| **Employer** | Create company, post jobs, manage listings, view applicants, update application status, view seeker profiles |
| **Admin** | Manage all users and jobs |

---

## 🔧 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer, Cloudinary, express-rate-limit

**Frontend:** React (Vite), Redux Toolkit, React Router, Axios, React Hook Form, Tailwind CSS, shadcn/ui, react-hot-toast, lucide-react

---

## ✨ Key Features

- 🔐 JWT Auth with refresh token rotation
- 👤 Role-based access control (Seeker / Employer / Admin)
- 📄 Resume upload + PDF delivery via Cloudinary
- 🖼️ Profile photo upload via Cloudinary
- 🔍 Search + Filter + Sort + Pagination on jobs
- 🏢 Company management (create/edit) per employer
- 📋 Application tracking with status updates
- 🔒 Owner checks on all update/delete operations
- ⚡ Rate limiting on all API routes
- 🎨 Modern SaaS UI with teal/green design system

---

## 🔌 API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| POST | `/api/v1/auth/logout` | Private |
| POST | `/api/v1/auth/refresh` | Private |
| GET | `/api/v1/auth/me` | Private |

### Jobs
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/v1/job` | Public |
| GET | `/api/v1/job/:jobId` | Public |
| GET | `/api/v1/job/my-jobs` | Employer |
| POST | `/api/v1/job` | Employer |
| PUT | `/api/v1/job/:jobId` | Employer |
| DELETE | `/api/v1/job/:jobId` | Employer |

### Applications
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/v1/application/:jobId` | Seeker |
| GET | `/api/v1/application` | Seeker |
| GET | `/api/v1/application/:jobId` | Employer |
| PUT | `/api/v1/application/:applicationId` | Employer |
| DELETE | `/api/v1/application/:applicationId` | Seeker |

### Company
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/v1/company` | Public |
| GET | `/api/v1/company/my-company` | Employer |
| GET | `/api/v1/company/:companyId` | Public |
| POST | `/api/v1/company` | Employer |
| PUT | `/api/v1/company/:companyId` | Employer |
| DELETE | `/api/v1/company/:companyId` | Employer |

### Profile
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/v1/profile/me` | Seeker |
| GET | `/api/v1/profile/:profileId` | Private |
| POST | `/api/v1/profile` | Seeker |
| PUT | `/api/v1/profile/:profileId` | Seeker |
| PUT | `/api/v1/profile/:profileId/photo` | Seeker |
| PUT | `/api/v1/profile/:profileId/resume` | Seeker |
| DELETE | `/api/v1/profile/:profileId` | Seeker |

### Stats
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/v1/stats` | Public |

---

## 🚀 Getting Started

\```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
\```

### server/.env.example
\```
PORT=
CLIENT_URL=
MONGO_URI=
SECRET_ACCESSTOKEN_KEY=
SECRET_REFRESHTOKEN_KEY=
NODE_ENV=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
\```

### client/.env.example
\```
VITE_API_URL=
\```

---

*Built with persistence, chai, and a lot of debugging* ☕