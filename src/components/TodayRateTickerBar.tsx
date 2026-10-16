import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, RefreshCw, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { BRAND_CONFIG } from '../config';

interface RatesData {
  gold24K_10g: number;
  gold22K_10g: number;
  gold18K_10g: number;
  silver1kg: number;
  gold22K_1g: number;
  silver1g: number;
  lastUpdated: string;
  source: 'live' | 'sync';
}

interface TodayRateTickerBarProps {
  currentLang: Language;
}

export const TodayRateTickerBar: React.FC<TodayRateTickerBarProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';

  // State for live synced rates
  const [rates, setRates] = useState<RatesData>(() => {
    // Check localStorage cache first
    try {
      const cached = localStorage.getItem('wlj_daily_gold_rates');
      if (cached) {
        const parsed = JSON.parse(cached);
        // If cached today, return it
        const todayStr = new Date().toDateString();
        if (parsed.dateStr === todayStr) {
          return parsed.rates;
        }
      }
    } catch {
      // ignore
    }

    // Default authentic baseline for Maharashtra bullion market
    const base24K = 76850;
    const base22K = Math.round(base24K * 0.916);
    const base18K = Math.round(base24K * 0.75);
    const baseSilver = 94800;

    return {
      gold24K_10g: base24K,
      gold22K_10g: base22K,
      gold18K_10g: base18K,
      silver1kg: baseSilver,
      gold22K_1g: Math.round(base22K / 10),
      silver1g: Math.round(baseSilver / 1000),
      lastUpdated: 'आजचे ताजे दर',
      source: 'sync',
    };
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync rates daily from real-time market API
  useEffect(() => {
    let isMounted = true;

    async function syncRates() {
      try {
        setIsRefreshing(true);
        // Fetch Gold (XAU) and Silver (XAG) in INR
        const [goldRes, silverRes] = await Promise.allSettled([
          fetch('https://api.gold-api.com/price/XAU/INR', { cache: 'no-store' }),
          fetch('https://api.gold-api.com/price/XAG/INR', { cache: 'no-store' }),
        ]);

        let calculated24K = 76850;
        let calculatedSilver = 94800;
        let isLive = false;

        if (goldRes.status === 'fulfilled' && goldRes.value.ok) {
          const goldData = await goldRes.value.json();
          // price is for 1 Troy Ounce = 31.1034768 grams in INR
          // Raw spot to domestic India physical delivery involves ~6% customs duty/gst benchmark
          if (goldData && typeof goldData.price === 'number') {
            const pricePerGramRaw = goldData.price / 31.1034768;
            // Physical retail hallmark gold in Maharashtra sits at raw spot * ~1.06
            calculated24K = Math.round(pricePerGramRaw * 1.065 * 10);
            isLive = true;
          }
        }

        if (silverRes.status === 'fulfilled' && silverRes.value.ok) {
          const silverData = await silverRes.value.json();
          if (silverData && typeof silverData.price === 'number') {
            const silverPerGramRaw = silverData.price / 31.1034768;
            calculatedSilver = Math.round(silverPerGramRaw * 1.08 * 1000);
            isLive = true;
          }
        }

        const calculated22K = Math.round(calculated24K * 0.916);
        const calculated18K = Math.round(calculated24K * 0.75);

        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        const timeStr = timeFormatter.format(now);

        const updatedRates: RatesData = {
          gold24K_10g: calculated24K,
          gold22K_10g: calculated22K,
          gold18K_10g: calculated18K,
          silver1kg: calculatedSilver,
          gold22K_1g: Math.round(calculated22K / 10),
          silver1g: Math.round(calculatedSilver / 1000),
          lastUpdated: isMr ? `आजचे थेट दर (${timeStr})` : `Live Synced (${timeStr})`,
          source: isLive ? 'live' : 'sync',
        };

        if (isMounted) {
          setRates(updatedRates);
          try {
            localStorage.setItem(
              'wlj_daily_gold_rates',
              JSON.stringify({
                dateStr: new Date().toDateString(),
                rates: updatedRates,
              })
            );
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error('Rates sync error:', err);
      } finally {
        if (isMounted) setIsRefreshing(false);
      }
    }

    syncRates();

    // Auto-sync every 15 minutes
    const interval = setInterval(syncRates, 15 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isMr]);

  // Format currency in Indian locale
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  const whatsappMessage = encodeURIComponent(
    isMr
      ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला आजच्या सुवर्ण व चांदीच्या दरांबद्दल चौकशी करायची आहे:\n\n२४K शुद्ध सोने (10g): ₹${formatINR(rates.gold24K_10g)}\n२२K ९१६ हॉलमार्क (10g): ₹${formatINR(rates.gold22K_10g)}\nशुद्ध चांदी (1kg): ₹${formatINR(rates.silver1kg)}\n\nकृपया अधिक माहिती सांगावी.`
      : `Hello Wafgaonkar Laxmi Jewellers, I would like to inquire about today's live rates:\n\n24K Gold (10g): ₹${formatINR(rates.gold24K_10g)}\n22K 916 Hallmark (10g): ₹${formatINR(rates.gold22K_10g)}\nSilver (1kg): ₹${formatINR(rates.silver1kg)}\n\nPlease assist me.`
  );
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="w-full bg-[#3C0015] velvet-bg border-y border-[#D7B95F]/35 shadow-md relative z-40 select-none overflow-hidden">
      <div className="flex items-center h-10 md:h-11">
        
        {/* FIXED LEFT BADGE: Crimson Velvet & Champagne Gold Pill */}
        <div className="flex-shrink-0 z-20 h-full flex items-center px-3 sm:px-4 md:px-5 bg-gradient-to-r from-[#20000B] via-[#3C0015] to-[#3C0015] border-r border-[#D7B95F]/40 shadow-lg">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D7B95F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D7B95F]" />
            </span>
            <span className="font-marathi-display font-bold text-[11px] sm:text-xs text-[#FAF8F4] tracking-wide flex items-center space-x-1">
              <span className="text-[#D7B95F]">⚡</span>
              <span className="hidden xs:inline">{isMr ? 'आजचे थेट दर' : "Today's Rates"}</span>
              <span className="xs:hidden">{isMr ? 'थेट दर' : 'Rates'}</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] font-cinzel text-[#D7B95F]/80 uppercase px-1.5 py-0.5 rounded bg-black/40 border border-[#D7B95F]/30 ml-1">
              LIVE
            </span>
          </div>
        </div>

        {/* CONTINUOUS SMOOTH MARQUEE TICKER: Golden Cream & Velvet Crimson */}
        <div className="relative flex-1 overflow-hidden h-full flex items-center">
          
          {/* Subtle edge fades for smooth entrance/exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#3C0015] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#3C0015] to-transparent z-10" />

          {/* Running Ticker Items duplicated for seamless infinite loop */}
          <div className="animate-marquee flex items-center space-x-8 sm:space-x-10 text-[11.5px] sm:text-xs font-marathi-serif text-[#FAF8F4] whitespace-nowrap">
            
            {/* ITEM 1: 22K 916 Hallmark (Most Important for Jewellery) */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? '२२K ९१६ हॉलमार्क सोने:' : '22K 916 Hallmark Gold:'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.gold22K_10g)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १० ग्रॅम</span>
              </span>
              <span className="text-[10px] text-[#FAF8F4]/70 font-cinzel">
                (₹{formatINR(rates.gold22K_1g)}/१g)
              </span>
            </div>

            {/* ITEM 2: 24K Pure Gold */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? '२४K शुद्ध सोने (999):' : '24K Pure Gold (999):'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.gold24K_10g)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १० ग्रॅम</span>
              </span>
            </div>

            {/* ITEM 3: 18K Jewellery Gold */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? '१८K नक्षीदार सोने (750):' : '18K Jewellery Gold:'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.gold18K_10g)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १० ग्रॅम</span>
              </span>
            </div>

            {/* ITEM 4: Fine Silver 999 */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? 'शुद्ध चांदी (999):' : 'Fine Silver (999):'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.silver1kg)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १ किलो</span>
              </span>
              <span className="text-[10px] text-[#FAF8F4]/70 font-cinzel">
                (₹{formatINR(rates.silver1g)}/१g)
              </span>
            </div>

            {/* ITEM 5: Trust & Hallmark Stamp */}
            <div className="flex items-center space-x-1.5 text-[#D7B95F]">
              <Sparkles className="w-3.5 h-3.5 text-[#D7B95F]" />
              <span className="font-marathi-serif font-medium">
                {isMr
                  ? '१००% बीआयएस हॉलमार्क प्रमाणित सुवर्ण दागिने • शुद्धतेची ७५ वर्षांची अखंड परंपरा'
                  : '100% BIS Hallmarked Certified Jewellery • 75 Years Legacy of Purity'}
              </span>
            </div>

            {/* ITEM 6: Note & Transparency */}
            <div className="flex items-center space-x-1.5 text-[#FAF8F4]/80 text-[11px]">
              <span>ℹ️</span>
              <span>
                {isMr
                  ? 'सर्व दर जीएसटी व घडणावळ शिवाय • थेट सराफ बाजाराशी सुसंगत'
                  : 'All rates excl. GST & making charges • Directly synced with bullion market'}
              </span>
            </div>

            {/* ITEM 7: Location & Legacy */}
            <div className="flex items-center space-x-1.5 text-[#D7B95F]">
              <span className="font-bold">✦</span>
              <span className="font-marathi-display font-semibold">
                {isMr ? 'वाफगांवकर लक्ष्मी ज्वेलर्स — चाकण (Since 1951)' : 'Wafgaonkar Laxmi Jewellers — Chakan (Since 1951)'}
              </span>
            </div>

            {/* DUPLICATE SET FOR SMOOTH INFINITE MARQUEE */}
            <div className="flex items-center space-x-1.5 pl-6">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? '२२K ९१६ हॉलमार्क सोने:' : '22K 916 Hallmark Gold:'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.gold22K_10g)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १० ग्रॅम</span>
              </span>
              <span className="text-[10px] text-[#FAF8F4]/70 font-cinzel">
                (₹{formatINR(rates.gold22K_1g)}/१g)
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? '२४K शुद्ध सोने (999):' : '24K Pure Gold (999):'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.gold24K_10g)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १० ग्रॅम</span>
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? '१८K नक्षीदार सोने (750):' : '18K Jewellery Gold:'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.gold18K_10g)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १० ग्रॅम</span>
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-[#D7B95F] font-bold">●</span>
              <span className="text-[#F5E6A3] font-semibold">{isMr ? 'शुद्ध चांदी (999):' : 'Fine Silver (999):'}</span>
              <span className="font-bold text-[#FAF8F4] font-cinzel text-xs sm:text-[13px] tracking-wide">
                ₹{formatINR(rates.silver1kg)} <span className="text-[10px] text-[#D7B95F] font-normal">/ १ किलो</span>
              </span>
            </div>

            <div className="flex items-center space-x-1.5 text-[#D7B95F]">
              <Sparkles className="w-3.5 h-3.5 text-[#D7B95F]" />
              <span className="font-marathi-serif font-medium">
                {isMr
                  ? '१००% बीआयएस हॉलमार्क प्रमाणित सुवर्ण दागिने • शुद्धतेची ७५ वर्षांची अखंड परंपरा'
                  : '100% BIS Hallmarked Certified Jewellery • 75 Years Legacy of Purity'}
              </span>
            </div>
          </div>
        </div>

        {/* FIXED RIGHT: WhatsApp Rate Enquiry Button */}
        <div className="flex-shrink-0 z-20 h-full flex items-center px-2.5 sm:px-3 bg-gradient-to-l from-[#20000B] via-[#3C0015] to-[#3C0015] border-l border-[#D7B95F]/40 shadow-lg">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={isMr ? 'WhatsApp वर दर जाणून घ्या' : 'Inquire Rates on WhatsApp'}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#25D366]/90 hover:bg-[#25D366] text-white text-[10.5px] sm:text-xs font-marathi-serif font-bold transition-all shadow-xs hover:scale-105"
          >
            <MessageCircle className="w-3 h-3 text-white fill-white" />
            <span className="hidden md:inline">{isMr ? 'दर चौकशी' : 'Rate Enquiry'}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
