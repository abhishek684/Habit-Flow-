import StreakBadge from './StreakBadge';

export default function HabitManagerCard({ habit, onToggle, onDelete }) {
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = habit.completions.includes(today);

    const priorityColors = {
        High: '#ff4d4d',
        Medium: '#ffa500',
        Low: '#4ade80'
    };

    return (
        <div className={`habit-manager-card ${isCompleted ? 'completed' : ''}`}>
            <div className="card-top">
                <div className="habit-identity">
                    <button
                        className={`habit-check ${isCompleted ? 'checked' : ''}`}
                        onClick={() => onToggle(habit._id)}
                    >
                        {isCompleted ? '✓' : ''}
                    </button>
                    <div className="habit-text">
                        <span className="habit-name">{habit.name}</span>
                        <div className="habit-tags">
                            <span className="tag-category">{habit.category}</span>
                            <span
                                className="tag-priority"
                                style={{ color: priorityColors[habit.priority] }}
                            >
                                ● {habit.priority}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="habit-stats-mini">
                    <StreakBadge completions={habit.completions} />
                </div>
            </div>

            <div className="card-bottom">
                <div className="habit-meta-info">
                    Added on {new Date(habit.createdAt).toLocaleDateString()}
                </div>
                <div className="card-actions">
                    <button className="btn-ghost btn-delete-danger" onClick={() => onDelete(habit._id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}
