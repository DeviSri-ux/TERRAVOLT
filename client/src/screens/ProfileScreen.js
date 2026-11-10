import { BottomNav } from '../components/BottomNav.js';
import { TerraCompanion } from '../components/TerraCompanion.js';

export class ProfileScreen {
  constructor(navigate) {
    this.navigate = navigate;
  }

  getProfile() {
    try {
      const saved = JSON.parse(
        localStorage.getItem('terraProfile') || '{}'
      );

      return {
        name: saved.name || 'TERRAVOLT Traveller',
        email: saved.email || 'Add your email',
        photo: saved.photo || '',
        tagline:
          saved.tagline ||
          'Exploring routes. Making every journey count.'
      };
    } catch (error) {
      return {
        name: 'TERRAVOLT Traveller',
        email: 'Add your email',
        photo: '',
        tagline: 'Exploring routes. Making every journey count.'
      };
    }
  }

  saveProfile(profile) {
    localStorage.setItem(
      'terraProfile',
      JSON.stringify(profile)
    );
  }

  getJourneys() {
    try {
      return JSON.parse(
        localStorage.getItem('terraJourneys') || '[]'
      );
    } catch (error) {
      return [];
    }
  }

  getDate(journey) {
    const value =
      journey.completedAt ||
      journey.startedAt ||
      journey.createdAt;

    return value ? new Date(value) : new Date();
  }

  getVehicleInfo(vehicle) {
    const vehicles = {
      petrol_bike: {
        name: 'Petrol Bike',
        icon: '🏍️',
        rate: 0.085,
        comparisonRate: 0.18
      },
      diesel_suv: {
        name: 'Diesel SUV',
        icon: '🚙',
        rate: 0.22,
        comparisonRate: 0.22
      },
      electric_scooter: {
        name: 'Electric Scooter',
        icon: '🛴',
        rate: 0.03,
        comparisonRate: 0.18
      },
      car: {
        name: 'Car',
        icon: '🚗',
        rate: 0.18,
        comparisonRate: 0.18
      },
      electric_car: {
        name: 'Electric Car',
        icon: '🔋',
        rate: 0.08,
        comparisonRate: 0.18
      },
      bus: {
        name: 'Bus',
        icon: '🚌',
        rate: 0.08,
        comparisonRate: 0.18
      },
      train: {
        name: 'Train',
        icon: '🚆',
        rate: 0.04,
        comparisonRate: 0.18
      },
      bicycle: {
        name: 'Bicycle',
        icon: '🚲',
        rate: 0,
        comparisonRate: 0.18
      },
      walking: {
        name: 'Walking',
        icon: '🚶',
        rate: 0,
        comparisonRate: 0.18
      }
    };

    return vehicles[vehicle] || {
      name: 'Travel',
      icon: '🛣️',
      rate: 0.18,
      comparisonRate: 0.18
    };
  }

  getImpact(journey) {
    const vehicle = this.getVehicleInfo(journey.vehicle);

    const distance = Number(
      journey.distance || journey.distanceKm || 0
    );

    let saved = Number(
      journey.carbonSaved ||
      journey.co2Saved ||
      journey.saved ||
      0
    );

    if (!saved && distance > 0) {
      const emission =
        Number(journey.emission || 0) ||
        distance * vehicle.rate;

      saved = Math.max(
        0,
        distance * vehicle.comparisonRate - emission
      );
    }

    return Number.isFinite(saved) ? saved : 0;
  }

  getStatistics(journeys) {
    const completed = journeys.filter(
      journey => journey.status === 'completed'
    );

    const totalJourneys = journeys.length;

    const destinations = {};
    const vehicles = {};

    journeys.forEach(journey => {
      if (journey.destination) {
        destinations[journey.destination] =
          (destinations[journey.destination] || 0) + 1;
      }

      if (journey.vehicle) {
        vehicles[journey.vehicle] =
          (vehicles[journey.vehicle] || 0) + 1;
      }
    });

    const favouriteDestination =
      Object.keys(destinations).sort(
        (a, b) => destinations[b] - destinations[a]
      )[0] || 'No favourite yet';

    const favouriteVehicle =
      Object.keys(vehicles).sort(
        (a, b) => vehicles[b] - vehicles[a]
      )[0];

    const vehicleInfo =
      this.getVehicleInfo(favouriteVehicle);

    const totalSaved = completed.reduce(
      (total, journey) =>
        total + this.getImpact(journey),
      0
    );

    return {
      totalJourneys,
      completed,
      favouriteDestination,
      favouriteVehicle: favouriteVehicle
        ? vehicleInfo
        : {
          name: 'No travel mode yet',
          icon: '🧭'
        },
      totalSaved
    };
  }

