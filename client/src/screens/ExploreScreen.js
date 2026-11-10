import { BottomNav } from '../components/BottomNav.js';

export class ExploreScreen {
  constructor(navigate) {
    this.navigate = navigate;
    this.map = null;
    this.watchId = null;
  }

  render() {
    const routeData = JSON.parse(
      sessionStorage.getItem('terraRoute') || '{}'
    );

    const source = routeData.source || '';
    const destination = routeData.destination || '';
    const vehicle = routeData.vehicle || 'petrol_bike';

    const vehicleDetails = {
      petrol_bike: {
        name: 'Petrol Bike',
        icon: '🏍️',
        emissionFactor: 85
      },
      diesel_suv: {
        name: 'Diesel SUV',
        icon: '🚙',
        emissionFactor: 210
      },
      electric_scooter: {
        name: 'Electric Scooter',
        icon: '🛴',
        emissionFactor: 25
      }
    };

    const selectedVehicle =
      vehicleDetails[vehicle] || vehicleDetails.petrol_bike;

    const div = document.createElement('div');

    div.className =
      'min-h-screen pb-28 relative overflow-x-hidden';

    div.style.backgroundImage =
      'linear-gradient(rgba(5,12,22,0.48), rgba(5,12,22,0.82)), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=85)';

    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundAttachment = 'fixed';

    // HEADER
    const header = document.createElement('div');

    header.className =
      'mx-4 mt-4 px-3 py-3 flex items-center gap-3 rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-white/20 shadow-xl';

    const backButton = document.createElement('button');

    backButton.innerHTML = '←';
    backButton.setAttribute('aria-label', 'Go back');

    backButton.className =
      'w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-2xl font-black transition';

    backButton.onclick = () => {
      this.stopTracking();
      this.navigate('/home');
    };

    const titleWrap = document.createElement('div');

    titleWrap.innerHTML = `
      <p class="text-white/60 text-[10px] font-black tracking-[0.22em]">
        TERRAVOLT NAVIGATION
      </p>

      <h1 class="text-white text-xl font-black leading-tight">
        🌿 Eco Route
      </h1>
    `;

    header.appendChild(backButton);
    header.appendChild(titleWrap);
    div.appendChild(header);

    const html = `
      <style>
        .terra-glass {
          background: rgba(10, 20, 34, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.20);
        }

        .route-card {
          cursor: pointer;
          transition: transform 0.2s ease, border 0.2s ease;
        }

        .route-card:hover {
          transform: translateY(-2px);
        }

        .route-card.selected {
          border: 2px solid #6ee7b7;
          box-shadow: 0 0 0 3px rgba(110,231,183,0.15);
        }

        .leaflet-container {
          font-family: Arial, sans-serif;
        }

        .live-location-icon {
          background: transparent !important;
          border: none !important;
        }

        .live-location-wrapper {
          position: relative;
          width: 38px;
          height: 38px;
        }

        .live-location-pulse {
          position: absolute;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(59,130,246,0.25);
          animation: terraPulse 1.8s infinite;
        }

        .live-location-dot {
          position: absolute;
          top: 9px;
          left: 9px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          border: 4px solid white;
          box-shadow: 0 3px 12px rgba(0,0,0,0.35);
        }

        @keyframes terraPulse {
          0% {
            transform: scale(0.6);
            opacity: 0.9;
          }

          70% {
            transform: scale(1.35);
            opacity: 0;
          }

          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }

        .live-route-label {
          background: rgba(8, 18, 32, 0.92);
          color: white;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 12px;
          padding: 8px 11px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.35);
          white-space: nowrap;
          text-align: left;
        }

        .live-route-label .remaining {
          font-size: 13px;
          font-weight: 900;
        }

        .live-route-label .time {
          font-size: 11px;
          font-weight: 700;
          color: #bbf7d0;
          margin-top: 2px;
        }
      </style>

      <main class="px-4 md:px-8 max-w-6xl mx-auto mt-5 relative z-10">

        <!-- JOURNEY SUMMARY -->
        <section class="terra-glass rounded-3xl p-5 shadow-2xl mb-5">

          <p class="text-emerald-200 text-xs font-black tracking-[0.18em]">
            TERRAVOLT ECO ROUTE
          </p>

          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">

            <div>
              <h2 class="text-white text-2xl md:text-3xl font-black">
                Your greener journey
              </h2>

              <p id="routePlaces" class="text-white font-bold text-sm mt-2">
                ${source || 'Starting location'}
                <span class="mx-2 text-emerald-300">→</span>
                ${destination || 'Destination'}
              </p>
            </div>

            <div class="bg-white/15 border border-white/25 rounded-2xl px-4 py-3">
              <p class="text-white/70 text-xs font-black">
                TRAVEL MODE
              </p>

              <p class="text-white font-black mt-1">
                ${selectedVehicle.icon} ${selectedVehicle.name}
              </p>
            </div>

          </div>
        </section>

        <!-- MAP -->
        <section class="mb-5">

          <div class="relative h-[480px] md:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-white/25">

            <div id="map" class="absolute inset-0"></div>

            <div
              id="mapStatus"
              class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-[500]"
            >
              <div class="text-5xl mb-4">🌍</div>

              <p class="text-white text-xl font-black">
                Analysing available routes
              </p>

              <p id="loadingText" class="text-white/80 font-bold text-sm mt-2">
                Connecting to route services...
              </p>
            </div>

          </div>
        </section>

        <!-- ECO RECOMMENDATION -->
        <section
          id="ecoRecommendation"
          class="hidden rounded-3xl p-5 shadow-2xl mb-5 border border-emerald-200/40 bg-emerald-950/75 backdrop-blur-xl"
        >
          <div class="flex gap-4 items-start">

            <div class="w-14 h-14 shrink-0 rounded-2xl bg-emerald-400/20 border border-emerald-200/30 flex items-center justify-center text-3xl">
              🌿
            </div>

            <div>
              <p class="text-emerald-200 text-xs font-black tracking-widest">
                TERRAVOLT RECOMMENDS
              </p>

              <h2
                id="recommendationTitle"
                class="text-white text-xl font-black mt-1"
              >
                Your Eco Route
              </h2>

              <p
                id="recommendationText"
                class="text-white font-bold text-sm mt-2"
              ></p>
            </div>

          </div>
        </section>

        <!-- ROUTE OPTIONS -->
        <section id="routeChoices" class="hidden mb-5">

          <h2 class="text-white text-xl font-black mb-3">
            Available route options
          </h2>

          <div
            id="routeCards"
            class="grid grid-cols-1 md:grid-cols-3 gap-4"
          ></div>

        </section>

        <!-- ROUTE DETAILS -->
        <section
          id="routeDetailsSection"
          class="hidden grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5"
        >
          <div class="terra-glass rounded-2xl p-4 shadow-xl">
            <p class="text-white/70 text-xs font-black">
              DISTANCE
            </p>

            <p
              id="distanceValue"
              class="text-white text-2xl font-black mt-2"
            >
              --
            </p>
          </div>

          <div class="terra-glass rounded-2xl p-4 shadow-xl">
            <p class="text-white/70 text-xs font-black">
              EST. TIME
            </p>

            <p
              id="timeValue"
              class="text-white text-2xl font-black mt-2"
            >
              --
            </p>
          </div>

          <div class="terra-glass rounded-2xl p-4 shadow-xl">
            <p class="text-white/70 text-xs font-black">
              EST. CO₂
            </p>

            <p
              id="emissionValue"
              class="text-white text-2xl font-black mt-2"
            >
              --
            </p>
          </div>

          <div class="terra-glass rounded-2xl p-4 shadow-xl">
            <p class="text-white/70 text-xs font-black">
              ECO STATUS
            </p>

            <p
              id="ecoStatusValue"
              class="text-emerald-300 text-xl font-black mt-2"
            >
              Recommended
            </p>
          </div>
        </section>

        <!-- WHY THIS ROUTE -->
        <section
          id="whyRoute"
          class="hidden terra-glass rounded-3xl p-5 shadow-2xl mb-5"
        >
          <div class="flex gap-4">

            <div class="text-3xl">💡</div>

            <div>
              <h2 class="text-white text-lg font-black">
                Why this route?
              </h2>

              <div id="whyText" class="mt-3 space-y-2"></div>
            </div>

          </div>
        </section>

        <!-- COMPLETE JOURNEY -->
        <section
          id="completeJourneySection"
          class="hidden terra-glass rounded-3xl p-5 shadow-2xl mb-5"
        >
          <div class="text-center">

            <div class="text-4xl mb-3">🌍</div>

            <h2 class="text-white text-xl font-black">
              Have you completed this journey?
            </h2>

            <p class="text-white/80 text-sm font-bold mt-2">
              Complete your journey to add its estimated environmental impact to My Impact.
            </p>

            <button
              id="completeJourney"
              class="mt-5 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg transition hover:scale-[1.01]"
            >
              ✓ Complete Journey & View My Impact
            </button>

          </div>
        </section>

        <!-- TERRA MESSAGE -->
        <section
          id="terraMessageCard"
          class="hidden terra-glass rounded-3xl p-5 shadow-2xl mb-5"
        >
          <div class="flex items-center gap-4">

            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-blue-400 border-2 border-white shadow-lg flex items-center justify-center text-2xl">
              😊
            </div>

            <div>
              <p class="text-white text-lg font-black">
                TERRA
              </p>

              <p
                id="terraText"
                class="text-white font-bold text-sm mt-1"
              ></p>
            </div>

          </div>
        </section>

        <!-- ERROR -->
        <section
          id="routeError"
          class="hidden bg-red-950/80 border border-red-300/40 rounded-3xl p-5 shadow-xl mb-5"
        >
          <h2 class="text-white text-lg font-black">
            Unable to find an Eco Route
          </h2>

          <p
            id="errorText"
            class="text-white font-bold text-sm mt-2"
          ></p>

          <button
            id="goHome"
            class="mt-4 bg-white text-gray-950 px-5 py-3 rounded-xl font-black"
          >
            Change Journey Details
          </button>
        </section>

        <p
          id="estimateNote"
          class="hidden text-white/70 text-xs font-semibold text-center mb-4"
        >
          CO₂ values are estimates based on route distance and selected travel mode.
        </p>

      </main>
    `;

    const mainDiv = document.createElement('div');

    mainDiv.innerHTML = html;
    div.appendChild(mainDiv);

    const loadingText =
      mainDiv.querySelector('#loadingText');

    const mapStatus =
      mainDiv.querySelector('#mapStatus');

    const routeError =
      mainDiv.querySelector('#routeError');

    const errorText =
      mainDiv.querySelector('#errorText');

    const routeCards =
      mainDiv.querySelector('#routeCards');

    const routeChoices =
      mainDiv.querySelector('#routeChoices');

    const routeDetailsSection =
      mainDiv.querySelector('#routeDetailsSection');

    const ecoRecommendation =
      mainDiv.querySelector('#ecoRecommendation');

    const whyRoute =
      mainDiv.querySelector('#whyRoute');

    const terraMessageCard =
      mainDiv.querySelector('#terraMessageCard');

    const completeJourneySection =
      mainDiv.querySelector('#completeJourneySection');

    let map = null;
    let L = null;
    let routeLines = [];
    let routes = [];
    let selectedRouteIndex = 0;

    let liveMarker = null;
    let liveLabelMarker = null;

    let destinationCoordinates = null;
    let routeTotalDistance = 0;
    let routeTotalDuration = 0;

    let currentJourneyId = null;

    // STOP GPS TRACKING
    this.stopTracking = () => {
      if (
        this.watchId !== null &&
        navigator.geolocation
      ) {
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
      }
    };

    mainDiv.querySelector('#goHome').onclick = () => {
      this.stopTracking();
      this.navigate('/home');
    };

    const formatTime = (seconds) => {
      const minutes =
        Math.max(1, Math.round(seconds / 60));

      if (minutes < 60) {
        return `${minutes} min`;
      }

      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return remainingMinutes > 0
        ? `${hours} hr ${remainingMinutes} min`
        : `${hours} hr`;
    };

    const getLocationCoordinates = async (place) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(place)}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(
          'Location search service is unavailable.'
        );
      }

      const results = await response.json();

      if (!results || results.length === 0) {
        return null;
      }

      return {
        lat: parseFloat(results[0].lat),
        lon: parseFloat(results[0].lon),
        name: results[0].display_name
      };
    };

    const calculateEmission = (distanceKm) => {
      return distanceKm *
        selectedVehicle.emissionFactor;
    };

    const calculateCarbonSaved = (
      distanceKm,
      emissionKg
    ) => {
      const comparisonEmission =
        distanceKm * 0.18;

      return Math.max(
        0,
        comparisonEmission - emissionKg
      );
    };

    const showError = (message) => {
      mapStatus.classList.add('hidden');
      routeError.classList.remove('hidden');
      errorText.textContent = message;
    };

    const getDistanceBetween = (
      lat1,
      lon1,
      lat2,
      lon2
    ) => {
      const earthRadius = 6371;

      const dLat =
        (lat2 - lat1) * Math.PI / 180;

      const dLon =
        (lon2 - lon1) * Math.PI / 180;

      const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

      const c =
        2 *
        Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a)
        );

      return earthRadius * c;
    };

    const updateLiveLocation = (lat, lon) => {
      if (
        !map ||
        !L ||
        !destinationCoordinates ||
        routes.length === 0
      ) {
        return;
      }

      const currentLatLng = [lat, lon];

      if (!liveMarker) {
        const liveIcon = L.divIcon({
          className: 'live-location-icon',
          html: `
            <div class="live-location-wrapper">
              <div class="live-location-pulse"></div>
              <div class="live-location-dot"></div>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });

        liveMarker = L.marker(
          currentLatLng,
          {
            icon: liveIcon,
            zIndexOffset: 1000
          }
        ).addTo(map);
      } else {
        liveMarker.setLatLng(currentLatLng);
      }

      const straightDistance =
        getDistanceBetween(
          lat,
          lon,
          destinationCoordinates.lat,
          destinationCoordinates.lon
        );

      const selectedRoute =
        routes[selectedRouteIndex];

      const originalStraightDistance =
        getDistanceBetween(
          selectedRoute.startLat,
          selectedRoute.startLon,
          destinationCoordinates.lat,
          destinationCoordinates.lon
        );

      let roadFactor = 1.2;

      if (originalStraightDistance > 0) {
        roadFactor =
          (routeTotalDistance / 1000) /
          originalStraightDistance;
      }

      roadFactor =
        Math.min(Math.max(roadFactor, 1), 2);

      const remainingDistance =
        straightDistance * roadFactor;

      const averageSpeed =
        routeTotalDuration > 0
          ? routeTotalDistance / routeTotalDuration
          : 0;

      const remainingSeconds =
        averageSpeed > 0
          ? (remainingDistance * 1000) /
          averageSpeed
          : 0;

      const labelHtml = `
        <div class="live-route-label">
          <div class="remaining">
            ${remainingDistance.toFixed(1)} km left
          </div>

          <div class="time">
            ~ ${formatTime(remainingSeconds)} remaining
          </div>
        </div>
      `;

      const labelIcon = L.divIcon({
        className: 'live-route-label-icon',
        html: labelHtml,
        iconSize: [170, 55],
        iconAnchor: [25, 70]
      });

      if (!liveLabelMarker) {
        liveLabelMarker = L.marker(
          currentLatLng,
          {
            icon: labelIcon,
            interactive: false,
            zIndexOffset: 999
          }
        ).addTo(map);
      } else {
        liveLabelMarker.setLatLng(currentLatLng);
        liveLabelMarker.setIcon(labelIcon);
      }
    };

    const startLiveTracking = () => {
      if (!navigator.geolocation) {
        console.warn(
          'Geolocation is not supported.'
        );
        return;
      }

      this.watchId =
        navigator.geolocation.watchPosition(
          (position) => {
            updateLiveLocation(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.warn(
              'Live location unavailable:',
              error.message
            );
          },
          {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 15000
          }
        );
    };

    // SAVE OR UPDATE THE CURRENT JOURNEY
    const saveJourney = () => {
      if (!routes[selectedRouteIndex]) {
        return;
      }

      const selectedRoute =
        routes[selectedRouteIndex];

      const distanceKm =
        selectedRoute.distance / 1000;

      const emissionKg =
        calculateEmission(distanceKm) / 1000;

      const carbonSaved =
        calculateCarbonSaved(
          distanceKm,
          emissionKg
        );

      let category = 'Journey';

      if (distanceKm < 50) {
        category = 'Daily Journey';
      } else if (distanceKm >= 200) {
        category = 'Long Trip';
      }

      let savedJourneys = [];

      try {
        savedJourneys = JSON.parse(
          localStorage.getItem(
            'terraJourneys'
          ) || '[]'
        );
      } catch (error) {
        savedJourneys = [];
      }

      // Find the same journey if it was already saved.
      const existingIndex =
        savedJourneys.findIndex(
          journey =>
            journey.source === source &&
            journey.destination === destination &&
            journey.vehicle === vehicle &&
            journey.status !== 'completed'
        );

      const journey = {
        id:
          existingIndex >= 0
            ? savedJourneys[existingIndex].id
            : Date.now(),

        source: source,

        destination: destination,

        vehicle: vehicle,

        vehicleName: selectedVehicle.name,

        distance: Number(
          distanceKm.toFixed(1)
        ),

        duration: selectedRoute.duration,

        emissions: Number(
          emissionKg.toFixed(2)
        ),

        emission: Number(
          emissionKg.toFixed(2)
        ),

        carbonSaved: Number(
          carbonSaved.toFixed(2)
        ),

        category: category,

        status: 'planned',

        createdAt:
          existingIndex >= 0
            ? savedJourneys[existingIndex].createdAt
            : new Date().toISOString()
      };

      if (existingIndex >= 0) {
        savedJourneys[existingIndex] =
        {
          ...savedJourneys[existingIndex],
          ...journey
        };
      } else {
        savedJourneys.unshift(journey);
      }

      localStorage.setItem(
        'terraJourneys',
        JSON.stringify(savedJourneys)
      );

      currentJourneyId = journey.id;

      console.log(
        'TERRAVOLT: Journey saved',
        journey
      );
    };

    // COMPLETE JOURNEY
    mainDiv
      .querySelector('#completeJourney')
      .addEventListener('click', () => {

        let savedJourneys = [];

        try {
          savedJourneys = JSON.parse(
            localStorage.getItem(
              'terraJourneys'
            ) || '[]'
          );
        } catch (error) {
          savedJourneys = [];
        }

        let journeyIndex =
          savedJourneys.findIndex(
            journey =>
              journey.id === currentJourneyId
          );

        // Safety: save the journey first if needed.
        if (journeyIndex === -1) {
          saveJourney();

          try {
            savedJourneys = JSON.parse(
              localStorage.getItem(
                'terraJourneys'
              ) || '[]'
            );
          } catch (error) {
            savedJourneys = [];
          }

          journeyIndex =
            savedJourneys.findIndex(
              journey =>
                journey.id === currentJourneyId
            );
        }

        if (journeyIndex !== -1) {
          savedJourneys[journeyIndex] = {
            ...savedJourneys[journeyIndex],
            status: 'completed',
            completedAt:
              new Date().toISOString()
          };

          localStorage.setItem(
            'terraJourneys',
            JSON.stringify(savedJourneys)
          );
        }

        this.stopTracking();

        const button =
          mainDiv.querySelector(
            '#completeJourney'
          );

        button.textContent =
          '✓ Journey Completed! Opening My Impact...';

        button.disabled = true;

        setTimeout(() => {
          this.navigate('/impact');
        }, 700);
      });

    const selectRoute = (index) => {
      selectedRouteIndex = index;

      routeLines.forEach(
        (line, routeIndex) => {
          if (routeIndex === index) {
            line.setStyle({
              color: '#16a34a',
              weight: 8,
              opacity: 1
            });

            line.bringToFront();
          } else {
            line.setStyle({
              color: '#64748b',
              weight: 5,
              opacity: 0.65
            });
          }
        }
      );

      routeCards
        .querySelectorAll('.route-card')
        .forEach(
          (card, cardIndex) => {
            card.classList.toggle(
              'selected',
              cardIndex === index
            );
          }
        );

      const selectedRoute =
        routes[index];

      const distanceKm =
        selectedRoute.distance / 1000;

      const emissionGrams =
        calculateEmission(distanceKm);

      routeTotalDistance =
        selectedRoute.distance;

      routeTotalDuration =
        selectedRoute.duration;

      mainDiv.querySelector(
        '#distanceValue'
      ).textContent =
        `${distanceKm.toFixed(1)} km`;

      mainDiv.querySelector(
        '#timeValue'
      ).textContent =
        formatTime(selectedRoute.duration);

      mainDiv.querySelector(
        '#emissionValue'
      ).textContent =
        `${(emissionGrams / 1000).toFixed(2)} kg`;

      mainDiv.querySelector(
        '#ecoStatusValue'
      ).textContent =
        index === 0
          ? 'Eco Recommended'
          : 'Alternative';

      mainDiv.querySelector(
        '#whyText'
      ).innerHTML = `
        <p class="text-white font-bold text-sm">
          • This route follows real road-network data.
        </p>

        <p class="text-white font-bold text-sm">
          • Estimated emissions are calculated using your ${selectedVehicle.name}.
        </p>

        <p class="text-white font-bold text-sm">
          • TERRAVOLT highlights the lower-distance route to reduce estimated travel emissions.
        </p>
      `;

      mainDiv.querySelector(
        '#terraText'
      ).textContent =
        'Your Eco Route is ready! Your current location can appear on the map with estimated remaining distance and time.';

      routeDetailsSection.classList.remove(
        'hidden'
      );

      whyRoute.classList.remove(
        'hidden'
      );

      terraMessageCard.classList.remove(
        'hidden'
      );

      completeJourneySection.classList.remove(
        'hidden'
      );

      mainDiv.querySelector(
        '#estimateNote'
      ).classList.remove(
        'hidden'
      );

      // Save the selected Eco Route.
      saveJourney();
    };

    const renderRouteCards = () => {
      routeCards.innerHTML = '';

      routes.forEach(
        (route, index) => {
          const distanceKm =
            route.distance / 1000;

          const emissionGrams =
            calculateEmission(distanceKm);

          const isRecommended =
            index === 0;

          const card =
            document.createElement('button');

          card.className =
            `route-card terra-glass rounded-3xl p-5 text-left shadow-xl ${isRecommended
              ? 'selected'
              : ''
            }`;

          card.innerHTML = `
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="${isRecommended
              ? 'text-emerald-200'
              : 'text-white/70'
            } text-xs font-black tracking-widest">
                  ${isRecommended
              ? '🌿 ECO RECOMMENDED'
              : `ALTERNATIVE ${index + 1}`
            }
                </p>

                <h3 class="text-white text-lg font-black mt-2">
                  Route ${index + 1}
                </h3>
              </div>
            </div>

            <div class="mt-4 space-y-2">

              <p class="text-white font-black">
                🛣️ ${distanceKm.toFixed(1)} km
              </p>

              <p class="text-white font-bold text-sm">
                ⏱️ ${formatTime(route.duration)}
              </p>

              <p class="text-white font-bold text-sm">
                🌍 ${(emissionGrams / 1000).toFixed(2)} kg CO₂ estimated
              </p>

            </div>

            <p class="text-white/80 text-xs font-bold mt-4">
              Click to view this route
            </p>
          `;

          card.onclick = () => {
            selectRoute(index);
          };

          routeCards.appendChild(card);
        }
      );
    };

    const loadEcoRoutes = async () => {
      try {
        if (!source || !destination) {
          showError(
            'Journey details are missing. Please enter your source and destination on the Home page.'
          );
          return;
        }

        loadingText.textContent =
          'Finding your starting location...';

        const startLocation =
          await getLocationCoordinates(
            source
          );

        if (!startLocation) {
          showError(
            `We couldn't find "${source}". Please check the location name.`
          );
          return;
        }

        loadingText.textContent =
          'Finding your destination...';

        const destinationLocation =
          await getLocationCoordinates(
            destination
          );

        if (!destinationLocation) {
          showError(
            `We couldn't find "${destination}". Please check the location name.`
          );
          return;
        }

        destinationCoordinates =
          destinationLocation;

        loadingText.textContent =
          'Comparing available Eco Routes...';

        const routeResponse =
          await fetch(
            `https://router.project-osrm.org/route/v1/driving/${startLocation.lon},${startLocation.lat};${destinationLocation.lon},${destinationLocation.lat}?alternatives=true&overview=full&geometries=geojson`
          );

        if (!routeResponse.ok) {
          throw new Error(
            'The route service is temporarily unavailable.'
          );
        }

        const responseData =
          await routeResponse.json();

        if (
          responseData.code !== 'Ok' ||
          !responseData.routes ||
          responseData.routes.length === 0
        ) {
          showError(
            'No road route was found between these locations.'
          );
          return;
        }

        routes =
          responseData.routes
            .sort(
              (a, b) =>
                a.distance - b.distance
            )
            .map(route => ({
              ...route,
              startLat:
                startLocation.lat,
              startLon:
                startLocation.lon
            }));

        loadingText.textContent =
          'Preparing your live Eco Route map...';

        L = await import('leaflet');

        const mapElement =
          mainDiv.querySelector('#map');

        map = L.map(
          mapElement,
          {
            zoomControl: true
          }
        );

        this.map = map;

        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution:
              '&copy; OpenStreetMap contributors'
          }
        ).addTo(map);

        routes.forEach(
          (route, index) => {
            const coordinates =
              route.geometry.coordinates.map(
                coordinate => [
                  coordinate[1],
                  coordinate[0]
                ]
              );

            const line =
              L.polyline(
                coordinates,
                {
                  color:
                    index === 0
                      ? '#16a34a'
                      : '#64748b',

                  weight:
                    index === 0
                      ? 8
                      : 5,

                  opacity:
                    index === 0
                      ? 1
                      : 0.65,

                  lineCap: 'round',
                  lineJoin: 'round'
                }
              ).addTo(map);

            line.on(
              'click',
              () => {
                selectRoute(index);
              }
            );

            routeLines.push(line);
          }
        );

        // START MARKER
        L.circleMarker(
          [
            startLocation.lat,
            startLocation.lon
          ],
          {
            radius: 9,
            color: '#ffffff',
            weight: 3,
            fillColor: '#16a34a',
            fillOpacity: 1
          }
        )
          .addTo(map)
          .bindPopup(
            `<strong>Journey Start</strong><br>${source}`
          );

        // DESTINATION MARKER
        L.circleMarker(
          [
            destinationLocation.lat,
            destinationLocation.lon
          ],
          {
            radius: 10,
            color: '#ffffff',
            weight: 3,
            fillColor: '#dc2626',
            fillOpacity: 1
          }
        )
          .addTo(map)
          .bindPopup(
            `<strong>Destination</strong><br>${destination}`
          );

        map.fitBounds(
          routeLines[0].getBounds(),
          {
            padding: [45, 45]
          }
        );

        const routeCount =
          routes.length;

        mainDiv.querySelector(
          '#recommendationTitle'
        ).textContent =
          'Your Eco Route is ready';

        mainDiv.querySelector(
          '#recommendationText'
        ).textContent =
          routeCount > 1
            ? `TERRAVOLT compared ${routeCount} available routes and selected the lower-distance route for lower estimated emissions.`
            : `TERRAVOLT found the available road route and calculated estimated emissions for your ${selectedVehicle.name}.`;

        mainDiv.querySelector(
          '#routePlaces'
        ).innerHTML = `
          ${startLocation.name
            .split(',')
            .slice(0, 2)
            .join(',')}

          <span class="mx-2 text-emerald-300">
            →
          </span>

          ${destinationLocation.name
            .split(',')
            .slice(0, 2)
            .join(',')}
        `;

        mapStatus.classList.add(
          'hidden'
        );

        ecoRecommendation.classList.remove(
          'hidden'
        );

        routeChoices.classList.remove(
          'hidden'
        );

        renderRouteCards();

        // Select and automatically save
        // the recommended Eco Route.
        selectRoute(0);

        setTimeout(() => {
          map.invalidateSize();

          startLiveTracking();
        }, 500);

      } catch (error) {
        console.error(
          'Eco route error:',
          error
        );

        showError(
          error.message ||
          'Something went wrong while finding your Eco Route.'
        );
      }
    };

    // LOAD ECO ROUTE
    setTimeout(
      loadEcoRoutes,
      300
    );

    const nav =
      new BottomNav(
        '/explore'
      ).render(
        this.navigate
      );

    div.appendChild(nav);

    return div;
  }
}