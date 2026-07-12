// In-memory data adapter. Used when no MySQL is configured (DB_HOST unset).
// State lives on globalThis so it survives Next.js dev hot-reloads and is shared
// across requests in the same server process. NOT persistent across restarts.
import bcrypt from "bcryptjs";
import { seedCategories, seedProducts, seedSettings, seedAdmin } from "./seed-data";

function init() {
  const store = {
    categories: seedCategories.map((c) => ({ ...c })),
    products: seedProducts.map((p) => ({ ...p, specs: { ...p.specs }, images: [...p.images] })),
    settings: { ...seedSettings },
    users: [
      {
        id: 1,
        name: seedAdmin.name,
        email: seedAdmin.email.toLowerCase(),
        passwordHash: bcrypt.hashSync(seedAdmin.password, 10),
        role: seedAdmin.role,
        createdAt: new Date().toISOString(),
      },
    ],
    orders: [],
    seq: { category: 100, product: 100, user: 100, order: 100 },
  };
  return store;
}

function db() {
  if (!globalThis.__chps_mem) globalThis.__chps_mem = init();
  return globalThis.__chps_mem;
}

const clone = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));
const nextId = (kind) => (db().seq[kind] += 1);

// attach categorySlug to a product for convenience
function withCategory(p) {
  const cat = db().categories.find((c) => c.id === p.categoryId);
  return { ...clone(p), categorySlug: cat ? cat.slug : p.categorySlug || null };
}

export const adapter = {
  name: "memory",

  // ---- categories ----
  async getCategories() {
    return db().categories.map(clone);
  },
  async getCategoryBySlug(slug) {
    return clone(db().categories.find((c) => c.slug === slug)) || null;
  },
  async getCategoryById(id) {
    return clone(db().categories.find((c) => c.id === Number(id))) || null;
  },
  async createCategory(data) {
    const cat = { id: nextId("category"), ...data };
    db().categories.push(cat);
    return clone(cat);
  },
  async updateCategory(id, data) {
    const c = db().categories.find((x) => x.id === Number(id));
    if (!c) return null;
    Object.assign(c, data);
    return clone(c);
  },
  async deleteCategory(id) {
    const d = db();
    d.categories = d.categories.filter((c) => c.id !== Number(id));
    return true;
  },

  // ---- products ----
  async getProducts() {
    return db().products.map(withCategory);
  },
  async getFeaturedProducts() {
    return db().products.filter((p) => p.featured).map(withCategory);
  },
  async getProductBySlug(slug) {
    const p = db().products.find((x) => x.slug === slug);
    return p ? withCategory(p) : null;
  },
  async getProductById(id) {
    const p = db().products.find((x) => x.id === Number(id));
    return p ? withCategory(p) : null;
  },
  async getProductsByCategory(slug) {
    return db().products.filter((p) => withCategory(p).categorySlug === slug).map(withCategory);
  },
  async createProduct(data) {
    const p = { id: nextId("product"), ...data };
    db().products.push(p);
    return withCategory(p);
  },
  async updateProduct(id, data) {
    const p = db().products.find((x) => x.id === Number(id));
    if (!p) return null;
    Object.assign(p, data);
    return withCategory(p);
  },
  async deleteProduct(id) {
    const d = db();
    d.products = d.products.filter((p) => p.id !== Number(id));
    return true;
  },

  // ---- settings ----
  async getSettings() {
    return { ...db().settings };
  },
  async updateSettings(partial) {
    Object.assign(db().settings, partial);
    return { ...db().settings };
  },

  // ---- users ----
  async createUser({ name, email, passwordHash, role = "user" }) {
    const user = {
      id: nextId("user"),
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      createdAt: new Date().toISOString(),
    };
    db().users.push(user);
    return clone(user);
  },
  async findUserByEmail(email) {
    return clone(db().users.find((u) => u.email === String(email).toLowerCase())) || null;
  },
  async findUserById(id) {
    return clone(db().users.find((u) => u.id === Number(id))) || null;
  },
  async getUsers() {
    return db().users.map(clone);
  },
  async updateUserPassword(id, passwordHash) {
    const u = db().users.find((x) => x.id === Number(id));
    if (!u) return null;
    u.passwordHash = passwordHash;
    return clone(u);
  },

  // ---- orders (fleshed out in Phase 3) ----
  async getOrders() {
    return db().orders.map(clone);
  },
  async getOrderById(id) {
    return clone(db().orders.find((o) => o.id === Number(id))) || null;
  },
  async createOrder(data) {
    const order = { id: nextId("order"), status: "pending", createdAt: new Date().toISOString(), ...data };
    db().orders.push(order);
    return clone(order);
  },
  async updateOrderStatus(id, status) {
    const o = db().orders.find((x) => x.id === Number(id));
    if (!o) return null;
    o.status = status;
    return clone(o);
  },
};
