import { BottomNav } from '../components/BottomNav.js';
import { TerraCompanion } from '../components/TerraCompanion.js';

export class JourneyImpactDetailsScreen {
    constructor(navigate) {
        this.navigate = navigate;
    }

    getJourney() {
        try {
            return JSON.parse(
                sessionStorage.getItem('selectedImpactJourney') ||
                sessionStorage.getItem('selectedTerraJourney') ||
                'null'
            );
        } catch (error) {
            return null;
        }
    }

    getNumber(value) {
        const number = parseFloat(value);
        return Number.isFinite(number) ? number : 0;
    }

    getVehicleInfo(vehicle) {
        const vehicles = {
            petrol_bike: {
                name: 'Petrol Bike',
                icon: '🏍️',
                emissionRate: 0.085,
                comparisonRate: 0.18
            },
            diesel_suv: {
                name: 'Diesel SUV',
                icon: '🚙',
                emissionRate: 0.22,
                comparisonRate: 0.22
            },
            electric_scooter: {
                name: 'Electric Scooter',
                icon: '🛴',
                emissionRate: 0.03,
                comparisonRate: 0.18
            },
            car: {
                name: 'Car',
                icon: '🚗',
                emissionRate: 0.18,
                comparisonRate: 0.18
            },
            electric_car: {
                name: 'Electric Car',
                icon: '🔋',
                emissionRate: 0.08,
                comparisonRate: 0.18
            },
            bus: {
                name: 'Bus',
                icon: '🚌',
                emissionRate: 0.08,
                comparisonRate: 0.18
            },
            train: {
                name: 'Train',
                icon: '🚆',
                emissionRate: 0.04,
                comparisonRate: 0.18
            },
            bicycle: {
                name: 'Bicycle',
                icon: '🚲',
                emissionRate: 0,
                comparisonRate: 0.18
            },
            walking: {
                name: 'Walking',
                icon: '🚶',
                emissionRate: 0,
                comparisonRate: 0.18
            }
        };

        return vehicles[vehicle] || {
            name: 'Travel',
            icon: '🛣️',
            emissionRate: 0.18,
            comparisonRate: 0.18
        };
    }

    getImpact(journey) {
        const vehicle = this.getVehicleInfo(journey.vehicle);

        const distance = this.getNumber(
            journey.distance || journey.distanceKm
        );

        let emission = this.getNumber(
            journey.emission ||
            journey.emissions ||
            journey.co2
        );

        if (emission === 0 && distance > 0) {
            emission = distance * vehicle.emissionRate;
        }

        let saved = this.getNumber(
            journey.carbonSaved ||
            journey.co2Saved ||
            journey.saved
        );

        if (saved === 0 && distance > 0) {
            saved = Math.max(
                0,
                distance * vehicle.comparisonRate - emission
            );
        }

        return {
            vehicle,
            distance,
            emission,
            saved
        };
    }

