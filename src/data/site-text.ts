import type { BookingLanguage } from "@/data/booking-languages";

type Pair = [string, string];
export type SiteText = {
  nav: {
    how: string;
    consultants: string;
    packages: string;
    relax: string;
    faq: string;
    find: string;
    language: string;
  };
  hero: {
    badge: string;
    before: string;
    trust: string;
    sub: string;
    search: string;
    how: string;
    stats: Pair[];
  };
  essence: { title: string; body: string; trust: Pair[] };
  how: { title: string; steps: Pair[] };
  moments: {
    eyebrow: string;
    title: string;
    points: Pair[];
    faqQ: string;
    faqA: string;
    breatheEyebrow: string;
    breatheTitle: string;
    breatheText: string;
    tips: Pair[];
    note: string;
  };
  clips: {
    eyebrow: string;
    title: string;
    text: string;
    watch: string;
    open: string;
    foot: string;
  };
  find: {
    title: string;
    searchPh: string;
    allLoc: string;
    maxFee: string;
    count: string;
    noMatch: string;
    years: string;
    licensed: string;
    inPerson: string;
    firstConsult: string;
    viewBook: string;
    intro: string;
  };
  pack: {
    title: string;
    sub: string;
    travel: string;
    food: string;
    perDay: string;
    estimate: string;
    consultant: string;
    days: string;
    session: string;
    travelL: string;
    foodL: string;
    total: string;
  };
  plan: { title: string; text: string; month: string; perks: string[] };
  care: { eyebrow: string; title: string; text: string; cards: Pair[]; open: string };
  relax: { title: string; sub: string };
  faq: { title: string; items: Pair[] };
  join: { title: string; text: string; cta: string };
  footer: {
    tagline: string;
    contact: string;
    company: string;
    about: string;
    privacy: string;
    crisis: string;
    proto: string;
  };
};

const en: SiteText = {
  nav: {
    how: "How it works",
    consultants: "Consultants",
    packages: "Packages",
    relax: "Relax",
    faq: "FAQ",
    find: "Find a therapist",
    language: "Site language",
  },
  hero: {
    badge: "Made in India · For India",
    before: "Real therapy, with people you can",
    trust: "trust",
    sub: "TheraPeace connects you with licensed clinical psychologists for in-person sessions — verified, affordable, with travel and meals arranged for you.",
    search: "Search consultants",
    how: "How it works",
    stats: [
      ["8+", "Verified psychologists"],
      ["8", "Cities"],
      ["₹800", "Sessions from"],
    ],
  },
  essence: {
    title: "TheraPeace in essence",
    body: "India has apps for doctors, diet, fitness and yoga — yet no trusted platform to find a real therapist for an in-person session. Just as food-delivery platforms earned trust by bringing every restaurant under one roof, TheraPeace brings verified mental-health professionals together: each with an intro video, licence proof, location and fees for every budget, from ₹800 sessions to complete ₹10,000–₹25,000 care packages.",
    trust: [
      ["100% RCI-verified", "Every licence is checked before listing"],
      ["Confidential", "Private, secure and judgement-free"],
      ["Transparent pricing", "₹800 to premium packages — no hidden fees"],
      ["Safety net", "Crisis words connect you to Tele-MANAS 14416"],
    ],
  },
  how: {
    title: "How TheraPeace works",
    steps: [
      ["Search", "Filter licensed psychologists by name, city and maximum fee."],
      ["Verify", "Check their intro video, licence, languages and clinic location."],
      ["Book", "Pick a date and time, share your concern and submit for approval."],
      ["Travel & stay", "Add travel and veg / non-veg meals — one transparent total."],
      ["Follow-up", "Care+ keeps your next session and aftercare on track."],
    ],
  },
  moments: {
    eyebrow: "A LITTLE REASSURANCE",
    title: "There’s no “right way” to begin.",
    points: [
      [
        "You don’t need the perfect words",
        "Start with what’s on your mind. Feeling unsure or emotional is okay.",
      ],
      ["Your pace. Your comfort.", "You can ask questions, pause, or say you’re not ready yet."],
      [
        "The right fit matters",
        "Ask about their approach. It’s okay to explore another consultant.",
      ],
      ["Small steps count", "Therapy helps you notice patterns and build coping skills."],
    ],
    faqQ: "What can I expect in my first session?",
    faqA: "Your consultant may ask what brought you in, how daily life has been, and what you hope will change. You can discuss confidentiality, fees and their approach before deciding on a care plan together.",
    breatheEyebrow: "SLOW DOWN FOR A MOMENT",
    breatheTitle: "A little room to breathe.",
    breatheText: "Let your shoulders soften. You’re allowed to take a pause.",
    tips: [
      [
        "5-4-3-2-1 grounding",
        "Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell and 1 you taste.",
      ],
      ["Soft breathing", "Breathe in for 4, hold for 4, breathe out for 6. Repeat three times."],
      ["Kind words", "Say to yourself: “This is hard, and I’m doing my best.”"],
    ],
    note: "These gentle pauses are not a replacement for professional support.",
  },
  clips: {
    eyebrow: "A LOOK INSIDE THERAPY",
    title: "A conversation, not an interrogation.",
    text: "Watch public educational demonstrations to get a feel for a session. These are staged examples, not recordings of our consultants or patients.",
    watch: "Watch demonstration",
    open: "Open on YouTube",
    foot: "English-language clips · Playing connects to YouTube, which may collect viewing data.",
  },
  find: {
    title: "Find your consultant",
    searchPh: "Search name or concern (e.g. anxiety)",
    allLoc: "All locations",
    maxFee: "Max session fee",
    count: "consultants · sorted by fee, high to low",
    noMatch: "No consultants match. Try increasing the max fee.",
    years: "yrs",
    licensed: "Licensed",
    inPerson: "In-person",
    firstConsult: "First consultation",
    viewBook: "View & book",
    intro: "Intro video",
  },
  pack: {
    title: "Travel & food packages",
    sub: "Build your full care package and see an estimated total.",
    travel: "Travel (by distance)",
    food: "Food (per day)",
    perDay: "/day",
    estimate: "Estimated package",
    consultant: "Consultant",
    days: "Days of stay",
    session: "Session",
    travelL: "Travel",
    foodL: "Food",
    total: "Total",
  },
  plan: {
    title: "TheraPeace Care+ subscription",
    text: "Never lose track of your healing with ongoing support between visits.",
    month: "/month",
    perks: ["Next-session reminders", "Aftercare & intake guidance", "Doubt-clearing calls"],
  },
  care: {
    eyebrow: "AFTER YOUR FIRST VISIT",
    title: "Your care doesn’t end at the clinic.",
    text: "Reflect on your session and keep your next conversation in sight.",
    cards: [
      ["After-session updates", "A space for reflections and questions to revisit."],
      ["Your next meeting", "Review requested dates and book a follow-up."],
      ["A moment for you", "Notice how you feel between sessions."],
    ],
    open: "Open",
  },
  relax: { title: "Take a breather", sub: "Quick stress-busters while you wait." },
  faq: {
    title: "Frequently asked questions",
    items: [
      [
        "Are the consultants verified?",
        "Every listed professional must show a valid RCI licence before appearing. In this prototype, profiles are demo data.",
      ],
      [
        "Is my information private?",
        "Your concern is shared only with the consultant you choose. This prototype does not store or send any data.",
      ],
      [
        "Can I write in my own language?",
        "Yes. Choose a language at the top and type in any script you’re comfortable with.",
      ],
      ["What if I need urgent help?", "Call Tele-MANAS 14416 any time, or 112 in an emergency."],
    ],
  },
  join: {
    title: "Are you a licensed psychologist?",
    text: "Join TheraPeace to reach people looking for trusted in-person care near them.",
    cta: "Write to us",
  },
  footer: {
    tagline:
      "India's trusted place for licensed, in-person therapy — verified professionals, transparent prices, complete care packages.",
    contact: "Contact",
    company: "Company",
    about: "About us",
    privacy: "Privacy & policy",
    crisis: "Crisis: Tele-MANAS 14416",
    proto: "Prototype — demo data only.",
  },
};

