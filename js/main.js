(function () {
  'use strict';

  const skills = [
    { name: 'JavaScript', startYear: 2012 },
    { name: 'TypeScript', startYear: 2016 },
    { name: 'React', startYear: 2017 },
    { name: 'Next.js', startYear: 2018 },
    { name: 'Node.js', startYear: 2016 },
    { name: 'GraphQL', startYear: 2017 },
    { name: 'CSS / Sass', startYear: 2012 },
    { name: 'HTML', startYear: 2012 },
    { name: 'Styled Components', startYear: 2016 }
  ];

  function renderSkills(container) {
    const fragment = document.createDocumentFragment();
    skills.forEach((skill) => {
      const card = document.createElement('div');
      card.className = 'skillsArea';

      const heading = document.createElement('h4');
      heading.textContent = skill.name;

      const meta = document.createElement('p');
      meta.textContent = window.getExperienceMessage(skill.startYear);

      card.appendChild(heading);
      card.appendChild(meta);
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
  }

  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function highlightActiveLink() {
    const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    const linkById = new Map(
      links
        .map((link) => [link.getAttribute('href').slice(1), link])
        .filter(([id]) => id && document.getElementById(id))
    );

    const setActive = (id) => {
      links.forEach((l) => l.removeAttribute('aria-current'));
      const active = linkById.get(id);
      if (active) active.setAttribute('aria-current', 'true');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .slice(0, 1)
          .forEach((e) => setActive(e.target.id));
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    linkById.forEach((_, id) => observer.observe(document.getElementById(id)));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('skillsContainer');
    if (container) renderSkills(container);
    setYear();
    highlightActiveLink();
  });
})();
