import { Link, NavLink } from 'react-router-dom';

const capitalize = (str) => str && str[0].toUpperCase() + str.slice(1);

const Header = ({ isLoggedIn, username, handleLogout }) => {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      <nav className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
        <Link to="/about" className="flex items-center space-x-2">
          <img
            src="https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AAAAA?rs=1&pid=ImgDetMain"
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-indigo-700">MyGallery</span>
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 font-medium text-sm px-2 py-1 rounded-md">
                Welcome, {capitalize(username)}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-md hover:bg-indigo-700 transition"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="border border-indigo-600 text-indigo-600 px-4 py-2 text-sm rounded-md hover:bg-indigo-50 transition"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
