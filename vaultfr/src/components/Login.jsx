import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleLogin } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post('https://your-backend-project-name.vercel.app/user/login', formData);
      localStorage.setItem('token', res.data.token);
      handleLogin(res.data.user.username);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome Back</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-300">
              <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full outline-none text-gray-800"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-300">
              <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none text-gray-800"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-indigo-600 hover:underline text-sm"
            >
              ← Back to Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-indigo-600 hover:underline text-sm"
            >
              Register →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
