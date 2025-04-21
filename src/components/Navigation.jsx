import { FaPlus, FaClock, FaList } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { id: 'add', path: '/', label: 'Add Task', icon: FaPlus },
    { id: 'timer', path: '/timer', label: 'Timer', icon: FaClock },
    { id: 'all', path: '/all-tasks', label: 'All Tasks', icon: FaList },
  ];

  return (
    <nav className="main-navigation">
      {navItems.map(item => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <item.icon />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;