const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/errorMiddleware.js');
const userRoutes = require('./routes/user.js');
const recordingRoutes = require('./routes/recordings.js');
const protect = require('./middleware/authMiddleware.js');

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/record', recordingRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
