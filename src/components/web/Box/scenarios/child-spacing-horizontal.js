module.exports = config => ({
  label: "Box - Child Spacing Horizontal",
  url: config.urlBase +
    "/?selectedKind=Box&selectedStory=Children%20spaced%20horizontal&full=1&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel",
  hideSelectors: [],
  removeSelectors: [],
  selectorExpansion: true,
  selectors: ["#root"],
  readyEvent: null,
  delay: 500,
  misMatchThreshold: 0.1,
  onBeforeScript: "onBefore.js",
  onReadyScript: "onReady.js"
});
