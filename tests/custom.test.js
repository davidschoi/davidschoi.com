const getExperienceMessage = require('../js/getExperienceMessage');

describe('getExperienceMessage', () => {
  test('returns "0 years" when startYear is current year', () => {
    const currentYear = new Date().getFullYear();
    expect(getExperienceMessage(currentYear)).toBe('0 years');
  });

  test('returns "1 year" when startYear is last year', () => {
    const currentYear = new Date().getFullYear();
    expect(getExperienceMessage(currentYear - 1)).toBe('1 year');
  });

  test('returns "2 years" when startYear is two years ago', () => {
    const currentYear = new Date().getFullYear();
    expect(getExperienceMessage(currentYear - 2)).toBe('2 years');
  });
});
