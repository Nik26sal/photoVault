import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUserPhotos = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3456/user/photos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhotos(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user photos:', error);
                setError('Failed to fetch photos. Please try again.');
                setLoading(false);
            }
        };

        fetchUserPhotos();
    }, []);

    const deletePhoto = async (photoId) => {
        try {
            console.log(`Deleting photo with ID: ${photoId}`);
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:3456/user/photos/${photoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Delete response:', response.data); // Log the response data
            setPhotos(photos.filter(photo => photo._id !== photoId));
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data.message || 'Failed to delete photo. Please try again.');
            } else {
                console.error('Error message:', error.message);
                setError('Failed to delete photo. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">All Photos</h1>

            <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
                <div className="divide-y divide-gray-200">
                    {photos.map((photo, index) => (
                        <div key={index} className="p-4">
                            <span className="block text-lg font-bold text-gray-900 mb-2">Photo {index + 1}</span>
                            <span className="block text-sm text-gray-600">{photo.description}</span>
                            <img src={photo.photoFiles[0]} alt={`Photo ${index + 1}`} className="mt-2" />
                            <button
                                onClick={() => deletePhoto(photo._id)}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => navigate('/uploadPictures')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go to Upload Section
            </button>
        </div>
    );
};

export default Collection;
