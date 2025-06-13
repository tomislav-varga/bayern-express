import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: FC = () => {
  return (
    <section className="relative bg-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col relative z-10">
        {/* Mobile: Image first, then text */}
        <div className="md:hidden flex justify-center mb-10">
          <Image 
            src="/wohnzimmer-wasserwelle.png" 
            alt="Wasserschaden Behebung" 
            width={500} 
            height={500}
            className="rounded-lg shadow-2xl"
          />
        </div>

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
          
          {/* Desktop: Show image on the right */}
          <div className="hidden md:flex md:w-5/12 justify-center">
            <Image 
              src="/wohnzimmer-wasserwelle.png" 
              alt="Wasserschaden Behebung" 
              width={600} 
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
