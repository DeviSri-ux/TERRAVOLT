export class LanguageSelectionScreen {
  constructor(navigate) {
    this.navigate = navigate;
  }
  
  render() {
    const div = document.createElement('div');
    div.className = 'min-h-screen w-full relative flex items-center justify-center px-6 py-8';
    div.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80)';
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundAttachment = 'fixed';
    
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'ta', name: 'தமிழ்' },
      { code: 'hi', name: 'हिंदी' },
      { code: 'te', name: 'తెలుగు' },
      { code: 'ml', name: 'മലയാളം' },
      { code: 'kn', name: 'ಕನ್ನಡ' },
      { code: 'bn', name: 'বাংলা' },
      { code: 'mr', name: 'मराठी' },
      { code: 'gu', name: 'ગુજરાતી' },
      { code: 'pa', name: 'ਪੰਜਾਬੀ' },
      { code: 'or', name: 'ଓଡ଼ିଆ' },
      { code: 'ur', name: 'اردو' }
    ];
    
    var html = '';
    html += '<div class="w-full max-w-2xl z-10 glass-card p-8 md:p-10">';
    html += '  <div class="text-center mb-8">';
    html += '    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">Choose Your Language</h1>';
    html += '    <p class="text-white/90">Select your preferred language</p>';
    html += '  </div>';
    html += '  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">';
    for (let i = 0; i < languages.length; i++) {
      html += '    <button class="lang-btn px-4 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/20 transition" data-code="' + languages[i].code + '">' + languages[i].name + '</button>';
    }
    html += '  </div>';
    html += '  <button id="continue" class="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition">Continue</button>';
    html += '</div>';
    
    div.innerHTML = html;
    let selected = 'en';
    
    div.querySelectorAll('.lang-btn').forEach(btn => {
      btn.onclick = () => {
        div.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('bg-white/40', 'font-semibold'));
        btn.classList.add('bg-white/40', 'font-semibold');
        selected = btn.getAttribute('data-code');
      };
    });
    
    div.querySelector('#continue').onclick = () => {
      localStorage.setItem('language', selected);
      this.navigate('/feature-intro');
    };
    
    return div;
  }
}


