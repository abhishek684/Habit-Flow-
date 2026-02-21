import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'My Habits', path: '/habits', icon: '✨' },
        { name: 'Analytics', path: '/analytics', icon: '📈' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <span className="icon">🚀</span>
                    <span>HabitFlow</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <div
                        key={item.path}
                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => {
                            navigate(item.path);
                            if (onClose) onClose();
                        }}
                    >
                        <span className="icon">{item.icon}</span>
                        <span>{item.name}</span>
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <span className="name">{user?.name}</span>
                    <span className="email">{user?.email}</span>
                </div>
                <button className="navbar-logout" onClick={logout}>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
