import { searchBoxBtn, searchBoxInput, regionSelector, btnBack } from "./nodes";

const history = ['#'];

searchBoxBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const inputText = searchBoxInput.value;
  const hash = `#search/${inputText}`;
  window.location.hash = hash;
  history.push(hash);
});

regionSelector.addEventListener('change', function (event) {
  event.preventDefault();
  const region = regionSelector.value;
  const hash = `#filter/${region}`;
  window.location.hash = hash;
  history.push(hash);
});

btnBack.addEventListener('click', function () {
  if (history.length > 1) {
    history.pop();
    window.location.hash = `#${history[history.length - 1]}`;
  }
  else {
    window.location.hash = '/';
  }
});

export { history };