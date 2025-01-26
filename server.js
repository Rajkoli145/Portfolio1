const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve files from root directory

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Contact form schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);
        const contact = new Contact(req.body);
        await contact.save();
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

// Get all messages endpoint (protected, for admin use)
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ date: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
