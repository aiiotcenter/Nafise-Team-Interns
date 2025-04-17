'use client';

import { motion } from 'framer-motion';
import { text } from 'stream/consumers';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 ">
        
        {/* Logo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-bold text-[#751944]"
        >
          ProfDux
        </motion.div>

        {/* Navbar */}
        <motion.nav
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex justify-center space-x-10 text-gray-800 text-base font-medium"
        >
          {['Home', 'About', 'Pricing', 'Contact', 'Blog'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 
                         after:bg-[#751944] after:transition-all after:duration-300 after:origin-center 
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
          <button className="px-4 py-2 rounded-full bg-[#47BA00] text-white transition hover:bg-blue-500">
            Login
          </button>
          <button className="px-4 py-2 rounded-full bg-[#751944] text-white transition hover:bg-blue-500">
            Register
          </button>
        </motion.div>

      </div>
    </header>
  );
}