const ta: SiteText = {
  nav: {
    how: "செயல்முறை",
    consultants: "ஆலோசகர்கள்",
    packages: "தொகுப்புகள்",
    relax: "ஓய்வு",
    faq: "கேள்விகள்",
    find: "சிகிச்சையாளரைத் தேடுங்கள்",
    language: "இணையதள மொழி",
  },
  hero: {
    badge: "இந்தியாவில் உருவானது · இந்தியாவிற்காக",
    before: "நீங்கள் நம்பக்கூடிய நபர்களுடன் உண்மையான",
    trust: "சிகிச்சை",
    sub: "உரிமம் பெற்ற மருத்துவ உளவியலாளர்களுடன் நேரடி அமர்வுகளுக்கு TheraPeace உங்களை இணைக்கிறது — சரிபார்க்கப்பட்டது, மலிவானது, பயணம் மற்றும் உணவு ஏற்பாட்டுடன்.",
    search: "ஆலோசகர்களைத் தேடுங்கள்",
    how: "செயல்முறை",
    stats: [
      ["8+", "சரிபார்க்கப்பட்ட உளவியலாளர்கள்"],
      ["8", "நகரங்கள்"],
      ["₹800", "முதல் அமர்வு கட்டணம்"],
    ],
  },
  essence: {
    title: "TheraPeace சுருக்கமாக",
    body: "மருத்துவர், உணவு, உடற்பயிற்சி, யோகாவுக்கு செயலிகள் உள்ளன — ஆனால் நேரடி சிகிச்சைக்கு நம்பகமான உளவியலாளரைக் கண்டறிய ஒரு தளம் இல்லை. உணவு விநியோக செயலிகள் எல்லா உணவகங்களையும் ஒரே இடத்தில் கொண்டு வந்தது போல, TheraPeace சரிபார்க்கப்பட்ட மனநல நிபுணர்களை ஒன்றிணைக்கிறது: அறிமுக வீடியோ, உரிமச் சான்று, இருப்பிடம் மற்றும் ₹800 முதல் ₹10,000–₹25,000 வரையிலான தொகுப்புகளுடன்.",
    trust: [
      ["100% RCI சரிபார்ப்பு", "பட்டியலிடும் முன் ஒவ்வொரு உரிமமும் சோதிக்கப்படுகிறது"],
      ["ரகசியம்", "தனிப்பட்ட, பாதுகாப்பான, தீர்ப்பில்லாத"],
      ["வெளிப்படையான விலை", "₹800 முதல் — மறைமுகக் கட்டணம் இல்லை"],
      ["பாதுகாப்பு வலை", "நெருக்கடியில் Tele-MANAS 14416 இணைப்பு"],
    ],
  },
  how: {
    title: "TheraPeace எப்படி செயல்படுகிறது",
    steps: [
      ["தேடுங்கள்", "பெயர், நகரம், அதிகபட்ச கட்டணம் மூலம் வடிகட்டுங்கள்."],
      ["சரிபாருங்கள்", "அறிமுக வீடியோ, உரிமம், மொழிகள், இருப்பிடத்தைப் பாருங்கள்."],
      ["பதிவு செய்யுங்கள்", "தேதி, நேரம் தேர்ந்து உங்கள் கவலையைப் பகிருங்கள்."],
      ["பயணம் & தங்குதல்", "பயணம் மற்றும் சைவ / அசைவ உணவைச் சேர்க்கவும்."],
      ["தொடர் சிகிச்சை", "Care+ உங்கள் அடுத்த அமர்வை நினைவூட்டுகிறது."],
    ],
  },
  moments: {
    eyebrow: "சிறிய நம்பிக்கை",
    title: "தொடங்க “சரியான வழி” என்று எதுவும் இல்லை.",
    points: [
      [
        "சரியான வார்த்தைகள் தேவையில்லை",
        "மனதில் உள்ளதைச் சொல்லத் தொடங்குங்கள். உணர்ச்சிவசப்படுவது இயல்பு.",
      ],
      [
        "உங்கள் வேகம். உங்கள் வசதி.",
        "கேள்வி கேட்கலாம், இடைநிறுத்தலாம், தயாரில்லை என்று சொல்லலாம்.",
      ],
      ["சரியான பொருத்தம் முக்கியம்", "அவர்களின் அணுகுமுறையைக் கேளுங்கள். வேறு ஆலோசகரைத் தேடலாம்."],
      ["சிறிய அடிகளும் முக்கியம்", "சிகிச்சை சமாளிக்கும் திறன்களை வளர்க்க உதவுகிறது."],
    ],
    faqQ: "முதல் அமர்வில் என்ன எதிர்பார்க்கலாம்?",
    faqA: "உங்களை எது இங்கே கொண்டு வந்தது, அன்றாட வாழ்க்கை எப்படி உள்ளது, என்ன மாற வேண்டும் என்று ஆலோசகர் கேட்கலாம். ரகசியம், கட்டணம், அணுகுமுறை பற்றி பேசி இணைந்து திட்டம் வகுக்கலாம்.",
    breatheEyebrow: "ஒரு கணம் நிதானியுங்கள்",
    breatheTitle: "சுவாசிக்க கொஞ்சம் இடம்.",
    breatheText: "தோள்களைத் தளர்த்துங்கள். இடைவெளி எடுக்க உங்களுக்கு அனுமதி உண்டு.",
    tips: [
      [
        "5-4-3-2-1 நிலைப்படுத்தல்",
        "பார்க்கும் 5, உணரும் 4, கேட்கும் 3, முகரும் 2, சுவைக்கும் 1 விஷயங்களைக் கவனியுங்கள்.",
      ],
      ["மென்மையான சுவாசம்", "4 வரை உள்ளிழுத்து, 4 நிறுத்தி, 6 வரை வெளியிடுங்கள். மூன்று முறை."],
      ["அன்பான வார்த்தைகள்", "சொல்லுங்கள்: “இது கடினம், நான் என்னால் முடிந்ததைச் செய்கிறேன்.”"],
    ],
    note: "இவை தொழில்முறை உதவிக்கு மாற்றாகாது.",
  },
  clips: {
    eyebrow: "சிகிச்சையின் உள்ளே ஒரு பார்வை",
    title: "விசாரணை அல்ல, ஒரு உரையாடல்.",
    text: "அமர்வு எப்படி இருக்கும் என அறிய பொது கல்வி விளக்க வீடியோக்களைப் பாருங்கள். இவை நடிப்பு உதாரணங்கள், நோயாளி பதிவுகள் அல்ல.",
    watch: "விளக்கத்தைப் பாருங்கள்",
    open: "YouTube-ல் திறக்கவும்",
    foot: "ஆங்கில வீடியோக்கள் · இயக்கும்போது YouTube பார்வைத் தரவைச் சேகரிக்கலாம்.",
  },
  find: {
    title: "உங்கள் ஆலோசகரைக் கண்டறியுங்கள்",
    searchPh: "பெயர் அல்லது கவலை (எ.கா. anxiety)",
    allLoc: "அனைத்து இடங்களும்",
    maxFee: "அதிகபட்ச கட்டணம்",
    count: "ஆலோசகர்கள் · அதிக கட்டணம் முதல்",
    noMatch: "பொருத்தம் இல்லை. கட்டண வரம்பை உயர்த்துங்கள்.",
    years: "ஆண்டுகள்",
    licensed: "உரிமம் பெற்றவர்",
    inPerson: "நேரடி",
    firstConsult: "முதல் ஆலோசனை",
    viewBook: "பார்த்து பதிவு செய்",
    intro: "அறிமுக வீடியோ",
  },
  pack: {
    title: "பயணம் & உணவு தொகுப்புகள்",
    sub: "முழு தொகுப்பை உருவாக்கி மதிப்பீட்டுத் தொகையைப் பாருங்கள்.",
    travel: "பயணம் (தூரம் அடிப்படையில்)",
    food: "உணவு (ஒரு நாளுக்கு)",
    perDay: "/நாள்",
    estimate: "மதிப்பீட்டுத் தொகுப்பு",
    consultant: "ஆலோசகர்",
    days: "தங்கும் நாட்கள்",
    session: "அமர்வு",
    travelL: "பயணம்",
    foodL: "உணவு",
    total: "மொத்தம்",
  },
  plan: {
    title: "TheraPeace Care+ சந்தா",
    text: "அமர்வுகளுக்கு இடையே தொடர் ஆதரவு.",
    month: "/மாதம்",
    perks: ["அடுத்த அமர்வு நினைவூட்டல்", "பின்தொடர் வழிகாட்டல்", "சந்தேகம் தீர்க்கும் அழைப்புகள்"],
  },
  care: {
    eyebrow: "முதல் சந்திப்புக்குப் பிறகு",
    title: "உங்கள் பராமரிப்பு மருத்துவமனையில் முடிவதில்லை.",
    text: "அமர்வைப் பற்றி சிந்தித்து அடுத்த சந்திப்பைக் கவனத்தில் வையுங்கள்.",
    cards: [
      ["அமர்வுக்குப் பின் புதுப்பிப்புகள்", "சிந்தனைகளும் கேள்விகளும் எழுத ஒரு இடம்."],
      ["அடுத்த சந்திப்பு", "தேதிகளைப் பார்த்து மீண்டும் பதிவு செய்யுங்கள்."],
      ["உங்களுக்கான நேரம்", "அமர்வுகளுக்கு இடையே உங்கள் உணர்வைக் கவனியுங்கள்."],
    ],
    open: "திறக்கவும்",
  },
  relax: {
    title: "கொஞ்சம் ஓய்வெடுங்கள்",
    sub: "காத்திருக்கும்போது மன அழுத்தம் குறைக்கும் விளையாட்டுகள்.",
  },
  faq: {
    title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    items: [
      [
        "ஆலோசகர்கள் சரிபார்க்கப்பட்டவர்களா?",
        "ஒவ்வொருவரும் செல்லுபடியான RCI உரிமம் காட்ட வேண்டும். இந்த மாதிரியில் சுயவிவரங்கள் டெமோ தரவு.",
      ],
      [
        "என் தகவல் ரகசியமா?",
        "நீங்கள் தேர்ந்த ஆலோசகருடன் மட்டுமே பகிரப்படும். இந்த மாதிரி எந்தத் தரவையும் சேமிக்காது.",
      ],
      [
        "என் மொழியில் எழுதலாமா?",
        "ஆம். மேலே மொழியைத் தேர்ந்து எந்த எழுத்திலும் தட்டச்சு செய்யலாம்.",
      ],
      ["அவசர உதவி தேவைப்பட்டால்?", "Tele-MANAS 14416 அல்லது அவசரத்தில் 112 அழையுங்கள்."],
    ],
  },
  join: {
    title: "நீங்கள் உரிமம் பெற்ற உளவியலாளரா?",
    text: "நம்பகமான நேரடி சிகிச்சை தேடுவோரை அடைய TheraPeace-ல் இணையுங்கள்.",
    cta: "எங்களுக்கு எழுதுங்கள்",
  },
  footer: {
    tagline: "உரிமம் பெற்ற நேரடி சிகிச்சைக்கான இந்தியாவின் நம்பகமான இடம்.",
    contact: "தொடர்பு",
    company: "நிறுவனம்",
    about: "எங்களைப் பற்றி",
    privacy: "தனியுரிமைக் கொள்கை",
    crisis: "நெருக்கடி: Tele-MANAS 14416",
    proto: "மாதிரி — டெமோ தரவு மட்டும்.",
  },
};

