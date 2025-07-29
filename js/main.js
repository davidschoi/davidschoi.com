// Vanilla JS replacement for former jQuery features
(function() {
  'use strict';

  // skills data
  const skills = [
    { name: 'JavaScript', startYear: 2012, proficiency: 90 },
    { name: 'CSS/Sass', startYear: 2012, proficiency: 90 },
    { name: 'HTML', startYear: 2012, proficiency: 90 },
    { name: 'React.js', startYear: 2017, proficiency: 90 },
    { name: 'TypeScript', startYear: 2016, proficiency: 80 },
    { name: 'Next.js', startYear: 2018, proficiency: 80 },
    { name: 'Styled Components', startYear: 2016, proficiency: 80 },
    { name: 'Node.js', startYear: 2016, proficiency: 70 },
    { name: 'GraphQL', startYear: 2017, proficiency: 60 }
  ];

  function createSkillElement(skill) {
    const experienceMessage = window.getExperienceMessage(skill.startYear);

    const col = document.createElement('div');
    col.className = 'col-sm-4 skillsArea';

    const wrapper = document.createElement('div');
    wrapper.className = 'skills';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.classList.add('progress-ring');
    svg.setAttribute('width', '120');
    svg.setAttribute('height', '120');

    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const circle = document.createElementNS(svgNS, 'circle');
    circle.classList.add('progress-ring__circle');
    circle.setAttribute('r', radius);
    circle.setAttribute('cx', '60');
    circle.setAttribute('cy', '60');
    circle.setAttribute('stroke-dasharray', circumference);
    circle.setAttribute('stroke-dashoffset', circumference);
    circle.dataset.circumference = circumference;
    circle.dataset.proficiency = skill.proficiency;
    svg.appendChild(circle);

    const percent = document.createElement('span');
    percent.className = 'percent';
    percent.textContent = skill.proficiency;

    const h4 = document.createElement('h4');
    h4.textContent = skill.name;

    const p = document.createElement('p');
    p.textContent = experienceMessage;

    wrapper.appendChild(svg);
    wrapper.appendChild(percent);
    wrapper.appendChild(h4);
    wrapper.appendChild(p);
    col.appendChild(wrapper);

    return { col, circle };
  }

  function animateCircles() {
    document.querySelectorAll('.progress-ring__circle').forEach(circle => {
      const circumference = parseFloat(circle.dataset.circumference);
      const percent = parseFloat(circle.dataset.proficiency);
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Build skills section
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer) {
      const fragments = document.createDocumentFragment();
      skills.forEach(skill => {
        const { col } = createSkillElement(skill);
        fragments.appendChild(col);
      });
      skillsContainer.appendChild(fragments);
    }

    // smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // navbar collapse handling
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navToggle = document.querySelector('.navbar-toggle');
    document.querySelectorAll('.navbar.navbar-inverse.navbar-static-top a').forEach(link => {
      link.addEventListener('click', function() {
        if (navbarCollapse) {
          navbarCollapse.classList.add('hideClass', 'collapse');
          navbarCollapse.classList.remove('in');
        }
      });
    });
    if (navToggle && navbarCollapse) {
      navToggle.addEventListener('click', function() {
        navbarCollapse.classList.remove('hideClass');
      });
    }

    // animate skills when section enters view
    const technicalSection = document.getElementById('technical');
    if (technicalSection) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          animateCircles();
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(technicalSection);
    } else {
      animateCircles();
    }
  });
})();
