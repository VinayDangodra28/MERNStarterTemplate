# API Documentation and Code Structure

## Code Structure

The project is organized into the following directories and files:

### 1. **Controllers**

Contains logic for handling business functionality:

* `AuthController.js`: Manages authentication (signup and login).

### 2. **Middlewares**

Reusable middleware logic:

* `Auth.js`: Middleware to verify JWT authentication.
* `AuthValidation.js`: Middleware for validating request payloads using Joi.

### 3. **Models**

Defines database schemas and connections:

* `db.js`: Configures and establishes the MongoDB connection.
* `User.js`: Defines the User schema and exports the User model.

### 4. **Routes**

Defines API endpoints:

* `AuthRouter.js`: Routes for authentication.
* `ProductRouter.js`: Routes for products (requires authentication).

### 5. **index.js**

The main entry point for the application, where routes and middleware are registered.

---

## API Endpoints

### 1. Authentication Routes (`/auth`)

 **Base Path** : `/auth`

#### **POST** `/signup`

Registers a new user.

* **Request Body** :

```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
```

* **Validation** : Validates name, email, and password using `AuthValidation.js`.
* **Response** :
* `201`: Signup successful.
* `409`: User already exists.
* `500`: Internal server error.

#### **POST** `/login`

Logs in a user.

* **Request Body** :

```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
```

* **Validation** : Validates email and password using `AuthValidation.js`.
* **Response** :
* `200`: Login successful, returns JWT token.
* `403`: Authentication failed (wrong email or password).
* `500`: Internal server error.

---

### 2. Product Routes (`/products`)

 **Base Path** : `/products`

#### **GET** `/`

Fetches a list of products (protected route).

* **Headers** :

```json
  {
    "Authorization": "<JWT Token>"
  }
```

* **Response** :
* `200`: Returns a list of products.
* `403`: Unauthorized (JWT missing or invalid).

---

### 3. Health Check (`/ping`)

#### **GET** `/ping`

Simple endpoint to check if the server is running.

* **Response** :
* `200`: Returns "PONG".

---

## Middleware

### 1. **Auth.js**

Verifies the JWT token from the `Authorization` header.

### 2. **AuthValidation.js**

Validates request payloads for signup and login using Joi schemas.

---

## Models

### 1. **User.js**

Defines the User schema with the following fields:

* `name`: String (required).
* `email`: String (required, unique).
* `password`: String (required).

### 2. **db.js**

Connects to the MongoDB database using `MONGO_CONN` from the `.env` file.

---

## How to Use in Other Projects

1. Copy the folder structure (`Controllers`, `Middlewares`, `Models`, `Routes`) and `index.js` to your project.
2. Install the required dependencies:
   ```bash
   npm install express body-parser cors mongoose bcrypt jsonwebtoken joi dotenv
   ```
3. Add a `.env` file with the following variables:
   ```
   MONGO_CONN=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=8080
   ```
4. Start the server:
   ```bash
   node index.js
   ```
5. Integrate the endpoints as needed in your project.
