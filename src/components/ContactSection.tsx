import { FC } from 'react';

const ContactSection: FC = () => {
  return (
    <section id="contact" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kontaktieren Sie uns</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Haben Sie Fragen zu unseren Leistungen oder benötigen Sie Hilfe bei einem Wasserschaden? Kontaktieren Sie uns für eine kostenlose Beratung.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Unsere Kontaktdaten</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-300 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <address className="not-italic">
                  Wasserstraße 123<br />
                  80123 München
                </address>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>089 12345678</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:info@bayern-express.de" className="hover:text-blue-300 transition duration-300">
                  info@bayern-express.de
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p>Notfallhotline (24/7):</p>
                  <p className="font-bold text-lg">0800 1234567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Schnellkontakt</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-blue-300/30 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70"
                  placeholder="Ihr Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-blue-300/30 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70"
                  placeholder="Ihre E-Mail-Adresse"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-blue-300/30 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70"
                  placeholder="Ihre Telefonnummer"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-blue-300/30 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70"
                  placeholder="Wie können wir Ihnen helfen?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-white text-blue-900 hover:bg-blue-100 px-6 py-3 rounded-md font-semibold transition duration-300 shadow-md"
              >
                Nachricht senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
