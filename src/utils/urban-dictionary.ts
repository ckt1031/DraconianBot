import axios from 'axios';
import { z } from 'zod';

const ChatGPTSchema = z.object({
  list: z.array(
    z.object({
      definition: z.string(),
      permalink: z.string().url(),
      thumbs_up: z.number().int(),
      author: z.string(),
      word: z.string(),
      defid: z.number().int(),
      current_vote: z.string().optional(), // assuming current_vote can be an empty string
      written_on: z.string().datetime(),
      example: z.string(),
      thumbs_down: z.number().int(),
    }),
  ),
});

export async function ud(term: string) {
  const API_BASE_PATH = 'https://api.urbandictionary.com';

  const response = await axios.get(`${API_BASE_PATH}/v0/define`, {
    params: {
      term: term,
    },
  });

  const data = ChatGPTSchema.parse(response.data);

  return data.list;
}
