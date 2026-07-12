// Data store facade. Chooses MySQL when DB is configured, else the in-memory
// adapter (so the site + admin stay fully usable without a database). Every
// consumer imports from "@/lib/store" and never touches an adapter directly.
import { isDbConfigured } from "@/lib/db";
import { adapter as memory } from "./memory";

let mysqlAdapter = null;
function pick() {
  if (isDbConfigured()) {
    if (!mysqlAdapter) {
      // require lazily so mysql2 isn't loaded when running in memory mode
      mysqlAdapter = require("./mysql").adapter;
    }
    return mysqlAdapter;
  }
  return memory;
}

export const storeMode = () => pick().name;

// categories
export const getCategories = () => pick().getCategories();
export const getCategoryBySlug = (slug) => pick().getCategoryBySlug(slug);
export const getCategoryById = (id) => pick().getCategoryById(id);
export const createCategory = (d) => pick().createCategory(d);
export const updateCategory = (id, d) => pick().updateCategory(id, d);
export const deleteCategory = (id) => pick().deleteCategory(id);

// products
export const getProducts = () => pick().getProducts();
export const getFeaturedProducts = () => pick().getFeaturedProducts();
export const getProductBySlug = (slug) => pick().getProductBySlug(slug);
export const getProductById = (id) => pick().getProductById(id);
export const getProductsByCategory = (slug) => pick().getProductsByCategory(slug);
export const createProduct = (d) => pick().createProduct(d);
export const updateProduct = (id, d) => pick().updateProduct(id, d);
export const deleteProduct = (id) => pick().deleteProduct(id);

// settings
export const getSettings = () => pick().getSettings();
export const updateSettings = (p) => pick().updateSettings(p);

// users
export const createUser = (d) => pick().createUser(d);
export const findUserByEmail = (e) => pick().findUserByEmail(e);
export const findUserById = (id) => pick().findUserById(id);
export const getUsers = () => pick().getUsers();
export const updateUserPassword = (id, hash) => pick().updateUserPassword(id, hash);

// orders
export const getOrders = () => pick().getOrders();
export const getOrderById = (id) => pick().getOrderById(id);
export const createOrder = (d) => pick().createOrder(d);
export const updateOrderStatus = (id, s) => pick().updateOrderStatus(id, s);

// convenience
export async function getCategoryName(slug) {
  const c = await getCategoryBySlug(slug);
  return c ? c.name : "Products";
}
