import { BottomNav } from '../components/BottomNav.js';
import { t, applyLanguageDirection } from '../utils/i18n.js';

export class HomeScreen {
  constructor(navigate) {
    this.navigate = navigate;
    this.user = JSON.parse(
      localStorage.getItem('user') || '{"isGuest":true}'
    );
  }

  render() {
    const div = document.createElement('div');

    applyLanguageDirection(div);

    div.className = 'min-h-screen pb-28 relative overflow-x-hidden';

    div.style.backgroundImage =
      'linear-gradient(rgba(8,18,30,0.42), rgba(8,18,30,0.72)), url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85)';

    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundAttachment = 'fixed';

    const locationIcon = `
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/>
        <circle cx="12" cy="10" r="2.5"/>
      </svg>`;

    const destinationIcon = `
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="8"/>
        <circle cx="12" cy="12" r="2.5"/>
      </svg>`;

    const vehicleIcons = {
      petrol_bike: '🏍️',
      diesel_suv: '🚙',
      electric_scooter: '🛴'
    };

    const html = `
      <style>
        @keyframes terraFlashIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
            filter: brightness(2.5);
          }
          55% {
            opacity: 1;
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: brightness(1);
          }
        }

        @keyframes terraFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .terra-opening {
          animation: terraFlashIn 0.8s ease-out forwards;
        }

        .terra-floating {
          animation: terraFloat 3s ease-in-out infinite;
        }

        .terra-face {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #fde68a 0%,
            #fbbf24 50%,
            #60a5fa 100%
          );
          border: 3px solid rgba(255,255,255,0.95);
          position: relative;
          flex-shrink: 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .terra-face .eye {
          position: absolute;
          width: 8px;
          height: 11px;
          background: #1f2937;
          border-radius: 50%;
          top: 25px;
        }

        .terra-face .eye.left {
          left: 21px;
        }

        .terra-face .eye.right {
          right: 21px;
        }

        .terra-face .cheek {
          position: absolute;
          width: 12px;
          height: 7px;
          background: rgba(251,113,133,0.75);
          border-radius: 50%;
          top: 45px;
        }

        .terra-face .cheek.left {
          left: 10px;
        }

        .terra-face .cheek.right {
          right: 10px;
        }

        .terra-face .smile {
          position: absolute;
          width: 34px;
          height: 17px;
          border-bottom: 4px solid #1f2937;
          border-radius: 0 0 50px 50px;
          left: 50%;
          transform: translateX(-50%);
          top: 42px;
        }

        #terraSpeech {
          transition: max-width 0.4s ease, padding 0.4s ease;
        }
      </style>

      <main class="px-4 md:px-8 max-w-5xl mx-auto pt-8 md:pt-12 relative z-10">

        <section class="text-center mb-7">
          <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/95 border border-white shadow-lg">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-gray-950 text-xs font-black tracking-widest">
              ${t('readyToPlan')}
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl font-black tracking-tight drop-shadow-xl">
            <span class="text-white">TERRA</span><span class="text-emerald-300">VOLT</span>
          </h1>

          <p class="text-white font-black text-sm md:text-base mt-2 drop-shadow-lg">
            ${t('sustainableTravel')}
          </p>
        </section>

        <section class="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

          <!-- Route Preview -->
          <div class="min-h-[320px] rounded-3xl overflow-hidden shadow-2xl border border-white bg-white/95 backdrop-blur-xl">
            <div class="min-h-[320px] flex flex-col justify-between p-6">

              <div>
                <p class="text-emerald-700 text-xs font-black tracking-widest">
                  ${t('routePreview')}
                </p>

                <h2 class="text-gray-950 text-2xl font-black mt-1">
                  ${t('journeyStartsHere')}
                </h2>
              </div>

              <div class="py-4">

                <div class="flex items-center gap-3 mb-6">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                    ${locationIcon}
                  </div>

                  <div class="flex-1 min-w-0">
                    <p class="text-gray-700 text-xs font-black tracking-wider">
                      ${t('yourLocation')}
                    </p>

                    <p id="previewLocation" class="text-gray-950 font-black truncate">
                      ${t('detectingLocation')}
                    </p>
                  </div>
                </div>

                <div class="ml-6 h-10 border-l-2 border-dashed border-gray-400"></div>

                <div class="flex items-center gap-3 mt-1">
                  <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    ${destinationIcon}
                  </div>

                  <div class="flex-1">
                    <p class="text-gray-700 text-xs font-black tracking-wider">
                      ${t('destination')}
                    </p>

                    <p id="previewDestination" class="text-gray-950 font-black text-xl">
                      ?
                    </p>
                  </div>
                </div>

              </div>

              <p class="text-gray-800 text-sm font-bold">
                ${t('enterDestination')}
              </p>

            </div>
          </div>

          <!-- Journey Planner -->
          <div class="bg-white/95 rounded-3xl p-5 md:p-6 shadow-2xl border border-white">

            <div class="mb-5">
              <p class="text-emerald-700 text-xs font-black tracking-widest mb-1">
                ${t('planJourney')}
              </p>

              <h2 class="text-gray-950 text-2xl font-black">
                ${t('whereToGo')}
              </h2>
            </div>

            <div class="mb-4">
              <label class="text-gray-950 text-xs font-black tracking-wider block mb-2">
                ${t('from')}
              </label>

              <div class="flex items-center gap-3 bg-gray-100 border-2 border-gray-300 rounded-2xl px-4 py-3 focus-within:border-emerald-600 transition">
                <span class="text-emerald-700">
                  ${locationIcon}
                </span>

                <input
                  type="text"
                  id="source"
                  placeholder="${t('enterStartingLocation')}"
                  class="w-full bg-transparent text-gray-950 font-bold outline-none placeholder:text-gray-600"
                >
              </div>
            </div>

            <div class="mb-4">
              <label class="text-gray-950 text-xs font-black tracking-wider block mb-2">
                ${t('to')}
              </label>

              <div class="flex items-center gap-3 bg-gray-100 border-2 border-gray-300 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
                <span class="text-blue-700">
                  ${destinationIcon}
                </span>

                <input
                  type="text"
                  id="dest"
                  placeholder="${t('whereToGo')}"
                  class="w-full bg-transparent text-gray-950 font-bold outline-none placeholder:text-gray-600"
                >
              </div>
            </div>

            <div class="mb-6">
              <label class="text-gray-950 text-xs font-black tracking-wider block mb-2">
                ${t('travelMode')}
              </label>

              <div class="flex items-center gap-3 bg-gray-100 border-2 border-gray-300 rounded-2xl px-4 py-2">
                <span id="vehicleIcon" class="text-2xl">
                  ${vehicleIcons.petrol_bike}
                </span>

                <select
                  id="vehicle"
                  class="w-full bg-transparent text-gray-950 font-bold outline-none py-2"
                >
                  <option value="petrol_bike">${t('petrolBike')}</option>
                  <option value="diesel_suv">${t('dieselSUV')}</option>
                  <option value="electric_scooter">${t('electricScooter')}</option>
                </select>
              </div>
            </div>

            <button
              id="findRoute"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black shadow-lg transition hover:scale-[1.01]"
            >
              ${t('findEcoRoute')} →
            </button>

          </div>
        </section>

      </main>

      <!-- TERRA COMPANION -->
      <div
        id="terraCompanion"
        class="fixed z-50 terra-opening cursor-pointer"
        style="right: 24px; bottom: 100px;"
      >

        <div
          id="terraSpeech"
          class="flex items-end gap-3 bg-gray-900 rounded-3xl shadow-2xl border-2 border-white/30 p-4 max-w-[350px]"
        >

          <div class="terra-floating">
            <div class="terra-face">
              <div class="eye left"></div>
              <div class="eye right"></div>

              <div class="cheek left"></div>
              <div class="cheek right"></div>

              <div class="smile"></div>

              <span class="absolute -top-3 -right-2 text-2xl">
                ⚡
              </span>
            </div>
          </div>

          <div id="terraBubble" class="pr-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-black text-white text-lg">
                TERRA
              </span>

              <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            </div>

            <p
              id="terraMessage"
              class="text-white font-black text-base leading-relaxed"
            >
              ${t('terraWelcomeMessage')}
            </p>
          </div>

        </div>
      </div>
    `;

    const mainDiv = document.createElement('div');
    mainDiv.innerHTML = html;
    div.appendChild(mainDiv);

    const sourceInput = mainDiv.querySelector('#source');
    const destinationInput = mainDiv.querySelector('#dest');
    const previewLocation = mainDiv.querySelector('#previewLocation');
    const previewDestination = mainDiv.querySelector('#previewDestination');

    const vehicle = mainDiv.querySelector('#vehicle');
    const vehicleIcon = mainDiv.querySelector('#vehicleIcon');

    const terraCompanion = mainDiv.querySelector('#terraCompanion');
    const terraSpeech = mainDiv.querySelector('#terraSpeech');
    const terraBubble = mainDiv.querySelector('#terraBubble');
    const terraMessage = mainDiv.querySelector('#terraMessage');

    let terraMinimized = false;

    const minimizeTerra = () => {
      terraBubble.style.display = 'none';
      terraSpeech.style.padding = '8px';
      terraSpeech.style.maxWidth = '95px';
      terraMinimized = true;
    };

    const showTerraMessage = (message) => {
      terraMessage.textContent = message;

      terraBubble.style.display = 'block';
      terraSpeech.style.padding = '16px';
      terraSpeech.style.maxWidth = '350px';

      terraMinimized = false;

      clearTimeout(this.terraTimer);

      this.terraTimer = setTimeout(() => {
        minimizeTerra();
      }, 5000);
    };

    setTimeout(() => {
      minimizeTerra();
    }, 5500);

    terraCompanion.addEventListener('click', () => {
      if (terraMinimized) {
        showTerraMessage(t('terraHelpMessage'));
      } else {
        minimizeTerra();
      }
    });

    destinationInput.addEventListener('input', () => {
      const destination = destinationInput.value.trim();
      previewDestination.textContent = destination || '?';
    });

    sourceInput.addEventListener('input', () => {
      const source = sourceInput.value.trim();

      if (source) {
        previewLocation.textContent = source;
      }
    });

    vehicle.addEventListener('change', () => {
      vehicleIcon.textContent = vehicleIcons[vehicle.value];

      const modeName = vehicle.options[vehicle.selectedIndex].text;

      showTerraMessage(`${modeName} ${t('vehicleSelected')}`);
    });

    // Save journey details and open eco-route page
    mainDiv.querySelector('#findRoute').onclick = () => {
      const source =
        sourceInput.value.trim() ||
        previewLocation.textContent.trim();

      const destination = destinationInput.value.trim();

      if (
        !source ||
        source === t('detectingLocation') ||
        !destination
      ) {
        showTerraMessage(t('enterBothLocations'));

        if (!source || source === t('detectingLocation')) {
          sourceInput.focus();
        } else {
          destinationInput.focus();
        }

        return;
      }

      const routeInfo = {
        source,
        destination,
        vehicle: vehicle.value
      };

      sessionStorage.setItem(
        'terraRoute',
        JSON.stringify(routeInfo)
      );

      showTerraMessage(t('journeyDetailsSaved'));

      setTimeout(() => {
        this.navigate('/explore');
      }, 900);
    };

    // Get user's current location
    const setLocation = (name) => {
      if (!name) return;

      sourceInput.value = name;
      previewLocation.textContent = name;

      showTerraMessage(t('locationFoundMessage'));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );

            if (!response.ok) {
              throw new Error('Location lookup failed');
            }

            const data = await response.json();
            const address = data.address || {};

            const place =
              address.city ||
              address.town ||
              address.village ||
              address.suburb ||
              '';

            const state = address.state || '';

            if (place) {
              setLocation(
                state ? `${place}, ${state}` : place
              );
            }
          } catch (error) {
            console.error(
              'Location lookup error:',
              error
            );
          }
        },
        (error) => {
          console.log(
            'Location permission not available:',
            error.message
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }

    const nav = new BottomNav('/home').render(this.navigate);
    div.appendChild(nav);

    return div;
  }
}