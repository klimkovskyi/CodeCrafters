(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const menuOverlay = document.querySelector('.js-menu-overlay'); // додали посилання на фоновий елемент
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const anchors = mobileMenu.querySelectorAll('a[href*="#"]');
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    menuOverlay.classList.toggle('is-open'); // додали toggle для фонового елементу

    if (anchors.length === 0) return;

    if (!isMenuOpen) {
      anchors.forEach(anchor => {
        anchor.addEventListener('click', toggleMenu);
      });
      return;
    }

    anchors.forEach(anchor => {
      anchor.removeEventListener('click', toggleMenu);
    });
  };

  function changeLogoAndSymbols() {
    const svgLogo = document.querySelector('.svg_logo use');
    const closeBtn = document.querySelector('.close_button use');
    const openBtn = document.querySelector('.open_button use');
    const width = window.innerWidth;

    if (width >= 765) {
      svgLogo.setAttribute('href', './icons.svg#logo_tablet');
      closeBtn.setAttribute('href', './icons.svg#close_menu_tablet');
      openBtn.setAttribute('href', './icons.svg#open_menu_tablet');
    } else {
      svgLogo.setAttribute('href', './icons.svg#logo');
      closeBtn.setAttribute('href', './icons.svg#close_menu');
      openBtn.setAttribute('href', './icons.svg#open_menu');
    }
  }

  // Зміна використаного символу при завантаженні сторінки
  window.addEventListener('load', () => {
    changeLogoAndSymbols();
  });

  // Зміна використаного символу при зміні розміру вікна
  window.addEventListener('resize', () => {
    changeLogoAndSymbols();
  });

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Вказати брейкпоінт після якого повинна зачинятися
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    menuOverlay.classList.remove('is-open'); // закриття фонового елементу при закритті меню
    openMenuBtn.setAttribute('aria-expanded', false);
  });
})();
