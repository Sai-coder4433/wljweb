import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface StoreContactSectionProps {
  currentLang: Language;
}

export const StoreContactSection: React.FC<StoreContactSectionProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';

  const store = {
    brandNameMr: 'वाफगावकर लक्ष्मी ज्वेलर्स',
    brandNameEn: 'Wafgaonkar Laxmi Jewellers',
    addressMr: 'लक्ष्मी हेरिटेज भवन, एम. जी. रोड, कॅम्प, पुणे - ४११००१',
    addressEn: 'Laxmi Heritage Bhavan, M.G. Road, Camp, Pune - 411001',
    phone: '0000000000',
    phoneDisplay: '0000000000',
    whatsapp: '910000000000',
    timingMr: 'सकाळी १०:३० ते रात्री ८:३० (दररोज सुरू)',
    timingEn: '10:30 AM to 8:30 PM (Open All 7 Days)',
    mapsUrl: 'https://maps.google.com/?q=Laxmi+Road+Camp+Pune',
  };

  return (
    <section id="store-contact-section" className="py-14 md:py-20 px-4 md:px-8 max-w-7xl mx-auto text-left">
      <div className="bg-[#F7F2E8] border border-[#B8954A]/30 rounded-2xl p-8 md:p-12 minimal-shadow">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#B8954A] font-cinzel font-semibold block mb-1">
            {isMr ? 'दालन दर्शन' : 'Showroom Visit'}
          </span>
          <h2 className="font-marathi-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#591923]">
            {isMr ? 'आमच्या दालनाला भेट द्या' : 'Visit Our Showroom'}
          </h2>
        </div>

        {/* Store Card Content */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 sm:p-8 border border-[#B8954A]/25 space-y-6">
          
          <div>
            <h3 className="font-marathi-display text-xl sm:text-2xl font-bold text-[#591923] mb-1">
              {isMr ? store.brandNameMr : store.brandNameEn}
            </h3>
            <span className="text-xs text-[#B8954A] font-cinzel font-medium uppercase tracking-wider">
              Pune Heritage Flagship • Since 1951
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-[#B8954A]/20 text-sm font-marathi-serif text-[#30231E]">
            
            {/* Address */}
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#B8954A] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-xs uppercase tracking-wider text-[#30231E]/60 mb-0.5">
                  {isMr ? 'पत्ता' : 'Address'}
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#30231E]/90">
                  {isMr ? store.addressMr : store.addressEn}
                </p>
              </div>
            </div>

            {/* Phone number */}
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#B8954A] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-xs uppercase tracking-wider text-[#30231E]/60 mb-0.5">
                  {isMr ? 'फोन नंबर' : 'Phone'}
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#30231E]/90">
                  {store.phoneDisplay}
                </p>
              </div>
            </div>

            {/* Opening hours */}
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#B8954A] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-xs uppercase tracking-wider text-[#30231E]/60 mb-0.5">
                  {isMr ? 'वेळ' : 'Hours'}
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#30231E]/90">
                  {isMr ? store.timingMr : store.timingEn}
                </p>
              </div>
            </div>

          </div>

          {/* Action Buttons: Google Maps, WhatsApp, Call */}
          <div className="pt-6 border-t border-[#B8954A]/20 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            
            {/* Google Maps वर पहा */}
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#B8954A] text-[#591923] hover:bg-[#591923] hover:text-[#F7F2E8] text-xs font-marathi-serif font-semibold transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>{isMr ? 'Google Maps वर पहा' : 'View on Google Maps'}</span>
            </a>

            {/* WhatsApp करा */}
            <a
              href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                isMr
                  ? 'नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला दागिन्यांविषयी माहिती हवी आहे.'
                  : 'Hello Wafgaonkar Laxmi Jewellers, I would like information regarding your jewellery.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-marathi-serif font-semibold transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isMr ? 'WhatsApp करा' : 'Chat on WhatsApp'}</span>
            </a>

            {/* कॉल करा */}
            <a
              href={`tel:${store.phone}`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#591923] text-[#F7F2E8] hover:bg-[#30231E] text-xs font-marathi-serif font-semibold transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{isMr ? 'कॉल करा' : 'Call Store'}</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
