import { Rule } from "@sanity/types";
export const AuthSchema = {
  name: "auth",
  title: "Auth",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "firstName",
      type: "string",
    },
    {
      name: "lastName",
      title: "lastName",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: Rule) => Rule.required().email(),
    },
    {
      name: "password",
      title: "password",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(8),
    },
    {
      name: "date",
      title: "date",
      type: "date",
    },
    {
      name: "country",
      title: "country",
      type: "string",
    },
    {
      name: "createAt",
      title: "createAt",
      type: "datetime", 
      initialValue: () => new Date().toISOString(),
    },
  ],
};
