# Deploying CH Power Solutions to Hostinger (Business plan)

This app is a **Next.js (Node.js) + MySQL** application. Hostinger's Business plan
runs Node.js apps via **hPanel → Advanced → Node.js**. The steps below take you from
zero to a live site with a database and working email.

> **Note on `npm`:** on Hostinger's Linux servers `npm install` works normally. (The
> `pnpm` note in the README is only because the *local Windows dev machine* had a
> broken npm — it does not affect Hostinger.)

---

## 0. What you'll need
- Hostinger **Business** plan + a domain pointed at it.
- The GitHub repo: `https://github.com/realdeveloperhaseeb/chpowersolutions.git`
- 15–20 minutes.

---

## 1. Create the MySQL database
hPanel → **Databases → MySQL Databases**:
1. **Create a new database** (e.g. `u123_chpower`).
2. **Create a database user** and a strong password.
3. **Add the user to the database** with **All Privileges**.
4. Note these — you'll need them as env vars:
   - `DB_HOST` → usually `localhost`
   - `DB_NAME` → the full database name (e.g. `u123_chpower`)
   - `DB_USER` → the full user name (e.g. `u123_chpower`)
   - `DB_PASSWORD` → the password you set
   - `DB_PORT` → `3306`

### Load the schema
hPanel → **Databases → phpMyAdmin** → select your database → **Import** tab →
upload **`db/schema.sql`** from this repo → **Go**. This creates the tables.

(You'll seed the data in step 5, after the app is installed.)

---

## 2. Get the code onto the server
Easiest: **hPanel → Advanced → Git**:
1. **Create a new repository**.
2. Repository: `https://github.com/realdeveloperhaseeb/chpowersolutions.git`, branch `main`.
3. Install path: e.g. `domains/yourdomain.com/chpowersolutions` (note this path).
4. Click **Create** / **Deploy**. To pull future updates, use **Deploy** again.

(Alternative: download the repo as a ZIP and upload via **File Manager**, then extract.)

---

## 3. Create the Node.js application
hPanel → **Advanced → Node.js → Create application**:
- **Node.js version:** 18 or higher.
- **Application mode:** Production.
- **Application root:** the folder from step 2 (where `package.json` is).
- **Application URL:** your domain (or a subdomain).
- **Application startup file:** `server.js`

Create it. Hostinger gives you an app control panel with **Run NPM install**,
**Run JS script**, **Environment variables**, **Restart**, and a terminal.

---

## 4. Set environment variables
In the Node.js app panel, add these (**Environment variables** section). Do **not**
commit real secrets to Git — set them here only.

```
NODE_ENV=production

# MySQL (from step 1)
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123_chpower
DB_PASSWORD=your-db-password
DB_NAME=u123_chpower

# Auth — use a long random string (e.g. from https://generate-secret.now.sh/64)
JWT_SECRET=paste-a-long-random-string-here

# Email (step 6)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=no-reply@yourdomain.com
SMTP_PASSWORD=the-mailbox-password
SMTP_FROM=CH Power Solutions <no-reply@yourdomain.com>
```

> If you skip the `DB_*` vars, the site still runs but on a **temporary in-memory
> store** (data resets on restart). Set them for a real, persistent store.

---

## 5. Install, build, seed, start
In the Node.js app panel (or the terminal at the app root):

1. **Install dependencies** — click **Run NPM install** (or `npm install`).
2. **Build** — run the build once:
   - Via **Run JS script** choose `build`, **or** in the terminal: `npm run build`
   - If the build runs out of memory, prepend: `NODE_OPTIONS=--max-old-space-size=1024 npm run build`
3. **Seed the database** (fills categories, products, settings, admin user):
   ```
   npm run db:seed
   ```
   (This reads `.env`; on Hostinger the app-panel env vars are already present, so
   `node db/seed.mjs` also works.)
4. **Restart** the application from the panel.

Your site should now load at your domain. 🎉

---

## 6. Email (order & enquiry notifications)
1. hPanel → **Emails → Email Accounts** → create e.g. `no-reply@yourdomain.com`.
2. Use these SMTP settings (already in step 4):
   - Host `smtp.hostinger.com`, Port `465` (SSL), User = the full email, Password = mailbox password.
3. Notifications are delivered to the address in **Admin → Settings → notify_email**
   (default **arslanarain1514@gmail.com**). Change it there anytime.

Test: submit the contact form or place a test order — the enquiry/order email should
arrive at the notify address, and the customer gets a confirmation.

---

## 7. First login & admin
Go to `https://yourdomain.com/login`:

```
email:    arslanarain1514@gmail.com
password: 1514arslanarain
```

From **Admin** you can add products (with images + SEO meta), manage categories,
edit contact/payment details and the notify/support info, and accept/reject orders.

> **Uploaded images** are stored in `public/uploads` on the server. This folder is
> excluded from Git, so redeploys won't overwrite it — but keep a backup, and make
> sure the folder stays writable.

---

## 8. Updating the site later
1. Push changes to GitHub `main`.
2. hPanel → **Git → Deploy** (pulls the latest code).
3. In the Node.js app panel: **Run NPM install** (if deps changed) → run `build` →
   **Restart**.

---

## Troubleshooting
- **502 / app won't start:** confirm **startup file = `server.js`** and that
  `npm run build` completed (there must be a `.next` folder).
- **Database errors:** re-check the `DB_*` env vars and that the user has privileges
  on the database; confirm `db/schema.sql` was imported.
- **Emails not sending:** verify the mailbox exists and `SMTP_*` values match; check
  the app logs in the Node.js panel.
- **Styles missing:** the build step didn't run — run `npm run build` then restart.
