import { z } from "zod";
import { formSchema } from "../formSchema";

export const useFields = () => {
  const formatTypeOfField = (field: any) => {
    switch (field.typeName) {
      case "ZodString":
        return "text";
      case "ZodNumber":
        return "number";
      case "ZodDate":
        return "date";
      case "ZodBoolean":
        return "checkbox";
      case "ZodArray":
        const innerType = formatTypeOfField(field.type._def) as string;
        return innerType;
      case "ZodOptional":
        const innerTypeOptional = formatTypeOfField(
          field.innerType._def
        ) as string;
        return innerTypeOptional;
      default:
        return "text";
    }
  };

  const fields = Object.entries(formSchema.shape).map(
    ([fieldName, fieldSchema]) => {
      const field = {
        name: fieldName,
        label: fieldSchema._def.description,
        type: formatTypeOfField(fieldSchema._def),
        isArray: fieldSchema._def.typeName === "ZodArray",
        isRequired:
          (!fieldSchema.isOptional() &&
            fieldSchema._def.typeName !== "ZodArray") ||
          (fieldSchema._def.typeName === "ZodArray" &&
            fieldSchema._def.minLength !== null),
      };
      return field;
    }
  );

  const generateDefaultValues = () => {
    const defaultValues = new Map();
    fields.forEach((field) => {
      if (field.isArray) {
        defaultValues.set(field.name, []);
      } else if (field.type === "checkbox") {
        defaultValues.set(field.name, false);
      } else if (field.type === "number") {
        defaultValues.set(field.name, undefined);
      } else if (field.type === "date") {
        defaultValues.set(field.name, undefined);
      } else {
        defaultValues.set(field.name, undefined);
      }
    });
    return Object.fromEntries(defaultValues);
  };

  return {
    fields,
    defaultValues: generateDefaultValues(),
    formSchema,
  };
};
