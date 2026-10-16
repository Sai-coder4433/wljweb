import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface Testimonial {
  id: number;
  nameMr: string;
  nameEn: string;
  locationMr: string;
  locationEn: string;
  reviewMr: string;
  reviewEn: string;
  occasionMr: string;
  occasionEn: string;
  rating: number;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    nameMr: 'सौ. अनघा देशपांडे',
    nameEn: 'Mrs. Anagha Deshpande',
    locationMr: 'चाकण, पुणे',
    locationEn: 'Chakan, Pune',
    reviewMr: 'आमच्या तिन्ही पिढ्या वाफगावकर लक्ष्मी ज्वेलर्सकडूनच सोन्याचे दागिने खरेदी करत आहेत. मुलीच्या लग्नासाठी पेशवाई ठुशी आणि कोल्हापुरी साज बनवून घेतला. कारागिरी अतिशय रेखीव आणि अस्सल ९१६ हॉलमार्कची खात्री.',
    reviewEn: 'Our family has trusted Wafgaonkar Laxmi Jewellers across three generations. We had a Peshwai Thushi and Kolhapuri Saaj made for our daughter’s wedding. The craftsmanship is breathtaking with guaranteed 916 BIS Hallmark purity.',
    occasionMr: 'लग्नसोहळा वधू साज',
    occasionEn: 'Bridal Wedding Set',
    rating: 5,
    date: 'जानेवारी २०२६',
  },
  {
    id: 2,
    nameMr: 'श्री. विजयराव गायकवाड',
    nameEn: 'Mr. Vijayrao Gaikwad',
    locationMr: 'खेड - चाकण',
    locationEn: 'Khed - Chakan',
    reviewMr: 'जुनी बाजारपेठ शाखेमध्ये अगदी घरच्यासारखा आदर आणि विश्वास मिळतो. दागिन्यांचे वजन आणि कॅरेटमध्ये पूर्ण पारदर्शकता असते. गुढीपाडव्याला घेतलेले दागिने अत्यंत सुंदर घडवले आहेत.',
    reviewEn: 'At the Juni Bazarpeth showroom, the family warmth and trust are exceptional. Total transparency in weight, hallmark certification, and gold rates. Truly our family jeweller since decades.',
    occasionMr: 'कौटुंबिक सुवर्ण खरेदी',
    occasionEn: 'Family Gold Heirloom',
    rating: 5,
    date: 'मार्च २०२६',
  },
  {
    id: 3,
    nameMr: 'सौ. प्रियांका मोहिते-पाटील',
    nameEn: 'Mrs. Priyanka Mohite-Patil',
    locationMr: 'पिंपरी-चिंचवड, पुणे',
    locationEn: 'Pimpri-Chinchwad, Pune',
    reviewMr: 'माणिक चौक शाखेतून घेतलेले नक्षीदार तोडे आणि ब्राह्मणी नथ सर्वांना खूप आवडली. पारंपारिक महाराष्ट्रीयन दागिन्यांची इतकी अस्सल आणि नजाकतदार डिझाइन दुसरीकडे कुठेही पाहायला मिळत नाही.',
    reviewEn: 'The handcrafted Tode and Brahmani Nath purchased from the Manik Chowk showroom drew compliments from everyone. Such authentic Maharashtrian heritage artistry is rarely found elsewhere.',
    occasionMr: 'पारंपरिक सण व समारंभ',
    occasionEn: 'Traditional Festivities',
    rating: 5,
    date: 'फेब्रुवारी २०२६',
  },
  {
    id: 4,
    nameMr: 'श्री. सचिन बोरकर',
    nameEn: 'Mr. Sachin Borkar',
    locationMr: 'चाकण औद्योगिक क्षेत्र',
    locationEn: 'Chakan MIDC',
    reviewMr: '१९५१ पासूनची परंपरा त्यांच्या बोलण्यातून आणि दागिन्यांच्या गुणवत्तेतून जाणवते. दररोजच्या वापरासाठी नाजूक मंगळसूत्र आणि अंगठी घेतली. उत्कृष्ट ग्राहक सेवा!',
    reviewEn: 'The legacy since 1951 is palpable in their courteous guidance and gold perfection. Purchased an everyday mangalsutra and ring—delightful customer experience.',
    occasionMr: 'दैनंदिन सुवर्ण खरेदी',
    occasionEn: 'Daily Wear Jewellery',
    rating: 5,
    date: 'एप्रिल २०२६',
  },
];

