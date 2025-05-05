

# 📝 Task Management System

A full-stack web app for managing tasks with authentication, CRUD operations, filtering, and team collaboration features.

Live Demo:

🔗 **Client**: [https://maheswar.co.in](https://maheswar.co.in)

🔗 **API**: [https://api.maheswar.co.in](https://api.maheswar.co.in)

---

## ⚙️ Tech Stack

| Layer    | Technology                      |
| -------- | ------------------------------- |
| Frontend | Next.js, TailwindCSS, ShadCN UI |
| Backend  | Node.js, Express                |
| Database | MongoDB                         |
| Auth     | JWT                             |
| Alerts   | SweetAlert2, Toasts             |

---

## 🚀 Local Setup Instructions

### 1. Clone Repositories

```bash
# Frontend
git clone https://github.com/maheswarbehera/task-management-nextjs.git
cd task-management-nextjs

# Backend
git clone https://github.com/maheswarbehera/task-management-api.git
cd task-management-api
```

---

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 3. Add Environment Variables

#### 🔐 Backend `.env`

Create `.env` in the backend root and add:

```env
BASE_URL=/api
API_VERSION=v1

HOST=localhost
PORT=8080
CORS_ORIGIN=http://localhost:3000

ACCESS_TOKEN_SECRET=your_strong_secret_key
ACCESS_TOKEN_EXPIRY=1d

DB_NAME=task_management
MONGO_DB_URI=mongodb://localhost:27017

# Optional for production
# MONGO_DB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/task_management

EMAIL_SERVICE=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

#### 🌐 Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

---

### 4. Run the App

```bash
# Backend
cd task-management-api
npm run dev

# Frontend
cd task-management-nextjs
npm run dev
```

---

## ✅ Features

* 🔐 User Authentication
* 📝 Task Create / Read / Update / Delete
* 👥 Assign Tasks to Users
* 🔔 Email Notifications (on assignment)
* 🔍 Search and API-based Filtering:

  * By Status
  * By Priority
  * By Due Date
* 📱 Responsive UI
* 🎨 Modals and Alerts using ShadCN & SweetAlert2

---

## 💡 Design & Approach

* **Modular Service Layer** for task/user logic (frontend & backend).
* **Protected Routes** using custom `useProtectedRoute` hook.
* **API-Driven Filters** using query strings for scalability.
* **Dynamic Task Modals** for create/edit/view operations.
* **Flexible Email Service** using SMTP via Gmail or similar.

---

## 📌 Assumptions & Trade-offs

**Assumptions:**

* Each task has a single assignee.
* JWT stored in localStorage.
* Task creator and assignee must be registered users.

**Trade-offs:**

* No pagination yet (can affect performance at scale).
* No role-based access control (admin/user).
* Basic form validation only.

---

## 🛠️ Possible Improvements

* Pagination & Sorting
* Role-Based Permissions
* Realtime updates with WebSockets
* Mobile-first responsive layout
* Full test suite (unit + integration)

---

