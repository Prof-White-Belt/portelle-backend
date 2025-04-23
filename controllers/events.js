import Event from "../models/event.js";
import User from "../models/user.js";

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events)
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({ error: "event not found." });
          }
    
      res.json({event});
    } catch (error){
        res.status(500).json({ error: error.message});
    }
};

export const createEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        const event = await Event.create({
            title: req.body.title,
            date: req.body.date,
            city: req.body.city,
            description: req.body.description,
            creator: user.username,
        })

        user.createdEvents.push(event._id);
        await user.save();

        res.status(201).json({ event: event })

    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body);

        if (!updatedEvent) {
            res.status(404);
            throw new Error("Event not found.");
        }

        res.status(200).json(updatedEvent)
    } catch (error){
        if (res.statusCode === 404) {
            res.json({ error: error.message });
          } else {
            res.status(500).json({ error: error.message });
          }
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent){
            res.status(404);
            throw new Error("Event not found.");
        }

        res.status(200).json(deletedEvent);
    } catch (error){
        if (res.statusCode === 404) {
            res.json({ error: error.message });
          } else {
            res.status(500).json({ error: error.message });
          }
    }
};