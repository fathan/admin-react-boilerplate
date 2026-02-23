import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: User, label: 'Users', path: '/users' }
  ];

  const onClickHandleLogout = () => {
    logout();
    navigate('/auth/login');
  }

  return (
    <div className="w-72 border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col bg-white dark:bg-[#0a0a09] dark:border-[#0a0a09]">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-500 dark:text-white">
          CMS Admin
        </h1>
        <nav>
          <ul className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center space-x-5 p-3 rounded-full transition-colors ${
                      isActive ? 'text-digital-blue-500 bg-digital-blue-100' : 'text-gray-400 hover:bg-gray-200'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button
          className="flex items-center text-gray-400 space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors w-full"
          onClick={ onClickHandleLogout }
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;