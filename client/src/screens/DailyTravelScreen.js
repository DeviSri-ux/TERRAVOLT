import { BottomNav } from '../components/BottomNav.js';
import { Header } from '../components/Header.js';
import { TerraCompanion } from '../components/TerraCompanion.js';

export class DailyTravelScreen {
  constructor(navigate) {
    this.navigate = navigate;
    this.user = JSON.parse(localStorage.getItem('user') || '{\"isGuest\":true}');
    this.commuting = JSON.parse(localStorage.getItem('dailyTravel') || '[]');
  }
  
  render() {
    const div = document.createElement('div');
    div.className = 'min-h-screen pb-24 relative';
    div.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80)';
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundAttachment = 'fixed';
    
    const header = new Header('Daily Travel', true, this.navigate).render();
    header.classList.add('bg-white/90', 'backdrop-blur-sm', 'mx-4', 'mt-4', 'rounded-2xl', 'shadow-lg');
    div.appendChild(header);
    
    var html = '';
    html += '<main class="px-4 mt-4 space-y-4">';
    html += '  <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">';
    html += '    <h2 class="font-semibold text-gray-800 mb-3">Add Your Commute</h2>';
    html += '    <div class="space-y-2">';
    html += '      <input type="text" id="startLoc" placeholder="Start Location" class="w-full px-4 py-2 border border-gray-300 rounded-xl">';
    html += '      <input type="text" id="endLoc" placeholder="Destination" class="w-full px-4 py-2 border border-gray-300 rounded-xl">';
    html += '      <select id="vehicle" class="w-full px-4 py-2 border border-gray-300 rounded-xl">';
    html += '        <option value="petrol_bike">Petrol Bike</option>';
    html += '        <option value="diesel_suv">Diesel SUV</option>';
    html += '        <option value="electric_scooter">Electric Scooter</option>';
    html += '      </select>';
    html += '      <select id="tripType" class="w-full px-4 py-2 border border-gray-300 rounded-xl">';
    html += '        <option value="oneway">One-way</option>';
    html += '        <option value="roundtrip">Round-trip</option>';
    html += '      </select>';
    html += '      <button id="saveCommute" class="w-full bg-terra-700 text-white py-2 rounded-xl font-semibold">Save Commute</button>';
    html += '    </div>';
    html += '  </div>';
    
    if (this.commuting.length > 0) {
      html += '  <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">';
      html += '    <h2 class="font-semibold text-gray-800 mb-3">My Commutes</h2>';
      for (let i = 0; i < this.commuting.length; i++) {
        const c = this.commuting[i];
        html += '    <div class="border-b border-gray-100 py-2">';
        html += '      <p class="text-sm font-medium">' + c.start + ' → ' + c.end + '</p>';
        html += '      <p class="text-xs text-gray-600">' + c.vehicle.replace('_', ' ') + ' • ' + c.tripType + '</p>';
        html += '    </div>';
      }
      html += '  </div>';
    } else {
      html += '  <div class="text-center py-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl">';
      html += '    <p class="text-gray-600">Add your regular commute to discover your travel impact.</p>';
      html += '  </div>';
    }
    
    html += '</main>';
    const mainDiv = document.createElement('div');
    mainDiv.innerHTML = html;
    div.appendChild(mainDiv);
    
    mainDiv.querySelector('#saveCommute').onclick = () => {
      const start = mainDiv.querySelector('#startLoc').value;
      const end = mainDiv.querySelector('#endLoc').value;
      const vehicle = mainDiv.querySelector('#vehicle').value;
      const tripType = mainDiv.querySelector('#tripType').value;
      if (!start || !end) {
        alert('Please enter both locations');
        return;
      }
      const commutes = JSON.parse(localStorage.getItem('dailyTravel') || '[]');
      commutes.push({ start, end, vehicle, tripType, id: Date.now() });
      localStorage.setItem('dailyTravel', JSON.stringify(commutes));
      alert('Commute saved');
      location.reload();
    };
    
    const nav = new BottomNav('/daily-travel').render(this.navigate);
    div.appendChild(nav);
    
    const terra = new TerraCompanion(this.navigate, 'daily-travel').render();
    div.appendChild(terra);
    
    return div;
  }
}
