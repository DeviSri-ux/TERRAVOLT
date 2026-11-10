import { BottomNav } from '../components/BottomNav.js';
import { TerraCompanion } from '../components/TerraCompanion.js';

export class ImpactScreen {
  constructor(navigate) {
    this.navigate = navigate;
  }

  getJourneys() {
    try {
      return JSON.parse(localStorage.getItem('terraJourneys') || '[]');
    } catch (error) {
      return [];
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

  getJourneyDate(journey) {
    const value =
      journey.completedAt ||
      journey.startedAt ||
      journey.createdAt;

    return value ? new Date(value) : new Date();
  }

  getJourneyImpact(journey) {
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
      distance,
      emission,
      saved,
      vehicle
    };
  }

  getCompletedJourneys() {
    return this.getJourneys().filter(
      journey => journey.status === 'completed'
    );
  }

  calculateTotals(journeys) {
    return journeys.reduce(
      (total, journey) => {
        const impact = this.getJourneyImpact(journey);

        total.saved += impact.saved;
        total.distance += impact.distance;

        return total;
      },
      {
        saved: 0,
        distance: 0
      }
    );
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  renderJourneyCard(journey) {
    const impact = this.getJourneyImpact(journey);

    const card = document.createElement('button');

    card.className =
      'w-full text-left bg-white/12 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl p-4 transition hover:-translate-y-0.5';

    card.innerHTML = `
      <div class="flex items-center gap-4">

        <div class="w-12 h-12 shrink-0 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl">
          ${impact.vehicle.icon}
        </div>

        <div class="flex-1 min-w-0">
          <h3 class="text-white font-black text-base truncate">
            ${journey.source || 'Starting point'}
            <span class="text-emerald-300 mx-1">→</span>
            ${journey.destination || 'Destination'}
          </h3>

          <p class="text-white/80 text-xs font-semibold mt-1 truncate">
            ${impact.distance > 0
        ? `${impact.distance.toFixed(1)} km`
        : 'Distance unavailable'}
            · ${impact.vehicle.name}
          </p>

          <p class="text-emerald-200 text-xs font-black mt-2">
            ${impact.saved.toFixed(2)} kg estimated CO₂ difference
          </p>
        </div>

        <div class="text-white text-2xl font-bold">
          ›
        </div>

      </div>
    `;

    card.onclick = () => {
      sessionStorage.setItem(
        'selectedImpactJourney',
        JSON.stringify(journey)
      );

      this.navigate('/journey-impact-details');
    };

    return card;
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

    const completedJourneys =
      this.getCompletedJourneys().sort(
        (a, b) =>
          this.getJourneyDate(b) -
          this.getJourneyDate(a)
      );

    const totals =
      this.calculateTotals(completedJourneys);

    const header = document.createElement('header');

    header.className =
      'px-5 pt-7 pb-5 max-w-4xl mx-auto relative z-10';

    header.innerHTML = `
      <p class="text-white/85 text-xs font-black tracking-[0.22em] drop-shadow-lg">
        TERRAVOLT
      </p>

      <h1 class="text-white text-3xl font-black mt-1 drop-shadow-xl">
        My Impact
      </h1>

      <p class="text-white text-sm font-semibold mt-2 drop-shadow-lg">
        See the difference made by each completed journey
      </p>
    `;

    div.appendChild(header);

    const main = document.createElement('main');

    main.className =
      'px-5 max-w-4xl mx-auto relative z-10';

    /* Overall summary */

    const summary = document.createElement('section');

    summary.className =
      'bg-white/12 backdrop-blur-xl border border-white/25 rounded-3xl p-5 md:p-6 shadow-xl';

    summary.innerHTML = `
      <p class="text-white/80 text-xs font-black tracking-[0.18em]">
        YOUR TRAVEL IMPACT
      </p>

      <div class="grid grid-cols-3 gap-3 mt-5 text-center">

        <div>
          <p class="text-white text-2xl md:text-3xl font-black">
            ${completedJourneys.length}
          </p>

          <p class="text-white/75 text-xs font-bold mt-1">
            Journeys
          </p>
        </div>

        <div class="border-x border-white/20">
          <p class="text-white text-2xl md:text-3xl font-black">
            ${totals.distance.toFixed(1)}
          </p>

          <p class="text-white/75 text-xs font-bold mt-1">
            km travelled
          </p>
        </div>

        <div>
          <p class="text-emerald-200 text-2xl md:text-3xl font-black">
            ${totals.saved.toFixed(1)}
          </p>

          <p class="text-white/75 text-xs font-bold mt-1">
            kg CO₂ difference
          </p>
        </div>

      </div>
    `;

    main.appendChild(summary);

    /* Terra message */

    const message = document.createElement('section');

    message.className =
      'mt-6 border-l-2 border-emerald-300 bg-black/15 backdrop-blur-sm rounded-r-2xl p-4';

    message.innerHTML = `
      <p class="text-white/80 text-xs font-black tracking-[0.16em]">
        😊 TERRA'S MESSAGE
      </p>

      <p class="text-white text-sm font-semibold leading-relaxed mt-2">
        ${completedJourneys.length === 0
        ? 'Complete an Eco Route journey and I will help you understand its estimated environmental impact. 🌍'
        : 'Every completed journey has its own story. Tap any journey below to explore its individual environmental impact. 🌱'
      }
      </p>
    `;

    main.appendChild(message);

    /* Journey-wise impact list */

    const journeysSection = document.createElement('section');

    journeysSection.className = 'mt-7';

    journeysSection.innerHTML = `
      <div class="flex items-end justify-between gap-4 mb-4">
        <div>
          <p class="text-white/80 text-xs font-black tracking-[0.18em]">
            JOURNEY-WISE IMPACT
          </p>

          <h2 class="text-white text-xl font-black mt-1">
            Your completed journeys
          </h2>
        </div>

        <p class="text-white/70 text-xs font-bold">
          Tap to view
        </p>
      </div>
    `;

    if (completedJourneys.length === 0) {
      const empty = document.createElement('div');

      empty.className =
        'py-12 text-center bg-black/10 rounded-3xl border border-white/15';

      empty.innerHTML = `
        <div class="text-5xl mb-4">🌍</div>

        <h3 class="text-white text-xl font-black">
          Your impact story is waiting
        </h3>

        <p class="text-white/85 text-sm font-semibold mt-2 max-w-sm mx-auto">
          Find an Eco Route, complete your journey and its individual impact will appear here.
        </p>

        <button
          id="planJourney"
          class="mt-5 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black transition"
        >
          Plan an Eco Route →
        </button>
      `;

      journeysSection.appendChild(empty);
    } else {
      const journeyList = document.createElement('div');

      journeyList.className = 'space-y-3';

      completedJourneys.forEach(journey => {
        journeyList.appendChild(
          this.renderJourneyCard(journey)
        );
      });

      journeysSection.appendChild(journeyList);
    }

    main.appendChild(journeysSection);

    /* Information section */

    const info = document.createElement('section');

    info.className =
      'mt-7 mb-5 py-5 border-t border-white/20';

    info.innerHTML = `
      <p class="text-white/80 text-xs font-black tracking-[0.18em]">
        HOW IS THE IMPACT ESTIMATED?
      </p>

      <p class="text-white/90 text-sm font-semibold leading-relaxed mt-3">
        TERRAVOLT uses your route distance and selected travel mode to estimate emissions. Each journey is compared with the standard travel comparison used by the app.
      </p>

      <p class="text-white/65 text-xs font-semibold leading-relaxed mt-3">
        These values are estimates and may vary depending on vehicle efficiency, traffic and other real-world conditions.
      </p>
    `;

    main.appendChild(info);

    div.appendChild(main);

    const planButton =
      main.querySelector('#planJourney');

    if (planButton) {
      planButton.onclick = () => {
        this.navigate('/explore');
      };
    }

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