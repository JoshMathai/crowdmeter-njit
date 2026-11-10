import { defineConfig } from "vite";
import { serveParking } from "./scripts/parking.mjs";
// Keep the same read-only parking adapter in development and production.
const parkingPlugin = {
  name: "njit-parking-feed",
  configureServer(server) {
    addParkingRoute(server);
  },
  configurePreviewServer(server) {
    addParkingRoute(server);
  },
};
function addParkingRoute(server) {
  server.middlewares.use((req, res, next) => {
    if (req.url?.split("?")[0] !== "/api/parking") return next();
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end();
      return;
    }
    return serveParking(req, res);
  });
}
export default defineConfig({ plugins: [parkingPlugin] });
