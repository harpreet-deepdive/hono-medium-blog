import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import { FileSystemModule } from "hono/ssg";
import {
  createPostInput,
  updatePostInput,
} from "@harpreetsinghsandhu/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorizationHeader = c.req.header().authorization;

    let token: string =
      authorizationHeader && authorizationHeader.split(" ")[1];

    if (!token) {
      const errorResponse = new Response(
        "You are not logged In.Please log in to get access",
        {
          status: 401,
        }
      );
      throw new HTTPException(401, { res: errorResponse });
    }

    const decodedPayload = await verify(token, c.env.SECRET);

    const user = await prisma.user.findFirst({
      where: {
        id: decodedPayload,
      },
    });

    if (!user) {
      const errorResponse = new Response(
        "The user belonging to this token does no longer exist.",
        {
          status: 401,
        }
      );

      throw new HTTPException(401, { res: errorResponse });
    }

    c.set("userId", user.id);

    await next();
  } catch (err: any) {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    if (
      err.name === "JwtTokenSignatureMismatched" ||
      err.name === "JwtTokenInvalid"
    ) {
      return c.json({
        status: "error",
        message: "Invalid Token",
      });
    }

    return c.json({
      status: "error",
      message: err,
    });
  }
});

blogRouter.post("/comment", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const comment = await prisma.comment.create({
      data: {
        userId,
        postId: body.postId,
        text: body.text,
      },
      select: {
        id: true,
        createdAt: true,
        downVotes: true,
        upVotes: true,
        text: true,
        childComments: {
          select: {
            text: true,
            postedBy: {
              select: {
                name: true,
              },
            },
          },
        },
        postedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      comment,
    });
  } catch (err: any) {
    console.log(err);

    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    if (err.code === "P2002") {
      c.status(403);
      return c.json("One User can have only one comment on one post.");
    }

    return c.json(err);
  }
});

blogRouter.post("comment/:commentId/reply", async (c) => {
  const userId = c.get("userId");
  const parentCommentId = c.req.param("commentId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const comment = await prisma.comment.create({
      data: {
        userId,
        postId: body.postId,
        text: body.text,
        parentCommentId: parentCommentId,
      },
    });

    await prisma.comment.update({
      where: {
        id: parentCommentId,
      },
      data: {
        childComments: {
          connect: { id: comment.id },
        },
      },
    });

    return c.json({
      comment,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    return c.json(err);
  }
});

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();

    const { success } = createPostInput.safeParse(body);

    if (!success) {
      c.status(400);
      return c.json({ error: "Invalid Input,Please try again." });
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        fullCnt: body.fullCnt,
        authorId: userId,
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (err) {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    return c.json(err);
  }
});

blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      posts,
    });
  } catch (err) {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    return c.json(err);
  }
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const { success } = updatePostInput.safeParse(body);

    if (!success) {
      c.status(400);
      return c.json({ error: "Invalid Input,Please try again." });
    }

    const updatedBlog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        fullCnt: body.fullCnt,
      },
    });

    return c.json({
      status: "success",
      updatedData: updatedBlog,
    });
  } catch (error) {
    console.log(error);

    return c.json({
      status: "error",
      error: error,
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      content: true,
      title: true,
      fullCnt: true,
      comments: {
        where: { parentCommentId: null },
        select: {
          id: true,
          createdAt: true,
          downVotes: true,
          upVotes: true,
          text: true,
          childComments: {
            select: {
              text: true,
              postedBy: {
                select: {
                  name: true,
                },
              },
            },
          },
          postedBy: {
            select: {
              name: true,
            },
          },
        },
      },
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(post);
});
