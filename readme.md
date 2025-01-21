
# MERN Starter Template

This project is a starter template for building web applications using the **MERN stack** (MongoDB, Express, React, and Node.js). It includes both the frontend and backend, with basic authentication and product listing functionality.

---

## Project Structure

### 1. Frontend (`/client`)

The frontend is built using React and includes the following features:

* **Authentication** : Signup and login with JWT-based authentication.
* **Product Listing** : Protected route to display products after login.
* **Responsive Design** : Styled with CSS modules.

#### Frontend Directory Structure:

```
client/
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable React components
│   ├── context/             # Context for global state (e.g., AuthContext)
│   ├── pages/               # Page components (e.g., Login, Signup, Products)
│   ├── styles/              # CSS modules for styling
│   ├── utils/               # Utility functions and Axios instance
│   ├── App.js               # Main app entry point
│   └── index.js             # React DOM rendering
```

#### Frontend Setup:

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

### 2. Backend (`/server`)

The backend is built using Node.js, Express, and MongoDB. It includes:

* **Authentication** : Signup and login routes with JWT authentication.
* **Protected Routes** : Middleware to secure product endpoints.
* **MongoDB Integration** : Database connection using Mongoose.

#### Backend Directory Structure:

```
server/
├── controllers/            # Business logic (e.g., AuthController)
├── middlewares/            # Reusable middleware (e.g., Auth.js)
├── models/                 # Mongoose schemas (e.g., User.js)
├── routes/                 # API route definitions (e.g., AuthRouter.js)
├── index.js                # Main server entry point
└── .env                    # Environment variables
```

#### Backend Setup:

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGO_CONN=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=8080
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## API Documentation

### **Authentication Endpoints (`/auth`)**

#### **POST** `/auth/signup`

Registers a new user.

* **Request Body** :

```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
```

* **Response** :
* `201`: Signup successful.
* `409`: User already exists.
* `500`: Internal server error.

#### **POST** `/auth/login`

Logs in a user and returns a JWT token.

* **Request Body** :

```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
```

* **Response** :
* `200`: Login successful, returns JWT token.
* `403`: Invalid credentials.
* `500`: Internal server error.

---

### **Product Endpoints (`/products`)**

#### **GET** `/products`

Fetches a list of products (protected route).

* **Headers** :

```json
  {
    "Authorization": "<JWT Token>"
  }
```

* **Response** :
* `200`: Returns a list of products.
* `403`: Unauthorized (missing or invalid JWT).

---

## How to Run the Full Stack

1. **Install Dependencies** :

* Frontend: Navigate to `/client` and run `npm install`.
* Backend: Navigate to `/server` and run `npm install`.

1. **Start the Frontend and Backend** :

* Start the backend: Run `npm start` in the `/server` directory.
* Start the frontend: Run `npm start` in the `/client` directory.

1. **Environment Variables** :

* Backend: Add the `.env` file with the required environment variables.
* Frontend: Update the base URL in the Axios instance (`/client/src/utils/axiosInstance.js`) if needed.

1. **Access the App** :

* Open the app in your browser at [http://localhost:3000](http://localhost:3000/).

---

## Features

### Frontend:

* JWT-based authentication.
* Responsive design with CSS modules.
* Protected routes for product listing.

### Backend:

* Secure authentication with bcrypt and JWT.
* MongoDB integration using Mongoose.
* Structured and modular code for scalability.

---

## Future Improvements

* Add role-based access control (RBAC).
* Implement a UI design system for consistent styling.
* Expand API endpoints for CRUD operations on products.
* Add testing with tools like Jest and Postman.

---

## Technologies Used

* **Frontend** : React, React Router, Axios, CSS Modules.
* **Backend** : Node.js, Express, Mongoose, bcrypt, JWT, Joi.
* **Database** : MongoDB.

---

## How to Use in Other Projects

1. Clone this repository and remove unnecessary components.
2. Customize the routes, components, and database schema as needed.
3. Use this as a boilerplate for your MERN stack projects.

---

This template provides a great starting point for building scalable and maintainable MERN stack applications. 🚀
