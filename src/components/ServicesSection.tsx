import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ServiceCard: FC<{
  title: string;
  description: string;
  icon: string;
  slug: string;
}> = ({ title, description, icon, slug }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
      <div className="p-6 flex-grow flex flex-col">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto overflow-hidden">
          <Image src={icon} alt={title} width={96} height={96} className="object-cover" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 text-center hyphens-auto break-words">
          {title}
        </h3>
        <p className="text-gray-600 text-center flex-grow">{description}</p>
      </div>
      <div className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-4 mt-auto">
        <Link href={`/leistungen/${slug}`} className="block w-full text-center text-white font-medium">
          Mehr erfahren
        </Link>
      </div>
    </div>
  );
};

const ServicesSection: FC = () => {
  const services = [
    {
      title: "Gebäudemanagement",
      description: "Professionelle Betreuung Ihrer Immobilie - von der regelmäßigen Inspektion bis zur vorbeugenden Wartung, um Wasserschäden zu vermeiden.",
      icon: "/gebäude-mit-hof.png",
      slug: "gebaeudemanagement"
    },
    {
      title: "Wasserschadensanierung",
      description: "Schnelle und effiziente Behebung von Wasserschäden aller Art - vom Rohrbruch bis zum Hochwasser, mit modernster Technik und erfahrenen Fachkräften.",
      icon: "/wohnzimmer-unter-wasser.png",
      slug: "wasserschadensanierung"
    },
    {
      title: "Renovierung",
      description: "Komplette Wiederherstellung nach Wasserschäden - von der Trocknung über die Schimmelbeseitigung bis hin zum fachgerechten Wiederaufbau Ihrer Räume.",
      icon: "/zimmer-renovierung.png",
      slug: "renovierung"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Unsere Leistungen
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Wir bieten Ihnen ein umfassendes Leistungsspektrum rund um Immobilien und Wasserschäden. Von der vorbeugenden Gebäudepflege über die schnelle Schadensbehebung bis hin zur kompletten Renovierung - bei uns erhalten Sie alles aus einer Hand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              slug={service.slug}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-semibold transition duration-300 shadow-lg">
            Kostenlose Beratung anfordern
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
