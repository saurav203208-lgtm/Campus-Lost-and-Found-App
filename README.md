# Campus Lost & Found App

A full-stack web application that helps college students report, search, claim, and return lost and found items on campus.

## Features

- Student Registration & Login
- JWT Authentication
- Secure Password Hashing
- Post Lost / Found Items
- Image Upload using Cloudinary
- Search and Filter Items
- Item Details Page
- Claim Lost/Found Items
- Mark Items as Returned
- User Dashboard
- My Posted Items
- My Claims
- Item Status Tracking
- Responsive Frontend

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer

### Cloud Services

- MongoDB Atlas
- Cloudinary

## Project Structure

```text
Campus-Lost-and-Found-App
│
├── backend
│   ├── config
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   └── itemController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Item.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── itemRoutes.js
│   │
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend
    ├── index.html
    ├── item.html
    ├── dashboard.html
    ├── style.css
    └── app.js
```

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/saurav203208-lgtm/Campus-Lost-and-Found-App.git
cd Campus-Lost-and-Found-App
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Never upload your real `.env` file or API secrets to GitHub.**

### 4. Start the Backend

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### 5. Start the Frontend

Open `frontend/index.html` using **VS Code Live Server**.

## Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Items

```text
GET  /api/items
GET  /api/items/:id
POST /api/items
PUT  /api/items/:id/claim
PUT  /api/items/:id/return
```

## Application Flow

```text
Register
   ↓
Login
   ↓
Post Lost / Found Item
   ↓
Search & Filter
   ↓
View Item Details
   ↓
Claim Item
   ↓
Mark Item as Returned
   ↓
Track from Dashboard
```

## Future Improvements

- Email notifications
- Campus map integration
- Admin panel
- Real-time notifications
- Advanced item matching
- Mobile application

## Author

**Saurav**

GitHub: https://github.com/saurav203208-lgtm

## License

This project is created for educational and college project purposes.
