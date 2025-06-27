import { useState } from 'react';
import axios from 'axios';
import { UserIcon, LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            await axios.post('http://localhost:3456/user/register', formData);
            await axios.post('http://localhost:3456/user/login', {
                username: formData.username,
                password: formData.password,
            });

            setSuccess(true);
            setFormData({ username: '', fullname: '', password: '' });
            window.location.href = '/login';
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const backToHome = () => {
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 transition-all duration-300">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>

                {success && <p className="text-green-600 text-center mb-4">Registration successful!</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-300">
                            <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="fullname" className="block text-gray-700 font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-300">
                            <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <button
                        type="button"
                        onClick={backToHome}
                        className="w-full flex justify-center items-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg mt-2 hover:bg-gray-200 transition"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Home
                    </button>
                </form>
            </div>
        </div>
    );
}
