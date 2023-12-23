const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // For password hashing

const app = express();
const port = 3000;

// Import your User and Event models
const User = require("../models/user");
const Event = require("../models/event");

// Connect to MongoDB (make sure to replace 'your_database_url' with your actual MongoDB URL)
// mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username);
    console.log(hashedPassword);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({statusCode: 200, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ statusCode: 401, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ statusCode: 401, message: "Invalid credentials" });
    }

    var userRes = {
      userId: user._id,
      username: user.username,
      email: user.email,
      eventsCreated: user.eventsCreated,
    };
    // Here, you might generate and send a JWT token for authentication

    res
      .status(200)
      .json({
        statusCode: 200,
        message: "Login successful",
        response: userRes,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// View Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create event
router.post("/events", async (req, res) => {
  try {
    const { eventName, location, description, user_id } = req.body;
    console.log(eventName);
    const newEvent = new Event({
      eventName,
      location,
      description,
      user_id
    });

    const events = await newEvent.save();

    // Update the user's eventsCreated array
    // const userId = 1 /* get user ID from authentication */;
    // const user = await User.findById(userId);
    // user.eventsCreated.push(newEvent._id);
    // await user.save();

    res
      .status(201)
      .json({statusCode: 200, message: "Event created successfully", events: events });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// View events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({statusCode: 200,
      message: "records found",
      response: events});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update event
router.put("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { eventName, location, description } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { eventName, location, description },
      { new: true }
    );

    res.status(200).json({statusCode: 200, message: "Event updated successfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete event
router.delete("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    // Delete the event
    await Event.findByIdAndDelete(eventId);

    // Remove the event from the user's eventsCreated array
    const userId = 1; /* get user ID from authentication */
    const user = await User.findById(userId);
    user.eventsCreated = user.eventsCreated.filter(
      (id) => id.toString() !== eventId
    );
    await user.save();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
