import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });

    navigate('/');
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        <p className="text-sm text-gray-500 mt-1">
          Masuk untuk melanjutkan
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-2 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent
            "
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-2 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent
            "
            required
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded" />
            Remember me
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full bg-blue-600 text-white py-2 rounded-lg
            hover:bg-blue-700 transition font-semibold
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}
