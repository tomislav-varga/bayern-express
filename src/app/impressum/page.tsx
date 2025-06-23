import { FC } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impressum | Bayern Express',
  description: 'Impressum und rechtliche Informationen von Bayern Express - Ihr Spezialist für Wasserschadensanierung in Bayern',
};

const ImpressumPage: FC = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Impressum</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-2">
                <p>Bayern Express GmbH</p>
                <p>Schatzbogen 33</p>
                <p>81829 München</p>
                <p>Deutschland</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Kontakt</h2>
              <div className="space-y-2">
                <p>Telefon: +49 (0) 89 620 996 12</p>
                <p>E-Mail: info@bayern-express.de</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Vertreten durch</h2>
              <p>Geschäftsführer: Max Mustermann</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Registereintrag</h2>
              <div className="space-y-2">
                <p>Eintragung im Handelsregister</p>
                <p>Registergericht: Amtsgericht München</p>
                <p>Registernummer: HRB XXXXX</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE XXXXXXXXX</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Aufsichtsbehörde</h2>
              <p>Zuständige Aufsichtsbehörde: Stadt München</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Berufshaftpflichtversicherung</h2>
              <div className="space-y-2">
                <p>Name und Sitz des Versicherers:</p>
                <p>Allianz Versicherungs-AG</p>
                <p>Königinstraße 28</p>
                <p>80802 München</p>
                <p>Geltungsraum der Versicherung: Deutschland</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Haftungsausschluss</h2>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Haftung für Inhalte</h3>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="mt-2">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="mt-2">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
          
          <div className="mt-12 mb-8">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 transition duration-300 font-medium"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default ImpressumPage;
