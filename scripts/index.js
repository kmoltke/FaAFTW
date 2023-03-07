let data;

document.body.onload = async () => {
  const vinyls = await loadProductDataAsync();
  DisplayFeatured(vinyls);
  renderPage(vinyls);
  data = vinyls;
};

function scrollIntoBrowse() {
  const element = document.getElementById("browseContainer");
  element.scrollIntoView();
}
function scrollIntoHome() {
  window.scrollTo(0, 0);
}
