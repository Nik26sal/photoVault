import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

export default function Home() {
  const { isLoggedIn } = useOutletContext();

  return (
    <div className="mx-auto w-full max-w-7xl">
      <aside className="relative overflow-hidden text-black rounded-lg mx-2 sm:mx-16 py-24 sm:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1750175546521-67761dbc7400?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="background"
            className="object-cover w-full h-full opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Add Photos
            <br />
            <span className="text-orange-700">Enjoy your past memories</span>
          </h2>

          <Link
            to={isLoggedIn ? "/uploadPictures" : "/login"}
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-orange-700 rounded-full hover:bg-orange-800 transition duration-200"
          >
            <svg
              fill="white"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
            </svg>
            Start
          </Link>
        </div>
      </aside>

      <div className="grid place-items-center mt-16 sm:mt-24 animate-fade-in delay-200">
        <img
          className="w-48 sm:w-96 rounded-xl shadow-lg"
          src="https://plus.unsplash.com/premium_photo-1750681051145-45991d0693ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="highlight"
        />
      </div>

      <h1 className="text-center text-xl sm:text-2xl py-12 font-medium px-4 sm:px-0 leading-relaxed max-w-4xl mx-auto animate-fade-in delay-500">
        Gazing at old photographs, we are reminded that every moment, once lived, becomes a timeless chapter in the story of who we are.
      </h1>
    </div>
  );
}
