import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";

import { userRouter } from "./routes/userRoutes";
import { blogRouter } from "./routes/blogRoutes";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();

app.use("/*", cors());

app.post("/api/v1/images/upload", async (c) => {
  const body = await c.req.parseBody();
  const { file } = body;

  try {
    const formData = new FormData();
    formData.append("source", file as File);

    const sendRequest = await fetch(
      `https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&action=upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const res: {
      image: { url: string };
    } = await sendRequest.json();

    const { url } = res.image;

    return c.json({
      url,
    });
  } catch (err) {
    return c.json({
      err,
    });
  }
});
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
