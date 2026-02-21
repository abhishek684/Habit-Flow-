export default function StreakBadge({ completions }) {
    const streak = calculateStreak(completions);

    return (
        <span className={`streak-badge ${streak > 0 ? 'active' : 'inactive'}`}>
            🔥 {streak}
        </span>
    );
}

function calculateStreak(completions) {
    if (!completions || completions.length === 0) return 0;

    // Sort dates descending
    const sorted = [...completions].sort((a, b) => b.localeCompare(a));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = formatDate(today);
    const yesterdayStr = formatDate(yesterday);

    // Streak must start from today or yesterday
    if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) return 0;

    let streak = 0;
    let checkDate = sorted[0] === todayStr ? today : yesterday;

    for (let i = 0; i < 365; i++) {
        const dateStr = formatDate(checkDate);
        if (sorted.includes(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
