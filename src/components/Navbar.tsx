import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/file.svg" 
              alt="Bayern Express Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <span className="text-xl font-bold text-blue-800">Bayern Express</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="#about" className="text-gray-600 hover:text-blue-800 transition duration-300">
            Über uns
          </Link>
          <Link href="#services" className="text-gray-600 hover:text-blue-800 transition duration-300">
            Leistungen
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-blue-800 transition duration-300">
            Kontakt
          </Link>
        </nav>
        
        <div className="md:hidden">
          <button className="text-gray-500 hover:text-blue-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
