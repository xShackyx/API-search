import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON, sendJSON } from "./helper";

export const state = {
  categories: [],
  cards: [],
  query: {
    category: "",
  },
  page: 1,
  authList: [],
  resultsPerPage: RES_PER_PAGE,
};

export const loadSideNav = async function () {
  try {
    const data = await getJSON(`${API_URL}/categories`);
    state.categories = data.categories;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadCards = async function () {
  try {
    const data = await sendJSON(`${API_URL}/resources`, state.query);
    state.cards = data.resources;
    state.page = 1;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadAuthValues = function () {
  const authList = state.cards
    .filter((entry) => entry.auth != "")
    .map((entry) => entry.auth);
  const authSet = new Set(authList);
  state.authList = authSet;
};

export const cardsPerPage = function (page = state.page) {
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;

  return state.cards.slice(start, end);
};
