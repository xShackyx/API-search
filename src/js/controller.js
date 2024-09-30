import * as model from "./model";
import navView from "./views/categoriesNavView";
import cardsView from "./views/cardsView";
import paginationView from "./views/paginationView";
import View from "./views/View";
import searchAuthView from "./views/searchAuthView";
import searchView from "./views/searchView";
import categoriesNavView from "./views/categoriesNavView";
import categoriesResponsiveView from "./views/categoriesResponsiveView";

const checkBoolean = function (string) {
  return string === "true";
};

const loadCards = async function () {
  cardsView.renderSpinner();
  await model.loadCards();
  cardsView.renderCards(model.cardsPerPage());
  paginationView.renderPagination(model.state);
};

const controlCategories = async function () {
  try {
    navView.renderSpinner();
    await model.loadSideNav();
    navView.renderNav(model.state.categories, model.state.query.category);
  } catch (err) {
    console.log(err);
  }
};

const controlCategoryNav = async function (category) {
  try {
    model.state.query.category = category;
    navView.renderNav(model.state.categories, model.state.query.category);
    loadCards();
  } catch (err) {
    console.log(err);
  }
};

const controlSearch = async function (query) {
  try {
    model.state.query.search = query.search.toLowerCase();
    model.state.query.auth = query.auth === "default" ? null : query.auth;
    model.state.query.cors = query.cors === "default" ? null : query.cors;
    model.state.query.https =
      query.https === "default" ? null : checkBoolean(query.https);
    loadCards();
  } catch (err) {
    console.log(err);
  }
};

const controlCard = async function () {
  try {
    await loadCards();
    model.loadAuthValues();
    searchAuthView.renderAuthTags(model.state.authList);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  model.state.page = page;
  cardsView.renderCards(model.cardsPerPage(page));
  paginationView.renderPagination(model.state);
};

const init = function () {
  categoriesNavView.addLoadEvent(controlCategories);
  cardsView.addLoadEvent(controlCard);
  categoriesNavView.addClickEvent(controlCategoryNav);
  paginationView.addClickEvent(controlPagination);
  searchView.addClickEvent(controlSearch);
  categoriesResponsiveView.addClickEvent();
};

init();
