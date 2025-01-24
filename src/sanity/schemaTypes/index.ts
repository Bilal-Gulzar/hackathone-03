import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './product'
import { AuthSchema } from './auth'
import { orderSchema } from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,AuthSchema,orderSchema],
}
