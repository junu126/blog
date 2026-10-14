import { format } from "date-fns/format";
import { ko } from "date-fns/locale/ko";

export function formatDate(date: string | Date | number, formatString: string) {
  return format(date, formatString, { locale: ko });
}

// Frontmatter dates have day precision; retain their calendar day in every timezone.
export function postDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function postDateTime(date: Date) {
  return `${postDate(date)}T00:00:00+09:00`;
}
