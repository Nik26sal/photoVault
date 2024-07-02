import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UploadPictures = () => {
    const navigate=useNavigate()
    const [photos, setPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUserPhotos = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3456/user/photos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Fetched photos:', res.data);
                const photosData = res.data.map(photo => photo.photoFiles[0]);
                setPhotos(photosData);
            } catch (error) {
                console.error('Error fetching user photos:', error);
                setError(error.response?.data?.message || 'Failed to fetch photos. Please try again.');
            }
        };

        fetchUserPhotos();
    }, []);
    useEffect(() => {
        console.log('Updated photos:', photos);
    }, [photos]);

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('photos', file);
        });
        formData.append('description', description);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:3456/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            setPhotos((prevPhotos) => [...prevPhotos, res.data.photo.photoFiles[0]]);
            setDescription('');
            setSelectedFiles([]);
            setSuccess('Photo uploaded successfully!');
        } catch (error) {
            console.error('Error uploading photos:', error);
            setError(error.response?.data?.message || 'Failed to upload photos. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const goToCollectionPage = () => {
        // console.log(window.location.href);
        // window.location.href='/collection'
        navigate("/collection")
    };

    const BackToHome = () => {
        navigate('/')
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Upload Pictures</h1>

            {/* Error handling section */}
            {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-red-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 00-1 1v5a1 1 0 102 0V4a1 1 0 00-1-1zM9 12a1 1 0 011-1h.5l.5.5V14a1 1 0 11-2 0v-2.5l.5-.5H9a1 1 0 01-1-1v-1a1 1 0 112 0v1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Success handling section */}
            {success && (
                <div className="rounded-md bg-green-50 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 00-1 1v5a1 1 0 102 0V4a1 1 0 00-1-1zM9 12a1 1 0 011-1h.5l.5.5V14a1 1 0 11-2 0v-2.5l.5-.5H9a1 1 0 01-1-1v-1a1 1 0 112 0v1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">{success}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Form for uploading photos */}
            <form className="w-full max-w-md space-y-8" onSubmit={handleUpload}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="description" className="sr-only">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="photos" className="sr-only">
                            Photos
                        </label>
                        <input
                            id="photos"
                            name="photos"
                            type="file"
                            multiple
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                <div className='flex justify-evenly'> 
                <button
                    onClick={goToCollectionPage}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Go to Collection
                </button>

                <button
                    onClick={BackToHome}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Back To Home
                </button>
                </div>
            </form>

        </div>
    );
};

export default UploadPictures;
