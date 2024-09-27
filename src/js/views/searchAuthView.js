import View from "./View";

class searchAuthView extends View {
  _parentElement = document.querySelector(".auth-select");
  _data = {};

  renderAuthTags(data) {
    let markup = `<option class="bg-gray-900 text-gray-200" selected disabled hidden value="default">Auth type</option>
      <option class="bg-gray-900 text-gray-200" value="default">View all auth types</option>
      <option class="bg-gray-900 text-gray-200" value="">No auth</option>`;
    data.forEach((option) => {
      markup =
        markup +
        `<option class="bg-gray-900 text-gray-200" value="${option}">${option}</option>`;
    });
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new searchAuthView();
