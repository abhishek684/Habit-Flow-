const express = require('express');
const supabase = require('../config/supabase');
const protect = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// GET /api/habits — list user's habits
router.get('/', async (req, res) => {
    try {
        const { data: habits, error } = await supabase
            .from('habits')
            .select('id, user_id, name, completions, created_at')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map to match frontend expected shape
        const mapped = habits.map(mapHabit);
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/habits — create a new habit
router.post('/', async (req, res) => {
    try {
        const { name, category, priority } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Habit name is required' });
        }

        const habitData = {
            user_id: req.user.id,
            name: name.trim(),
            completions: [],
            category: category || 'General',
            priority: priority || 'Medium'
        };

        let { data: habit, error } = await supabase
            .from('habits')
            .insert(habitData)
            .select('*')
            .single();

        // Fallback: If category/priority columns are missing, try inserting without them
        if (error && error.message.includes('column') && error.message.includes('habits')) {
            console.warn('⚠️ Missing columns detected, falling back to basic insert');
            const fallbackData = {
                user_id: req.user.id,
                name: name.trim(),
                completions: []
            };

            const { data: fallbackHabit, error: fallbackError } = await supabase
                .from('habits')
                .insert(fallbackData)
                .select('*')
                .single();

            if (fallbackError) throw fallbackError;
            habit = fallbackHabit;
        } else if (error) {
            throw error;
        }

        res.status(201).json(mapHabit(habit));
    } catch (error) {
        console.error('Habit creation error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/habits/:id/toggle — toggle today's completion
router.put('/:id/toggle', async (req, res) => {
    try {
        // Fetch the habit first
        const { data: habit, error: fetchErr } = await supabase
            .from('habits')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (fetchErr || !habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const today = new Date().toISOString().split('T')[0];
        let completions = habit.completions || [];

        if (completions.includes(today)) {
            completions = completions.filter((d) => d !== today);
        } else {
            completions = [...completions, today];
        }

        const { data: updated, error: updateErr } = await supabase
            .from('habits')
            .update({ completions })
            .eq('id', req.params.id)
            .select('*')
            .single();

        if (updateErr) throw updateErr;

        res.json(mapHabit(updated));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/habits/:id
router.delete('/:id', async (req, res) => {
    try {
        // Check ownership first
        const { data: habit, error: fetchErr } = await supabase
            .from('habits')
            .select('id, user_id')
            .eq('id', req.params.id)
            .single();

        if (fetchErr || !habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { error: deleteErr } = await supabase
            .from('habits')
            .delete()
            .eq('id', req.params.id);

        if (deleteErr) throw deleteErr;

        res.json({ message: 'Habit deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Helper: map Supabase row to frontend expected shape
function mapHabit(h) {
    return {
        _id: h.id,
        user: h.user_id,
        name: h.name,
        completions: h.completions || [],
        createdAt: h.created_at,
        category: h.category || 'General',
        priority: h.priority || 'Medium'
    };
}

module.exports = router;