interface TestimonialsSectionProps {
  currentLang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ currentLang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMr = currentLang === 'mr';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials-section" className="py-14 md:py-22 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center space-x-2 text-[#D7B95F] font-cinzel text-xs uppercase tracking-[0.25em] mb-2 font-semibold">
          <Quote className="w-3.5 h-3.5 text-[#D7B95F]" />
          <span>VOICES OF TRUST • SINCE 1951</span>
        </div>
        <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#3C0015] tracking-tight">
          {isMr ? 'ग्राहकांचे मनोगत व विश्वास' : 'Customer Testimonials'}
        </h2>
        <div className="w-16 h-[1.5px] bg-[#D7B95F] mx-auto mt-3 mb-2" />
        <p className="font-marathi-serif text-xs sm:text-sm md:text-base text-[#766A61] mt-2">
          {isMr
            ? 'पिढ्यान्पिढ्या जपलेला कौटुंबिक स्नेह आणि शुद्ध सुवर्णाचा अतुट विश्वास.'
            : 'Genuine words of enduring trust and generational relationships across Maharashtra.'}
        </p>
      </div>

      {/* Main Testimonial Carousel Card */}
      <div className="relative max-w-4xl mx-auto bg-[#FAF8F4] rounded-3xl border border-[#D7B95F]/35 p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden">
        {/* Soft Background Accent Watermark */}
        <div className="absolute right-6 -bottom-6 text-[#D7B95F]/08 select-none pointer-events-none">
          <Quote className="w-48 h-48" />
        </div>

        <div className="relative z-10 flex flex-col justify-between space-y-6">
          {/* Top Row: Stars + Hallmark Assurance */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D7B95F] text-[#D7B95F]" />
              ))}
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#3C0015]/10 border border-[#D7B95F]/40 text-[#3C0015] text-[10px] sm:text-xs font-marathi-serif font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D7B95F]" />
              <span>{isMr ? current.occasionMr : current.occasionEn}</span>
            </div>
          </div>

          {/* Review Text */}
          <blockquote className="font-marathi-serif text-base sm:text-xl md:text-2xl text-[#29231F] leading-relaxed italic">
            “{isMr ? current.reviewMr : current.reviewEn}”
          </blockquote>

          {/* Reviewer Details + Controls */}
          <div className="pt-4 border-t border-[#D7B95F]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-marathi-display text-base sm:text-lg font-bold text-[#3C0015]">
                {isMr ? current.nameMr : current.nameEn}
              </h4>
              <p className="text-xs text-[#766A61] font-marathi-serif mt-0.5">
                {isMr ? current.locationMr : current.locationEn} • {current.date}
              </p>
            </div>

            {/* Arrows & Dots */}
            <div className="flex items-center space-x-3 self-end sm:self-auto">
              <div className="flex space-x-1.5 mr-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex ? 'w-6 bg-[#3C0015]' : 'w-2 bg-[#D7B95F]/40 hover:bg-[#D7B95F]'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-white border border-[#D7B95F]/40 text-[#3C0015] hover:bg-[#3C0015] hover:text-[#FAF8F4] transition-all flex items-center justify-center shadow-xs cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-white border border-[#D7B95F]/40 text-[#3C0015] hover:bg-[#3C0015] hover:text-[#FAF8F4] transition-all flex items-center justify-center shadow-xs cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
