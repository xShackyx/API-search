import View from "./View";

class navView extends View {
  _parentElement = document.querySelector(".category-nav");
  _data = [];
  _category = "";

  renderNav(data, currentCategory) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;
    this._category = currentCategory;
    this._data = data;
    const highlight = "font-semibold text-white";
    let markup = `<li data-category="" class="category-nav-btn hover:text-white hover:cursor-pointer ${
      currentCategory === "" ? highlight : ""
    }"><i class="fa-solid fa-home"></i> View All</li>`;
    data.forEach((cat) => {
      markup =
        markup +
        `<li data-category="${
          cat.slug
        }" class="category-nav-btn hover:text-white hover:cursor-pointer ${
          currentCategory === cat.slug ? highlight : ""
        }"><i class="fa-solid fa-${cat.icon}"></i> ${cat.name}</li>`;
    });
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addClickEvent(callback) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".category-nav-btn");
      if (!btn) return;
      callback(btn.dataset.category);
    });
  }
}

export default new navView();
