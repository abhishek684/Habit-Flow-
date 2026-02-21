import { useState } from 'react';
import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="main-content">
                <div className="mobile-header">
                    <div className="mobile-logo">
                        <span className="icon">🚀</span>
                        <span>HabitFlow</span>
                    </div>
                    <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)}>
                        ☰
                    </button>
                </div>
                {isSidebarOpen && (
                    <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
                )}
                {children}
            </main>
        </div>
    );
}
