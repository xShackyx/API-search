import { CARD_ICON_SIZE } from "../config";
import View from "./View";

class cardsView extends View {
  _parentElement = document.querySelector(".cards-container");
  _data = [];

  cardCorsPresence = function (data) {
    if (data.cors === "no") return false;
    if (data.cors === "yes") return true;
  };

  cardLinkDomain = function (url) {
    return new URL(url).hostname;
  };

  renderCards(data) {
    this._data = data;
    let markup = "";
    if (!data || (Array.isArray(data) && data.length === 0)) {
      markup =
        "<p class='font-bold text-4xl col-start-2 place-self-center pt-32'>No API found, please change your search query!</p>";
    } else {
      data.forEach((card) => {
        markup =
          markup +
          `<a href="${card.link}" target="_blank"
                class="single-card-container min-h-48 grid grid-cols-1 border border-gray-700 rounded-md px-4 py-2 hover:border-white hover:cursor-pointer"
              >
                <div class="pb-3 flex gap-4 items-center">              
                <img class="size-10 border-2 border-gray-700 rounded" src="https://icon.horse/icon/${this.cardLinkDomain(
                  card.link
                )}" />
                <div>
                <div class="font-bold text-xl">${card.name}</div>
                <div class="uppercase text-xs font-semibold text-gray-400">${
                  card.category.name
                }</div>
                </div>
                </div>
                <div class="pb-5 text-gray-300">${card.description}</div>
                <div class="flex gap-4 uppercase text-xs">
                  <div
                    class="flex gap-1 justify-center items-center ${
                      card.auth ? "text-white" : "text-gray-500"
                    }"
                  >
                    <i class="fa-solid fa-key"></i>
                    <p>auth</p>
                  </div>
                  <div
                    class="flex gap-1 justify-center items-center ${
                      this.cardCorsPresence(card)
                        ? "text-white"
                        : "text-gray-500"
                    }"
                  >
                      <i class="fa-solid fa-question"></i>
                    <p>cors</p>
                  </div>
                  <div
                    class="flex gap-1 justify-center items-center ${
                      card.https ? "text-white" : "text-gray-500"
                    }"
                  >
                    <i class="fa-solid fa-check"></i>
                    <p>https</p>
                  </div>
                </div>
              </a>`;
      });
    }
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new cardsView();
