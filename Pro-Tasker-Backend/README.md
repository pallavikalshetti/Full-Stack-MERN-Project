## Backend README
## Pro-Tasker Backend
The backend of Pro-Tasker serves as the core API that powers the project management system. Built using Node.js, Express, and MongoDB, the backend handles user authentication, project creation, and task management. It ensures a secure and scalable architecture, focusing on RESTful design and strict authorization mechanisms to protect user data.

The backend is designed for scalability, making it suitable for small teams and capable of handling growing data requirements as users collaborate and manage more projects.

## Table of Contents:

-Technologies
-Setup & Installation
-API Endpoints
-Environment Variables
-Authentication
-Running the Application
-Testing
-Deployment
-Features
-Author

## Technologies:
-Node.js
-Express
-MongoDB (via Mongoose)
-JWT Authentication (for authentication)
-dotenv
-bcryptjs for Password Hashing
-CORS for security

# Repository Link:
# GitHub Repository: Pro-Tasker Backend
# Live Demo on Render: Pro-Tasker Backend (Render)

## Setup & Installation
Clone the repository:
git clone https://github.com/yourusername/pro-tasker-backend.git
cd pro-tasker-backend

# Install dependencies:
npm install

# Create a .env file in the root directory with the following environment variables:
MONGO_URI=mongodb://your-mongo-uri          // MONGO_URI: MongoDB connection string.
JWT_SECRET=your-secret-key                  //JWT_SECRET: Secret key used to sign JWT tokens.
PORT=3000                                   //PORT: Port to run the server on (default 3000). 
                                               
                            
# Run the development server:
npm run dev
The server will run on http://localhost:3000

## API Endpoints
User Authentication
POST /api/auth/register  - Register a new user
POST /api/auth/login   - Login and receive a JWT token
Projects
GET /api/projects  -  Get all projects created by the logged-in user
POST /api/projects  -  Create a new project
GET /api/projects/:id  -  Get details of a specific project
PUT /api/projects/:id  -  Update a project
DELETE /api/projects/:id  -  Delete a project
Tasks
POST /api/projects/:projectId/tasks  -  Create a new task within a project
GET /api/projects/:projectId/tasks  -  Get all tasks in a project
PUT /api/tasks/:id  -  Update a task
DELETE /api/tasks/:id  -  Delete a task


# Authentication
JWT Authentication is used to protect routes that require user login. The token is passed in the Authorization header as Bearer <token> for protected API endpoints.
To test endpoints requiring authentication, add the JWT token to the Authorization header of your API requests.
Password Security: All passwords are hashed using bcrypt before being stored in MongoDB.
Ownership-based Authorization:
Users can only access or modify their own projects and tasks.
Middleware checks token and ownership on every protected route.
# Authorization: Bearer <your_token_here>


# Running the Application
npm run dev
This will start the app at http://localhost:3000.

# Features
User Authentication: Secure registration and login with JWT (JSON Web Tokens) for session management. Passwords are securely hashed using bcrypt before being stored in the database.
User Authorization: Role-based access control ensures that users can only access or modify data that they own (projects and tasks). Only the project owner can edit or delete projects.
Project Management: Users can create, update, and delete projects. Projects are associated with a single user (the owner), and each project can have multiple tasks.
Task Management: Tasks are linked to projects and can be created, updated, and deleted by the project owner. Tasks have fields like title, description, and status.
MongoDB Database: The backend uses MongoDB with Mongoose to store users, projects, and tasks. Data relationships are structured with references (ref) for better organization.
Security: JWT-based authentication and authorization middleware ensure that users can only access endpoints that belong to them. Sensitive data, like passwords, are hashed and never stored in plaintext.

# Author
Developed by PALLAVI KALSHETTI as part of the MERN Stack Capstone Project.