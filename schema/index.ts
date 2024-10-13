import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const titleFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const descriptionFormSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const imageFormSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const categoryFormSchema = z.object({
  categoryId: z.string().min(1),
})

export const priceFormSchema = z.object({
  price: z.coerce.number(),
})

export const attachmentFormSchema = z.object({
  url: z.string().min(1, {
    message: "Url is required",
  }),
});
