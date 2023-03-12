import z from "zod";

export const formSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a text",
    })
    .min(1, { message: "Name is required" }),

  surname: z
    .string({ invalid_type_error: "Surname must be a text" })
    .min(1, { message: "Surname is required" }),

  age: z.number({ invalid_type_error: "Age is requierd" }),

  isMarried: z.boolean({
    description: "Are you married?",
  }),

  birthDate: z.date({
    invalid_type_error: "Birth date must be a date",
    description: "Birth date",
  }),

  pets: z.array(z.string(), { description: "Pets" }),

  favoriteNumbers: z
    .array(z.number(), { description: "Favorite numbers" })
    .min(1, { message: "You must have at least one favorite number" }),
});

export type Schema = z.infer<typeof formSchema>;
