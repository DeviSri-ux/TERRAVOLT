import { getLanguage } from '../utils/i18n.js';

export class TerraCompanion {
  constructor(navigate, currentPage = '') {
    this.navigate = navigate;
    this.currentPage = currentPage;
    this.isOpen = false;
  }

  getTexts() {
    const language = getLanguage();

    const texts = {
      en: {
        companion: 'Your travel companion',
        close: 'Close Terra',
        ecoRoute: '🗺️ Help me plan an Eco Route',
        impact: '🌍 Show my travel impact',
        responses: {
          welcome: {
            title: 'Hello, I’m Terra!',
            message: 'Ready to discover somewhere beautiful?'
          },
          auth: {
            title: 'Welcome aboard!',
            message: 'Sign in or continue as a guest to begin your eco-travel journey.'
          },
          'feature-intro': {
            title: 'Let’s explore!',
            message: 'Pick any feature to begin. I will guide you along the way.'
          },
          home: {
            title: 'Where shall we go?',
            message: 'Choose your destination and I will help you find a smarter route.'
          },
          explore: {
            title: 'Your route is ready!',
            message: 'Follow your journey and I will help you understand its environmental impact.'
          },
          'daily-travel': {
            title: 'Your daily travel matters!',
            message: 'Let’s see how your regular journeys can make a difference.'
          },
          journeys: {
            title: 'Your stories are here!',
            message: 'Every road you travel can become a beautiful memory.'
          },
          impact: {
            title: 'I’m proud of you! 🌍',
            message: 'Every thoughtful travel choice can make a positive difference. Keep going!'
          },
          profile: {
            title: 'Let’s make it yours!',
            message: 'Personalise your TERRAVOLT experience to suit your travel style.'
          },
          default: {
            title: 'Hi, I’m Terra!',
            message: 'Your friendly travel companion. How can I help you today?'
          }
        }
      },

      ta: {
        companion: 'உங்கள் பயணத் துணை',
        close: 'டெர்ராவை மூடவும்',
        ecoRoute: '🗺️ சுற்றுச்சூழல் வழியைத் திட்டமிட உதவுங்கள்',
        impact: '🌍 எனது பயண தாக்கத்தைக் காண்பிக்கவும்',
        responses: {
          welcome: {
            title: 'வணக்கம், நான் டெர்ரா!',
            message: 'அழகான ஒரு இடத்தைக் கண்டறிய தயாரா?'
          },
          auth: {
            title: 'வரவேற்கிறோம்!',
            message: 'உங்கள் சுற்றுச்சூழல் பயணத்தைத் தொடங்க உள்நுழையுங்கள் அல்லது விருந்தினராக தொடருங்கள்.'
          },
          'feature-intro': {
            title: 'ஆராயலாம்!',
            message: 'தொடங்க எந்த அம்சத்தையும் தேர்ந்தெடுங்கள். நான் உங்களுக்கு வழிகாட்டுவேன்.'
          },
          home: {
            title: 'எங்கே செல்லலாம்?',
            message: 'உங்கள் இலக்கைத் தேர்ந்தெடுங்கள். சிறந்த வழியைக் கண்டறிய நான் உதவுவேன்.'
          },
          explore: {
            title: 'உங்கள் வழி தயாராக உள்ளது!',
            message: 'உங்கள் பயணத்தைப் பின்தொடருங்கள். அதன் சுற்றுச்சூழல் தாக்கத்தைப் புரிந்துகொள்ள நான் உதவுவேன்.'
          },
          'daily-travel': {
            title: 'உங்கள் தினசரி பயணம் முக்கியமானது!',
            message: 'உங்கள் வழக்கமான பயணங்கள் எவ்வாறு மாற்றத்தை உருவாக்குகின்றன என்பதைப் பார்ப்போம்.'
          },
          journeys: {
            title: 'உங்கள் கதைகள் இங்கே!',
            message: 'நீங்கள் பயணிக்கும் ஒவ்வொரு பாதையும் ஒரு அழகான நினைவாக மாறலாம்.'
          },
          impact: {
            title: 'நான் உங்களைப் பற்றி பெருமைப்படுகிறேன்! 🌍',
            message: 'ஒவ்வொரு சிந்தனையுள்ள பயணத் தேர்வும் நல்ல மாற்றத்தை உருவாக்கும். தொடருங்கள்!'
          },
          profile: {
            title: 'இதை உங்களுடையதாக மாற்றுவோம்!',
            message: 'உங்கள் பயண பாணிக்கு ஏற்ப TERRAVOLT அனுபவத்தை தனிப்பயனாக்குங்கள்.'
          },
          default: {
            title: 'வணக்கம், நான் டெர்ரா!',
            message: 'நான் உங்கள் நட்பான பயணத் துணை. நான் எப்படி உதவலாம்?'
          }
        }
      },

      hi: {
        companion: 'आपका यात्रा साथी',
        close: 'टेरा बंद करें',
        ecoRoute: '🗺️ इको रूट की योजना बनाने में मदद करें',
        impact: '🌍 मेरा यात्रा प्रभाव दिखाएं',
        responses: {
          welcome: {
            title: 'नमस्ते, मैं टेरा हूँ!',
            message: 'क्या आप किसी खूबसूरत जगह को खोजने के लिए तैयार हैं?'
          },
          home: {
            title: 'हम कहाँ चलें?',
            message: 'अपना गंतव्य चुनें और मैं आपको बेहतर मार्ग खोजने में मदद करूँगी।'
          },
          explore: {
            title: 'आपका मार्ग तैयार है!',
            message: 'अपनी यात्रा का अनुसरण करें और मैं इसके पर्यावरणीय प्रभाव को समझने में मदद करूँगी।'
          },
          journeys: {
            title: 'आपकी कहानियाँ यहाँ हैं!',
            message: 'हर यात्रा एक सुंदर याद बन सकती है।'
          },
          impact: {
            title: 'मुझे आप पर गर्व है! 🌍',
            message: 'हर सोच-समझकर किया गया यात्रा विकल्प सकारात्मक बदलाव ला सकता है। आगे बढ़ते रहें!'
          },
          default: {
            title: 'नमस्ते, मैं टेरा हूँ!',
            message: 'मैं आपकी मित्रवत यात्रा साथी हूँ। मैं आपकी कैसे मदद कर सकती हूँ?'
          }
        }
      },

      te: {
        companion: 'మీ ప్రయాణ సహచరి',
        close: 'టెర్రాను మూసివేయండి',
        ecoRoute: '🗺️ పర్యావరణ అనుకూల మార్గాన్ని ప్లాన్ చేయడంలో సహాయం చేయండి',
        impact: '🌍 నా ప్రయాణ ప్రభావాన్ని చూపండి',
        responses: {
          welcome: {
            title: 'హలో, నేను టెర్రా!',
            message: 'అందమైన ప్రదేశాన్ని కనుగొనడానికి సిద్ధంగా ఉన్నారా?'
          },
          home: {
            title: 'మనం ఎక్కడికి వెళ్దాం?',
            message: 'మీ గమ్యాన్ని ఎంచుకోండి. మంచి మార్గాన్ని కనుగొనడంలో నేను సహాయం చేస్తాను.'
          },
          explore: {
            title: 'మీ మార్గం సిద్ధంగా ఉంది!',
            message: 'మీ ప్రయాణాన్ని అనుసరించండి. దాని పర్యావరణ ప్రభావాన్ని అర్థం చేసుకోవడంలో నేను సహాయం చేస్తాను.'
          },
          journeys: {
            title: 'మీ కథలు ఇక్కడ ఉన్నాయి!',
            message: 'మీరు చేసే ప్రతి ప్రయాణం ఒక అందమైన జ్ఞాపకంగా మారవచ్చు.'
          },
          impact: {
            title: 'నేను మీ గురించి గర్వపడుతున్నాను! 🌍',
            message: 'ప్రతి మంచి ప్రయాణ ఎంపిక సానుకూల మార్పును తీసుకురాగలదు. కొనసాగించండి!'
          },
          default: {
            title: 'హలో, నేను టెర్రా!',
            message: 'నేను మీ స్నేహపూర్వక ప్రయాణ సహచరిని. నేను మీకు ఎలా సహాయం చేయగలను?'
          }
        }
      },

      ml: {
        companion: 'നിങ്ങളുടെ യാത്രാ കൂട്ടുകാരി',
        close: 'ടെറയെ അടയ്ക്കുക',
        ecoRoute: '🗺️ പരിസ്ഥിതി സൗഹൃദ വഴി ആസൂത്രണം ചെയ്യാൻ സഹായിക്കൂ',
        impact: '🌍 എന്റെ യാത്രാ സ്വാധീനം കാണിക്കൂ',
        responses: {
          home: {
            title: 'നമുക്ക് എവിടേക്ക് പോകാം?',
            message: 'നിങ്ങളുടെ ലക്ഷ്യസ്ഥലം തിരഞ്ഞെടുക്കൂ. മികച്ച വഴി കണ്ടെത്താൻ ഞാൻ സഹായിക്കും.'
          },
          explore: {
            title: 'നിങ്ങളുടെ വഴി തയ്യാറാണ്!',
            message: 'യാത്ര പിന്തുടരൂ. പരിസ്ഥിതി സ്വാധീനം മനസ്സിലാക്കാൻ ഞാൻ സഹായിക്കും.'
          },
          default: {
            title: 'ഹലോ, ഞാൻ ടെറയാണ്!',
            message: 'ഞാൻ നിങ്ങളുടെ സൗഹൃദ യാത്രാ കൂട്ടുകാരിയാണ്.'
          }
        }
      },

      kn: {
        companion: 'ನಿಮ್ಮ ಪ್ರಯಾಣ ಸಂಗಾತಿ',
        close: 'ಟೆರ್ರಾವನ್ನು ಮುಚ್ಚಿ',
        ecoRoute: '🗺️ ಪರಿಸರ ಸ್ನೇಹಿ ಮಾರ್ಗವನ್ನು ಯೋಜಿಸಲು ಸಹಾಯ ಮಾಡಿ',
        impact: '🌍 ನನ್ನ ಪ್ರಯಾಣದ ಪ್ರಭಾವವನ್ನು ತೋರಿಸಿ',
        responses: {
          home: {
            title: 'ನಾವು ಎಲ್ಲಿಗೆ ಹೋಗೋಣ?',
            message: 'ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. ಉತ್ತಮ ಮಾರ್ಗವನ್ನು ಹುಡುಕಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.'
          },
          explore: {
            title: 'ನಿಮ್ಮ ಮಾರ್ಗ ಸಿದ್ಧವಾಗಿದೆ!',
            message: 'ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಅನುಸರಿಸಿ. ಪರಿಸರದ ಮೇಲಿನ ಪರಿಣಾಮವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.'
          },
          default: {
            title: 'ನಮಸ್ಕಾರ, ನಾನು ಟೆರ್ರಾ!',
            message: 'ನಾನು ನಿಮ್ಮ ಸ್ನೇಹಪರ ಪ್ರಯಾಣ ಸಂಗಾತಿ.'
          }
        }
      },

      bn: {
        companion: 'আপনার ভ্রমণ সঙ্গী',
        close: 'টেরা বন্ধ করুন',
        ecoRoute: '🗺️ পরিবেশবান্ধব পথ পরিকল্পনা করতে সাহায্য করুন',
        impact: '🌍 আমার ভ্রমণের প্রভাব দেখান',
        responses: {
          home: {
            title: 'আমরা কোথায় যাব?',
            message: 'আপনার গন্তব্য নির্বাচন করুন। আমি একটি ভালো পথ খুঁজতে সাহায্য করব।'
          },
          explore: {
            title: 'আপনার পথ প্রস্তুত!',
            message: 'আপনার যাত্রা অনুসরণ করুন। পরিবেশের উপর প্রভাব বুঝতে আমি সাহায্য করব।'
          },
          default: {
            title: 'হ্যালো, আমি টেরা!',
            message: 'আমি আপনার বন্ধুত্বপূর্ণ ভ্রমণ সঙ্গী।'
          }
        }
      },

      mr: {
        companion: 'तुमची प्रवास साथी',
        close: 'टेरा बंद करा',
        ecoRoute: '🗺️ पर्यावरणपूरक मार्गाची योजना करण्यात मदत करा',
        impact: '🌍 माझ्या प्रवासाचा प्रभाव दाखवा',
        responses: {
          home: {
            title: 'आपण कुठे जाऊया?',
            message: 'तुमचे गंतव्य निवडा. चांगला मार्ग शोधण्यात मी मदत करेन.'
          },
          explore: {
            title: 'तुमचा मार्ग तयार आहे!',
            message: 'तुमचा प्रवास अनुसरा. पर्यावरणावरील परिणाम समजून घेण्यास मी मदत करेन.'
          },
          default: {
            title: 'नमस्कार, मी टेरा आहे!',
            message: 'मी तुमची मैत्रीपूर्ण प्रवास साथी आहे.'
          }
        }
      },

      gu: {
        companion: 'તમારી મુસાફરીની સાથી',
        close: 'ટેરાને બંધ કરો',
        ecoRoute: '🗺️ પર્યાવરણમિત્ર માર્ગની યોજના બનાવવામાં મદદ કરો',
        impact: '🌍 મારી મુસાફરીની અસર બતાવો',
        responses: {
          home: {
            title: 'આપણે ક્યાં જઈએ?',
            message: 'તમારું ગંતવ્ય પસંદ કરો. હું વધુ સારો માર્ગ શોધવામાં મદદ કરીશ.'
          },
          explore: {
            title: 'તમારો માર્ગ તૈયાર છે!',
            message: 'તમારી મુસાફરીને અનુસરો. પર્યાવરણ પરની અસર સમજવામાં હું મદદ કરીશ.'
          },
          default: {
            title: 'નમસ્તે, હું ટેરા છું!',
            message: 'હું તમારી મિત્રતાભરી મુસાફરીની સાથી છું.'
          }
        }
      },

      pa: {
        companion: 'ਤੁਹਾਡੀ ਯਾਤਰਾ ਸਾਥੀ',
        close: 'ਟੈਰਾ ਨੂੰ ਬੰਦ ਕਰੋ',
        ecoRoute: '🗺️ ਵਾਤਾਵਰਣ-ਅਨੁਕੂਲ ਰਸਤੇ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰੋ',
        impact: '🌍 ਮੇਰੀ ਯਾਤਰਾ ਦਾ ਪ੍ਰਭਾਵ ਦਿਖਾਓ',
        responses: {
          home: {
            title: 'ਅਸੀਂ ਕਿੱਥੇ ਚੱਲੀਏ?',
            message: 'ਆਪਣੀ ਮੰਜ਼ਿਲ ਚੁਣੋ। ਮੈਂ ਤੁਹਾਨੂੰ ਬਿਹਤਰ ਰਸਤਾ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗੀ।'
          },
          explore: {
            title: 'ਤੁਹਾਡਾ ਰਸਤਾ ਤਿਆਰ ਹੈ!',
            message: 'ਆਪਣੀ ਯਾਤਰਾ ਦਾ ਪਾਲਣ ਕਰੋ। ਵਾਤਾਵਰਣ ਉੱਤੇ ਪ੍ਰਭਾਵ ਸਮਝਣ ਵਿੱਚ ਮੈਂ ਮਦਦ ਕਰਾਂਗੀ।'
          },
          default: {
            title: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਟੈਰਾ ਹਾਂ!',
            message: 'ਮੈਂ ਤੁਹਾਡੀ ਦੋਸਤਾਨਾ ਯਾਤਰਾ ਸਾਥੀ ਹਾਂ।'
          }
        }
      },

      or: {
        companion: 'ଆପଣଙ୍କ ଯାତ୍ରା ସାଥୀ',
        close: 'ଟେରାକୁ ବନ୍ଦ କରନ୍ତୁ',
        ecoRoute: '🗺️ ପରିବେଶ-ମିତ୍ର ପଥ ଯୋଜନାରେ ସାହାଯ୍ୟ କରନ୍ତୁ',
        impact: '🌍 ମୋର ଯାତ୍ରା ପ୍ରଭାବ ଦେଖାନ୍ତୁ',
        responses: {
          home: {
            title: 'ଆମେ କେଉଁଠି ଯିବା?',
            message: 'ଆପଣଙ୍କ ଗନ୍ତବ୍ୟ ବାଛନ୍ତୁ। ଭଲ ପଥ ଖୋଜିବାରେ ମୁଁ ସାହାଯ୍ୟ କରିବି।'
          },
          explore: {
            title: 'ଆପଣଙ୍କ ପଥ ପ୍ରସ୍ତୁତ!',
            message: 'ଆପଣଙ୍କ ଯାତ୍ରା ଅନୁସରଣ କରନ୍ତୁ। ପରିବେଶ ପ୍ରଭାବ ବୁଝିବାରେ ମୁଁ ସାହାଯ୍ୟ କରିବି।'
          },
          default: {
            title: 'ନମସ୍କାର, ମୁଁ ଟେରା!',
            message: 'ମୁଁ ଆପଣଙ୍କ ବନ୍ଧୁତ୍ୱପୂର୍ଣ୍ଣ ଯାତ୍ରା ସାଥୀ।'
          }
        }
      },

      ur: {
        companion: 'آپ کی سفری ساتھی',
        close: 'ٹیرا بند کریں',
        ecoRoute: '🗺️ ماحول دوست راستے کی منصوبہ بندی میں مدد کریں',
        impact: '🌍 میرے سفر کا اثر دکھائیں',
        responses: {
          home: {
            title: 'ہم کہاں چلیں؟',
            message: 'اپنی منزل منتخب کریں۔ میں بہتر راستہ تلاش کرنے میں مدد کروں گی۔'
          },
          explore: {
            title: 'آپ کا راستہ تیار ہے!',
            message: 'اپنے سفر کی پیروی کریں۔ ماحول پر اس کے اثر کو سمجھنے میں میں مدد کروں گی۔'
          },
          default: {
            title: 'السلام علیکم، میں ٹیرا ہوں!',
            message: 'میں آپ کی دوستانہ سفری ساتھی ہوں۔'
          }
        }
      }
    };

    return texts[language] || texts.en;
  }

