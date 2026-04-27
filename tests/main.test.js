/**
 * @jest-environment jsdom
 */
describe('main.js functionality', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div id="skillsContainer"></div>
      <section id="technical"></section>
    `;
    window.getExperienceMessage = require('../js/getExperienceMessage');
    require('../js/main.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  test('skills are rendered into the container', () => {
    const skills = document.querySelectorAll('#skillsContainer .skillsArea');
    expect(skills.length).toBe(9);
    expect(skills[0].querySelector('h4').textContent).toBe('JavaScript');
  });
});
