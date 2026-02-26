import { NavLink } from 'react-router-dom';
import { Box, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@chakra-ui/react';
import { useModal } from '@/providers/modal.providers';

const Sidebar = () => {
  const { showModal } = useModal();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: User, label: 'Users', path: '/users' },
    { icon: Box, label: 'Documentations', path: '/documentations' },
  ];

  const onClickHandleLogout = () => {
    showModal({
      title: "Logout",
      content: "Are you sure you want to logout?",
      cancelText: "No",
      cancelColor: "gray",
      confirmText: "Yes",
      confirmColor: "red",
      onConfirm: () => {
        useAuthStore.getState().logout();
      },
    });
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
        <Button
          variant="plain"
          onClick={ onClickHandleLogout }
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;