  getResponse() {
    const content = this.getTexts();
    const responses = content.responses || {};

    return (
      responses[this.currentPage] ||
      responses.default ||
      content.responses.default
    );
  }

  render() {
    const container = document.createElement('div');

    container.className =
      'fixed bottom-20 right-4 z-[9999] md:bottom-6 flex flex-col items-end';

    const language = getLanguage();

    if (language === 'ur') {
      container.setAttribute('dir', 'rtl');
    }

    const terraButton = document.createElement('button');

    terraButton.setAttribute('aria-label', 'Open Terra companion');

    terraButton.className =
      'terra-companion-character relative w-[68px] h-[68px] rounded-full border border-white/40 shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105';

    terraButton.innerHTML = `
      <span class="terra-face">😊</span>
      <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-[10px] shadow-md">✨</span>
    `;

    terraButton.style.background =
      'linear-gradient(135deg, #4f46e5, #7c3aed)';

    terraButton.style.animation =
      'terraEntrance 0.7s ease-out, terraFloat 3s ease-in-out 0.8s infinite';

    terraButton.onclick = () => {
      if (this.isOpen) {
        this.closePanel(container);
      } else {
        this.openPanel(container);
      }
    };

    if (!document.getElementById('terra-companion-styles')) {
      const style = document.createElement('style');

      style.id = 'terra-companion-styles';

      style.textContent = `
        @keyframes terraEntrance {
          0% { opacity: 0; transform: scale(0.2) translateY(35px); }
          65% { opacity: 1; transform: scale(1.15) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes terraFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .terra-companion-character {
          isolation: isolate;
        }

        .terra-face {
          font-size: 34px;
          line-height: 1;
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.15));
        }

        .terra-message-enter {
          animation: terraMessageEnter 0.45s ease-out;
        }

        @keyframes terraMessageEnter {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `;

      document.head.appendChild(style);
    }

    container.appendChild(terraButton);

    setTimeout(() => {
      if (!container.isConnected) return;

      const welcomeBubble = document.createElement('div');
      const response = this.getResponse();

      welcomeBubble.id = 'terra-welcome-bubble';

      welcomeBubble.className =
        'terra-message-enter mb-3 max-w-[250px] bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl';

      welcomeBubble.innerHTML = `
        <p class="text-white font-black text-sm">😊 ${response.title}</p>
        <p class="text-white/90 text-xs font-semibold leading-relaxed mt-1">${response.message}</p>
      `;

      container.insertBefore(welcomeBubble, terraButton);

      setTimeout(() => {
        if (welcomeBubble.isConnected) {
          welcomeBubble.style.opacity = '0';
          welcomeBubble.style.transform = 'translateY(8px)';
          welcomeBubble.style.transition = 'all 0.4s ease';

          setTimeout(() => {
            if (welcomeBubble.isConnected) {
              welcomeBubble.remove();
            }
          }, 400);
        }
      }, 4500);
    }, 500);

    return container;
  }

