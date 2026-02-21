export default function CategoryBreakdown({ habits }) {
    const categories = ['General', 'Health', 'Work', 'Finance', 'Personal', 'Social'];

    const stats = categories.map(cat => {
        const catHabits = habits.filter(h => h.category === cat);
        if (catHabits.length === 0) return null;

        const totalCompletions = catHabits.reduce((sum, h) => sum + h.completions.length, 0);
        // Average completion rate based on created date (approximate)
        const avgStreak = Math.round(totalCompletions / catHabits.length);

        return { name: cat, count: catHabits.length, efficiency: avgStreak };
    }).filter(Boolean);

    return (
        <div className="analytics-card category-breakdown">
            <div className="card-header">
                <h3>🌈 Category Efficiency</h3>
                <span className="subtitle">Performance by life area</span>
            </div>
            <div className="category-list">
                {stats.length === 0 ? (
                    <p className="empty-msg">Add habits and categories to see breakdown.</p>
                ) : (
                    stats.map(stat => (
                        <div key={stat.name} className="category-stat-item">
                            <div className="stat-info">
                                <span className="cat-name">{stat.name}</span>
                                <span className="cat-count">{stat.count} Habits</span>
                            </div>
                            <div className="progress-bar-wrapper">
                                <div
                                    className={`progress-fill ${stat.name.toLowerCase()}`}
                                    style={{ width: `${Math.min(stat.efficiency * 10, 100)}%` }}
                                />
                            </div>
                            <span className="efficiency-text">{stat.efficiency} avg. streak</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
