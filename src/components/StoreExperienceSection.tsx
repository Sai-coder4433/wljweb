import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { STORE_BRANCHES } from '../data/jewelleryData';
import { Language, StoreBranch } from '../types';

interface StoreExperienceSectionProps {
  currentLang: Language;
}

export const StoreExperienceSection: React.FC<StoreExperienceSectionProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';
  const [selectedBranch, setSelectedBranch] = useState<StoreBranch>(STORE_BRANCHES[0]);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '11:00 AM',
    purpose: 'Bridal Consultation',
  });

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentBooked(true);
    setTimeout(() => {
      setAppointmentBooked(false);
      setShowAppointmentForm(false);
      setFormData({ name: '', phone: '', date: '', time: '11:00 AM', purpose: 'Bridal Consultation' });
    }, 3000);
  };

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-[#9D7A35] font-cinzel text-xs uppercase tracking-[0.25em] mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#B8903C]" />
          <span>{isMr ? 'आमचे दालन' : 'Experience Luxury In Person'}</span>
        </div>
        <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#5A1720] tracking-tight mb-3">
          {isMr ? 'आपल्या जवळचे वाफगावकर लक्ष्मी ज्वेलर्स' : 'Visit Wafgaonkar Laxmi Jewellers'}
        </h2>
        <p className="font-marathi-serif text-[#3A2922]/80 text-base md:text-lg">
          {isMr 
            ? 'आमच्या भव्य दालनात या, चहाचा आस्वाद घेत निवांतपणे सोने आणि हिऱ्यांचे दागिने निवडा.' 
            : 'Step into our heritage boutiques in Pune and Mumbai for bespoke jewellery hospitality.'}
        </p>
      </div>

      {/* Branch Selector Tabs */}
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        {STORE_BRANCHES.map((branch) => (
          <button
            key={branch.id}
            onClick={() => setSelectedBranch(branch)}
            className={`px-6 py-2.5 rounded-full font-marathi-serif text-sm font-semibold transition-all duration-300 ${
              selectedBranch.id === branch.id
                ? 'bg-[#5A1720] text-[#F3F0EA] shadow-lg border border-[#D4B56A]'
                : 'bg-[#EFE4D2]/60 text-[#3A2922] hover:bg-[#EFE4D2] border border-[#B8903C]/30'
            }`}
          >
            {isMr ? branch.marathiName : branch.name}
          </button>
        ))}
      </div>

      {/* Selected Store Card Layout */}
      <div className="bg-[#EFE4D2]/40 rounded-3xl overflow-hidden border border-[#B8903C]/30 luxury-shadow grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Store Ambience Photo / Shop Photo */}
        <div className="lg:col-span-6 relative aspect-[16/11] lg:aspect-auto overflow-hidden bg-[#3E1118] flex items-center justify-center p-8">
          {selectedBranch.image ? (
            <>
              <img
                src={selectedBranch.image}
                alt={selectedBranch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B211D]/80 via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full min-h-[260px] rounded-2xl bg-[#2D0C11] border border-[#B99A5A]/40 p-8 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#4A2252] border border-[#D8C18A]/50 flex items-center justify-center text-[#D8C18A] mb-1 shadow-md">
                <MapPin className="w-7 h-7 text-[#D8C18A]" />
              </div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#F3F0EA] uppercase">
                Shop Photo
              </span>
              <p className="font-marathi-serif text-sm text-[#D8C18A]">
                {isMr ? selectedBranch.marathiName : selectedBranch.name}
              </p>
            </div>
          )}
          
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#3D1017]/90 backdrop-blur-md border border-[#D4B56A]/30 text-[#F3F0EA]">
            <div className="text-xs uppercase font-cinzel text-[#D4B56A] font-semibold mb-0.5">
              {isMr ? selectedBranch.marathiCity : selectedBranch.city} • Chakan
            </div>
            <div className="font-marathi-display text-lg font-bold text-[#F3F0EA]">
              {isMr ? selectedBranch.marathiName : selectedBranch.name}
            </div>
          </div>
        </div>

        {/* Right: Address & Contact Details */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-5 font-marathi-serif">
            
            {/* Address */}
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#5A1720] text-[#D4B56A] flex items-center justify-center flex-shrink-0 mt-1 border border-[#D4B56A]/40">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#9D7A35] font-cinzel uppercase block font-semibold">
                  {isMr ? 'पत्ता' : 'Boutique Address'}
                </span>
                <p className="text-base md:text-lg text-[#2B211D] font-medium leading-relaxed">
                  {isMr ? selectedBranch.marathiAddress : selectedBranch.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#5A1720] text-[#D4B56A] flex items-center justify-center flex-shrink-0 mt-1 border border-[#D4B56A]/40">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#9D7A35] font-cinzel uppercase block font-semibold">
                  {isMr ? 'थेट संपर्क' : 'Phone Assistance'}
                </span>
                <a 
                  href={`tel:${selectedBranch.phone}`} 
                  className="text-base md:text-lg font-bold text-[#5A1720] hover:text-[#B8903C] transition-colors"
                >
                  {selectedBranch.phone}
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#5A1720] text-[#D4B56A] flex items-center justify-center flex-shrink-0 mt-1 border border-[#D4B56A]/40">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#9D7A35] font-cinzel uppercase block font-semibold">
                  {isMr ? 'वेळ' : 'Store Timings'}
                </span>
                <p className="text-base text-[#2B211D] font-medium">
                  {isMr ? selectedBranch.marathiTiming : selectedBranch.timing}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Google Maps, WhatsApp, and Appointment */}
          <div className="pt-4 border-t border-[#B8903C]/20 flex flex-wrap gap-3">
            {/* Google Maps */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-[#5A1720] text-[#5A1720] hover:bg-[#5A1720] hover:text-[#F3F0EA] text-xs font-marathi-serif font-bold transition-all flex items-center space-x-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isMr ? 'गुगल मॅपवर दिशा पहा' : 'Get Directions'}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${selectedBranch.whatsapp}?text=${encodeURIComponent(
                isMr 
                  ? 'नमस्कार, मला वाफगावकर लक्ष्मी ज्वेलर्सच्या दागिन्यांविषयी माहिती हवी आहे.' 
                  : 'Hello, I would like an appointment at Wafgaonkar Laxmi Jewellers.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5B] text-xs font-marathi-serif font-bold transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isMr ? 'व्हॉट्सॲपवर संपर्क' : 'WhatsApp'}</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={() => setShowAppointmentForm(!showAppointmentForm)}
              className="px-6 py-2.5 rounded-full bg-[#5A1720] text-[#F3F0EA] hover:bg-[#3D1017] hover:text-[#D4B56A] text-xs font-marathi-serif font-bold transition-all shadow-md flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4B56A]" />
              <span>{isMr ? 'स्टोअरला भेट द्या (अपॉइंटमेंट)' : 'Book Store Visit'}</span>
            </button>
          </div>

          {/* Quick Appointment Booking Inline Drawer */}
          {showAppointmentForm && (
            <div className="mt-4 p-5 rounded-2xl bg-[#F3F0EA] border border-[#B8903C]/40 animate-in fade-in slide-in-from-top-2 duration-300">
              {appointmentBooked ? (
                <div className="text-center py-4 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                  <div className="font-marathi-display text-lg font-bold text-[#5A1720]">
                    {isMr ? 'आपली भेट नोंदवली गेली आहे!' : 'Appointment Successfully Requested!'}
                  </div>
                  <p className="font-marathi-serif text-xs text-[#3A2922]">
                    {isMr 
                      ? 'आमचे वधू सल्लागार लवकरच आपल्याशी फोन किंवा व्हॉट्सॲपवर संपर्क करतील.' 
                      : 'Our senior jewellery consultant will contact you shortly to confirm.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookAppointment} className="space-y-3 text-left font-marathi-serif text-xs">
                  <div className="font-marathi-display text-base font-bold text-[#5A1720] mb-2">
                    {isMr ? 'व्हीआयपी दालन भेट वेळ निश्चित करा' : 'Reserve A Private Suite Visit'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#3A2922] font-medium mb-1">
                        {isMr ? 'आपले नाव' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isMr ? 'उदा. सौ. जोशी' : 'Your Name'}
                        className="w-full px-3 py-2 rounded-lg border border-[#B8903C]/30 bg-white focus:outline-none focus:border-[#5A1720]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3A2922] font-medium mb-1">
                        {isMr ? 'मोबाईल क्रमांक' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98..."
                        className="w-full px-3 py-2 rounded-lg border border-[#B8903C]/30 bg-white focus:outline-none focus:border-[#5A1720]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#3A2922] font-medium mb-1">
                        {isMr ? 'तारीख' : 'Preferred Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#B8903C]/30 bg-white focus:outline-none focus:border-[#5A1720]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3A2922] font-medium mb-1">
                        {isMr ? 'दागिना प्रकार' : 'Consultation Focus'}
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#B8903C]/30 bg-white focus:outline-none focus:border-[#5A1720]"
                      >
                        <option value="Bridal Jewellery">{isMr ? 'लग्न / वधू खरेदी (Bridal)' : 'Bridal Jewellery'}</option>
                        <option value="Gold Jewellery">{isMr ? 'सोन्याचे दागिने' : 'Gold Jewellery'}</option>
                        <option value="Silver Jewellery">{isMr ? 'चांदीचे दागिने व पूजा भांडी' : 'Silver Jewellery & Articles'}</option>
                        <option value="Custom Order">{isMr ? 'खास पारंपरिक घडणावळ' : 'Custom Heirlooms'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAppointmentForm(false)}
                      className="px-4 py-2 rounded-md border border-[#3A2922]/30 text-[#3A2922] hover:bg-gray-100 font-medium"
                    >
                      {isMr ? 'रद्द करा' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-md bg-[#5A1720] text-[#F3F0EA] hover:bg-[#3D1017] font-bold"
                    >
                      {isMr ? 'भेट बुक करा' : 'Confirm Visit'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
