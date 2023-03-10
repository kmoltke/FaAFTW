let data;

/**
 * Sets up the page, loading products data, displaring vinyls
 */
document.body.onload = async () => {
  const vinyls = await loadProductDataAsync();
  DisplayFeatured(vinyls);
  renderPage(vinyls);
  data = vinyls;
};

/**
 * Scrolls the window down to "browsecontainer"
 */
function scrollIntoBrowse() {
  const element = document.getElementById("browseContainer");
  element.scrollIntoView();
}

/**
 * Scrools the window to the top of the page
 */
function scrollIntoHome() {
  window.scrollTo(0, 0);
}
