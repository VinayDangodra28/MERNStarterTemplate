# Backend Template Modification Guide

## 1. Modify the Database Connection (`Models/db.js`):

- **Change the MongoDB connection string** in the `.env` file (already configured in your template).
  ```env
  MONGO_CONN=your-new-mongo-db-connection-url
  ```

## 2. Modify Models (`Models/User.js`):

- **Update User Schema** to match your application needs.
  - For example, if you want to add a `role` field, modify the schema like:
    ```js
    const UserSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true }  // New field added
    });
    ```
- No changes required if you're keeping just name, email, and password.

## 3. Modify Controllers (`Controllers/AuthController.js`):

- **Signup Logic:**
  - If you added more fields in the `User` model (like `role`), you’ll need to include them in the signup logic:
    ```js
    const { name, email, password, role } = req.body; // Updated
    const userModel = new UserModel({ name, email, password, role });
    ```
- **Login Logic:**
  - If you're adding role-based or permission logic, modify the `login` response:
    ```js
    res.status(200).json({
        message: "Login Success",
        success: true,
        jwtToken,
        email,
        name: user.name,
        role: user.role // Include role in the response if necessary
    });
    ```

## 4. Modify Routes (`Routes/AuthRouter.js`):

- **New Routes (Optional):**
  - If you want additional routes (e.g., `forgotPassword`), just add them:
    ```js
    router.post('/forgot-password', forgotPasswordController);  // New route for password recovery
    ```

## 5. Modify Middlewares (`Middlewares/Auth.js`):

- **Authorization Changes:**
  - If you added a `role` field and need role-based access, you can modify the `Auth.js` middleware to check the user’s role:
    ```js
    const ensureAuthenticated = (req, res, next) => {
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: 'Unauthorized, JWT token required' });
        }
        try {
            const decoded = jwt.verify(auth, process.env.JWT_SECRET);
            req.user = decoded;
            if (req.user.role !== 'admin') {  // Example of role check
                return res.status(403).json({ message: 'Access denied, insufficient permissions' });
            }
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
        }
    }
    ```

## 6. Modify Validation (`Middlewares/AuthValidation.js`):

- **Change Validation Rules:**
  - If you added extra fields like `role`, modify the Joi validation to reflect this:
    ```js
    const signupValidation = (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(100).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).max(100).required(),
            role: Joi.string().valid('admin', 'user').required()  // New validation for role
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Bad request", error });
        }
        next();
    }
    ```

## 7. Modify Product Routes (`Routes/ProductRouter.js`):

- **Protected Routes (Optional):**
  - If you want to customize the response or add new logic in the `ProductRouter` (e.g., adding dynamic products), modify the endpoint like this:
    ```js
    router.get('/', ensureAuthenticated, async (req, res) => {
        // Custom product query based on user role or other logic
        const products = await ProductModel.find();
        res.status(200).json(products);
    });
    ```

## 8. Modify `index.js` (Server Setup):

- **Additional Routes (Optional):**
  - If you added new routes (like `UserRouter`, `ProductRouter`, etc.), be sure to import and use them:
    ```js
    const UserRouter = require('./Routes/UserRouter'); // Import new routes
    app.use('/user', UserRouter); // New route for user-related actions
    ```

---

### Final Customization Notes:

- **For New Logic:**
  - Add new logic in controllers and routes.
  - Always ensure your validation and middleware match any changes in the models.
  - Test your modified routes using Postman or cURL to confirm everything works.
