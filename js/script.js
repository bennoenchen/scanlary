function toggleMenu(toggleBtn) {
    const nav = document.getElementById('nav');
    const backdrop = document.getElementById('navBackdrop');
    const isOpen = nav.classList.toggle('active');

    toggleBtn.classList.toggle('open');
    backdrop.classList.toggle('visible');

    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
    const nav = document.getElementById('nav');
    const backdrop = document.getElementById('navBackdrop');
    const toggle = document.getElementById('menuToggle');

    nav.classList.remove('active');
    backdrop.classList.remove('visible');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// Aktiven Link markieren
document.querySelectorAll('nav a').forEach(link => {
    if (link.pathname === location.pathname) {
        link.classList.add('active');
    }
});

// Schließen bei Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});