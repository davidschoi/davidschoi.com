/**
 * @jest-environment jsdom
 */
const path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');

describe('main.js functionality', () => {
  let window, document;

  beforeAll(() => {
    const html = `<!DOCTYPE html><body>
      <div id="skillsContainer"></div>
      <section id="technical"></section>
      <div class="navbar-collapse"></div>
      <button class="navbar-toggle"></button>
      <nav class="navbar navbar-inverse navbar-static-top"><a href="#"></a></nav>
    </body>`;
    const dom = new JSDOM(html, { url: 'http://localhost/' });
    window = dom.window;
    document = window.document;

    global.window = window;
    global.document = document;
    global.IntersectionObserver = class {
      constructor() {}
      observe() {}
      disconnect() {}
    };

    window.getExperienceMessage = require('../js/getExperienceMessage');
    require('../js/main.js');

    document.dispatchEvent(new window.Event('DOMContentLoaded'));
  });

  test('skills are rendered into the container', () => {
    const skills = document.querySelectorAll('#skillsContainer .skillsArea');
    expect(skills.length).toBe(9);
    expect(skills[0].querySelector('h4').textContent).toBe('JavaScript');
  });
});