    formatDate(journey) {
        const date =
            journey.completedAt ||
            journey.startedAt ||
            journey.createdAt;

        if (!date) return 'Recently completed';

        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    render() {
        const div = document.createElement('div');

        div.className =
            'min-h-screen pb-28 relative overflow-hidden';

        div.style.backgroundImage =
            'linear-gradient(rgba(8,15,28,0.48), rgba(8,15,28,0.82)), url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=85")';

        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
        div.style.backgroundAttachment = 'fixed';

        const journey = this.getJourney();

        const main = document.createElement('main');

        main.className =
            'px-5 pt-7 max-w-3xl mx-auto relative z-10';

        if (!journey) {
            main.innerHTML = `
        <button
          id="backButton"
          class="text-white font-black mb-8"
        >
          ← Back to My Impact
        </button>

        <div class="py-20 text-center">
          <div class="text-6xl mb-5">🌍</div>

          <h1 class="text-white text-2xl font-black">
            Journey not found
          </h1>

          <p class="text-white/85 font-semibold mt-3">
            Select a completed journey to view its impact.
          </p>
        </div>
      `;

            div.appendChild(main);

            main.querySelector('#backButton').onclick = () => {
                this.navigate('/impact');
            };

            const nav = new BottomNav('/impact').render(
                this.navigate
            );

            div.appendChild(nav);

            return div;
        }

        const impact = this.getImpact(journey);

        main.innerHTML = `
      <button
        id="backButton"
        class="text-white font-black mb-6 hover:opacity-80 transition"
      >
        ← Back to My Impact
      </button>

      <section class="mb-7">
        <p class="text-white/80 text-xs font-black tracking-[0.2em]">
          JOURNEY IMPACT
        </p>

        <h1 class="text-white text-3xl font-black mt-2">
          ${journey.source || 'Starting point'}
          <span class="text-emerald-300">→</span>
          ${journey.destination || 'Destination'}
        </h1>

        <p class="text-white/85 text-sm font-semibold mt-2">
          Completed on ${this.formatDate(journey)}
        </p>
      </section>

      <section class="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl">

        <div class="text-center pb-6 border-b border-white/20">
          <p class="text-white/80 text-xs font-black tracking-[0.18em]">
            ESTIMATED CO₂ DIFFERENCE
          </p>

          <p class="text-white text-5xl font-black mt-3">
            ${impact.saved.toFixed(2)}
            <span class="text-xl">kg</span>
          </p>

          <p class="text-emerald-200 text-sm font-bold mt-2">
            Your travel choice made a difference 🌱
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 py-6">

          <div>
            <p class="text-white/70 text-xs font-black">
              DISTANCE
            </p>

            <p class="text-white text-xl font-black mt-1">
              ${impact.distance > 0
                ? `${impact.distance.toFixed(1)} km`
                : 'Unavailable'}
            </p>
          </div>

          <div>
            <p class="text-white/70 text-xs font-black">
              TRAVEL MODE
            </p>

            <p class="text-white text-xl font-black mt-1">
              ${impact.vehicle.icon}
              ${impact.vehicle.name}
            </p>
          </div>

          <div>
            <p class="text-white/70 text-xs font-black">
              ESTIMATED EMISSION
            </p>

            <p class="text-white text-xl font-black mt-1">
              ${impact.emission.toFixed(2)} kg
            </p>
          </div>

          <div>
            <p class="text-white/70 text-xs font-black">
              JOURNEY STATUS
            </p>

            <p class="text-emerald-200 text-xl font-black mt-1">
              ✓ Completed
            </p>
          </div>

        </div>
      </section>

      <section class="mt-6 bg-black/20 backdrop-blur-md border-l-2 border-emerald-300 rounded-r-2xl p-5">
        <p class="text-white/80 text-xs font-black tracking-[0.18em]">
          😊 TERRA'S MESSAGE
        </p>

        <p class="text-white font-semibold leading-relaxed mt-3">
          ${impact.saved > 0
                ? `Great job! For your journey from ${journey.source || 'your starting point'} to ${journey.destination || 'your destination'}, your selected travel option resulted in an estimated CO₂ difference of ${impact.saved.toFixed(2)} kg compared with our standard travel comparison. Every thoughtful journey counts! 🌍`
                : 'Thank you for completing your journey with TERRAVOLT. Your journey is now part of your personal travel story! 🌍'
            }
        </p>
      </section>

      <section class="mt-6 mb-5">
        <p class="text-white/80 text-xs font-black tracking-[0.18em]">
          HOW WE ESTIMATE THIS
        </p>

        <p class="text-white/90 text-sm font-semibold leading-relaxed mt-3">
          TERRAVOLT uses your route distance and selected travel mode to estimate emissions. The CO₂ difference compares your journey with the standard travel comparison used by the app.
        </p>

        <p class="text-white/65 text-xs font-semibold leading-relaxed mt-3">
          These values are estimates. Actual emissions can vary based on traffic, vehicle efficiency and other real-world conditions.
        </p>
      </section>
    `;

        div.appendChild(main);

        main.querySelector('#backButton').onclick = () => {
            this.navigate('/impact');
        };

        const nav = new BottomNav('/impact').render(
            this.navigate
        );

        div.appendChild(nav);

        const terra = new TerraCompanion(
            this.navigate,
            'impact'
        ).render();

        div.appendChild(terra);

        return div;
    }
}