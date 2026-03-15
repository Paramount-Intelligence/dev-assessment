# Intern Workflow Management System

A full stack MERN application designed to manage and track intern records through their lifecycle. The system provides a centralized interface to create, manage, update, and evaluate intern data while supporting search, filtering, and pagination for efficient data handling.

---

# Project Outcome

The application enables organizations to manage intern information through a structured workflow.

Key outcomes include:

- Centralized storage of intern records in a MongoDB database
- RESTful API for managing intern data
- Responsive frontend dashboard for interacting with intern records
- Full CRUD functionality including create, update, delete, and retrieve operations
- Efficient data navigation using search, filters, and pagination
- Input validation and error handling to ensure data integrity

---

# System Architecture

The project follows a standard MERN architecture.

Client Layer
React based frontend providing the user interface.

Application Layer
Node.js and Express server exposing RESTful APIs.

Data Layer
MongoDB database accessed through Mongoose models.
```
React (Frontend)
       │
       │ API Requests
       ▼
Node.js + Express (Backend API)
       │
       │ Mongoose ORM
       ▼
MongoDB Database
```

---

# Data Model

## Intern Collection

| Field | Type | Description |
|------|------|-------------|
| name | String | Intern full name (min 2 characters) |
| email | String | Unique email address |
| role | String | Intern role (Frontend, Backend, Fullstack) |
| status | String | Application status (Applied, Interviewing, Hired, Rejected) |
| score | Number | Evaluation score (0–100) |
| createdAt | Date | Record creation timestamp |
| updatedAt | Date | Record update timestamp |

---

# Backend Features

REST API built using Node.js and Express

### Endpoints

POST /api/interns
Create a new intern record

GET /api/interns
Retrieve all interns with pagination, search, and filters

GET /api/interns/:id
Retrieve a single intern

PATCH /api/interns/:id
Update an existing intern

DELETE /api/interns/:id
Delete an intern record

### Additional backend capabilities

- Request validation using Mongoose schema rules
- Centralized error handling middleware
- Proper HTTP status codes and error responses
- Pagination for large datasets
- Search by name or email
- Filter by role and status

---

# Frontend Features

React based user interface built with Vite.

## Intern Dashboard

- Display intern list in a structured table
- Search interns by name or email
- Filter interns by role and status
- Pagination for large datasets

## Intern Management

- Add new intern via form with validation
- Edit existing intern information via inline form
- Delete intern with confirmation dialog

## User Experience

- Form validation with error messages
- Loading indicators during API calls
- Error handling and display messages

---

# Technology Stack

## Frontend
- React (Vite)
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB (Local)
- Mongoose

## Development Tools
- Git
- GitHub
- Nodemon

---

# Installation Guide

Clone the repository
```bash
git clone https://github.com/huzaifa-1502/intern-workflow-management.git
```

Navigate to project directory
```bash
cd intern-workflow-management
```

Install backend dependencies
```bash
cd server
npm install
```

Install frontend dependencies
```bash
cd ../client
npm install
```

---

# Environment Configuration

Create a `.env` file in the server folder
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interndb
```

---

# Running the Application

Start backend server
```bash
cd server
npm run dev
```

Start frontend
```bash
cd client
npm run dev
```

Frontend will run on
```
http://localhost:5173
```

Backend API will run on
```
http://localhost:5000
```

---

# Project Structure
```
intern-workflow-management
│
├── server
│   ├── models
│   │   └── Intern.js
│   ├── routes
│   │   └── internRoutes.js
│   ├── controllers
│   │   └── internController.js
│   ├── .env
│   └── server.js
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── InternForm.jsx
│   │   │   └── InternList.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── vite.config.js
│
└── submissions
    └── SUBMISSION_TEMPLATE.md
```

---

# Author

Developed by Huzaifa Ahmed as part of a MERN stack engineering assessment demonstrating full stack CRUD system design and implementation.