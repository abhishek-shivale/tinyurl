import {z} from 'zod'

export const urlFormSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  customSlug: z.string().optional(),
  password: z.string().optional(),
  expireAt: z.date().optional()
})

export type UrlFormData = z.infer<typeof urlFormSchema>

export const generateSlug = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';
  for (let i = 0; i < 6; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug
}

export const getRelativeDate = (date: Date) => {
  const now = new Date();
  const timeDiff = now.getTime() - new Date(date).getTime();
  const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (daysAgo === 1) return '1 day ago';
  if (daysAgo === 2) return '2 days ago';
  if (daysAgo < 1) return 'Today';
  return `${daysAgo} days ago`;
};

