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
| 2 | **Job Portal** | 🔄 In Progress | Search, Pagination, File Uploads, Refresh Tokens |
| 3 | E-Commerce | ⬜ Upcoming | React Query, Stripe, Socket.io |
| 4 | LMS | ⬜ Upcoming | Video Uploads, Subscriptions, Testing |
| 5 | SaaS | ⬜ Upcoming | Docker, Kafka, CI/CD, OAuth2 |

---

## 🆕 New Topics in This Project

**Backend:** Refresh tokens, Multer, Cloudinary, Pagination, Search + Filter + Sort, Rate limiting, Zod validation

**Frontend:** React Hook Form, Custom hooks, Redux Thunks, Debouncing, Pagination UI, Popup Modals, Toast notifications, Lazy loading

**General:** Railway + Vercel deployment, System design concepts

---

## 👥 User Roles

| Role | Permissions |
|------|------------|
| **Seeker** | Browse jobs, apply, manage profile, track applications |
| **Employer** | Post jobs, manage listings, view applicants, update status |
| **Admin** | Manage all users and jobs |

---

## 🔧 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer, Cloudinary

**Frontend:** React (Vite), Redux Toolkit, React Router, Axios, React Hook Form, Tailwind CSS, shadcn/ui

---

## 🔌 API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| POST | `/api/v1/auth/logout` | Private |
| POST | `/api/v1/auth/refresh` | Private |

### Jobs
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/v1/job` | Public |
| GET | `/api/v1/job/:jobId` | Public |
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
| GET | `/api/v1/company/:companyId` | Public |
| POST | `/api/v1/company` | Employer |
| PUT | `/api/v1/company/:companyId` | Employer |
| DELETE | `/api/v1/company/:companyId` | Employer |

### Profile
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/v1/profile/:profileId` | Private |
| POST | `/api/v1/profile` | Seeker |
| PUT | `/api/v1/profile/:profileId` | Seeker |
| DELETE | `/api/v1/profile/:profileId` | Seeker |

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
\```

---

*Built with persistence, chai, and a lot of debugging* ☕