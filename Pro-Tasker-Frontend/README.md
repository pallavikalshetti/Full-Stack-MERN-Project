## Frontend README
## Pro-Tasker Frontend
The frontend of Pro-Tasker is a modern, responsive, and intuitive web application designed for collaborative project and task management. Built with React and leveraging modern state management with Context API, the frontend provides users with a seamless experience to manage their tasks and projects, whether they are working solo or collaborating with a small team.

This application interacts with a Node.js/Express backend through a set of RESTful API endpoints and is designed to ensure a smooth user experience while being scalable for teams of various sizes.

# Table of Contents
-Technologies
-Setup & Installation
-Features
-File Structure
-Running the Application
-Deployment

# Technologies
React
React Router for navigation
Context API for global state management
Axios for API calls

# Repository Link:
# GitHub Repository: Pro-Tasker Frontend
# Live Demo on Vercel/Netlify/Render: Pro-Tasker Frontend (Live)

# Setup & Installation
# Clone the repository:
git clone https://github.com/yourusername/pro-tasker-frontend.git
cd pro-tasker-frontend

# Install dependencies:
npm install

# Create a .env file in the root directory with the following environment variables:
REACT_APP_API_URL =//localhost:3001/api

# Run the development server:
npm start
The frontend will run on http://localhost:3001

# Features
User Authentication: Secure login and registration using JWT tokens. Users can create an account, log in, and manage their session.
Dashboard View: A user-friendly dashboard that allows users to view all their projects at a glance. Each project has a detailed view where users can manage tasks.
Project Management: Users can create new projects, edit or delete their existing projects, and view project details.
Task Management: Within a project, users can create, update, and delete tasks, each with a status that can be updated (e.g., "To Do", "In Progress", "Done").
Responsive Design: The app is fully responsive, adapting to desktop, tablet, and mobile screen sizes, providing a consistent experience across devices.

# Deployment:
You can deploy the frontend to platforms like Netlify or Vercel.
Make sure to configure the environment variable REACT_APP_API_URL with the production API URL.
Ensure your backend API is running before trying to access the frontend.

