import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          About This Project
        </h1>

        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Welcome to our unique platform dedicated to preserving and cherishing your precious past memories. This is your digital time capsule where you can upload and store photos that capture meaningful moments — from family gatherings and childhood memories to your favorite vacation spots and life milestones.
        </p>

        <p className="text-gray-700 text-base leading-relaxed mb-6">
          Built using modern technologies like <span className="font-semibold text-indigo-600">React</span> and <span className="font-semibold text-indigo-600">React Router DOM</span>, this platform ensures an intuitive, fast, and secure way to store and revisit the moments that matter most. It’s our mission to make your memory-keeping experience seamless and joyful.
        </p>

        <button
          onClick={handleBackClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default About;
