import { FiCopy } from "react-icons/fi";

interface RoleCardProps {
  totalUsers: number;
  roleName: string;
  onEdit?: () => void;
  onCopy?: () => void;
  users: {
    id: string;
    name: string;
    avatar: string;
  }[];
}

export default function RoleCard({
  totalUsers,
  roleName,
  users,
  onEdit,
  onCopy,
}: RoleCardProps) {
  return (
    <div className="relative bg-gray-100 rounded-xl p-6 border border-gray-200 flex justify-between items-start">
      
      {/* Left Content */}
      <div>
        <p className="text-sm text-gray-500 mb-3">
          Total {totalUsers} users
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {roleName}
        </h3>

        <button
          onClick={onEdit}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Edit Role
        </button>
      </div>

      {/* Right Content */}
      <div className="flex flex-col items-end justify-between h-full">
        
        {/* Avatar Group */}
        <div className="flex -space-x-3">
          {users.slice(0, 4).map((user) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          ))}

          {users.length > 4 && (
            <div className="w-10 h-10 rounded-full bg-gray-300 text-xs flex items-center justify-center border-2 border-white text-gray-700 font-medium">
              +{users.length - 4}
            </div>
          )}
        </div>

        {/* Copy Icon */}
        <button
          onClick={onCopy}
          className="mt-8 text-gray-500 hover:text-gray-700"
        >
          <FiCopy size={18} />
        </button>
      </div>
    </div>
  );
}