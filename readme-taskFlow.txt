# 🚀 TaskFlow

TaskFlow is a scalable full-stack task management application designed to help users organize, track, and manage their daily workflows efficiently.

Built with modern web technologies and clean architecture principles.

---

## 🧠 Project Goal

To design and develop a production-ready task management system that demonstrates:

- Secure authentication
- RESTful API architecture
- Clean frontend structure
- Database relationships
- Scalable backend logic

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt (password hashing)

### Database
- MongoDB (Mongoose ODM)

### Tools
- Git & GitHub
- Postman
- VS Code

---

## ✨ Core Features (MVP)

### 👤 Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes
- Password hashing

### 📝 Task Management
- Create task
- Update task
- Delete task
- Mark task as completed
- Set priority (Low / Medium / High)
- Set due date

### 🔎 Filtering & Search
- Filter by status (Completed / Pending)
- Filter by priority
- Search by title

### 📊 Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Progress percentage

---

## 🏗 System Architecture

### Backend Structure

```
server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.js
└── server.js
```

### Frontend Structure

```
client/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── pages/
│   ├── services/
│   └── utils/
```

---

## 🗄 Database Design

### User Model

- _id
- name
- email (unique)
- password (hashed)
- createdAt

### Task Model

- _id
- title
- description
- status (pending/completed)
- priority (low/medium/high)
- dueDate
- user (ObjectId reference to User)
- createdAt

Relationship:
One User → Many Tasks

---

## 🔐 API Endpoints

### Auth Routes

POST   /api/auth/register  
POST   /api/auth/login  

### Task Routes (Protected)

GET    /api/tasks  
POST   /api/tasks  
PUT    /api/tasks/:id  
DELETE /api/tasks/:id  
PATCH  /api/tasks/:id/complete  

---

## 🚀 Installation

### Clone repository

```
git clone git@github.com:abdellah-lasda/taskflow.git
```

---

### Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run server:

```
npm run dev
```

---

### Frontend Setup

```
cd client
npm install
npm start
```

---

## 📈 Future Improvements (Advanced Level)

- Drag & drop task board (Kanban style)
- Email notifications
- User profile management
- Dark mode
- Deployment (Render + Vercel)
- Docker containerization
- Role-based access (Admin/User)
- Unit testing with Jest

---

## 🎯 What This Project Demonstrates

- Full-stack development
- Authentication flow
- REST API design
- Database relationships
- State management
- Clean folder architecture

---

## 📫 Author

Abdellah Lasda  
Full-Stack Web Developer  
Marrakech, Morocco