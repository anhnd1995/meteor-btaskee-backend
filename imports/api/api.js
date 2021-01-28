// api.js
// Anh Nguyen
// File to contains api request

import axios from "axios";

export default axios.create({
  baseURL: "https://5ffd2191d9ddad0017f6796d.mockapi.io",
});

// // Base URL
// const base_url = "https://5ffd2191d9ddad0017f6796d.mockapi.io";

// // bTasker page
// const bTasker_users = `/bTasker-user`;

// // Get bTasker list URL
// export const bTaskerURL = () => `${base_url}${bTasker_users}`;

// // Get bTasker with pagination
// export const bTaskerPaginationURL = (pageNum = 1, item = 10) =>
//   `${bTaskerURL()}?page=${pageNum}&limit=${item}`;

// // Get bTasker sorted list

// export const bTaskerSortedURL = (field, direction) =>
//   `${bTaskerPaginationURL()}&sortBy=${field}&order=${direction}`;
