function getExperienceMessage(startYear) {
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  return `${years} year${years !== 1 ? 's' : ''}`;
}

module.exports = getExperienceMessage;
