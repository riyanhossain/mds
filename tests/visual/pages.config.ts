// Configuration for pages to test
export const pages = [
  { name: "Home", path: "/" },
  // Add more pages here as your site grows
  // Example:
  // { name: 'About', path: '/about' },
  // { name: 'Services', path: '/services' },
  // { name: 'Contact', path: '/contact' },
];

// For Node.js compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = { pages };
}
