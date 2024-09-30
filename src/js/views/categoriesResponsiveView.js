import View from "./View";

class categoriesResponsive extends View {
  _parentElement = document.querySelector(".side-nav");

  addClickEvent() {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".side-nav-btn");
      const menu = this.querySelector(".category-nav");
      if (!btn) return;
      btn.classList.toggle("rotate-45");
      menu.classList.toggle("invisible");
      menu.classList.toggle("opacity-0");
      menu.classList.toggle("flex");
      menu.classList.toggle("absolute");
      menu.classList.toggle("translate-x-[-20rem]");
    });
  }
}

export default new categoriesResponsive();
