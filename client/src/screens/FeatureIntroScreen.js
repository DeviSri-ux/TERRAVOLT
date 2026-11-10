export class FeatureIntroScreen {
  constructor(navigate) {
    this.navigate = navigate;
  }

  render() {
    const div = document.createElement('div');

    div.className =
      'min-h-screen w-full relative px-6 py-10 md:py-14 overflow-x-hidden';

    div.style.backgroundImage =
      'linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.38)), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80)';
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundAttachment = 'fixed';

    const icon = (type) => {
      const common =
        'width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#14532d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

      const icons = {
        route: `
          <svg ${common}>
            <circle cx="6" cy="19" r="2"></circle>
            <path d="M8 19h3a3 3 0 0 0 3-3v-1a3 3 0 0 1 3-3h1"></path>
            <circle cx="18" cy="5" r="2"></circle>
          </svg>`,

        compass: `
          <svg ${common}>
            <circle cx="12" cy="12" r="9"></circle>
            <polygon points="16,8 14,14 8,16 10,10"></polygon>
          </svg>`,

        car: `
          <svg ${common}>
            <path d="M5 17h14"></path>
            <path d="M6 17l1-7h10l1 7"></path>
            <path d="M8 10l1-3h6l1 3"></path>
            <circle cx="8" cy="18" r="1.5"></circle>
            <circle cx="16" cy="18" r="1.5"></circle>
          </svg>`,

        book: `
          <svg ${common}>
            <path d="M4 5a3 3 0 0 1 3-3h3a3 3 0 0 1 2 1 3 3 0 0 1 2-1h3a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3h-3a3 3 0 0 0-2 1 3 3 0 0 0-2-1H7a3 3 0 0 0-3 3z"></path>
            <path d="M12 3v14"></path>
          </svg>`,

        impact: `
          <svg ${common}>
            <path d="M12 21c4-3 7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 3 8 7 11z"></path>
            <path d="M12 17V9"></path>
            <path d="M12 13c-2-2-3-3.5-3-5"></path>
            <path d="M12 13c2-2 3-3.5 3-5"></path>
          </svg>`,

        profile: `
          <svg ${common}>
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 21c1.5-4 4-6 8-6s6.5 2 8 6"></path>
          </svg>`
      };

      return icons[type];
    };

    const features = [
      {
        icon: 'route',
        title: 'Eco-Route Navigation',
        desc: 'Find greener routes with less environmental impact',
        path: '/explore'
      },
      {
        icon: 'compass',
        title: 'Explore Destinations',
        desc: 'Discover beautiful places to visit',
        path: '/explore'
      },
      {
        icon: 'car',
        title: 'Daily Travel',
        desc: 'Manage your regular journeys',
        path: '/daily-travel'
      },
      {
        icon: 'book',
        title: 'My Journeys',
        desc: 'View and save your travel memories',
        path: '/journeys'
      },
      {
        icon: 'impact',
        title: 'My Impact',
        desc: 'See how your travel choices affect the environment',
        path: '/impact'
      },
      {
        icon: 'profile',
        title: 'Profile',
        desc: 'Manage your account and settings',
        path: '/profile'
      }
    ];

    let html = `
      <div class="max-w-6xl mx-auto relative z-10">

        <div class="text-center mb-10 px-2">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Where Will Your Next Journey Take You?
          </h1>

          <p class="text-white text-base md:text-xl lg:text-2xl mb-3 max-w-4xl mx-auto">
            Explore your travel tools, discover new places and make every journey more sustainable.
          </p>

          <p class="text-white/90 text-base">
            Meet TERRA — your friendly travel companion.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
    `;

    features.forEach((feature) => {
      html += `
        <button
          class="feature-card text-left bg-[rgba(255,250,240,0.78)] backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full"
          data-path="${feature.path}"
        >
          <div class="flex items-start gap-4">

            <div class="w-14 h-14 flex items-center justify-center flex-shrink-0">
              ${icon(feature.icon)}
            </div>

            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-green-950 text-lg mb-2">
                ${feature.title}
              </h3>

              <p class="text-gray-800 text-sm leading-relaxed">
                ${feature.desc}
              </p>
            </div>

          </div>
        </button>
      `;
    });

    html += `
        </div>

        <div class="text-center">
          <button
            id="goHome"
            class="px-10 py-4 bg-[rgba(255,250,240,0.78)] backdrop-blur-md text-green-950 rounded-xl font-semibold text-lg hover:bg-[rgba(255,250,240,0.90)] transition shadow-xl border border-white/50"
          >
            Go to Home
          </button>
        </div>

      </div>
    `;

    div.innerHTML = html;

    div.querySelectorAll('.feature-card').forEach((card) => {
      card.onclick = () => {
        this.navigate(card.getAttribute('data-path'));
      };
    });

    div.querySelector('#goHome').onclick = () => {
      this.navigate('/home');
    };

    return div;
  }
}