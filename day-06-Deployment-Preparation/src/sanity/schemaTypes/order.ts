export const orderSchema = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "customerName",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "shippingAddress",
      title: "Shipping Address",
      type: "string",
    },
    {
      name: "phone",
      title: "phone",
      type: "string",
    },
    {
      name: "paid",
      title: "paid",
      type: "boolean",
    },
    {
      name: "postalCode",
      title: " postalCode",
      type: "string",
    },
    {
      name: "orderItems",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "Name",
              title: "ProductName",
              type: "string",
            },
            {
              name: "description",
              title: "description",
              type: "string",
            },
            {
              name: "id",
              title: "id",
              type: "string",
            },
            {
              name: "color",
              title: "color",
              type: "string",
            },
            {
              name: "image",
              title: "Image",
              type: "image", // Using Sanity's image type for image field
              options: {
                hotspot: true,
              },
            },
            {
              name: "category",
              title: "category",
              type: "string",
            },
            {
              name: "quantity",
              title: "Quantit",
              type: "number",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
    },
    {
      name: "city",
      title: "city",
      type: "string",
    },
    {
      name: "country",
      title: "country",
      type: "string",
    },
  ],
};