const hi: SiteText = {
  nav: {
    how: "कैसे काम करता है",
    consultants: "सलाहकार",
    packages: "पैकेज",
    relax: "आराम",
    faq: "सवाल",
    find: "थेरेपिस्ट खोजें",
    language: "साइट की भाषा",
  },
  hero: {
    badge: "भारत में बना · भारत के लिए",
    before: "असली थेरेपी, उन लोगों के साथ जिन पर आप कर सकें",
    trust: "भरोसा",
    sub: "TheraPeace आपको लाइसेंस प्राप्त क्लिनिकल मनोवैज्ञानिकों से आमने-सामने सत्रों के लिए जोड़ता है — सत्यापित, किफ़ायती, यात्रा और भोजन की व्यवस्था के साथ।",
    search: "सलाहकार खोजें",
    how: "कैसे काम करता है",
    stats: [
      ["8+", "सत्यापित मनोवैज्ञानिक"],
      ["8", "शहर"],
      ["₹800", "से सत्र शुरू"],
    ],
  },
  essence: {
    title: "TheraPeace संक्षेप में",
    body: "भारत में डॉक्टर, डाइट, फ़िटनेस और योग के ऐप हैं — पर आमने-सामने थेरेपी के लिए भरोसेमंद थेरेपिस्ट खोजने का कोई मंच नहीं। जैसे फ़ूड-डिलीवरी ऐप्स ने सभी रेस्टोरेंट एक जगह लाकर भरोसा जीता, TheraPeace सत्यापित मानसिक-स्वास्थ्य विशेषज्ञों को एक जगह लाता है: परिचय वीडियो, लाइसेंस प्रमाण, स्थान और ₹800 से ₹10,000–₹25,000 तक के पैकेज के साथ।",
    trust: [
      ["100% RCI सत्यापित", "सूची से पहले हर लाइसेंस जाँचा जाता है"],
      ["गोपनीय", "निजी, सुरक्षित और बिना आलोचना"],
      ["पारदर्शी कीमत", "₹800 से — कोई छिपा शुल्क नहीं"],
      ["सुरक्षा", "संकट में Tele-MANAS 14416 से जुड़ें"],
    ],
  },
  how: {
    title: "TheraPeace कैसे काम करता है",
    steps: [
      ["खोजें", "नाम, शहर और अधिकतम शुल्क से फ़िल्टर करें।"],
      ["जाँचें", "परिचय वीडियो, लाइसेंस, भाषाएँ और क्लिनिक देखें।"],
      ["बुक करें", "तारीख-समय चुनें और अपनी समस्या बताएँ।"],
      ["यात्रा व ठहराव", "यात्रा और शाकाहारी / मांसाहारी भोजन जोड़ें।"],
      ["फ़ॉलो-अप", "Care+ आपके अगले सत्र को याद रखता है।"],
    ],
  },
  moments: {
    eyebrow: "थोड़ा भरोसा",
    title: "शुरुआत का कोई “सही तरीका” नहीं है।",
    points: [
      ["सही शब्दों की ज़रूरत नहीं", "जो मन में है वहीं से शुरू करें। भावुक होना ठीक है।"],
      ["आपकी गति, आपकी सुविधा", "आप सवाल पूछ सकते हैं, रुक सकते हैं, या मना कर सकते हैं।"],
      ["सही मेल ज़रूरी है", "उनका तरीका पूछें। दूसरा सलाहकार चुनना भी ठीक है।"],
      ["छोटे कदम भी मायने रखते हैं", "थेरेपी सामना करने के कौशल बनाने में मदद करती है।"],
    ],
    faqQ: "पहले सत्र में क्या उम्मीद करूँ?",
    faqA: "सलाहकार पूछ सकते हैं कि आप क्यों आए, रोज़मर्रा का जीवन कैसा है और आप क्या बदलना चाहते हैं। गोपनीयता, शुल्क और उनके तरीके पर बात करके साथ में योजना बनाई जाती है।",
    breatheEyebrow: "एक पल रुकिए",
    breatheTitle: "साँस लेने के लिए थोड़ी जगह।",
    breatheText: "कंधों को ढीला छोड़ें। रुकना ठीक है।",
    tips: [
      ["5-4-3-2-1 ग्राउंडिंग", "5 चीज़ें देखें, 4 महसूस करें, 3 सुनें, 2 सूँघें और 1 चखें।"],
      ["धीमी साँस", "4 तक साँस लें, 4 रोकें, 6 तक छोड़ें। तीन बार।"],
      ["दयालु शब्द", "ख़ुद से कहें: “यह कठिन है, और मैं पूरी कोशिश कर रहा/रही हूँ।”"],
    ],
    note: "ये पल पेशेवर सहायता का विकल्प नहीं हैं।",
  },
  clips: {
    eyebrow: "थेरेपी की एक झलक",
    title: "पूछताछ नहीं, एक बातचीत।",
    text: "सत्र का अंदाज़ा लगाने के लिए सार्वजनिक शैक्षिक वीडियो देखें। ये अभिनय उदाहरण हैं, मरीज़ों की रिकॉर्डिंग नहीं।",
    watch: "वीडियो देखें",
    open: "YouTube पर खोलें",
    foot: "अंग्रेज़ी वीडियो · चलाने पर YouTube डेटा एकत्र कर सकता है।",
  },
  find: {
    title: "अपना सलाहकार खोजें",
    searchPh: "नाम या समस्या खोजें (जैसे anxiety)",
    allLoc: "सभी स्थान",
    maxFee: "अधिकतम शुल्क",
    count: "सलाहकार · अधिक से कम शुल्क",
    noMatch: "कोई मेल नहीं। अधिकतम शुल्क बढ़ाएँ।",
    years: "वर्ष",
    licensed: "लाइसेंस प्राप्त",
    inPerson: "आमने-सामने",
    firstConsult: "पहला परामर्श",
    viewBook: "देखें और बुक करें",
    intro: "परिचय वीडियो",
  },
  pack: {
    title: "यात्रा और भोजन पैकेज",
    sub: "अपना पूरा पैकेज बनाएँ और अनुमानित कुल देखें।",
    travel: "यात्रा (दूरी अनुसार)",
    food: "भोजन (प्रति दिन)",
    perDay: "/दिन",
    estimate: "अनुमानित पैकेज",
    consultant: "सलाहकार",
    days: "ठहरने के दिन",
    session: "सत्र",
    travelL: "यात्रा",
    foodL: "भोजन",
    total: "कुल",
  },
  plan: {
    title: "TheraPeace Care+ सदस्यता",
    text: "सत्रों के बीच लगातार सहायता।",
    month: "/माह",
    perks: ["अगले सत्र का रिमाइंडर", "आफ़्टरकेयर मार्गदर्शन", "शंका-समाधान कॉल"],
  },
  care: {
    eyebrow: "पहली मुलाक़ात के बाद",
    title: "आपकी देखभाल क्लिनिक पर ख़त्म नहीं होती।",
    text: "अपने सत्र पर विचार करें और अगली मुलाक़ात याद रखें।",
    cards: [
      ["सत्र के बाद अपडेट", "विचार और सवाल लिखने की जगह।"],
      ["अगली मुलाक़ात", "तारीखें देखें और फ़ॉलो-अप बुक करें।"],
      ["आपके लिए एक पल", "सत्रों के बीच अपनी भावनाएँ पहचानें।"],
    ],
    open: "खोलें",
  },
  relax: { title: "थोड़ा आराम करें", sub: "इंतज़ार में तनाव कम करने वाले खेल।" },
  faq: {
    title: "अक्सर पूछे जाने वाले सवाल",
    items: [
      [
        "क्या सलाहकार सत्यापित हैं?",
        "हर विशेषज्ञ को वैध RCI लाइसेंस दिखाना होता है। इस प्रोटोटाइप में प्रोफ़ाइल डेमो हैं।",
      ],
      [
        "क्या मेरी जानकारी निजी है?",
        "यह केवल आपके चुने सलाहकार से साझा होती है। यह प्रोटोटाइप कोई डेटा नहीं रखता।",
      ],
      ["क्या मैं अपनी भाषा में लिख सकता हूँ?", "हाँ। ऊपर भाषा चुनें और किसी भी लिपि में लिखें।"],
      ["तुरंत मदद चाहिए तो?", "Tele-MANAS 14416 या आपात स्थिति में 112 पर कॉल करें।"],
    ],
  },
  join: {
    title: "क्या आप लाइसेंस प्राप्त मनोवैज्ञानिक हैं?",
    text: "भरोसेमंद देखभाल खोज रहे लोगों तक पहुँचने के लिए TheraPeace से जुड़ें।",
    cta: "हमें लिखें",
  },
  footer: {
    tagline: "लाइसेंस प्राप्त, आमने-सामने थेरेपी के लिए भारत का भरोसेमंद मंच।",
    contact: "संपर्क",
    company: "कंपनी",
    about: "हमारे बारे में",
    privacy: "गोपनीयता नीति",
    crisis: "संकट: Tele-MANAS 14416",
    proto: "प्रोटोटाइप — केवल डेमो डेटा।",
  },
};

