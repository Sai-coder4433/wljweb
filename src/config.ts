// Central Configuration for Wafgaonkar Laxmi Jewellers Digital Catalogue
export const BRAND_CONFIG = {
  name: "वाफगावकर लक्ष्मी ज्वेलर्स",
  englishName: "Wafgaonkar Laxmi Jewellers",
  heritageYear: 1951,
  taglineMarathi: "१९५१ पासून विश्वासाची परंपरा.",
  taglineEnglish: "Tradition of Trust Since 1951.",
  
  // Single configurable WhatsApp contact number (international format without +)
  WHATSAPP_NUMBER: "910000000000",
  PHONE_NUMBER: "0000000000",
  MOBILE_NUMBER: "0000000000",
  EMAIL: "contact@wafgaonkarjewellers.com",
  
  // Store Location & Timings (2 Branches in Chakan)
  store: {
    name: "वाफगावकर लक्ष्मी ज्वेलर्स",
    hoursMarathi: "सोमवार ते रविवार: सकाळी १०:०० ते रात्री ८:३०",
    hoursEnglish: "Monday to Sunday: 10:00 AM to 8:30 PM",
    branch1: {
      number: 1,
      titleMarathi: "शाखा क्र. १: जुनी बाजारपेठ, चाकण",
      titleEnglish: "Branch No. 1: Juni Bazarpeth, Chakan",
      addressMarathi: "जुनी बाजारपेठ, चाकण, ता. खेड, जि. पुणे - ४१०५०१",
      addressEnglish: "Juni Bazarpeth, Chakan, Tal. Khed, Dist. Pune - 410501",
      phone: "0000000000",
      hoursMarathi: "सकाळी १०:०० ते रात्री ८:३० (दररोज सुरू)",
      hoursEnglish: "10:00 AM to 8:30 PM (All 7 Days)",
      googleMapsUrl: "https://maps.google.com/?q=Wafgaonkar+Laxmi+Jewellers+Juni+Bazarpeth+Chakan+Pune",
    },
    branch2: {
      number: 2,
      titleMarathi: "शाखा क्र. २: माणिक चौक, सिद्धी आर्केड समोर, चाकण",
      titleEnglish: "Branch No. 2: Manik Chowk, Opp. Siddhi Arcade, Chakan",
      addressMarathi: "माणिक चौक, सिद्धी आर्केड समोर, चाकण, ता. खेड, जि. पुणे - ४१०५०१",
      addressEnglish: "Manik Chowk, Opp. Siddhi Arcade, Chakan, Tal. Khed, Dist. Pune - 410501",
      phone: "0000000000",
      hoursMarathi: "सकाळी १०:०० ते रात्री ८:३० (दररोज सुरू)",
      hoursEnglish: "10:00 AM to 8:30 PM (All 7 Days)",
      googleMapsUrl: "https://maps.google.com/?q=Manik+Chowk+Opp+Siddhi+Arcade+Chakan+Pune",
    }
  },
  
  // Palette References — Velvet, Cream & Golden System
  colors: {
    warmIvory:     "#F3F0EA",  // Main canvas / Warm Cream
    ivoryLight:    "#FAF8F4",  // Card surfaces / Light Cream
    velvetMaroon:  "#3C0015",  // Royal Velvet primary dark brand colour
    velvetMid:     "#500018",  // Velvet Hover / active
    golden:        "#D7B95F",  // Heritage Gold accents
    champagneGold: "#E5CCA0",  // Soft champagne gold accent
    textPrimary:   "#29231F",  // Main headings / product names (Warm Noir)
    textSecondary: "#766A61",  // Descriptions / metadata (Muted warm)
    deepMaroon:    "#3C0015",  // Alias
    deepPlum:      "#3C0015",  // Alias to velvet maroon
    plumMid:       "#500018",  // Alias to velvet mid
    softMauve:     "#E5CCA0",  // Alias to champagne gold
    softLilac:     "#F3F0EA",  // Alias to warm ivory
    champagne:     "#D7B95F"   // Alias to golden
  }
};
