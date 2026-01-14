/**
 * Jest test setup file
 * Configures the testing environment
 */

// Add custom matchers or global test utilities here
global.beforeEach(() => {
  // Reset DOM before each test
  document.body.innerHTML = '';
});