const te: SiteText = {
  nav: {
    how: "ఎలా పని చేస్తుంది",
    consultants: "కన్సల్టెంట్లు",
    packages: "ప్యాకేజీలు",
    relax: "విశ్రాంతి",
    faq: "ప్రశ్నలు",
    find: "థెరపిస్ట్‌ను కనుగొనండి",
    language: "సైట్ భాష",
  },
  hero: {
    badge: "భారత్‌లో తయారు · భారత్ కోసం",
    before: "మీరు నమ్మగలిగే వ్యక్తులతో నిజమైన",
    trust: "థెరపీ",
    sub: "TheraPeace మిమ్మల్ని లైసెన్స్ పొందిన క్లినికల్ సైకాలజిస్టులతో నేరుగా సెషన్ల కోసం కలుపుతుంది — ధృవీకరించబడింది, అందుబాటు ధరలో, ప్రయాణం మరియు భోజన ఏర్పాట్లతో.",
    search: "కన్సల్టెంట్లను వెతకండి",
    how: "ఎలా పని చేస్తుంది",
    stats: [
      ["8+", "ధృవీకరించిన సైకాలజిస్టులు"],
      ["8", "నగరాలు"],
      ["₹800", "నుండి సెషన్లు"],
    ],
  },
  essence: {
    title: "TheraPeace సారాంశం",
    body: "భారత్‌లో డాక్టర్, డైట్, ఫిట్‌నెస్, యోగాకు యాప్‌లు ఉన్నాయి — కానీ నేరుగా థెరపీ కోసం నమ్మకమైన థెరపిస్ట్‌ను కనుగొనే వేదిక లేదు. ఫుడ్ డెలివరీ యాప్‌లు అన్ని రెస్టారెంట్లను ఒకే చోట తెచ్చినట్లు, TheraPeace ధృవీకరించిన మానసిక ఆరోగ్య నిపుణులను కలుపుతుంది: పరిచయ వీడియో, లైసెన్స్ రుజువు, స్థానం మరియు ₹800 నుండి ₹10,000–₹25,000 ప్యాకేజీలతో.",
    trust: [
      ["100% RCI ధృవీకరణ", "ప్రతి లైసెన్స్ ముందుగా తనిఖీ చేయబడుతుంది"],
      ["గోప్యత", "ప్రైవేట్, సురక్షితం, తీర్పు లేనిది"],
      ["పారదర్శక ధర", "₹800 నుండి — దాచిన ఛార్జీలు లేవు"],
      ["భద్రత", "సంక్షోభంలో Tele-MANAS 14416"],
    ],
  },
  how: {
    title: "TheraPeace ఎలా పని చేస్తుంది",
    steps: [
      ["వెతకండి", "పేరు, నగరం, గరిష్ఠ ఫీజుతో ఫిల్టర్ చేయండి."],
      ["తనిఖీ చేయండి", "పరిచయ వీడియో, లైసెన్స్, భాషలు, క్లినిక్ చూడండి."],
      ["బుక్ చేయండి", "తేదీ, సమయం ఎంచుకుని మీ సమస్య చెప్పండి."],
      ["ప్రయాణం & బస", "ప్రయాణం మరియు శాకాహార / మాంసాహార భోజనం జోడించండి."],
      ["ఫాలో-అప్", "Care+ మీ తదుపరి సెషన్‌ను గుర్తుచేస్తుంది."],
    ],
  },
  moments: {
    eyebrow: "కొంచెం ధైర్యం",
    title: "మొదలుపెట్టడానికి “సరైన మార్గం” అంటూ లేదు.",
    points: [
      ["సరైన మాటలు అవసరం లేదు", "మనసులో ఉన్నదానితో మొదలుపెట్టండి. భావోద్వేగం సహజం."],
      ["మీ వేగం. మీ సౌకర్యం.", "ప్రశ్నలు అడగవచ్చు, ఆగవచ్చు, సిద్ధంగా లేనని చెప్పవచ్చు."],
      ["సరైన జోడీ ముఖ్యం", "వారి విధానం అడగండి. మరొకరిని ఎంచుకోవడం సరే."],
      ["చిన్న అడుగులూ ముఖ్యం", "థెరపీ ఎదుర్కొనే నైపుణ్యాలను పెంచుతుంది."],
    ],
    faqQ: "మొదటి సెషన్‌లో ఏమి ఆశించవచ్చు?",
    faqA: "మీరు ఎందుకు వచ్చారు, రోజువారీ జీవితం ఎలా ఉంది, ఏమి మారాలని కోరుకుంటున్నారని కన్సల్టెంట్ అడగవచ్చు. గోప్యత, ఫీజు, విధానం గురించి మాట్లాడి కలిసి ప్రణాళిక వేస్తారు.",
    breatheEyebrow: "ఒక్క క్షణం ఆగండి",
    breatheTitle: "శ్వాస తీసుకోవడానికి కొంచెం చోటు.",
    breatheText: "భుజాలను వదులు చేయండి. విరామం తీసుకోవడం సరే.",
    tips: [
      [
        "5-4-3-2-1 గ్రౌండింగ్",
        "చూసే 5, తాకే 4, వినే 3, వాసన చూసే 2, రుచి చూసే 1 విషయాలు గమనించండి.",
      ],
      ["మృదువైన శ్వాస", "4 వరకు పీల్చి, 4 ఆపి, 6 వరకు వదలండి. మూడు సార్లు."],
      ["దయగల మాటలు", "మీకు మీరే చెప్పుకోండి: “ఇది కష్టం, నేను నా వంతు చేస్తున్నాను.”"],
    ],
    note: "ఇవి వృత్తిపరమైన సహాయానికి ప్రత్యామ్నాయం కాదు.",
  },
  clips: {
    eyebrow: "థెరపీ లోపలి చూపు",
    title: "విచారణ కాదు, ఒక సంభాషణ.",
    text: "సెషన్ ఎలా ఉంటుందో తెలుసుకోవడానికి పబ్లిక్ విద్యా వీడియోలు చూడండి. ఇవి నటించిన ఉదాహరణలు, రోగుల రికార్డింగ్‌లు కావు.",
    watch: "వీడియో చూడండి",
    open: "YouTube‌లో తెరవండి",
    foot: "ఆంగ్ల వీడియోలు · ప్లే చేస్తే YouTube డేటా సేకరించవచ్చు.",
  },
  find: {
    title: "మీ కన్సల్టెంట్‌ను కనుగొనండి",
    searchPh: "పేరు లేదా సమస్య (ఉదా. anxiety)",
    allLoc: "అన్ని ప్రాంతాలు",
    maxFee: "గరిష్ఠ ఫీజు",
    count: "కన్సల్టెంట్లు · ఎక్కువ నుండి తక్కువ ఫీజు",
    noMatch: "సరిపోలలేదు. గరిష్ఠ ఫీజు పెంచండి.",
    years: "సం.",
    licensed: "లైసెన్స్ పొందినవారు",
    inPerson: "నేరుగా",
    firstConsult: "మొదటి సంప్రదింపు",
    viewBook: "చూసి బుక్ చేయండి",
    intro: "పరిచయ వీడియో",
  },
  pack: {
    title: "ప్రయాణం & భోజన ప్యాకేజీలు",
    sub: "మీ పూర్తి ప్యాకేజీని రూపొందించి అంచనా మొత్తం చూడండి.",
    travel: "ప్రయాణం (దూరం ప్రకారం)",
    food: "భోజనం (రోజుకు)",
    perDay: "/రోజు",
    estimate: "అంచనా ప్యాకేజీ",
    consultant: "కన్సల్టెంట్",
    days: "బస రోజులు",
    session: "సెషన్",
    travelL: "ప్రయాణం",
    foodL: "భోజనం",
    total: "మొత్తం",
  },
  plan: {
    title: "TheraPeace Care+ సబ్‌స్క్రిప్షన్",
    text: "సెషన్ల మధ్య నిరంతర మద్దతు.",
    month: "/నెల",
    perks: ["తదుపరి సెషన్ రిమైండర్", "ఆఫ్టర్‌కేర్ మార్గదర్శనం", "సందేహ నివృత్తి కాల్స్"],
  },
  care: {
    eyebrow: "మొదటి సందర్శన తర్వాత",
    title: "మీ సంరక్షణ క్లినిక్‌తో ముగియదు.",
    text: "మీ సెషన్ గురించి ఆలోచించి తదుపరి సమావేశాన్ని గుర్తుంచుకోండి.",
    cards: [
      ["సెషన్ తర్వాత అప్‌డేట్‌లు", "ఆలోచనలు, ప్రశ్నలు రాసుకునే చోటు."],
      ["తదుపరి సమావేశం", "తేదీలు చూసి ఫాలో-అప్ బుక్ చేయండి."],
      ["మీ కోసం ఒక క్షణం", "సెషన్ల మధ్య మీ భావాలను గమనించండి."],
    ],
    open: "తెరవండి",
  },
  relax: { title: "కొంచెం విశ్రాంతి", sub: "ఎదురుచూసేటప్పుడు ఒత్తిడి తగ్గించే ఆటలు." },
  faq: {
    title: "తరచుగా అడిగే ప్రశ్నలు",
    items: [
      [
        "కన్సల్టెంట్లు ధృవీకరించబడ్డారా?",
        "ప్రతి నిపుణుడు చెల్లుబాటు అయ్యే RCI లైసెన్స్ చూపాలి. ఈ ప్రోటోటైప్‌లో ప్రొఫైల్స్ డెమో.",
      ],
      [
        "నా సమాచారం గోప్యమా?",
        "మీరు ఎంచుకున్న కన్సల్టెంట్‌తో మాత్రమే పంచుకుంటారు. ఈ ప్రోటోటైప్ డేటా నిల్వ చేయదు.",
      ],
      ["నా భాషలో రాయవచ్చా?", "అవును. పైన భాష ఎంచుకుని ఏ లిపిలోనైనా టైప్ చేయండి."],
      ["అత్యవసర సహాయం కావాలంటే?", "Tele-MANAS 14416 లేదా అత్యవసరంలో 112 కి కాల్ చేయండి."],
    ],
  },
  join: {
    title: "మీరు లైసెన్స్ పొందిన సైకాలజిస్టా?",
    text: "నమ్మకమైన సంరక్షణ కోరే వారిని చేరుకోవడానికి TheraPeace‌లో చేరండి.",
    cta: "మాకు రాయండి",
  },
  footer: {
    tagline: "లైసెన్స్ పొందిన, నేరుగా థెరపీ కోసం భారత్ నమ్మే వేదిక.",
    contact: "సంప్రదించండి",
    company: "సంస్థ",
    about: "మా గురించి",
    privacy: "గోప్యతా విధానం",
    crisis: "సంక్షోభం: Tele-MANAS 14416",
    proto: "ప్రోటోటైప్ — డెమో డేటా మాత్రమే.",
  },
};

