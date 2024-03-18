import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { signUpInput, signinInput } from "@harpreetsinghsandhu/common-app";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

async function signToken(payload: any, c: any) {
  const token = await sign(payload.id, c.env.SECRET);

  return c.json({
    status: "success",
    token,
  });
}

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signUpInput.safeParse(body);

  if (!success) {
    c.status(400);

    return c.json({ error: "Invalid Input,Please try again." });
  }

  try {
    const { name, email, password } = body;

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return signToken(newUser, c);
  } catch (err: any) {
    console.error(err);
    return c.text(err.message);
  }
});

userRouter.post("/signin", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const { email, password } = body;

    const { success } = signinInput.safeParse(body);

    if (!success) {
      c.status(400);

      return c.json({ error: "Invalid Input,Please try again." });
    }

    if (!email || !password) {
      const errorResponse = new Response(
        "Please Provide us with your email and password",
        {
          status: 400,
        }
      );
      throw new HTTPException(400, { res: errorResponse });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      const errorResponse = new Response(
        "No user found with that ID. Kindly Sign up.",
        {
          status: 400,
        }
      );
      throw new HTTPException(400, { res: errorResponse });
    }

    return signToken(user, c);
  } catch (err: any) {
    console.log(err);

    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    return c.json(err);
  }
});
