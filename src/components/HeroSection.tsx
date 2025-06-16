import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: FC = () => {
  return (
    <section className="relative bg-blue-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/wohnzimmer-wasserwelle.png"
          alt="Wasserschaden Hintergrund"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.45// Semi-transparent to maintain text readability
          }}
          priority
        />
        {/* Gradient overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800/90 to-blue-900/80 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col relative z-10">

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 md:pr-8 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Professionelle Wasserschaden-Behebung in Bayern
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Schnell, zuverlässig und professionell. Wir sind 24/7 für Sie da, wenn das Wasser einmal nicht dort ist, wo es sein sollte.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#contact" className="bg-white text-blue-900 hover:bg-blue-100 px-8 py-4 rounded-md font-semibold transition duration-300 shadow-lg text-center">
                Kostenlose Beratung
              </Link>
              <Link href="#services" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-md font-semibold transition duration-300 text-center">
                Unsere Leistungen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
