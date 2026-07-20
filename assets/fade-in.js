// Scroll-triggered fade-in for elements marked with .fade-in.
// Adds the .visible class when the element enters the viewport.
// Loaded on every page from shared/head-base.html via <script defer>.
(function () {
  if (!('IntersectionObserver' in window)) {
    // Graceful degradation: reveal everything on older browsers.
    document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
})();
