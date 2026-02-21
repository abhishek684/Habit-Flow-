import StreakBadge from './StreakBadge';

export default function HabitCard({ habit, onToggle, onDelete }) {
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = habit.completions.includes(today);

    return (
        <div className={`habit-card ${isCompleted ? 'completed' : ''}`}>
            <button
                className={`habit-check ${isCompleted ? 'checked' : ''}`}
                onClick={() => onToggle(habit._id)}
                title={isCompleted ? "Completed" : "Mark as completed"}
            >
                {isCompleted ? '✓' : ''}
            </button>

            <div className="habit-info">
                <span className="habit-name">{habit.name}</span>
                <span className="habit-meta">{isCompleted ? 'Done for today!' : 'Pending...'}</span>
            </div>

            <div className="habit-actions">
                <StreakBadge completions={habit.completions} />
                <button className="btn-ghost btn-delete" onClick={() => onDelete(habit._id)} title="Delete habit">
                    ✕
                </button>
            </div>
        </div>
    );
}
