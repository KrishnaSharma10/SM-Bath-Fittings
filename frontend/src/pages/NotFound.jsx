// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <h1 className="text-7xl font-bold text-red-500">404</h1>
            <p className="text-xl md:text-2xl mt-4 text-gray-700">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="mt-6 inline-block bg-red-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
