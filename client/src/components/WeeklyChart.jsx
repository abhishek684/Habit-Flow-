export default function WeeklyChart({ habits }) {
    const days = getLast7Days();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().toISOString().split('T')[0];

    // Count completions per day across all habits
    const counts = days.map((dateStr) => {
        let count = 0;
        habits.forEach((habit) => {
            if (habit.completions.includes(dateStr)) count++;
        });
        return count;
    });

    const maxCount = Math.max(...counts, 1);

    return (
        <div className="weekly-chart-section">
            <div className="section-header">
                <h3>📊 Weekly Momentum</h3>
                <span className="subtitle">Activity over the last 7 days</span>
            </div>
            <div className="weekly-chart">
                <div className="chart-bars">
                    {days.map((dateStr, i) => {
                        const date = new Date(dateStr + 'T00:00:00');
                        const dayLabel = dayNames[date.getDay()];
                        const height = counts[i] > 0 ? (counts[i] / maxCount) * 100 : 0;
                        const isToday = dateStr === today;

                        return (
                            <div
                                className={`chart-bar-wrapper ${isToday ? 'today' : ''}`}
                                key={dateStr}
                                title={`${counts[i]} habits completed on ${dayLabel}`}
                            >
                                <span className="chart-bar-count">
                                    {counts[i] > 0 ? counts[i] : ''}
                                </span>
                                <div
                                    className={`chart-bar ${counts[i] === 0 ? 'empty' : ''}`}
                                    style={{
                                        height: `${height || 6}%`,
                                        opacity: 0.4 + (height / 100) * 0.6
                                    }}
                                />
                                <span className="chart-bar-label">
                                    {isToday ? 'Today' : dayLabel}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        days.push(`${y}-${m}-${day}`);
    }
    return days;
}
