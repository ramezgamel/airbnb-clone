import * as a from "zod";
export default function validateData<T>(schema: a.ZodSchema<T>, data: any): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    let error = result.error.errors[0];
    if (process.env.NODE_ENV !== "production") {
      console.log(result.error);
    }
    throw new Error(error.message);
  }
  return result.data;
}
