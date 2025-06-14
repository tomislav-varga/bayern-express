'use client';

import { FC, useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import GoogleMapComponent from './GoogleMapComponent';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactSection: FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Ref to store the timeout ID
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear message after 5 seconds when it appears
  useEffect(() => {
    if (submitStatus.message) {
      // Clear any existing timeout
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      // Set new timeout
      messageTimeoutRef.current = setTimeout(() => {
        setSubmitStatus({});
      }, 5000);
    }
    
    // Cleanup on unmount
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [submitStatus.message]);
  
  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error for this field
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Set submitting state
    setIsSubmitting(true);
    setSubmitStatus({});
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        
        setSubmitStatus({
          success: true,
          message: 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.'
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
        });
        
        // If there are validation errors from the server
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors: FormErrors = {};
          data.errors.forEach((error: string) => {
            if (error.includes('Name')) serverErrors.name = error;
            if (error.includes('E-Mail')) serverErrors.email = error;
            if (error.includes('Telefon')) serverErrors.phone = error;
            if (error.includes('Nachricht')) serverErrors.message = error;
          });
          setErrors(serverErrors);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        {/* Grid layout with reordered sections for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Form section - appears first on mobile */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg order-1 md:order-2">
            <h3 className="text-xl font-semibold mb-4">Schnellkontakt</h3>
            
            {/* Status message display with countdown animation */}
            {submitStatus.message && (
              <div 
                className={`p-4 mb-4 rounded-md relative overflow-hidden ${
                  submitStatus.success 
                    ? 'bg-green-600/40 border border-green-400/50' 
                    : 'bg-red-600/40 border border-red-400/50'
                }`}
              >
                <div className="flex items-center">
                  {submitStatus.success ? (
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                  {submitStatus.message}
                </div>
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-white/60 countdown-animation"
                />
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-white/20 border ${errors.name ? 'border-red-400' : 'border-blue-300/30'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70`}
                  placeholder="Ihr Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-300">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-white/20 border ${errors.email ? 'border-red-400' : 'border-blue-300/30'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70`}
                  placeholder="Ihre E-Mail-Adresse"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-white/20 border ${errors.phone ? 'border-red-400' : 'border-blue-300/30'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70`}
                  placeholder="Ihre Telefonnummer"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-300">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-white/20 border ${errors.message ? 'border-red-400' : 'border-blue-300/30'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-blue-200/70`}
                  placeholder="Wie können wir Ihnen helfen?"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-300">{errors.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-white hover:bg-blue-100'} text-blue-900 px-6 py-3 rounded-md font-semibold transition duration-300 shadow-md flex justify-center items-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird gesendet...
                  </>
                ) : 'Nachricht senden'}
              </button>
            </form>
          </div>
          
          {/* Contact information section - appears second on mobile */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-4">Unsere Kontaktdaten</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-300 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div className="flex flex-col space-y-2 w-full">
                  <address className="not-italic">
                    Schatzbogen 33<br />
                    81829 München
                  </address>
                  <GoogleMapComponent 
                    address="Schatzbogen 33, 81829 München" 
                    height="180px"
                    zoom={14}
                  />
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-300 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <p><a href="tel:+498962099612" className="hover:underline">+49 (0) 89 620 996 12</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-300 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <p><a href="mailto:info@bayern-express.de" className="hover:underline">info@bayern-express.de</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-300 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p>Montag - Freitag: 8:00 - 18:00 Uhr</p>
                  <p className="mt-1">24/7 Notdienst für Wasserschäden</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
