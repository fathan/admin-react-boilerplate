import { usePageTitle } from '@/hooks/shared/usePageTitle';
import { Users, FileText, Eye, Folder } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, change }: { icon: any; label: string; value: string; change: number }) => (
  <div className="bg-white dark:bg-[#0a0a09] p-6 rounded-lg border border-gray-200 dark:border-[#0a0a09]">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>

    <h3 className="text-2xl font-bold mb-1">{value}</h3>
    <p className="text-gray-600">{label}</p>
  </div>
);

const QuickAction = ({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
  >
    <Icon className="w-5 h-5 text-gray-600" />
    <span>{label}</span>
  </button>
);

const RecentActivity = () => (
  <div className="bg-white dark:bg-[#0a0a09] p-6 rounded-lg border border-gray-200 dark:border-[#0a0a09]">
    <h2 className="text-lg font-semibold mb-4">
      Recent Activity
    </h2>

    <div className="space-y-4">
      {[
        { user: 'Fathan Rohman', action: 'edited', page: 'Home Page', time: '2 hours ago' },
        { user: 'Shinta Wulandari', action: 'created', page: 'Blog Post', time: '4 hours ago' },
        { user: 'Daniel Wijaya', action: 'published', page: 'About Us', time: '6 hours ago' },
      ].map((activity, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div>
            <p className="font-medium">
              {activity.user}
            </p>
            <p className="text-sm text-gray-600">
              {activity.action} {activity.page}
            </p>
          </div>
          <span className="text-sm text-gray-500">
            {activity.time}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const CmsDashboard = () => {
  usePageTitle("Dashboard");

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: 12 },
    { icon: FileText, label: 'Pages', value: '56', change: 8 },
    { icon: Eye, label: 'Posts', value: '12.5K', change: -3 },
  ];

  const quickActions = [
    { label: 'New Page', icon: FileText },
    { label: 'New Posts', icon: FileText },
    { label: 'Manage Users', icon: Users },
    { label: 'Documentations', icon: Folder },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1 dark:text-white">
            Welcome back, Admin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />

        <div className="bg-white dark:bg-[#0a0a09] p-6 rounded-lg border border-gray-200 dark:border-[#0a0a09]">
          <h2 className="text-lg font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickAction
                key={index}
                icon={action.icon}
                label={action.label}
                onClick={() => console.log(`Clicked ${action.label}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;