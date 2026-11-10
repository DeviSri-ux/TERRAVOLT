import { t, applyLanguageDirection } from '../utils/i18n.js';

export class BottomNav {
  constructor(currentPath = '/home') {
    this.currentPath = currentPath;
  }

  render(navigate) {
    const nav = document.createElement('nav');

    nav.className =
      'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 flex justify-around items-center z-50 md:hidden';

    const items = [
      { path: '/home', icon: '🏠', label: t('home') },
      { path: '/explore', icon: '🗺️', label: t('explore') },
      { path: '/journeys', icon: '📖', label: t('journeys') },
      { path: '/impact', icon: '🌱', label: t('impact') },
      { path: '/profile', icon: '👤', label: t('profile') }
    ];

    items.forEach(item => {
      const btn = document.createElement('button');

      btn.className =
        'flex flex-col items-center px-2 py-1 flex-1 ' +
        (this.currentPath === item.path
          ? 'text-terra-600'
          : 'text-gray-600');

      btn.innerHTML =
        '<span class="text-xl">' + item.icon + '</span>' +
        '<span class="text-xs mt-1">' + item.label + '</span>';

      btn.onclick = () => navigate(item.path);

      nav.appendChild(btn);
    });

    applyLanguageDirection(nav);

    return nav;
  }
}