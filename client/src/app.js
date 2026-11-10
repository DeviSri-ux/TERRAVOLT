export function createApp() {
  const app = document.getElementById('app');
  app.innerHTML = '<div id="root" class="min-h-screen"><div id="screen-container"></div></div>';
  import('./router.js').then(module => {
    module.initRouter();
  });
}
