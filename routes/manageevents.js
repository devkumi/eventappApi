const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const port = 3000;

// Import your User and Event models
const User = require('./models/user');
const Event = require('./models/event');

app.use(express.json());

// Connect to MongoDB (make sure to replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// User registration
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Here, you might generate and send a JWT token for authentication

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create event
app.post('/events', async (req, res) => {
  try {
    const { eventName, date, location, description } = req.body;

    const newEvent = new Event({
      eventName,
      date,
      location,
      description,
    });

    await newEvent.save();

    // Update the user's eventsCreated array
    const userId = 1 /* get user ID from authentication */;
    const user = await User.findById(userId);
    user.eventsCreated.push(newEvent._id);
    await user.save();

    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// View events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update event
app.put('/events/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { eventName, date, location, description } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { eventName, date, location, description },
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete event
app.delete('/events/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // Delete the event
    await Event.findByIdAndDelete(eventId);

    // Remove the event from the user's eventsCreated array
    const userId = 1/* get user ID from authentication */;
    const user = await User.findById(userId);
    user.eventsCreated = user.eventsCreated.filter((id) => id.toString() !== eventId);
    await user.save();

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
