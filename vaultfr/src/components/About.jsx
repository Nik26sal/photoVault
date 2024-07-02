// src/components/About.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5 md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-4 text-center">About This Project</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our unique platform dedicated to preserving and cherishing your precious past memories. Our website serves as a digital time capsule where you can upload and store pictures that hold significant memories from your past. Whether it's a family gathering, a childhood memory, a favorite vacation spot, or any special moment, our platform ensures that these memories are securely preserved and easily accessible for you to revisit and share.
        </p>
        <p className="text-gray-700 mb-6">
          Our platform is built with the latest technologies, including React and React Router DOM, to provide a seamless and user-friendly experience. We understand the value of your memories and have designed this website to make the process of uploading, storing, and viewing your pictures as simple and intuitive as possible.
        </p>
        <button 
          onClick={handleBackClick} 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default About;
