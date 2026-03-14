# Intern Tracker — MERN Stack App

A full-stack intern management system built with MongoDB, Express, React, and Node.js.

## Features

- ✅ Create, read, update, delete intern records
- ✅ Search by name or email
- ✅ Filter by role (Frontend / Backend / Fullstack) and status (Applied / Interviewing / Hired / Rejected)
- ✅ Pagination (10 records per page)
- ✅ Modal forms for add and edit
- ✅ Delete confirmation dialog
- ✅ Loading indicators and error messages
- ✅ Centralized error handling (validation, duplicate email, invalid ID)

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

### 1. Clone the repo
```bash
git clone https://github.com/baghirajput/intern-workflow-management.git
cd intern-workflow-management
```

### 2. Configure backend
```bash
cd server
cp .env.example .env
# Edit .env and add your MongoDB connection string
npm install
npm run dev
```

### 3. Start frontend
```bash
cd ../client
npm install
npm start
```

### 4. Open the app
Frontend: http://localhost:3000  
Backend API: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/interns | Create intern |
| GET | /api/interns | List with search, filter, pagination |
| GET | /api/interns/:id | Get single intern |
| PATCH | /api/interns/:id | Update intern |
| DELETE | /api/interns/:id | Delete intern |

### Query Parameters for GET /api/interns
- `search` — search by name or email
- `role` — filter by role (Frontend, Backend, Fullstack)
- `status` — filter by status (Applied, Interviewing, Hired, Rejected)
- `page` — page number (default: 1)
- `limit` — records per page (default: 10)

## Project Structure

```
intern-tracker/
├── server/
│   ├── config/db.js
│   ├── models/Intern.js
│   ├── controllers/internController.js
│   ├── routes/internRoutes.js
│   ├── middleware/errorHandler.js
│   ├── server.js
│   └── .env.example
└── client/
    ├── public/index.html
    └── src/
        ├── components/
        │   ├── InternTable.js
        │   ├── InternForm.js
        │   ├── Filters.js
        │   ├── Pagination.js
        │   └── Modal.js
        ├── services/api.js
        ├── App.js
        └── App.css
```

## Author
Dileep Singh — baghirajput2326@gmail.com
