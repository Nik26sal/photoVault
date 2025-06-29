import { useState, useEffect } from 'react';
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
          headers: { Authorization: `Bearer ${token}` },
        });
        setPhotos(res.data);
      } catch (error) {
        setError('Failed to fetch photos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPhotos();
  }, []);

  const deletePhoto = async (photoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3456/user/photos/${photoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhotos(prev => prev.filter(photo => photo._id !== photoId));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete photo.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading your photos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-10">Your Photo Collection</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {photos.map((photo, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={photo.photoFiles[0]}
              alt={`Photo ${index + 1}`}
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm text-gray-600 text-center px-2">{photo.description}</p>
            <button
              onClick={() => deletePhoto(photo._id)}
              className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate('/uploadPictures')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
        >
          Go to Upload Section
        </button>
      </div>
    </div>
  );
};

export default Collection;
