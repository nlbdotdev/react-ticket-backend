# React Ticket Backend

A robust Node.js/Express.js backend API for a ticket management system with user authentication and task management capabilities.

> **🚀 Recently Updated for Vercel Serverless Deployment**
> 
> This repository has been optimized for deployment on Vercel's serverless platform. If you want to run the Express app locally without serverless optimizations, please use the `express` branch instead.

## 🔗 Related Projects

- [React Ticket Frontend](https://github.com/your-username/react-ticket-frontend) - The frontend React application


## 🔗 Related Projects

- [React Ticket Frontend](https://github.com/your-username/react-ticket-frontend) - The frontend React application 

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Task Management**: CRUD operations for ticket/task management
- **Data Validation**: Comprehensive input validation and error handling
- **MongoDB Integration**: Mongoose ODM for database operations
- **CORS Support**: Cross-origin resource sharing enabled
- **Security**: Password hashing with bcrypt, JWT token validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-ticket-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ticket-system
   SECRET_KEY=your-secret-key-here
   JWT_LIFETIME=24h
   PORT=3001
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3001` (or the port specified in your environment variables).

## 🏗️ Project Structure

```
react-ticket-backend/
├── bin/
│   └── www                 # Server entry point
├── routes/
│   ├── index.js            # Main router
│   ├── lib/
│   │   └── validationMiddleware/
│   │       ├── checkIsEmpty.js
│   │       ├── confirmPassword.js
│   │       ├── index.js
│   │       ├── jwtMiddleware.js
│   │       ├── validateEmail.js
│   │       └── validateUserData.js
│   ├── tasks/
│   │   ├── controller/
│   │   │   └── taskController.js
│   │   ├── model/
│   │   │   └── Task.js
│   │   └── tasksRouter.js
│   └── users/
│       ├── controller/
│       │   └── usersController.js
│       ├── model/
│       │   └── User.js
│       ├── usersRouter.js
│       └── utils/
│           ├── userErrorHandler.js
│           └── userFunctions.js
├── views/                  # EJS templates
├── app.js                  # Express app configuration
├── package.json
└── README.md
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints

#### Register User
- **POST** `/users/create-user`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login User
- **POST** `/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns JWT token

#### Get Current User
- **GET** `/users/user`
- **Headers:** `Authorization: Bearer <jwt-token>`

#### Update User Profile
- **PUT** `/users/update-profile`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Smith",
    "username": "johnsmith",
    "email": "john@example.com",
    "password": "newpassword123"
  }
  ```

### Task Management Endpoints

#### Get All Tasks
- **GET** `/tasks/get-all-tasks`
- **Response:** Array of all tasks

#### Create Task
- **POST** `/tasks/create-task`
- **Body:**
  ```json
  {
    "title": "Bug Fix",
    "desc": "Fix the login issue",
    "status": "open",
    "severity": "high",
    "time_created": "2024-01-01T00:00:00.000Z",
    "time_updated": "2024-01-01T00:00:00.000Z"
  }
  ```

#### Update Task
- **PUT** `/tasks/update-task`
- **Body:**
  ```json
  {
    "id": "task-id-here",
    "title": "Updated Bug Fix",
    "desc": "Updated description",
    "status": "in-progress",
    "severity": "medium"
  }
  ```

## 🗄️ Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  postHistory: [ObjectId],
  commentHistory: [ObjectId],
  timestamps: true
}
```

### Task Model
```javascript
{
  uid: Number,
  title: String,
  desc: String,
  status: String,
  severity: String,
  time_created: Date,
  time_updated: Date
}
```

## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Authentication**: JSON Web Tokens for stateless authentication
- **Input Validation**: Comprehensive validation middleware
- **Error Handling**: Centralized error handling with user-friendly messages
- **CORS**: Cross-origin resource sharing enabled for frontend integration

## 🧪 Validation Middleware

The application includes several validation middleware functions:

- `checkIsEmpty`: Validates that required fields are not empty
- `validateEmail`: Ensures email format is valid
- `validateUserData`: Validates user input data
- `confirmPassword`: Confirms password matches for updates
- `jwtMiddleware`: Validates JWT tokens for protected routes

## 🚀 Development

### Running in Development Mode
```bash
npm start
```

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `SECRET_KEY`: Secret key for JWT token signing
- `JWT_LIFETIME`: JWT token expiration time
- `PORT`: Server port (default: 3001)

## 📦 Dependencies

### Core Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **validator**: Input validation
- **morgan**: HTTP request logger

### Development Dependencies
- **debug**: Debug logging
- **http-errors**: HTTP error handling
- **cookie-parser**: Cookie parsing middleware

