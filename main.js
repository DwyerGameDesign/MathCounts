/**
 * Tab Management
 * Handles switching between different content panels
 */
function showTab(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
}

/**
 * UI Interactions
 * Handles expandable/collapsible card components
 */

/**
 * Toggles the visibility of gotcha card content
 * @param {HTMLElement} card - The gotcha card element
 */
function toggleGotcha(card) {
  card.classList.toggle('open');
}

/**
 * Toggles the visibility of example problem solutions
 * @param {HTMLElement} card - The example card element
 */
function toggleExample(card) {
  card.classList.toggle('open');
}

/**
 * Toggles the visibility of formula example problems
 * @param {HTMLElement} card - The formula card element
 */
function toggleFormulaExample(card) {
  card.classList.toggle('expanded');
}

/**
 * Theme Management
 * Handles switching between light and dark modes
 */

/**
 * Toggles between light and dark theme
 * Saves preference to localStorage
 */
function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  const icon = document.querySelector('.theme-icon');
  icon.textContent = newTheme === 'light' ? '☀️' : '🌙';
}

/**
 * Initializes theme on page load
 * Checks localStorage for saved preference or defaults to dark
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const root = document.documentElement;
  root.setAttribute('data-theme', savedTheme);
  
  // Update icon
  const icon = document.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
  }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);
