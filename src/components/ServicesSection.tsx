import { FC } from 'react';
import Image from 'next/image';

const ServiceCard: FC<{
  title: string;
  description: string;
  icon: string;
}> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="p-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Image src={icon} alt={title} width={32} height={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
      <div className="bg-blue-600 py-4">
        <button className="block w-full text-center text-white font-medium">
          Mehr erfahren
        </button>
      </div>
    </div>
  );
};

const ServicesSection: FC = () => {
  const services = [
    {
      title: "Leckageortung",
      description: "Mit modernster Technik spüren wir auch versteckte Lecks präzise und zerstörungsfrei auf.",
      icon: "/file.svg"
    },
    {
      title: "Trocknung",
      description: "Unsere leistungsstarken Trocknungsgeräte sorgen für eine schnelle und effiziente Trocknung aller betroffenen Bereiche.",
      icon: "/file.svg"
    },
    {
      title: "Sanierung",
      description: "Nach der Trocknung kümmern wir uns um die fachgerechte Wiederherstellung und Sanierung der betroffenen Räume.",
      icon: "/file.svg"
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
            Wir bieten Ihnen ein umfassendes Leistungsspektrum rund um die Behebung von Wasserschäden. Von der Leckageortung über die Trocknung bis hin zur vollständigen Sanierung - bei uns erhalten Sie alles aus einer Hand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
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
