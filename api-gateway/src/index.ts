import express from "express";
import { json } from "body-parser";
import {
  authProxyMiddleware,
  ecomProxyMiddleware,
  homeProxyMiddleware,
} from "./api/middlewares/proxies";

const app = express();

// redirecting to other servers
app.use(authProxyMiddleware);
app.use(homeProxyMiddleware);
app.use(ecomProxyMiddleware);

app.use(json());

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});
