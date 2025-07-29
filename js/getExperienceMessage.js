function getExperienceMessage(startYear) {
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  return `${years} year${years !== 1 ? 's' : ''}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = getExperienceMessage;
} else {
  window.getExperienceMessage = getExperienceMessage;
}
