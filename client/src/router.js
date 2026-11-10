import { WelcomeScreen } from './screens/WelcomeScreen.js';
import { HomeScreen } from './screens/HomeScreen.js';
import { ExploreScreen } from './screens/ExploreScreen.js';
import { JourneysScreen } from './screens/JourneysScreen.js';
import { ImpactScreen } from './screens/ImpactScreen.js';
import { ProfileScreen } from './screens/ProfileScreen.js';
import { AuthScreen } from './screens/AuthScreen.js';
import { DailyTravelScreen } from './screens/DailyTravelScreen.js';
import { FeatureIntroScreen } from './screens/FeatureIntroScreen.js';
import { LanguageSelectionScreen } from './screens/LanguageSelectionScreen.js';

const routes = {
  '/': WelcomeScreen,
  '/welcome': WelcomeScreen,
  '/auth': AuthScreen,
  '/feature-intro': FeatureIntroScreen,
  '/language': LanguageSelectionScreen,
  '/home': HomeScreen,
  '/explore': ExploreScreen,
  '/journeys': JourneysScreen,
  '/impact': ImpactScreen,
  '/profile': ProfileScreen,
  '/daily-travel': DailyTravelScreen
};

let navigateFn = null;

export function initRouter() {
  function navigate(path) {
    const url = new URL(path, window.location.origin);
    const routePath = url.pathname;

    if (!routes[routePath]) {
      console.warn(`Route not found: ${routePath}`);
      path = '/';
    }

    window.history.pushState({}, '', path);
    render();
  }

  navigateFn = navigate;

  function render() {
    const path = window.location.pathname;
    const container = document.getElementById('screen-container');

    if (!container) {
      console.error('Screen container not found.');
      return;
    }

    container.innerHTML = '';

    const ScreenClass = routes[path] || WelcomeScreen;

    try {
      const screen = new ScreenClass(navigate);
      const element = screen.render();
      container.appendChild(element);
    } catch (error) {
      console.error('Screen rendering failed:', error);

      container.innerHTML = `
        <div style="padding:30px;color:#8b1e1e;font-family:Arial,sans-serif;">
          <h2>Unable to load this page</h2>
          <p>Please check the browser console for details.</p>
        </div>
      `;
    }
  }

  window.addEventListener('popstate', render);

  render();
}

export function navigate(path) {
  if (navigateFn) {
    navigateFn(path);
  }
}