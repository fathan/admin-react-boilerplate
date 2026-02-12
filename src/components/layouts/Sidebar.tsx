import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileEdit, FolderOpen, Settings, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileEdit, label: 'Pages', path: '/pages' },
    { icon: FolderOpen, label: 'Files', path: '/files' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">CMS Admin</h1>
        <nav>
          <ul className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center space-x-5 p-3 rounded-full transition-colors ${
                      isActive ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:bg-gray-200'
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
        <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;