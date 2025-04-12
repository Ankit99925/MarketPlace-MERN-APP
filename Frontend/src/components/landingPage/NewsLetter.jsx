import React from 'react'

const NewsLetter = () => {
  return (
     <div className="bg-green-800 rounded-xl p-8 text-center mb-16">
          <h3 className="text-white font-bold text-2xl mb-4">
            Join Our Green Community
          </h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for gardening tips, plant care guides,
            and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-lg focus:outline-none"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
              Subscribe
            </button>
          </div>
        </div>
  );
};

export default NewsLetter