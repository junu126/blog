import { format } from "date-fns/format";
import { ko } from "date-fns/locale/ko";

export function formatDate(date: string | Date | number, formatString: string) {
  return format(date, formatString, { locale: ko });
}