  getTravelStyle(stats, journeys) {
    if (journeys.length === 0) {
      return {
        icon: '🧭',
        title: 'Future Explorer',
        message:
          'Your travel story is waiting to begin. Plan your first journey with TERRAVOLT!'
      };
    }

    const uniqueDestinations = new Set(
      journeys
        .map(journey => journey.destination)
        .filter(Boolean)
    ).size;

    const ecoModes = [
      'electric_scooter',
      'electric_car',
      'bus',
      'train',
      'bicycle',
      'walking'
    ];

    const ecoJourneys = journeys.filter(
      journey => ecoModes.includes(journey.vehicle)
    ).length;

    if (
      ecoJourneys > 0 &&
      ecoJourneys >= journeys.length / 2
    ) {
      return {
        icon: '🌿',
        title: 'Eco Traveller',
        message:
          'You often choose travel options with a lower estimated environmental impact.'
      };
    }

    if (uniqueDestinations >= 3) {
      return {
        icon: '🌄',
        title: 'Explorer',
        message:
          'You enjoy discovering different destinations and new routes.'
      };
    }

    if (journeys.length >= 3) {
      return {
        icon: '🛣️',
        title: 'Regular Traveller',
        message:
          'Travel is becoming a regular part of your TERRAVOLT story.'
      };
    }

    return {
      icon: '✨',
      title: 'Journey Starter',
      message:
        'Your travel story is growing. Every new journey adds another chapter!'
    };
  }

  getTerraMessage(stats, journeys) {
    if (journeys.length === 0) {
      return 'I cannot wait to discover your travel story with you. Your first journey could be the beginning of something beautiful!';
    }

    if (stats.totalSaved >= 10) {
      return `I am proud of you! Your completed journeys have created an estimated ${stats.totalSaved.toFixed(1)} kg CO₂ difference. Keep making every journey count!`;
    }

    if (stats.completed.length >= 3) {
      return `Look how far your story has come! You have completed ${stats.completed.length} journeys with TERRAVOLT. I am excited for the adventures ahead!`;
    }

    return 'I am enjoying being part of your travel story. Every route you plan helps us discover more together!';
  }

  getRecentActivity(journeys) {
    return [...journeys]
      .sort((a, b) => this.getDate(b) - this.getDate(a))
      .slice(0, 4);
  }

  getActivityText(journey) {
    const destination =
      journey.destination || 'a destination';

    if (journey.status === 'completed') {
      return {
        icon: '✨',
        text: `Completed a journey to ${destination}`
      };
    }

    if (journey.status === 'in_progress') {
      return {
        icon: '📍',
        text: `Started travelling towards ${destination}`
      };
    }

    return {
      icon: '🗺️',
      text: `Planned a route to ${destination}`
    };
  }

