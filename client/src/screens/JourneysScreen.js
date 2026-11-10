import { BottomNav } from '../components/BottomNav.js';

export class JourneysScreen {
  constructor(navigate) {
    this.navigate = navigate;
  }

  getJourneys() {
    try {
      return JSON.parse(
        localStorage.getItem('terraJourneys') || '[]'
      );
    } catch (error) {
      console.error('Error loading journeys:', error);
      return [];
    }
  }

  getTripTitle(journey) {
    if (journey.title) return journey.title;

    if (journey.category === 'Daily Journey') {
      return 'Daily Journey';
    }

    if (journey.category === 'Long Trip') {
      return `Trip to ${journey.destination || 'Destination'}`;
    }

    return `Journey to ${journey.destination || 'Destination'}`;
  }

  formatDate(journey) {
    const dateValue =
      journey.date ||
      journey.createdAt ||
      journey.completedAt ||
      journey.startedAt;

    if (!dateValue) return 'Recently added';

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return 'Recently added';
    }

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  getCategoryIcon(journey) {
    if (journey.category === 'Daily Journey') {
      return '🚗';
    }

    if (journey.category === 'Long Trip') {
      return '🧳';
    }

    return '🗺️';
  }

  renderJourneyItem(journey) {
    const item = document.createElement('button');

    item.className =
      'w-full text-left py-5 border-b border-white/25 flex items-center gap-4 group';

    const distanceText =
      journey.distance !== undefined
        ? `${journey.distance} km`
        : '';

    const emissionText =
      journey.emissions !== undefined
        ? `${journey.emissions} kg CO₂`
        : '';

    const vehicleText =
      journey.vehicleName ||
      journey.vehicle ||
      '';

    item.innerHTML = `
      <div class="w-12 h-12 shrink-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center text-xl shadow-lg">
        ${this.getCategoryIcon(journey)}
      </div>

      <div class="flex-1 min-w-0">

        <div class="flex items-center justify-between gap-2">
          <h2 class="text-white text-lg font-black drop-shadow-lg truncate">
            ${this.getTripTitle(journey)}
          </h2>

          <span class="text-[10px] bg-white/15 border border-white/25 px-2 py-1 rounded-full text-white font-bold whitespace-nowrap">
            ${journey.category || 'Journey'}
          </span>
        </div>

        <p class="text-white font-semibold text-sm mt-2 drop-shadow-md truncate">
          📍 ${journey.source || 'Starting point'}
          <span class="mx-1 text-white/80">→</span>
          ${journey.destination || 'Destination'}
        </p>

        <div class="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          ${distanceText
        ? `<span class="text-white/90 text-xs font-bold">📏 ${distanceText}</span>`
        : ''
      }

          ${vehicleText
        ? `<span class="text-white/90 text-xs font-bold">🚙 ${vehicleText}</span>`
        : ''
      }

          ${emissionText
        ? `<span class="text-white/90 text-xs font-bold">🌱 ${emissionText}</span>`
        : ''
      }
        </div>

        <p class="text-white/80 text-xs font-bold mt-2 drop-shadow-md">
          ${this.formatDate(journey)}
        </p>

      </div>

      <div class="text-white text-xl font-bold group-hover:translate-x-1 transition-transform">
        ›
      </div>
    `;

    item.onclick = () => {
      sessionStorage.setItem(
        'selectedTerraJourney',
        JSON.stringify(journey)
      );

      this.navigate('/trip-details');
    };

    return item;
  }

  render() {
    const div = document.createElement('div');

    div.className =
      'min-h-screen pb-28 relative overflow-hidden';

    div.style.backgroundImage =
      'linear-gradient(rgba(7,13,25,0.42), rgba(7,13,25,0.78)), url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85")';

    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundAttachment = 'fixed';

    const journeys = this.getJourneys().sort((a, b) => {
      const dateA = new Date(
        a.date ||
        a.createdAt ||
        a.completedAt ||
        a.startedAt ||
        0
      );

      const dateB = new Date(
        b.date ||
        b.createdAt ||
        b.completedAt ||
        b.startedAt ||
        0
      );

      return dateB - dateA;
    });

    const header = document.createElement('header');

    header.className =
      'px-5 pt-7 pb-5 max-w-3xl mx-auto relative z-10';

    header.innerHTML = `
      <p class="text-white/85 text-xs font-black tracking-[0.22em] drop-shadow-lg">
        TERRAVOLT
      </p>

      <h1 class="text-white text-3xl font-black mt-1 drop-shadow-xl">
        My Journeys
      </h1>

      <p class="text-white text-sm font-semibold mt-2 drop-shadow-lg">
        Your automatically saved Eco Routes and travel history
      </p>
    `;

    div.appendChild(header);

    const main = document.createElement('main');

    main.className =
      'px-5 max-w-3xl mx-auto relative z-10';

    const terraMessage = document.createElement('div');

    terraMessage.className =
      'mb-6 py-3 px-4 border-l-2 border-white/80 bg-black/15 backdrop-blur-[2px] rounded-r-xl';

    terraMessage.innerHTML = `
      <p class="text-white font-bold text-sm drop-shadow-lg">
        😊 Terra says: Every Eco Route you create is automatically saved here.
      </p>
    `;

    main.appendChild(terraMessage);

    if (journeys.length === 0) {
      const empty = document.createElement('section');

      empty.className =
        'py-20 text-center';

      empty.innerHTML = `
        <div class="text-6xl mb-5 drop-shadow-xl">🗺️</div>

        <h2 class="text-white text-2xl font-black drop-shadow-xl">
          Your journeys will appear here
        </h2>

        <p class="text-white text-sm font-semibold mt-3 max-w-sm mx-auto drop-shadow-lg">
          Find an Eco Route and TERRAVOLT will automatically save it here.
        </p>
      `;

      main.appendChild(empty);
    } else {
      const list = document.createElement('section');

      list.className =
        'bg-black/10 backdrop-blur-[1px] rounded-2xl px-4';

      journeys.forEach((journey) => {
        list.appendChild(
          this.renderJourneyItem(journey)
        );
      });

      main.appendChild(list);
    }

    div.appendChild(main);

    const nav = new BottomNav('/journeys').render(
      this.navigate
    );

    div.appendChild(nav);

    return div;
  }
}