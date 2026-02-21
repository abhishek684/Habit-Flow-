import { useState, useEffect } from 'react';
import API from '../api/axios';
import Heatmap from '../components/Heatmap';
import CategoryBreakdown from '../components/CategoryBreakdown';

export default function Analytics() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = async () => {
        try {
            const { data } = await API.get('/habits');
            setHabits(data);
        } catch (err) {
            console.error('Failed to fetch analytics data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const calculateOverallEfficiency = () => {
        if (habits.length === 0) return 0;
        const totalPossibleCompletions = habits.length * 30; // Last 30 days
        const recentCompletions = habits.reduce((sum, h) => {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const count = h.completions.filter(c => new Date(c) >= thirtyDaysAgo).length;
            return sum + count;
        }, 0);
        return Math.round((recentCompletions / (totalPossibleCompletions || 1)) * 100);
    };

    if (loading) {
        return <div className="loading-spinner" />;
    }

    return (
        <div className="page-container analytics-page">
            <header className="dashboard-header animate-fade-in">
                <h2>Performance Analytics</h2>
                <p>Deep dive into your habits, consistency, and patterns.</p>
            </header>

            <div className="analytics-grid">
                {/* Top Row: Overall Stats */}
                <div className="analytics-stats-row">
                    <div className="stat-card glass purple">
                        <span className="stat-label">Overall Consistency</span>
                        <div className="stat-value">{calculateOverallEfficiency()}%</div>
                        <div className="stat-trend text-glow">Top 15% of users</div>
                    </div>
                    <div className="stat-card glass emerald">
                        <span className="stat-label">Best Category</span>
                        <div className="stat-value">Health</div>
                        <div className="stat-trend">12 day streak</div>
                    </div>
                </div>

                {/* Second Row: Heatmap */}
                <Heatmap habits={habits} />

                {/* Third Row: Category Breakdown */}
                <CategoryBreakdown habits={habits} />

                {/* Bonus: Fun Fact Card */}
                <div className="analytics-card fun-fact indigo">
                    <h3>💡 Did you know?</h3>
                    <p>It takes an average of <strong>66 days</strong> for a new behavior to become automatic. You're almost there with your Health habits!</p>
                </div>
            </div>
        </div>
    );
}
