import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import SettingsSection from '../components/SettingsSection';

export default function Settings() {
    const { user, updateProfile, logout } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // Appearance State
    const [theme, setTheme] = useState(localStorage.getItem('hf-theme') || 'dark');
    const [density, setDensity] = useState(localStorage.getItem('hf-density') || 'comfortable');

    // Apply Appearance Settings
    useEffect(() => {
        document.body.classList.remove('theme-midnight', 'theme-light', 'theme-dark');
        document.body.classList.add(`theme-${theme}`);
        localStorage.setItem('hf-theme', theme);
    }, [theme]);

    useEffect(() => {
        document.body.classList.remove('density-compact', 'density-comfortable');
        document.body.classList.add(`density-${density}`);
        localStorage.setItem('hf-density', density);
    }, [density]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            const { data } = await API.put('/users/profile', { name });
            updateProfile({ name: data.name });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setSaving(false);
        }
    };

    const handleResetProgress = async () => {
        if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            // Theoretically we'd call an API to clear completions
            alert('Progress reset (logic for completions clearing would go here).');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('CRITICAL: Delete your account and all data? This action is permanent.')) {
            try {
                await API.delete('/users/me');
                logout();
            } catch (err) {
                alert('Failed to delete account.');
            }
        }
    };

    const handleExportData = () => {
        // Simple export simulation
        const data = {
            user,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'habit-flow-data.json';
        a.click();
    };

    return (
        <div className="page-container settings-page">
            <header className="dashboard-header">
                <h2>Settings</h2>
                <p>Manage your account and app preferences.</p>
            </header>

            <div className="settings-grid">
                <SettingsSection
                    title="User Profile"
                    subtitle="Update your personal information"
                    color="purple"
                >
                    <form onSubmit={handleUpdateProfile} className="settings-form">
                        <div className="input-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <label>Email Address</label>
                            <input type="email" value={user?.email || ''} disabled />
                            <span className="helper-text">Email cannot be changed.</span>
                        </div>
                        <button className="btn btn-primary" type="submit" disabled={saving}>
                            {saving ? 'Saving...' : 'Update Name'}
                        </button>
                        {message && (
                            <div className={`status-msg ${message.type}`}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </SettingsSection>

                <SettingsSection
                    title="Appearance"
                    subtitle="Customize how HabitFlow looks"
                    color="indigo"
                >
                    <div className="preference-item">
                        <span>Theme Selection</span>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="dark">Vibrant Dark (Default)</option>
                            <option value="midnight">Midnight OLED</option>
                            <option value="light">Soft Light</option>
                        </select>
                    </div>
                    <div className="preference-item">
                        <span>Layout Density</span>
                        <div className="toggle-group">
                            <button
                                className={density === 'comfortable' ? 'active' : ''}
                                onClick={() => setDensity('comfortable')}
                            >
                                Comfortable
                            </button>
                            <button
                                className={density === 'compact' ? 'active' : ''}
                                onClick={() => setDensity('compact')}
                            >
                                Compact
                            </button>
                        </div>
                    </div>
                </SettingsSection>

                <SettingsSection
                    title="Data & Privacy"
                    subtitle="Manage your personal data"
                    color="rose"
                >
                    <div className="data-actions">
                        <div className="data-action-item">
                            <div className="action-info">
                                <strong>Export My Data</strong>
                                <p>Download a JSON backup of your habits and progress.</p>
                            </div>
                            <button className="btn-ghost" onClick={handleExportData}>Download</button>
                        </div>
                        <div className="data-action-item danger">
                            <div className="action-info">
                                <strong>Reset All Habits</strong>
                                <p>Clear all your habit data. You will start from zero.</p>
                            </div>
                            <button className="btn-ghost" onClick={handleResetProgress}>Reset</button>
                        </div>
                        <div className="data-action-item danger">
                            <div className="action-info">
                                <strong>Delete Account</strong>
                                <p>Permanently remove your account and all associated data.</p>
                            </div>
                            <button className="btn-danger" onClick={handleDeleteAccount}>Delete</button>
                        </div>
                    </div>
                </SettingsSection>
            </div>
        </div>
    );
}
