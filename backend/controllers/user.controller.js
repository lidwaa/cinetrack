import { db } from '../db.js';

export const getLists = async (req, res) => {
    const userId = req.user.id;
    await db.read();
    const lists = db.data.lists.filter(l => l.userId === userId) || [];
    res.json(lists);
};

export const addToList = async (req, res) => {
    const userId = req.user.id;
    const { movieId, type, movieData } = req.body; // type: 'favorite' or 'watchlist'

    if (!movieId || !type) {
        return res.status(400).json({ message: 'Movie ID and type are required' });
    }

    await db.read();

    // Check if already in list
    const exists = db.data.lists.find(l => l.userId === userId && l.movieId === movieId && l.type === type);
    if (exists) {
        return res.status(400).json({ message: 'Movie already in list' });
    }

    const newItem = { userId, movieId, type, movieData, addedAt: new Date() };
    db.data.lists.push(newItem);
    await db.write();

    res.status(201).json(newItem);
};

export const removeFromList = async (req, res) => {
    const userId = req.user.id;
    const { movieId, type } = req.params;

    await db.read();
    const initialLength = db.data.lists.length;
    db.data.lists = db.data.lists.filter(l => !(l.userId === userId && l.movieId == movieId && l.type === type));

    if (db.data.lists.length === initialLength) {
        return res.status(404).json({ message: 'Item not found' });
    }

    await db.write();
    res.json({ message: 'Item removed' });
};
