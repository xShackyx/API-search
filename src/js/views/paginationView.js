import { MAX_PAGES_DISPLAYED } from "../config";
import View from "./View";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _data = {};

  addClickEvent(callback) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".page-btn");

      if (!btn) return;
      const data = +btn.dataset.page;
      callback(data);
    });
  }

  calcPagination(data) {
    const numPages = Math.ceil(data.cards.length / data.resultsPerPage);
    return numPages;
  }

  renderPagination(data) {
    const numPages = this.calcPagination(data);
    let markup = "";
    const curPage = data.page;
    let page = 1;
    let pagesToRender = MAX_PAGES_DISPLAYED;
    let halfMaxPages = Math.floor(MAX_PAGES_DISPLAYED / 2);
    if (numPages < MAX_PAGES_DISPLAYED) {
      pagesToRender = numPages;
    }
    if (numPages > MAX_PAGES_DISPLAYED) {
      if (curPage > halfMaxPages) {
        if (curPage < numPages - halfMaxPages) {
          pagesToRender = curPage + halfMaxPages;
          page = curPage - halfMaxPages;
        } else {
          pagesToRender = numPages;
          page = numPages - MAX_PAGES_DISPLAYED + 1;
        }
      }
    }
    markup = `<button data-page=${curPage - 1} ${
      curPage > 1 ? "" : "disabled"
    } class="page-btn">
              <i class="fa-solid fa-caret-left ${
                curPage > 1 ? "hover:text-white" : "text-transparent"
              }"></i>
            </button>`;
    for (page; page <= pagesToRender; page++) {
      markup =
        markup +
        `
        <button data-page=${page}
        class="page-btn text-xl py-1 min-w-10 inline-block rounded-lg ${
          page === curPage
            ? "bg-gray-400 text-gray-900 hover:bg-white"
            : "hover:ring-white hover:ring-inset hover:ring"
        }"
          >
          ${page}
          </button>`;
    }
    markup =
      markup +
      `<button data-page=${curPage + 1} ${
        curPage < numPages ? "" : "disabled"
      } class="page-btn">
              <i class="fa-solid fa-caret-right ${
                curPage < numPages ? "hover:text-white" : "text-transparent"
              }"></i>
            </button>`;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new paginationView();
