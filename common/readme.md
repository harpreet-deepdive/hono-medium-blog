![Library Logo](https://images.pexels.com/photos/19400187/pexels-photo-19400187/free-photo-of-a-car-in-a-desert.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load)

# Zod Types for User Authentication and Post Management

This npm library provides TypeScript types using Zod for user authentication and post management functionalities.

## Installation

To install this library, you can use npm:

## Usage

This library exports TypeScript types using Zod for common data structures related to user authentication and post management.

### Sign Up Input

```typescript
import { signUpInput, SignUpType } from "@your-package-name/zod-types";

// Usage example
const userData: SignUpType = {
  email: "example@example.com",
  password: "password",
  name: "John Doe",
};
```

### Sign In Input

```typescript
import { signinInput, SigninType } from "@your-package-name/zod-types";

// Usage example
const signInData: SigninType = {
  email: "example@example.com",
  password: "password",
};
```

### Create Post Input

```typescript
import { createPostInput, CreatePostType } from "@your-package-name/zod-types";

// Usage example
const postData: CreatePostType = {
  title: "New Post",
  content: "This is the content of the new post.",
};
```

### Update Post Input

```typescript
import { updatePostInput, UpdatePostType } from "@your-package-name/zod-types";

// Usage example
const updatedPostData: UpdatePostType = {
  title: "Updated Post",
  content: "This is the updated content of the post.",
};
```
