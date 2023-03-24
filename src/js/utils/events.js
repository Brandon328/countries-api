import { searchBoxBtn, searchBoxInput } from "./nodes";

searchBoxBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const inputText = searchBoxInput.value;
  window.location.hash = `#search/${inputText}`;
});