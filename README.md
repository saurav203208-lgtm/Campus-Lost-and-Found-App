# Campus Lost & Found App

A full-stack web application that helps students report lost items, post found items, and connect with the person who may have found or lost an item.

## 🌐 Live Demo

Frontend:
https://campus-lost-and-found-app-frontend.vercel.app/

Backend API:
https://campus-lost-and-found-app-1.onrender.com/

## ✨ Features

- User Registration and Login
- JWT Authentication
- Post Lost Items
- Post Found Items
- Upload Item Images
- Cloudinary Image Storage
- GPS Location Support
- Item Categories
- Lost / Found Filters
- Active / Claimed / Returned Status
- Claim Lost or Found Items
- Owner-controlled Return System
- Item Details Page
- Dashboard
- Responsive User Interface

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- bcryptjs

### Image Upload
- Cloudinary
- Multer

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## 🔄 How It Works

1. User creates an account.
2. User logs in.
3. User posts a lost or found item.
4. Item information and image are stored.
5. Other users can browse and filter items.
6. A user can claim an active item.
7. The item owner can mark the claimed item as returned.
8. The item status changes from `active` → `claimed` → `returned`.

## 📂 Project Structure

```text
Campus-Lost-and-Found-App
│
├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── index.html
    ├── item.html
    ├── dashboard.html
    ├── app.js
    └── style.css
## 🔐 Security

- Passwords are hashed using bcryptjs.
- Authentication is handled using JWT.
- Protected API routes require authentication.

## 🎯 Project Purpose

The purpose of this project is to provide a digital platform for college students to report lost items, post found items, and help recover belongings within the campus.

## 🚀 Future Improvements

- Email notifications
- Search by item name
- Admin dashboard
- User profile management
- Claim approval workflow
- Real-time notifications
- Improved mobile UI

## 👨‍💻 Developer

**Saurav**

GitHub:  
https://github.com/saurav203208-lgtm

---

© 2026 Campus Lost & Found App
