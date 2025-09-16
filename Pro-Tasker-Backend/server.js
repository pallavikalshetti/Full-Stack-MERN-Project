require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/User-routes');
const projectRoutes = require('./routes/Project-routes');
const taskRoutes = require('./routes/Task-routes');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

//Import Routes
// const authRoutes = require('./routes/User-routes');
// const projectRoutes = require('./routes/Project-routes');
// const taskRoutes = require('./routes/Task-routes');

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

//Connect DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server is listening @ http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(err));