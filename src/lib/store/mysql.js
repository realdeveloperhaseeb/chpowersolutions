// MySQL data adapter. Same interface as the memory adapter.
import { q } from "@/lib/db";

const parseJSON = (v, fallback) => {
  if (v == null) return fallback;
  if (typeof v === "object") return v; // mysql2 auto-parses JSON columns
  try {
    return JSON.parse(v);
  } catch {
    return fallback;
  }
};

function mapCategory(r) {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    tagline: r.tagline,
    description: r.description,
    metaTitle: r.meta_title,
    metaDesc: r.meta_desc,
    image: r.image,
  };
}

function mapProduct(r) {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    categoryId: r.category_id,
    categorySlug: r.category_slug || null,
    price: Number(r.price),
    oldPrice: r.old_price == null ? null : Number(r.old_price),
    stock: r.stock,
    featured: Boolean(r.featured),
    shortDesc: r.short_desc,
    description: r.description,
    specs: parseJSON(r.specs, {}),
    metaTitle: r.meta_title,
    metaDesc: r.meta_desc,
    images: parseJSON(r.images, []),
  };
}

const PRODUCT_SELECT = `
  SELECT p.*, c.slug AS category_slug
  FROM products p LEFT JOIN categories c ON c.id = p.category_id`;

export const adapter = {
  name: "mysql",

  // ---- categories ----
  async getCategories() {
    return (await q("SELECT * FROM categories ORDER BY id")).map(mapCategory);
  },
  async getCategoryBySlug(slug) {
    const r = await q("SELECT * FROM categories WHERE slug = ? LIMIT 1", [slug]);
    return r[0] ? mapCategory(r[0]) : null;
  },
  async getCategoryById(id) {
    const r = await q("SELECT * FROM categories WHERE id = ? LIMIT 1", [id]);
    return r[0] ? mapCategory(r[0]) : null;
  },
  async createCategory(d) {
    const r = await q(
      `INSERT INTO categories (name, slug, tagline, description, meta_title, meta_desc, image)
       VALUES (?,?,?,?,?,?,?)`,
      [d.name, d.slug, d.tagline || null, d.description || null, d.metaTitle || null, d.metaDesc || null, d.image || null]
    );
    return this.getCategoryById(r.insertId);
  },
  async updateCategory(id, d) {
    await q(
      `UPDATE categories SET name=?, slug=?, tagline=?, description=?, meta_title=?, meta_desc=?, image=? WHERE id=?`,
      [d.name, d.slug, d.tagline || null, d.description || null, d.metaTitle || null, d.metaDesc || null, d.image || null, id]
    );
    return this.getCategoryById(id);
  },
  async deleteCategory(id) {
    await q("DELETE FROM categories WHERE id = ?", [id]);
    return true;
  },

  // ---- products ----
  async getProducts() {
    return (await q(`${PRODUCT_SELECT} ORDER BY p.id DESC`)).map(mapProduct);
  },
  async getFeaturedProducts() {
    return (await q(`${PRODUCT_SELECT} WHERE p.featured = 1 ORDER BY p.id DESC`)).map(mapProduct);
  },
  async getProductBySlug(slug) {
    const r = await q(`${PRODUCT_SELECT} WHERE p.slug = ? LIMIT 1`, [slug]);
    return r[0] ? mapProduct(r[0]) : null;
  },
  async getProductById(id) {
    const r = await q(`${PRODUCT_SELECT} WHERE p.id = ? LIMIT 1`, [id]);
    return r[0] ? mapProduct(r[0]) : null;
  },
  async getProductsByCategory(slug) {
    return (await q(`${PRODUCT_SELECT} WHERE c.slug = ? ORDER BY p.id DESC`, [slug])).map(mapProduct);
  },
  async createProduct(d) {
    const r = await q(
      `INSERT INTO products
        (name, slug, category_id, price, old_price, stock, featured, short_desc, description, specs, meta_title, meta_desc, images)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [d.name, d.slug, d.categoryId, d.price, d.oldPrice ?? null, d.stock ?? 0, d.featured ? 1 : 0,
       d.shortDesc || null, d.description || null, JSON.stringify(d.specs || {}), d.metaTitle || null,
       d.metaDesc || null, JSON.stringify(d.images || [])]
    );
    return this.getProductById(r.insertId);
  },
  async updateProduct(id, d) {
    await q(
      `UPDATE products SET name=?, slug=?, category_id=?, price=?, old_price=?, stock=?, featured=?,
        short_desc=?, description=?, specs=?, meta_title=?, meta_desc=?, images=? WHERE id=?`,
      [d.name, d.slug, d.categoryId, d.price, d.oldPrice ?? null, d.stock ?? 0, d.featured ? 1 : 0,
       d.shortDesc || null, d.description || null, JSON.stringify(d.specs || {}), d.metaTitle || null,
       d.metaDesc || null, JSON.stringify(d.images || []), id]
    );
    return this.getProductById(id);
  },
  async deleteProduct(id) {
    await q("DELETE FROM products WHERE id = ?", [id]);
    return true;
  },

  // ---- settings (key/value table) ----
  async getSettings() {
    const rows = await q("SELECT `key`, `value` FROM settings");
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  },
  async updateSettings(partial) {
    for (const [key, value] of Object.entries(partial)) {
      await q(
        "INSERT INTO settings (`key`,`value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)",
        [key, String(value)]
      );
    }
    return this.getSettings();
  },

  // ---- users ----
  async createUser({ name, email, passwordHash, role = "user" }) {
    const r = await q(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)",
      [name, email.toLowerCase(), passwordHash, role]
    );
    return this.findUserById(r.insertId);
  },
  async findUserByEmail(email) {
    const r = await q("SELECT * FROM users WHERE email = ? LIMIT 1", [String(email).toLowerCase()]);
    return r[0] ? mapUser(r[0]) : null;
  },
  async findUserById(id) {
    const r = await q("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
    return r[0] ? mapUser(r[0]) : null;
  },

  // ---- orders ----
  async getOrders() {
    return (await q("SELECT * FROM orders ORDER BY id DESC")).map(mapOrder);
  },
  async getOrderById(id) {
    const r = await q("SELECT * FROM orders WHERE id = ? LIMIT 1", [id]);
    return r[0] ? mapOrder(r[0]) : null;
  },
  async createOrder(d) {
    const r = await q(
      `INSERT INTO orders (user_id, customer_name, customer_phone, customer_email, address, payment_method, payment_screenshot, items, total, status)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [d.userId ?? null, d.customerName, d.customerPhone, d.customerEmail, d.address, d.paymentMethod,
       d.paymentScreenshot || null, JSON.stringify(d.items || []), d.total, d.status || "pending"]
    );
    return this.getOrderById(r.insertId);
  },
  async updateOrderStatus(id, status) {
    await q("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
    return this.getOrderById(id);
  },
};

function mapUser(r) {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    passwordHash: r.password_hash,
    role: r.role,
    createdAt: r.created_at,
  };
}

function mapOrder(r) {
  return {
    id: r.id,
    userId: r.user_id,
    customerName: r.customer_name,
    customerPhone: r.customer_phone,
    customerEmail: r.customer_email,
    address: r.address,
    paymentMethod: r.payment_method,
    paymentScreenshot: r.payment_screenshot,
    items: typeof r.items === "object" ? r.items : JSON.parse(r.items || "[]"),
    total: Number(r.total),
    status: r.status,
    createdAt: r.created_at,
  };
}
