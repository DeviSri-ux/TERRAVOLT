export class WelcomeScreen {
  constructor(navigate) {
    this.navigate = navigate;
  }

  render() {
    const div = document.createElement('div');

    div.className =
      'min-h-screen w-full relative flex items-center justify-center overflow-hidden';

    div.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=90")';

    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundRepeat = 'no-repeat';

    div.innerHTML = `
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/50"></div>

      <!-- Main content -->
      <main class="relative z-10 w-full min-h-screen flex items-center justify-center text-center text-white px-4 sm:px-6">

        <div class="w-full max-w-6xl mx-auto py-10 sm:py-12">

          <!-- App name -->
          <h1
            class="font-black tracking-wide mb-4 sm:mb-5"
            style="
              font-size: clamp(2.8rem, 9vw, 6rem);
              letter-spacing: 0.08em;
            "
          >
            TERRAVOLT 2.0
          </h1>

          <!-- Tagline -->
          <p
            class="font-normal mb-4 sm:mb-5 px-2"
            style="font-size: clamp(1.1rem, 4vw, 2rem);"
          >
            Your Personal Eco-Friendly Travel Companion
          </p>

          <!-- Travel line -->
          <p
            class="font-medium mb-8 sm:mb-10 px-2"
            style="
              font-size: clamp(0.65rem, 2.5vw, 1.15rem);
              letter-spacing: clamp(0.08em, 1vw, 0.35em);
            "
          >
            TRAVEL • DISCOVER • REMEMBER • REDUCE
          </p>

          <!-- Description -->
          <p
            class="font-normal mb-8 sm:mb-12 max-w-3xl mx-auto px-2"
            style="font-size: clamp(1rem, 3.5vw, 1.6rem);"
          >
            Discover beautiful places. Find smarter ways to travel.
            Make every journey count.
          </p>

          <!-- Buttons -->
          <div class="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-5 w-full">

            <!-- Get Started -->
            <button
              id="getStarted"
              class="w-full max-w-[288px] md:w-[216px] bg-white text-gray-950 font-semibold text-lg sm:text-xl rounded-2xl shadow-lg transition hover:scale-105 py-5"
            >
              Get Started
            </button>

            <!-- Login -->
            <button
              id="login"
              class="w-full max-w-[288px] md:w-[157px] bg-green-700 hover:bg-green-800 text-white font-semibold text-lg sm:text-xl rounded-2xl shadow-lg transition hover:scale-105 py-5"
            >
              Login
            </button>

            <!-- Continue as Guest -->
            <button
              id="guest"
              class="w-full max-w-[288px] md:w-[288px] bg-gray-500/60 border border-white/60 text-white font-semibold text-lg sm:text-xl rounded-2xl shadow-lg transition hover:scale-105 py-5"
            >
              Continue as Guest
            </button>

          </div>

        </div>
      </main>
    `;

    // Get Started → Sign Up page
    div.querySelector('#getStarted').addEventListener('click', () => {
      this.navigate('/auth?mode=register');
    });

    // Login → Sign In page
    div.querySelector('#login').addEventListener('click', () => {
      this.navigate('/auth');
    });

    // Guest → Language Selection
    div.querySelector('#guest').addEventListener('click', () => {
      localStorage.setItem(
        'user',
        JSON.stringify({ isGuest: true })
      );

      this.navigate('/language');
    });

    return div;
  }
}