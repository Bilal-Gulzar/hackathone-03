import { createClient } from 'next-sanity'

import {token,apiVersion, dataset, projectId} from '../env'

export const client = createClient({
 projectId,
  dataset,
  apiVersion,
  token,
  ignoreBrowserTokenWarning: true,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
