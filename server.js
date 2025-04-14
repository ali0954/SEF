import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Configure middleware
// Update CORS configuration in server.js
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend URL
  credentials: true
}));
app.use(express.json());

// Create user data directory
const DATA_DIR = path.join(__dirname, 'userData');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// API Endpoints
app.get('/api/goals/:userId', (req, res) => {
  try {
    const userId = decodeURIComponent(req.params.userId);
    const safeUserId = userId.replace(/[^a-z0-9]/gi, '_');
    const filePath = path.join(DATA_DIR, `${safeUserId}.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(200).json([]);
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = rawData.trim() ? JSON.parse(rawData) : [];
    res.status(200).json(data);
  } catch (error) {
    console.error('GET Error:', error);
    res.status(500).json({ 
      error: 'Failed to load goals',
      details: error.message 
    });
  }
});

app.post('/api/goals/:userId', (req, res) => {
  try {
    const userId = decodeURIComponent(req.params.userId);
    const safeUserId = userId.replace(/[^a-z0-9]/gi, '_');
    const filePath = path.join(DATA_DIR, `${safeUserId}.json`);
    
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.status(200).json({ message: 'Goals saved successfully' });
  } catch (error) {
    console.error('POST Error:', error);
    res.status(500).json({ 
      error: 'Failed to save goals',
      details: error.message 
    });
  }
});
// server.js
// Add these endpoints before app.listen()

// Transaction Endpoints
app.get('/api/transactions/:userId', (req, res) => {
  try {
    const userId = decodeURIComponent(req.params.userId);
    const safeUserId = userId.replace(/[^a-z0-9]/gi, '_');
    const filePath = path.join(DATA_DIR, `${safeUserId}_transactions.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(200).json([]);
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = rawData.trim() ? JSON.parse(rawData) : [];
    res.status(200).json(data);
  } catch (error) {
    console.error('GET Transactions Error:', error);
    res.status(500).json({ error: 'Failed to load transactions' });
  }
});

app.post('/api/transactions/:userId', (req, res) => {
  try {
    const userId = decodeURIComponent(req.params.userId);
    const safeUserId = userId.replace(/[^a-z0-9]/gi, '_');
    const filePath = path.join(DATA_DIR, `${safeUserId}_transactions.json`);
    
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.status(200).json({ message: 'Transactions saved successfully' });
  } catch (error) {
    console.error('POST Transactions Error:', error);
    res.status(500).json({ error: 'Failed to save transactions' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});

