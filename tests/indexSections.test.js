/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let document;

beforeAll(() => {
  const dom = new JSDOM(html);
  document = dom.window.document;
});

describe('index.html main sections', () => {
  const sections = ['aboutme', 'technical', 'experience', 'education', 'contact', 'footer'];
  sections.forEach(id => {
    test(`section with id "${id}" exists`, () => {
      expect(document.getElementById(id)).not.toBeNull();
    });
  });
});
