import { useState, useEffect } from 'react';
import API from '../api/axios';
import HabitForm from '../components/HabitForm';
import HabitCard from '../components/HabitCard';
import WeeklyChart from '../components/WeeklyChart';

export default function Dashboard() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

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
        await API.delete(`/habits/${id}`);
        setHabits((prev) => prev.filter((h) => h._id !== id));
    };

    const today = new Date().toISOString().split('T')[0];
    const completedToday = habits.filter((h) => h.completions.includes(today)).length;
    const totalStreaks = habits.reduce((sum, h) => {
        return sum + calculateStreak(h.completions);
    }, 0);

    if (loading) {
        return <div className="loading-spinner" />;
    }

    return (
        <div className="page-container">
            <header className="dashboard-header">
                <h2>Analytics Dashboard</h2>
                <p>Welcome back! You have <strong>{habits.length - completedToday}</strong> habits remaining for today.</p>
            </header>

            {/* Stats Section */}
            <section className="stats-row">
                <div className="stat-card">
                    <span className="stat-label">Total Habits</span>
                    <div className="stat-value">{habits.length}</div>
                    <div className="stat-trend">↑ 2 from last month</div>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Done Today</span>
                    <div className="stat-value">{completedToday}</div>
                    <div className="stat-trend">{Math.round((completedToday / (habits.length || 1)) * 100)}% completion</div>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Active Streak</span>
                    <div className="stat-value">🔥 {totalStreaks}</div>
                    <div className="stat-trend">Across all habits</div>
                </div>
            </section>

            {/* Action Area */}
            <section className="dashboard-content">
                <HabitForm onAdd={addHabit} />

                <div className="habit-section">
                    <h3>Active Habits</h3>
                    {habits.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">🌱</div>
                            <p>No habits yet. Start your journey by adding one above!</p>
                        </div>
                    ) : (
                        <div className="habit-list">
                            {habits.map((habit, i) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    onToggle={toggleHabit}
                                    onDelete={deleteHabit}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Weekly chart */}
                {habits.length > 0 && <WeeklyChart habits={habits} />}
            </section>
        </div>
    );
}

// Streak calculation (duplicated here for stats, also in StreakBadge)
function calculateStreak(completions) {
    if (!completions || completions.length === 0) return 0;
    const sorted = [...completions].sort((a, b) => b.localeCompare(a));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const todayStr = fmt(today);
    const yesterdayStr = fmt(yesterday);
    if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) return 0;
    let streak = 0;
    let check = sorted[0] === todayStr ? new Date(today) : new Date(yesterday);
    for (let i = 0; i < 365; i++) {
        if (sorted.includes(fmt(check))) {
            streak++;
            check.setDate(check.getDate() - 1);
        } else break;
    }
    return streak;
}

function fmt(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
