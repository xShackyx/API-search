import View from "./View";

class searchView extends View {
  _parentElement = document.querySelector(".search-form");
  _data = {};

  addClickEvent(callback) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".search-btn");
      if (!btn) return;
      const search = this.querySelector(".search-input").value;
      const auth = this.querySelector(".auth-select").value;
      const cors = this.querySelector(".cors-select").value;
      const https = this.querySelector(".https-select").value;

      const query = {
        search: search,
        auth: auth,
        cors: cors,
        https: https,
      };

      callback(query);
    });
  }
}

export default new searchView();
