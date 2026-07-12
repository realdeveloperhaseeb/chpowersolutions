// Production server entry point for Hostinger (and any Node host that expects a
// startup file, e.g. Passenger). Hostinger's "Node.js app" setup runs this file.
// Locally you can still use `pnpm start` (next start); this file is for hosts that
// need a plain Node entry that listens on process.env.PORT.
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> CH Power Solutions ready on port ${port}`);
  });
});
