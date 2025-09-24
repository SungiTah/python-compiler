import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            <span className="font-semibold text-gray-800 dark:text-white">Python Compiler</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Made with ❤️ by Mohamed Taha Laaouan
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 md:mt-0">
            © {new Date().getFullYear()} Python Compiler. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;