import * as a from "zod";

export const profileSchema = a.object({
  firstName: a
    .string()
    .min(3, { message: "First Name should 3 chr at least." })
    .max(12, { message: "First Name should 12 chr maximum." }),
  lastName: a
    .string()
    .min(3, { message: "Last Name should 3 chr at least." })
    .max(12, { message: "Last Name should 12 chr maximum." }),
  username: a
    .string()
    .min(3, { message: "Username should 3 chr at least." })
    .max(12, { message: "Username should 12 chr maximum." }),
});

export const imageSchema = a.object({
  image: a
    .custom<File>(
      (value) => {
        return value instanceof File;
      },
      {
        message: "The value is not a valid file.",
      }
    )
    .refine((file) => {
      return !file || file.type.startsWith("image/");
    }, "File must be an image.")
    .refine((file) => {
      return !file || file.size <= 1024 * 1024 * 5;
    }, "File size should be less than 5 MB."),
});
