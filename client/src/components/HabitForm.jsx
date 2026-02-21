import { useState } from 'react';

export default function HabitForm({ onAdd }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('General');
    const [priority, setPriority] = useState('Medium');
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setLoading] = useState(false);

    const categories = ['General', 'Health', 'Work', 'Finance', 'Personal', 'Social'];
    const priorities = ['Low', 'Medium', 'High'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        setLoading(true);
        try {
            await onAdd(name.trim(), category, priority);
            setName('');
            setCategory('General');
            setPriority('Medium');
            setShowOptions(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="habit-form" onSubmit={handleSubmit}>
            <div className="form-main">
                <input
                    type="text"
                    placeholder="Add a new habit… e.g. Read 30 mins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={60}
                />
                <button
                    type="button"
                    className={`btn-options ${showOptions ? 'active' : ''}`}
                    onClick={() => setShowOptions(!showOptions)}
                    title="Toggle extra options"
                >
                    ⚙️
                </button>
                <button className="btn btn-primary" type="submit" disabled={loading || !name.trim()}>
                    {loading ? '…' : '+ Add'}
                </button>
            </div>

            {showOptions && (
                <div className="form-extra">
                    <div className="option-group">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="option-group">
                        <label>Priority</label>
                        <div className="priority-selector">
                            {priorities.map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    className={`priority-btn ${p.toLowerCase()} ${priority === p ? 'active' : ''}`}
                                    onClick={() => setPriority(p)}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
