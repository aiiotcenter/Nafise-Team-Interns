'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-2xl font-bold text-black"
        >
          Comply.
        </motion.div>

        {/* Navbar */}
        <motion.nav
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex justify-center space-x-8 text-gray-800 text-base font-medium"
        >
          {['Home', 'About', 'Pricing', 'Contact', 'Blog'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 
                         after:bg-blue-600 after:transition-all after:duration-300 after:origin-center 
                         hover:after:w-full hover:after:left-0"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        {/* Buttons */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="flex justify-end space-x-4"
        >
          <button className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-full hover:bg-gray-100 transition">
            Register
          </button>
        </motion.div>

      </div>
    </header>
  );
}
