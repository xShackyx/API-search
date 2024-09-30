export default class View {
  _parentElement;
  _data;
  clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const spinner = `
    <div class= "text-6xl md:col-start-2 place-self-center p-48">
    <i class="fa-solid fa-spinner animate-spin"></i>
    </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinner);
  }

  addLoadEvent(callback) {
    window.addEventListener("load", callback);
  }
}
