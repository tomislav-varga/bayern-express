"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FC, useState } from 'react';

const Navbar: FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        {/*             <Image 
              src="/bayern-express-team-logo.png" 
              alt="Bayern Express Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            /> */}
                        <Image
                            src="/bayern-express-team-schrift.jpg"
                            alt="Bayern Express Schriftzug"
                            width={100}
                            height={50}
                            className="ml-0 block w-[80px] sm:w-[100px]"
                            priority
                        />
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
                    <button
                        className="text-gray-500 hover:text-blue-800 focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Menü öffnen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="flex flex-col space-y-4 py-4">
                            <Link
                                href="#about"
                                className="text-gray-600 hover:text-blue-800 transition duration-300 px-4 py-2 hover:bg-gray-50 rounded-md"
                                onClick={closeMobileMenu}
                            >
                                Über uns
                            </Link>
                            <Link
                                href="#services"
                                className="text-gray-600 hover:text-blue-800 transition duration-300 px-4 py-2 hover:bg-gray-50 rounded-md"
                                onClick={closeMobileMenu}
                            >
                                Leistungen
                            </Link>
                            <Link
                                href="#contact"
                                className="text-gray-600 hover:text-blue-800 transition duration-300 px-4 py-2 hover:bg-gray-50 rounded-md"
                                onClick={closeMobileMenu}
                            >
                                Kontakt
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
