export class Header {
  constructor(title, showBack = true, navigate) {
    this.title = title;
    this.showBack = showBack;
    this.navigate = navigate;
  }
  
  render() {
    const header = document.createElement('header');
    header.className = 'px-6 pt-8 pb-4 flex items-center';
    
    if (this.showBack) {
      const backBtn = document.createElement('button');
      backBtn.className = 'mr-3 text-2xl';
      backBtn.innerHTML = '←';
      backBtn.onclick = () => {
        if (window.history.length > 1) {
          window.history.back();
        } else if (this.navigate) {
          this.navigate('/home');
        }
      };
      header.appendChild(backBtn);
    }
    
    const h1 = document.createElement('h1');
    h1.className = 'text-2xl font-bold text-terra-700 flex-1';
    h1.textContent = this.title;
    header.appendChild(h1);
    
    return header;
  }
}
