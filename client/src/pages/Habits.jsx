import { useState, useEffect } from 'react';
import API from '../api/axios';
import HabitForm from '../components/HabitForm';
import HabitManagerCard from '../components/HabitManagerCard';

export default function Habits() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'General', 'Health', 'Work', 'Finance', 'Personal', 'Social'];

    const fetchHabits = async () => {
        try {
            const { data } = await API.get('/habits');
            setHabits(data);
        } catch (err) {
            console.error('Failed to fetch habits:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const addHabit = async (name, category, priority) => {
        const { data } = await API.post('/habits', { name, category, priority });
        setHabits((prev) => [data, ...prev]);
    };

    const toggleHabit = async (id) => {
        const { data } = await API.put(`/habits/${id}/toggle`);
        setHabits((prev) => prev.map((h) => (h._id === id ? data : h)));
    };

    const deleteHabit = async (id) => {
        try {
            await API.delete(`/habits/${id}`);
            setHabits((prev) => prev.filter((h) => h._id !== id));
        } catch (err) {
            console.error('Failed to delete habit:', err);
            alert('Failed to delete habit. Please try again.');
        }
    };

    const filteredHabits = habits.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeFilter === 'All' || h.category === activeFilter;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <div className="loading-spinner" />;
    }

    return (
        <div className="page-container">
            <header className="dashboard-header">
                <h2>My Habits</h2>
                <p>Manage, search, and organize your daily routines.</p>
            </header>

            <HabitForm onAdd={addHabit} />

            <div className="management-controls">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search your habits..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="habit-manager-list">
                {filteredHabits.length === 0 ? (
                    <div className="empty-state">
                        <div className="icon">🔍</div>
                        <p>No habits found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="habit-list">
                        {filteredHabits.map((habit) => (
                            <HabitManagerCard
                                key={habit._id}
                                habit={habit}
                                onToggle={toggleHabit}
                                onDelete={deleteHabit}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
