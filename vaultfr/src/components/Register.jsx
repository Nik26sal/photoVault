import React, { useState } from 'react';
import axios from 'axios';

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
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            const registerRes = await axios.post('http://localhost:3456/user/register', {
                username: formData.username,
                fullname: formData.fullname,
                password: formData.password,
            });

            const loginRes = await axios.post('http://localhost:3456/user/login', {
                username: formData.username,
                password: formData.password,
            });

            setSuccess(true);
            setFormData({
                username: '',
                fullname: '',
                password: '',
            });

            window.location.href='/login'
        } catch (error) {
            console.error("Error registering or logging in user:", error);
            setError(error.response?.data?.message || "Failed to register and log in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const backToHome = () => {
        window.location.href="/"
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6">Register</h2>
            {success && <p className="text-green-500 mb-4">Registration successful!</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-500 text-white font-medium py-2 px-4 my-2 rounded-lg hover:bg-blue-600"
                        onClick={backToHome}
                    >
                        Back To Home
                    </button>
                </div>
            </form>
        </div>
    );
}
