export default function Heatmap({ habits }) {
    // Generate dates for the last 60 days
    const daysToShow = 60;
    const dates = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }

    // Map completions across all habits to each date
    const dailyActivity = dates.map(date => {
        const count = habits.filter(h => h.completions.includes(date)).length;
        return { date, count };
    });

    const maxActivity = Math.max(...dailyActivity.map(a => a.count), 1);

    // Group into weeks for the grid
    const weeks = [];
    for (let i = 0; i < dailyActivity.length; i += 7) {
        weeks.push(dailyActivity.slice(i, i + 7));
    }

    return (
        <div className="analytics-card heatmap-section">
            <div className="card-header">
                <h3>🔥 Consistency Heatmap</h3>
                <span className="subtitle">Last 60 days activity</span>
            </div>
            <div className="heatmap-grid">
                {dailyActivity.map((day, i) => {
                    const level = day.count === 0 ? 0 : Math.ceil((day.count / habits.length) * 4);
                    return (
                        <div
                            key={day.date}
                            className={`heatmap-square level-${level}`}
                            title={`${day.date}: ${day.count} habits completed`}
                        />
                    );
                })}
            </div>
            <div className="heatmap-legend">
                <span>Less</span>
                <div className="heatmap-square level-0"></div>
                <div className="heatmap-square level-1"></div>
                <div className="heatmap-square level-2"></div>
                <div className="heatmap-square level-3"></div>
                <div className="heatmap-square level-4"></div>
                <span>More</span>
            </div>
        </div>
    );
}
