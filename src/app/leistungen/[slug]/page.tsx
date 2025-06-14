import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Definiere die Services-Daten für die Detailseiten
const servicesData = [
  {
    title: "Gebäudemanagement",
    description: "Professionelle Betreuung Ihrer Immobilie - von der regelmäßigen Inspektion bis zur vorbeugenden Wartung, um Wasserschäden zu vermeiden.",
    icon: "/gebäude-mit-hof.png",
    slug: "gebaeudemanagement",
    fullDescription: `
      <h2>Professionelles Gebäudemanagement für Ihre Immobilie</h2>
      <p>Unser umfassendes Gebäudemanagement sorgt dafür, dass Ihre Immobilie stets in bestem Zustand bleibt. Wir übernehmen die regelmäßige Inspektion und Wartung aller Gebäudekomponenten, um potenzielle Probleme frühzeitig zu erkennen und zu beheben, bevor sie zu kostspieligen Schäden führen.</p>
      
      <h3>Unsere Gebäudemanagement-Leistungen umfassen:</h3>
      <ul>
        <li>Regelmäßige Inspektion der Gebäudesubstanz</li>
        <li>Überprüfung und Wartung von Wasserleitungen und Sanitäranlagen</li>
        <li>Kontrolle von Dachflächen und Fassaden</li>
        <li>Feuchtigkeitsmessungen zur Früherkennung von Wasserschäden</li>
        <li>Beratung zu präventiven Maßnahmen</li>
        <li>Koordination von Handwerkern und Dienstleistern</li>
        <li>24/7 Notfallservice bei akuten Problemen</li>
      </ul>
      
      <p>Mit unserem professionellen Gebäudemanagement reduzieren Sie das Risiko von teuren Wasserschäden erheblich und verlängern die Lebensdauer Ihrer Immobilie. Unsere erfahrenen Techniker erkennen potenzielle Probleme, bevor sie zu ernsthaften Schäden führen können.</p>
      
      <p>Kontaktieren Sie uns noch heute für ein individuelles Angebot, das genau auf die Bedürfnisse Ihrer Immobilie zugeschnitten ist. Wir beraten Sie gerne persönlich und erstellen einen maßgeschneiderten Wartungsplan für Ihr Gebäude.</p>
    `
  },
  {
    title: "Wasserschadensanierung",
    description: "Schnelle und effiziente Behebung von Wasserschäden aller Art - vom Rohrbruch bis zum Hochwasser, mit modernster Technik und erfahrenen Fachkräften.",
    icon: "/wohnzimmer-unter-wasser.png",
    slug: "wasserschadensanierung",
    fullDescription: `
      <h2>Professionelle Wasserschadensanierung</h2>
      <p>Wenn das Wasser erst einmal in Ihr Gebäude eingedrungen ist, zählt jede Minute. Unsere Experten für Wasserschadensanierung sind rund um die Uhr für Sie im Einsatz, um schnell und effizient alle Arten von Wasserschäden zu beheben – vom kleinsten Rohrbruch bis hin zu umfangreichen Hochwasserschäden.</p>
      
      <h3>Unser Leistungsumfang bei der Wasserschadensanierung:</h3>
      <ul>
        <li>Sofortige Schadensaufnahme und Dokumentation</li>
        <li>Professionelle Leckageortung mit modernster Technik</li>
        <li>Schnelles Abpumpen von Wasser</li>
        <li>Einsatz hocheffizienter Trocknungsgeräte</li>
        <li>Kontinuierliche Feuchtigkeitsmessung und -überwachung</li>
        <li>Schimmelvermeidung und -bekämpfung</li>
        <li>Koordination mit Versicherungen</li>
        <li>Vollständige Dokumentation für Ihre Versicherung</li>
      </ul>
      
      <p>Unser erfahrenes Team verfügt über das Fachwissen und die modernste Ausrüstung, um selbst schwerwiegende Wasserschäden effektiv zu beheben. Wir arbeiten schnell und gründlich, um Folgeschäden wie Schimmelbildung zu vermeiden und die Struktur Ihres Gebäudes zu schützen.</p>
      
      <p>Im Notfall erreichen Sie uns 24 Stunden am Tag, 7 Tage die Woche. Unsere Techniker sind innerhalb kürzester Zeit bei Ihnen vor Ort, um den Schaden zu begrenzen und mit der professionellen Sanierung zu beginnen.</p>
    `
  },
  {
    title: "Renovierung",
    description: "Komplette Wiederherstellung nach Wasserschäden - von der Trocknung über die Schimmelbeseitigung bis hin zum fachgerechten Wiederaufbau Ihrer Räume.",
    icon: "/zimmer-renovierung.png",
    slug: "renovierung",
    fullDescription: `
      <h2>Fachgerechte Renovierung nach Wasserschäden</h2>
      <p>Nach der erfolgreichen Trocknung und Sanierung eines Wasserschadens ist eine professionelle Renovierung der betroffenen Bereiche der letzte wichtige Schritt, um Ihre Räume wieder in ihren ursprünglichen Zustand zu versetzen oder sogar zu verbessern. Unser erfahrenes Renovierungsteam sorgt dafür, dass von dem Wasserschaden keine Spuren mehr zu sehen sind.</p>
      
      <h3>Unsere umfassenden Renovierungsleistungen beinhalten:</h3>
      <ul>
        <li>Wiederaufbau beschädigter Wände und Decken</li>
        <li>Erneuerung von Bodenbelägen aller Art</li>
        <li>Austausch beschädigter Türen und Zargen</li>
        <li>Malerarbeiten in höchster Qualität</li>
        <li>Installation neuer Elektrik nach Wasserschäden</li>
        <li>Erneuerung von Sanitärinstallationen</li>
        <li>Montage neuer Küchenmöbel und -geräte</li>
        <li>Abstimmung aller Arbeiten mit Ihrer Versicherung</li>
      </ul>
      
      <p>Wir verstehen, dass ein Wasserschaden ein stressiges Ereignis ist. Deshalb machen wir den Renovierungsprozess für Sie so unkompliziert wie möglich. Unsere Handwerker arbeiten sauber, zuverlässig und termingerecht, um Ihre Räume schnell wieder bewohnbar zu machen.</p>
      
      <p>Als Komplettanbieter koordinieren wir alle notwendigen Gewerke und sorgen für einen reibungslosen Ablauf. Sie haben nur einen Ansprechpartner und müssen sich um nichts kümmern. Sprechen Sie uns an – wir beraten Sie gerne zu den Möglichkeiten der Renovierung nach einem Wasserschaden.</p>
    `
  }
];

// Define correct page props type for Next.js App Router
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// This is a Server Component
export default function ServiceDetailPage({ params }: Props) {
  // Finde den Service anhand des Slugs
  const service = servicesData.find(service => service.slug === params.slug);
  
  // Wenn kein Service gefunden wurde, zeige 404-Seite
  if (!service) {
    notFound();
  }
  
  return (
    <>
      <Navbar />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={128} 
                    height={128} 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{service.title}</h1>
                  <p className="text-lg text-gray-600">{service.description}</p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: service.fullDescription }} />
              
              <div className="mt-10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <Link
                  href="/#services"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Zurück zu allen Leistungen
                </Link>
                
                <Link
                  href="/#contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 shadow-md"
                >
                  Kostenlose Beratung anfordern
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
