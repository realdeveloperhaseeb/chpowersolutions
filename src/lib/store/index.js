// Data store facade. Chooses MySQL when DB is configured, else the in-memory
// adapter. Read operations degrade gracefully to the seed dataset if the DB is
// unreachable, so a transient outage (or a build with no DB) never crashes a page.
import { isDbConfigured } from "@/lib/db";
import { adapter as memory } from "./memory";

let mysqlAdapter = null;
function active() {
  if (isDbConfigured()) {
    if (!mysqlAdapter) mysqlAdapter = require("./mysql").adapter; // lazy: don't load mysql2 in memory mode
    return mysqlAdapter;
  }
  return memory;
}

export const storeMode = () => active().name;

// Reads fall back to seed data if the active (MySQL) adapter errors.
async function read(method, ...args) {
  const a = active();
  try {
    return await a[method](...args);
  } catch (e) {
    if (a.name === "mysql") {
      console.error(`[store] read '${method}' failed (${e.code || e.message}); using seed data.`);
      return memory[method](...args);
    }
    throw e;
  }
}
// Writes require the real store — errors propagate so the admin knows.
const write = (method, ...args) => active()[method](...args);
// Auth lookups go straight to the active store (no seed fallback).
const auth = (method, ...args) => active()[method](...args);

// categories
export const getCategories = () => read("getCategories");
export const getCategoryBySlug = (s) => read("getCategoryBySlug", s);
export const getCategoryById = (id) => read("getCategoryById", id);
export const createCategory = (d) => write("createCategory", d);
export const updateCategory = (id, d) => write("updateCategory", id, d);
export const deleteCategory = (id) => write("deleteCategory", id);

// products
export const getProducts = () => read("getProducts");
export const getFeaturedProducts = () => read("getFeaturedProducts");
export const getProductBySlug = (s) => read("getProductBySlug", s);
export const getProductById = (id) => read("getProductById", id);
export const getProductsByCategory = (s) => read("getProductsByCategory", s);
export const createProduct = (d) => write("createProduct", d);
export const updateProduct = (id, d) => write("updateProduct", id, d);
export const deleteProduct = (id) => write("deleteProduct", id);

// settings
export const getSettings = () => read("getSettings");
export const updateSettings = (p) => write("updateSettings", p);

// users
export const createUser = (d) => write("createUser", d);
export const findUserByEmail = (e) => auth("findUserByEmail", e);
export const findUserById = (id) => auth("findUserById", id);
export const getUsers = () => read("getUsers");
export const updateUserPassword = (id, hash) => write("updateUserPassword", id, hash);

// orders
export const getOrders = () => read("getOrders");
export const getOrderById = (id) => read("getOrderById", id);
export const createOrder = (d) => write("createOrder", d);
export const updateOrderStatus = (id, s) => write("updateOrderStatus", id, s);

// convenience
export async function getCategoryName(slug) {
  const c = await getCategoryBySlug(slug);
  return c ? c.name : "Products";
}