const ml: SiteText = {
  nav: {
    how: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    consultants: "കൺസൾട്ടന്റുമാർ",
    packages: "പാക്കേജുകൾ",
    relax: "വിശ്രമം",
    faq: "ചോദ്യങ്ങൾ",
    find: "തെറാപ്പിസ്റ്റിനെ കണ്ടെത്തുക",
    language: "സൈറ്റ് ഭാഷ",
  },
  hero: {
    badge: "ഇന്ത്യയിൽ നിർമ്മിച്ചത് · ഇന്ത്യക്കായി",
    before: "നിങ്ങൾക്ക് വിശ്വസിക്കാവുന്നവരോടൊപ്പം യഥാർത്ഥ",
    trust: "തെറാപ്പി",
    sub: "ലൈസൻസുള്ള ക്ലിനിക്കൽ സൈക്കോളജിസ്റ്റുകളുമായി നേരിട്ടുള്ള സെഷനുകൾക്ക് TheraPeace നിങ്ങളെ ബന്ധിപ്പിക്കുന്നു — പരിശോധിച്ചത്, താങ്ങാവുന്നത്, യാത്രയും ഭക്ഷണവും ഒരുക്കി.",
    search: "കൺസൾട്ടന്റുമാരെ തിരയുക",
    how: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    stats: [
      ["8+", "പരിശോധിച്ച സൈക്കോളജിസ്റ്റുകൾ"],
      ["8", "നഗരങ്ങൾ"],
      ["₹800", "മുതൽ സെഷനുകൾ"],
    ],
  },
  essence: {
    title: "TheraPeace ചുരുക്കത്തിൽ",
    body: "ഇന്ത്യയിൽ ഡോക്ടർ, ഡയറ്റ്, ഫിറ്റ്നസ്, യോഗ എന്നിവയ്ക്ക് ആപ്പുകളുണ്ട് — എന്നാൽ നേരിട്ടുള്ള തെറാപ്പിക്ക് വിശ്വസനീയ തെറാപ്പിസ്റ്റിനെ കണ്ടെത്താൻ വേദിയില്ല. ഫുഡ് ഡെലിവറി ആപ്പുകൾ എല്ലാ റെസ്റ്റോറന്റുകളെയും ഒരിടത്ത് എത്തിച്ചതുപോലെ, TheraPeace പരിശോധിച്ച മാനസികാരോഗ്യ വിദഗ്ധരെ ഒന്നിപ്പിക്കുന്നു: ആമുഖ വീഡിയോ, ലൈസൻസ് തെളിവ്, സ്ഥലം, ₹800 മുതൽ ₹10,000–₹25,000 വരെയുള്ള പാക്കേജുകൾ സഹിതം.",
    trust: [
      ["100% RCI പരിശോധന", "ഓരോ ലൈസൻസും മുൻകൂട്ടി പരിശോധിക്കുന്നു"],
      ["രഹസ്യം", "സ്വകാര്യം, സുരക്ഷിതം, വിധിയില്ലാത്തത്"],
      ["സുതാര്യ വില", "₹800 മുതൽ — മറഞ്ഞ ചാർജുകളില്ല"],
      ["സുരക്ഷ", "പ്രതിസന്ധിയിൽ Tele-MANAS 14416"],
    ],
  },
  how: {
    title: "TheraPeace എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    steps: [
      ["തിരയുക", "പേര്, നഗരം, പരമാവധി ഫീസ് വഴി ഫിൽട്ടർ ചെയ്യുക."],
      ["പരിശോധിക്കുക", "ആമുഖ വീഡിയോ, ലൈസൻസ്, ഭാഷകൾ, ക്ലിനിക് കാണുക."],
      ["ബുക്ക് ചെയ്യുക", "തീയതി, സമയം തിരഞ്ഞെടുത്ത് പ്രശ്നം പങ്കിടുക."],
      ["യാത്രയും താമസവും", "യാത്രയും വെജ് / നോൺ-വെജ് ഭക്ഷണവും ചേർക്കുക."],
      ["ഫോളോ-അപ്പ്", "Care+ അടുത്ത സെഷൻ ഓർമ്മിപ്പിക്കുന്നു."],
    ],
  },
  moments: {
    eyebrow: "അൽപം ആശ്വാസം",
    title: "തുടങ്ങാൻ “ശരിയായ വഴി” എന്നൊന്നില്ല.",
    points: [
      ["കൃത്യമായ വാക്കുകൾ വേണ്ട", "മനസ്സിലുള്ളതിൽ നിന്ന് തുടങ്ങുക. വികാരാധീനരാകുന്നത് സ്വാഭാവികം."],
      [
        "നിങ്ങളുടെ വേഗം. നിങ്ങളുടെ സൗകര്യം.",
        "ചോദ്യങ്ങൾ ചോദിക്കാം, നിർത്താം, തയ്യാറല്ലെന്ന് പറയാം.",
      ],
      ["ശരിയായ പൊരുത്തം പ്രധാനം", "അവരുടെ സമീപനം ചോദിക്കുക. മറ്റൊരാളെ തേടുന്നതും ശരി."],
      ["ചെറിയ ചുവടുകളും പ്രധാനം", "തെറാപ്പി നേരിടാനുള്ള കഴിവുകൾ വളർത്തുന്നു."],
    ],
    faqQ: "ആദ്യ സെഷനിൽ എന്ത് പ്രതീക്ഷിക്കാം?",
    faqA: "നിങ്ങൾ എന്തിനാണ് വന്നത്, ദൈനംദിന ജീവിതം എങ്ങനെ, എന്ത് മാറണം എന്ന് കൺസൾട്ടന്റ് ചോദിച്ചേക്കാം. രഹസ്യത, ഫീസ്, സമീപനം എന്നിവ ചർച്ച ചെയ്ത് ഒരുമിച്ച് പദ്ധതി തയ്യാറാക്കാം.",
    breatheEyebrow: "ഒരു നിമിഷം നിൽക്കൂ",
    breatheTitle: "ശ്വസിക്കാൻ അൽപം ഇടം.",
    breatheText: "തോളുകൾ അയയ്ക്കുക. ഇടവേള എടുക്കാം.",
    tips: [
      [
        "5-4-3-2-1 ഗ്രൗണ്ടിംഗ്",
        "കാണുന്ന 5, തൊടുന്ന 4, കേൾക്കുന്ന 3, മണക്കുന്ന 2, രുചിക്കുന്ന 1 കാര്യങ്ങൾ ശ്രദ്ധിക്കുക.",
      ],
      ["മൃദുവായ ശ്വാസം", "4 വരെ ശ്വസിച്ച്, 4 പിടിച്ച്, 6 വരെ വിടുക. മൂന്ന് തവണ."],
      ["ദയയുള്ള വാക്കുകൾ", "സ്വയം പറയുക: “ഇത് പ്രയാസമാണ്, ഞാൻ എന്റെ പരമാവധി ചെയ്യുന്നു.”"],
    ],
    note: "ഇവ പ്രൊഫഷണൽ സഹായത്തിന് പകരമല്ല.",
  },
  clips: {
    eyebrow: "തെറാപ്പിയുടെ ഉള്ളിലേക്ക്",
    title: "ചോദ്യം ചെയ്യലല്ല, ഒരു സംഭാഷണം.",
    text: "സെഷൻ എങ്ങനെയെന്ന് അറിയാൻ പൊതു വിദ്യാഭ്യാസ വീഡിയോകൾ കാണുക. ഇവ അഭിനയിച്ച ഉദാഹരണങ്ങളാണ്, രോഗികളുടെ റെക്കോർഡിംഗുകളല്ല.",
    watch: "വീഡിയോ കാണുക",
    open: "YouTube-ൽ തുറക്കുക",
    foot: "ഇംഗ്ലീഷ് വീഡിയോകൾ · പ്ലേ ചെയ്യുമ്പോൾ YouTube ഡാറ്റ ശേഖരിച്ചേക്കാം.",
  },
  find: {
    title: "നിങ്ങളുടെ കൺസൾട്ടന്റിനെ കണ്ടെത്തുക",
    searchPh: "പേര് അല്ലെങ്കിൽ പ്രശ്നം (ഉദാ. anxiety)",
    allLoc: "എല്ലാ സ്ഥലങ്ങളും",
    maxFee: "പരമാവധി ഫീസ്",
    count: "കൺസൾട്ടന്റുമാർ · കൂടിയതിൽ നിന്ന് കുറഞ്ഞ ഫീസ്",
    noMatch: "പൊരുത്തമില്ല. പരമാവധി ഫീസ് കൂട്ടുക.",
    years: "വർഷം",
    licensed: "ലൈസൻസുള്ളവർ",
    inPerson: "നേരിട്ട്",
    firstConsult: "ആദ്യ കൺസൾട്ടേഷൻ",
    viewBook: "കണ്ട് ബുക്ക് ചെയ്യുക",
    intro: "ആമുഖ വീഡിയോ",
  },
  pack: {
    title: "യാത്ര & ഭക്ഷണ പാക്കേജുകൾ",
    sub: "മുഴുവൻ പാക്കേജ് തയ്യാറാക്കി ഏകദേശ തുക കാണുക.",
    travel: "യാത്ര (ദൂരം അനുസരിച്ച്)",
    food: "ഭക്ഷണം (പ്രതിദിനം)",
    perDay: "/ദിവസം",
    estimate: "ഏകദേശ പാക്കേജ്",
    consultant: "കൺസൾട്ടന്റ്",
    days: "താമസ ദിവസങ്ങൾ",
    session: "സെഷൻ",
    travelL: "യാത്ര",
    foodL: "ഭക്ഷണം",
    total: "ആകെ",
  },
  plan: {
    title: "TheraPeace Care+ സബ്സ്ക്രിപ്ഷൻ",
    text: "സെഷനുകൾക്കിടയിൽ തുടർച്ചയായ പിന്തുണ.",
    month: "/മാസം",
    perks: ["അടുത്ത സെഷൻ ഓർമ്മപ്പെടുത്തൽ", "ആഫ്റ്റർകെയർ മാർഗ്ഗനിർദ്ദേശം", "സംശയനിവാരണ കോളുകൾ"],
  },
  care: {
    eyebrow: "ആദ്യ സന്ദർശനത്തിന് ശേഷം",
    title: "നിങ്ങളുടെ പരിചരണം ക്ലിനിക്കിൽ അവസാനിക്കുന്നില്ല.",
    text: "സെഷനെക്കുറിച്ച് ചിന്തിച്ച് അടുത്ത കൂടിക്കാഴ്ച ഓർമ്മിക്കുക.",
    cards: [
      ["സെഷന് ശേഷമുള്ള അപ്ഡേറ്റുകൾ", "ചിന്തകളും ചോദ്യങ്ങളും എഴുതാൻ ഒരിടം."],
      ["അടുത്ത കൂടിക്കാഴ്ച", "തീയതികൾ കണ്ട് ഫോളോ-അപ്പ് ബുക്ക് ചെയ്യുക."],
      ["നിങ്ങൾക്കായി ഒരു നിമിഷം", "സെഷനുകൾക്കിടയിൽ നിങ്ങളുടെ വികാരങ്ങൾ ശ്രദ്ധിക്കുക."],
    ],
    open: "തുറക്കുക",
  },
  relax: { title: "അൽപം വിശ്രമിക്കൂ", sub: "കാത്തിരിക്കുമ്പോൾ സമ്മർദ്ദം കുറയ്ക്കുന്ന കളികൾ." },
  faq: {
    title: "പതിവ് ചോദ്യങ്ങൾ",
    items: [
      [
        "കൺസൾട്ടന്റുമാർ പരിശോധിച്ചവരാണോ?",
        "ഓരോരുത്തരും സാധുവായ RCI ലൈസൻസ് കാണിക്കണം. ഈ പ്രോട്ടോടൈപ്പിൽ പ്രൊഫൈലുകൾ ഡെമോയാണ്.",
      ],
      [
        "എന്റെ വിവരങ്ങൾ സ്വകാര്യമാണോ?",
        "നിങ്ങൾ തിരഞ്ഞെടുക്കുന്ന കൺസൾട്ടന്റുമായി മാത്രം. ഈ പ്രോട്ടോടൈപ്പ് ഡാറ്റ സൂക്ഷിക്കുന്നില്ല.",
      ],
      ["എന്റെ ഭാഷയിൽ എഴുതാമോ?", "അതെ. മുകളിൽ ഭാഷ തിരഞ്ഞെടുത്ത് ഏത് ലിപിയിലും ടൈപ്പ് ചെയ്യാം."],
      ["അടിയന്തര സഹായം വേണമെങ്കിൽ?", "Tele-MANAS 14416 അല്ലെങ്കിൽ അടിയന്തരമായി 112 വിളിക്കുക."],
    ],
  },
  join: {
    title: "നിങ്ങൾ ലൈസൻസുള്ള സൈക്കോളജിസ്റ്റാണോ?",
    text: "വിശ്വസനീയ പരിചരണം തേടുന്നവരിലേക്ക് എത്താൻ TheraPeace-ൽ ചേരുക.",
    cta: "ഞങ്ങൾക്ക് എഴുതുക",
  },
  footer: {
    tagline: "ലൈസൻസുള്ള, നേരിട്ടുള്ള തെറാപ്പിക്ക് ഇന്ത്യയുടെ വിശ്വസനീയ ഇടം.",
    contact: "ബന്ധപ്പെടുക",
    company: "സ്ഥാപനം",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    privacy: "സ്വകാര്യതാ നയം",
    crisis: "പ്രതിസന്ധി: Tele-MANAS 14416",
    proto: "പ്രോട്ടോടൈപ്പ് — ഡെമോ ഡാറ്റ മാത്രം.",
  },
};

export const siteText: Record<BookingLanguage, SiteText> = { en, ta, hi, te, ml };
