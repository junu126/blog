interface Params<T> {
  fields: Array<T>;
  fieldName?: keyof T;
  delimiter?: string;
}

const DEFAULT_DELIMITER = ", ";

export function joinTruthyValues<T>({
  fields,
  fieldName,
  delimiter = DEFAULT_DELIMITER,
}: Params<T>): string {
  return fields
    .map((field) => (fieldName !== undefined ? field[fieldName] : field))
    .filter(Boolean)
    .join(delimiter);
}
