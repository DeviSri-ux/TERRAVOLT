import { BottomNav } from '../components/BottomNav.js';

export class TripDetailsScreen {
    constructor(navigate) {
        this.navigate = navigate;
    }

    getJourney() {
        try {
            return JSON.parse(
                sessionStorage.getItem('selectedTerraJourney') || '{}'
            );
        } catch (error) {
            return {};
        }
    }

    getVehicleIcon(vehicle) {
        const icons = {
            petrol_bike: '🏍️',
            diesel_suv: '🚙',
            electric_scooter: '🛴',
            car: '🚗',
            bus: '🚌',
            train: '🚆'
        };

        return icons[vehicle] || '🚗';
    }

    getVehicleName(vehicle) {
        const names = {
            petrol_bike: 'Petrol Bike',
            diesel_suv: 'Diesel SUV',
            electric_scooter: 'Electric Scooter',
            car: 'Car',
            bus: 'Bus',
            train: 'Train'
        };

        return names[vehicle] || 'Travel';
    }

    formatDate(dateValue) {
        if (!dateValue) return 'Journey date not available';

        return new Date(dateValue).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    getStatusText(status) {
        const statuses = {
            planned: '🗺️ Planned · Not completed',
            in_progress: '📍 Journey in progress',
            completed: '✨ Journey completed'
        };

        return statuses[status] || statuses.planned;
    }

    getAutoMemory(journey) {
        const destination =
            journey.destination || 'your destination';

        if (journey.status === 'completed') {
            return `A journey towards ${destination}, where every kilometre became part of your travel story.`;
        }

        if (journey.status === 'in_progress') {
            return `Your journey towards ${destination} is still unfolding. Enjoy every moment along the way.`;
        }

        return `${destination} is waiting for you. Your planned route is safely saved here whenever you are ready to travel.`;
    }

    saveMemory(journey, photo, note) {
        const journeys = JSON.parse(
            localStorage.getItem('terraJourneys') || '[]'
        );

        const journeyIndex = journeys.findIndex(
            item => item.id === journey.id
        );

        if (journeyIndex !== -1) {
            if (photo) {
                journeys[journeyIndex].memoryImage = photo;
            }

            if (note) {
                journeys[journeyIndex].memoryText = note;
            }

            localStorage.setItem(
                'terraJourneys',
                JSON.stringify(journeys)
            );

            sessionStorage.setItem(
                'selectedTerraJourney',
                JSON.stringify(journeys[journeyIndex])
            );
        }
    }

    render() {
        const journey = this.getJourney();

        const div = document.createElement('div');

        div.className =
            'min-h-screen pb-28 relative overflow-hidden';

        div.style.backgroundImage =
            'linear-gradient(rgba(7,13,25,0.40), rgba(7,13,25,0.82)), url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85")';

        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
        div.style.backgroundAttachment = 'fixed';

        const tripTitle =
            journey.title ||
            `${journey.destination || 'My'} Journey`;

        const heroImage =
            journey.memoryImage ||
            'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=85';

        const main = document.createElement('main');

        main.className =
            'max-w-3xl mx-auto px-5 pt-5 relative z-10';

        main.innerHTML = `
      <style>
        .trip-text-shadow {
          text-shadow: 0 2px 12px rgba(0,0,0,0.85);
        }

        .trip-image {
          box-shadow: 0 15px 40px rgba(0,0,0,0.45);
        }

        .trip-section {
          border-bottom: 1px solid rgba(255,255,255,0.22);
        }
      </style>

      <button
        id="backButton"
        class="w-11 h-11 rounded-full bg-black/25 backdrop-blur-md border border-white/30 text-white text-2xl font-black flex items-center justify-center mb-6 hover:bg-black/40 transition"
        aria-label="Go back"
      >
        ←
      </button>

      <section class="mb-7">
        <p class="text-white/85 text-xs font-black tracking-[0.18em] trip-text-shadow">
          TERRAVOLT TRAVEL STORY
        </p>

        <h1 class="text-white text-3xl md:text-4xl font-black mt-2 trip-text-shadow">
          ${tripTitle}
        </h1>

        <p class="text-white text-base font-bold mt-3 trip-text-shadow">
          📍 ${journey.source || 'Starting point'}
          <span class="mx-2">→</span>
          🎯 ${journey.destination || 'Destination'}
        </p>

        <p class="text-white/95 text-sm font-bold mt-3 trip-text-shadow">
          ${this.getStatusText(journey.status)}
        </p>
      </section>

      <section class="mb-8">
        <img
          id="heroImage"
          src="${heroImage}"
          alt="Journey memory"
          class="trip-image w-full h-64 md:h-80 object-cover rounded-3xl border border-white/30"
        />

        ${journey.memoryImage
                ? `
              <p class="text-white text-xs font-bold mt-2 text-center trip-text-shadow">
                📸 Your travel memory
              </p>
            `
                : `
              <p class="text-white text-xs font-bold mt-2 text-center trip-text-shadow">
                ✨ Destination highlight
              </p>
            `
            }
      </section>

      <section class="trip-section py-5">
        <p class="text-white/80 text-xs font-black tracking-[0.16em] trip-text-shadow">
          THE JOURNEY
        </p>

        <div class="flex flex-wrap gap-x-5 gap-y-3 mt-3">
          <p class="text-white font-bold trip-text-shadow">
            📅 ${this.formatDate(
                journey.completedAt ||
                journey.startedAt ||
                journey.createdAt
            )}
          </p>

          <p class="text-white font-bold trip-text-shadow">
            ${this.getVehicleIcon(journey.vehicle)}
            ${this.getVehicleName(journey.vehicle)}
          </p>

          ${journey.distance
                ? `
                <p class="text-white font-bold trip-text-shadow">
                  🛣️ ${journey.distance} km
                </p>
              `
                : ''
            }
        </div>
      </section>

      <section class="trip-section py-6">
        <p class="text-white/80 text-xs font-black tracking-[0.16em] trip-text-shadow">
          ${journey.memoryText
                ? 'YOUR MEMORY'
                : 'A NOTE FROM TERRAVOLT'
            }
        </p>

        <p
          id="memoryDisplay"
          class="text-white text-lg font-bold leading-relaxed mt-3 trip-text-shadow"
        >
          ${journey.memoryText ||
            this.getAutoMemory(journey)
            }
        </p>
      </section>

      <section class="trip-section py-6">
        <p class="text-white/80 text-xs font-black tracking-[0.16em] trip-text-shadow">
          🌿 ECO JOURNEY
        </p>

        <div class="mt-3">
          <p class="text-white text-lg font-black trip-text-shadow">
            ${journey.emission
                ? `${journey.emission} kg estimated CO₂`
                : 'Eco impact information'
            }
          </p>

          <p class="text-white text-sm font-semibold mt-2 trip-text-shadow">
            ${journey.status === 'completed'
                ? 'Your journey is part of your TERRAVOLT travel story.'
                : 'Your route and estimated environmental impact are saved for this journey.'
            }
          </p>
        </div>
      </section>

      <section class="py-7">
        <div class="border-l-2 border-white/80 pl-4">
          <p class="text-white font-black text-sm trip-text-shadow">
            😊 TERRA
          </p>

          <p class="text-white font-bold text-sm mt-1 trip-text-shadow">
            Every road has a story. This one belongs to you.
          </p>
        </div>
      </section>

      <section class="pb-8">
        <button
          id="addMemoryButton"
          class="bg-white/15 backdrop-blur-md border border-white/35 text-white px-5 py-3 rounded-2xl font-black shadow-lg hover:bg-white/25 transition"
        >
          📸 Add Memory
        </button>

        <div
          id="memoryForm"
          class="hidden mt-4 bg-black/25 backdrop-blur-md border border-white/25 rounded-2xl p-4"
        >
          <label class="block text-white font-bold text-sm mb-2">
            Add a travel photo
          </label>

          <input
            id="memoryPhoto"
            type="file"
            accept="image/*"
            class="w-full text-white text-sm mb-4"
          />

          <label class="block text-white font-bold text-sm mb-2">
            Write your memory
          </label>

          <textarea
            id="memoryNote"
            rows="4"
            placeholder="Write something about this journey..."
            class="w-full rounded-xl bg-black/30 border border-white/30 text-white placeholder:text-white/60 p-3 outline-none"
          ></textarea>

          <button
            id="saveMemoryButton"
            class="mt-4 bg-white text-slate-900 px-5 py-3 rounded-xl font-black"
          >
            Save Memory
          </button>
        </div>
      </section>
    `;

        div.appendChild(main);

        main.querySelector('#backButton').onclick = () => {
            this.navigate('/journeys');
        };

        const memoryForm =
            main.querySelector('#memoryForm');

        main.querySelector('#addMemoryButton').onclick = () => {
            memoryForm.classList.toggle('hidden');
        };

        main.querySelector('#saveMemoryButton').onclick = () => {
            const note =
                main.querySelector('#memoryNote').value.trim();

            const photoFile =
                main.querySelector('#memoryPhoto').files[0];

            if (photoFile) {
                const reader = new FileReader();

                reader.onload = () => {
                    this.saveMemory(
                        journey,
                        reader.result,
                        note
                    );

                    main.querySelector('#heroImage').src =
                        reader.result;

                    if (note) {
                        main.querySelector(
                            '#memoryDisplay'
                        ).textContent = note;
                    }

                    memoryForm.classList.add('hidden');
                    alert('Your travel memory has been saved! 😊');
                };

                reader.readAsDataURL(photoFile);
            } else if (note) {
                this.saveMemory(
                    journey,
                    null,
                    note
                );

                main.querySelector(
                    '#memoryDisplay'
                ).textContent = note;

                memoryForm.classList.add('hidden');
                alert('Your travel memory has been saved! 😊');
            } else {
                alert(
                    'Please add a photo or write a memory.'
                );
            }
        };

        const nav = new BottomNav('/journeys').render(
            this.navigate
        );

        div.appendChild(nav);

        return div;
    }
}