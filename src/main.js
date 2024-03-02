(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const anchors = mobileMenu.querySelectorAll('a[href*="#"]');
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    menuOverlay.classList.toggle('is-open');

    if (anchors.length === 0) return;

    if (!isMenuOpen) {
      anchors.forEach(anchor => {
        anchor.addEventListener('click', toggleMenu);
      });

      if (window.innerWidth < 768) {
        document.body.classList.add('no-scroll');
      }
      return;
    }

    anchors.forEach(anchor => {
      anchor.removeEventListener('click', toggleMenu);
    });
    document.body.classList.remove('no-scroll');
  };

  const handleMenuLinks = () => {
    const menuLinks = document.querySelectorAll('.link');
    menuLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetClass = link.getAttribute('href').substring(1);
        const targetElement = document.querySelector('.' + targetClass);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  };

  const changeLogoAndSymbols = () => {
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
  };

  const handleWindowResize = () => {
    window.addEventListener('resize', () => {
      changeLogoAndSymbols();
    });
  };

  const initialize = () => {
    handleMenuLinks();
    handleWindowResize();
    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
      if (!e.matches) {
        mobileMenu.classList.remove('is-open');
        menuOverlay.classList.remove('is-open');
        openMenuBtn.setAttribute('aria-expanded', false);
        document.body.classList.remove('no-scroll');
      }
    });
  };

  window.addEventListener('load', () => {
    changeLogoAndSymbols();
    initialize();
  });
})();