  render() {
    const profile = this.getProfile();
    const journeys = this.getJourneys();
    const stats = this.getStatistics(journeys);
    const travelStyle =
      this.getTravelStyle(stats, journeys);
    const recentActivity =
      this.getRecentActivity(journeys);

    const div = document.createElement('div');

    div.className =
      'min-h-screen pb-28 relative overflow-hidden';

    // Soulful travel background
    div.style.backgroundImage =
      'linear-gradient(rgba(10, 16, 30, 0.42), rgba(10, 16, 30, 0.82)), url("https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1920&q=85")';

    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundAttachment = 'fixed';

    const main = document.createElement('main');

    main.className =
      'max-w-3xl mx-auto px-5 pt-7 relative z-10';

    const photoContent = profile.photo
      ? `<img src="${profile.photo}" class="w-full h-full object-cover" alt="Profile photo">`
      : `<span class="text-4xl">😊</span>`;

    main.innerHTML = `
      <style>
        .profile-shadow {
          text-shadow: 0 2px 12px rgba(0,0,0,0.85);
        }

        .profile-divider {
          border-color: rgba(255,255,255,0.22);
        }

        .profile-input {
          background: rgba(0,0,0,0.28);
          border: 1px solid rgba(255,255,255,0.35);
          color: white;
        }

        .profile-input::placeholder {
          color: rgba(255,255,255,0.65);
        }
      </style>

      <header class="mb-7">
        <p class="text-white/85 text-xs font-black tracking-[0.22em] profile-shadow">
          TERRAVOLT
        </p>

        <h1 class="text-white text-3xl font-black mt-1 profile-shadow">
          My Profile
        </h1>
      </header>

      <!-- Profile identity -->
      <section class="text-center pb-7 border-b profile-divider">
        <div class="relative w-28 h-28 mx-auto">
          <div
            id="profilePhoto"
            class="w-28 h-28 rounded-full overflow-hidden bg-white/15 backdrop-blur-md border-2 border-white/60 flex items-center justify-center shadow-2xl"
          >
            ${photoContent}
          </div>

          <label
            for="photoInput"
            class="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl cursor-pointer font-bold"
            title="Change profile photo"
          >
            📷
          </label>

          <input
            id="photoInput"
            type="file"
            accept="image/*"
            class="hidden"
          >
        </div>

        <h2 id="profileName" class="text-white text-2xl font-black mt-4 profile-shadow">
          ${profile.name}
        </h2>

        <p id="profileEmail" class="text-white text-sm font-semibold mt-1 profile-shadow">
          ${profile.email}
        </p>

        <p id="profileTagline" class="text-white/90 text-sm font-semibold mt-3 max-w-md mx-auto profile-shadow">
          ${profile.tagline}
        </p>

        <button
          id="editProfile"
          class="mt-5 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/35 text-white text-sm font-black hover:bg-white/25 transition"
        >
          ✏️ Edit Profile
        </button>
      </section>

      <!-- Edit form -->
      <section
        id="editForm"
        class="hidden py-6 border-b profile-divider"
      >
        <p class="text-white/85 text-xs font-black tracking-[0.16em] profile-shadow">
          EDIT PROFILE
        </p>

        <div class="space-y-3 mt-4">
          <input
            id="editName"
            type="text"
            value="${profile.name}"
            placeholder="Your name"
            class="profile-input w-full px-4 py-3 rounded-xl outline-none"
          >

          <input
            id="editEmail"
            type="email"
            value="${profile.email === 'Add your email' ? '' : profile.email}"
            placeholder="Your email"
            class="profile-input w-full px-4 py-3 rounded-xl outline-none"
          >

          <input
            id="editTagline"
            type="text"
            value="${profile.tagline}"
            placeholder="Your travel tagline"
            class="profile-input w-full px-4 py-3 rounded-xl outline-none"
          >

          <button
            id="saveProfile"
            class="bg-white text-slate-900 px-5 py-3 rounded-xl font-black"
          >
            Save Changes
          </button>
        </div>
      </section>

      <!-- Travel statistics -->
      <section class="py-7 border-b profile-divider">
        <p class="text-white/85 text-xs font-black tracking-[0.16em] profile-shadow">
          YOUR TRAVEL AT A GLANCE
        </p>

        <div class="grid grid-cols-2 gap-y-7 gap-x-4 mt-6">
          <div>
            <p class="text-2xl">🛣️</p>
            <p class="text-white text-xl font-black mt-2 profile-shadow">
              ${stats.totalJourneys}
            </p>
            <p class="text-white/85 text-xs font-bold mt-1">
              Total journeys
            </p>
          </div>

          <div>
            <p class="text-2xl">📍</p>
            <p class="text-white font-black mt-2 profile-shadow truncate">
              ${stats.favouriteDestination}
            </p>
            <p class="text-white/85 text-xs font-bold mt-1">
              Favourite destination
            </p>
          </div>

          <div>
            <p class="text-2xl">
              ${stats.favouriteVehicle.icon}
            </p>
            <p class="text-white font-black mt-2 profile-shadow">
              ${stats.favouriteVehicle.name}
            </p>
            <p class="text-white/85 text-xs font-bold mt-1">
              Most-used travel mode
            </p>
          </div>

          <div>
            <p class="text-2xl">🌿</p>
            <p class="text-white text-xl font-black mt-2 profile-shadow">
              ${stats.totalSaved.toFixed(1)} kg
            </p>
            <p class="text-white/85 text-xs font-bold mt-1">
              Estimated CO₂ difference
            </p>
          </div>
        </div>
      </section>

      <!-- Travel style -->
      <section class="py-7 border-b profile-divider">
        <p class="text-white/85 text-xs font-black tracking-[0.16em] profile-shadow">
          YOUR TRAVEL STYLE
        </p>

        <div class="flex items-start gap-4 mt-4">
          <div class="text-4xl">
            ${travelStyle.icon}
          </div>

          <div>
            <h2 class="text-white text-xl font-black profile-shadow">
              ${travelStyle.title}
            </h2>

            <p class="text-white text-sm font-semibold leading-relaxed mt-2 profile-shadow">
              ${travelStyle.message}
            </p>
          </div>
        </div>
      </section>

      <!-- Recent activity -->
      <section class="py-7 border-b profile-divider">
        <p class="text-white/85 text-xs font-black tracking-[0.16em] profile-shadow">
          RECENT ACTIVITY
        </p>

        <div id="activityList" class="mt-4">
          ${recentActivity.length === 0
        ? `
                <p class="text-white text-sm font-semibold profile-shadow">
                  Your recent travel activity will appear here.
                </p>
              `
        : recentActivity.map(journey => {
          const activity =
            this.getActivityText(journey);

          return `
                    <div class="flex items-center gap-3 py-3 border-b border-white/10">
                      <span class="text-xl">${activity.icon}</span>
                      <div>
                        <p class="text-white text-sm font-bold profile-shadow">
                          ${activity.text}
                        </p>
                        <p class="text-white/75 text-xs font-semibold mt-1">
                          ${this.getDate(journey).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
          })}
                        </p>
                      </div>
                    </div>
                  `;
        }).join('')
      }
        </div>
      </section>

      <!-- Terra message -->
      <section class="py-7 border-b profile-divider">
        <div class="border-l-2 border-white/80 pl-4">
          <p class="text-white/85 text-xs font-black tracking-[0.16em] profile-shadow">
            😊 TERRA'S MESSAGE
          </p>

          <p class="text-white text-sm font-bold leading-relaxed mt-3 profile-shadow">
            ${this.getTerraMessage(stats, journeys)}
          </p>
        </div>
      </section>

      <!-- Settings -->
      <section class="py-7">
        <p class="text-white/85 text-xs font-black tracking-[0.16em] profile-shadow">
          SETTINGS
        </p>

        <div class="mt-4 space-y-1">
          <button
            id="languageButton"
            class="w-full flex items-center justify-between py-4 border-b border-white/15 text-white font-bold text-sm"
          >
            <span>🌐 Language</span>
            <span>›</span>
          </button>

          <button
            id="notificationButton"
            class="w-full flex items-center justify-between py-4 border-b border-white/15 text-white font-bold text-sm"
          >
            <span>🔔 Notifications</span>
            <span>›</span>
          </button>

          <button
            id="signOutButton"
            class="w-full flex items-center justify-between py-4 text-white font-bold text-sm"
          >
            <span>🚪 Sign Out</span>
            <span>›</span>
          </button>
        </div>
      </section>
    `;

    div.appendChild(main);

    // Edit profile
    const editForm =
      main.querySelector('#editForm');

    main.querySelector('#editProfile').onclick = () => {
      editForm.classList.toggle('hidden');
    };

    main.querySelector('#saveProfile').onclick = () => {
      const updatedProfile = {
        ...this.getProfile(),
        name:
          main.querySelector('#editName').value.trim() ||
          'TERRAVOLT Traveller',
        email:
          main.querySelector('#editEmail').value.trim() ||
          'Add your email',
        tagline:
          main.querySelector('#editTagline').value.trim() ||
          'Exploring routes. Making every journey count.'
      };

      this.saveProfile(updatedProfile);

      main.querySelector('#profileName').textContent =
        updatedProfile.name;

      main.querySelector('#profileEmail').textContent =
        updatedProfile.email;

      main.querySelector('#profileTagline').textContent =
        updatedProfile.tagline;

      editForm.classList.add('hidden');
    };

    // Upload profile photo
    main.querySelector('#photoInput').onchange = event => {
      const file = event.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const updatedProfile = {
          ...this.getProfile(),
          photo: reader.result
        };

        this.saveProfile(updatedProfile);

        main.querySelector('#profilePhoto').innerHTML = `
          <img
            src="${reader.result}"
            class="w-full h-full object-cover"
            alt="Profile photo"
          >
        `;
      };

      reader.readAsDataURL(file);
    };

    // Simple settings actions
    main.querySelector('#languageButton').onclick = () => {
      if (this.navigate) {
        this.navigate('/language-selection');
      }
    };

    main.querySelector('#notificationButton').onclick = () => {
      alert(
        'Notifications can be customised here in a future update.'
      );
    };

    main.querySelector('#signOutButton').onclick = () => {
      const confirmed = confirm(
        'Do you want to sign out of TERRAVOLT?'
      );

      if (confirmed && this.navigate) {
        this.navigate('/auth');
      }
    };

    // Bottom navigation
    const nav = new BottomNav('/profile').render(
      this.navigate
    );

    div.appendChild(nav);

    // Active Terra companion
    const terra = new TerraCompanion(
      this.navigate,
      'profile'
    ).render();

    div.appendChild(terra);

    return div;
  }
}