const express = require('express');
const supabase = require('../config/supabase');
const protect = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// GET /api/users/me — get current user profile
router.get('/me', async (req, res) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, created_at')
            .eq('id', req.user.id)
            .single();

        if (error || !user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.created_at
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/users/profile — update profile
router.put('/profile', async (req, res) => {
    try {
        const { name } = req.body;

        const { data: updated, error } = await supabase
            .from('users')
            .update({ name })
            .eq('id', req.user.id)
            .select('id, name, email')
            .single();

        if (error) throw error;

        res.json({
            _id: updated.id,
            name: updated.name,
            email: updated.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/users/me — delete account
router.delete('/me', async (req, res) => {
    try {
        // Cascade delete will handle habits
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', req.user.id);

        if (error) throw error;

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
