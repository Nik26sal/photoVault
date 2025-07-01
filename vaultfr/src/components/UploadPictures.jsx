import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadPictures = () => {
  const navigate = useNavigate();
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
        const res = await axios.get('https://photo-vault-yayq.vercel.app/user/photos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const photosData = res.data.map(photo => photo.photoFiles[0]);
        setPhotos(photosData);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch photos.');
      }
    };

    fetchUserPhotos();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('photos', file));
    formData.append('description', description);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://photo-vault-yayq.vercel.app/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setPhotos(prev => [...prev, res.data.photo.photoFiles[0]]);
      setDescription('');
      setSelectedFiles([]);
      setSuccess('Photo uploaded successfully!');
    } catch (error) {
      console.log("object")
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Upload Your Pictures</h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4 text-sm font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-sm font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Enter a description"
            />
          </div>

          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
              Select Photos
            </label>
            <input
              id="photos"
              name="photos"
              type="file"
              multiple
              required
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/collection')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            View Collection
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPictures;