  openPanel(container) {
    this.isOpen = true;

    const welcomeBubble =
      container.querySelector('#terra-welcome-bubble');

    if (welcomeBubble) {
      welcomeBubble.remove();
    }

    const response = this.getResponse();
    const content = this.getTexts();

    const panel = document.createElement('div');

    panel.id = 'terra-panel';

    panel.className =
      'terra-message-enter absolute bottom-[78px] right-0 w-[290px] bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden';

    panel.innerHTML = `
      <div class="px-4 py-4 border-b border-white/15 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full flex items-center justify-center text-2xl shadow-lg"
               style="background: linear-gradient(135deg, #4f46e5, #7c3aed);">
            😊
          </div>

          <div>
            <p class="text-white font-black text-sm">TERRA</p>
            <p class="text-white/65 text-xs font-semibold">${content.companion}</p>
          </div>
        </div>

        <button
          id="terra-close"
          class="w-8 h-8 rounded-full bg-white/10 text-white text-lg hover:bg-white/20 transition"
          aria-label="${content.close}"
        >×</button>
      </div>

      <div class="p-4">
        <p class="text-white font-black text-base">${response.title}</p>

        <p class="text-white/85 text-sm leading-relaxed font-medium mt-2">
          ${response.message}
        </p>

        <div class="mt-4 space-y-2">
          <button
            id="terra-eco-route"
            class="w-full text-left bg-white/10 border border-white/10 text-white px-3 py-3 rounded-xl text-xs font-bold hover:bg-white/15 transition"
          >${content.ecoRoute}</button>

          <button
            id="terra-impact"
            class="w-full text-left bg-white/10 border border-white/10 text-white px-3 py-3 rounded-xl text-xs font-bold hover:bg-white/15 transition"
          >${content.impact}</button>
        </div>
      </div>
    `;

    container.appendChild(panel);

    panel.querySelector('#terra-close').onclick =
      () => this.closePanel(container);

    panel.querySelector('#terra-eco-route').onclick =
      () => {
        this.closePanel(container);
        if (this.navigate) this.navigate('/explore');
      };

    panel.querySelector('#terra-impact').onclick =
      () => {
        this.closePanel(container);
        if (this.navigate) this.navigate('/impact');
      };
  }

  closePanel(container) {
    this.isOpen = false;

    const panel = container.querySelector('#terra-panel');

    if (panel) {
      panel.remove();
    }
  }
}