import { useState } from 'react';

export default function SettingsSection({ title, subtitle, children, color }) {
    return (
        <div className={`analytics-card settings-section ${color || ''}`}>
            <div className="card-header">
                <h3>{title}</h3>
                {subtitle && <span className="subtitle">{subtitle}</span>}
            </div>
            <div className="settings-content">
                {children}
            </div>
        </div>
    );
}
