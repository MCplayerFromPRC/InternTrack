import { readFile } from "fs/promises";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US",
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

type NonNullProperty<T> = T extends null | undefined ? never : T;

type NonNullProperties<T> = {
  [P in keyof T]: NonNullProperty<T[P]>;
};

export function removeNullProperties<T extends object>(
  obj: T,
): Partial<NonNullProperties<T>> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const typedKey = key as keyof T;
      const value = obj[typedKey];
      if (value !== null) {
        // To maintain type safety, assign only if not null
        acc[typedKey] = value as NonNullProperty<T[typeof typedKey]>;
      }
      return acc;
    },
    {} as Partial<NonNullProperties<T>>,
  );
}

export function isTypeOf<T>(
  obj: any,
  constructor: { new (...args: any[]): T },
): obj is T {
  const requiredKeys = Object.getOwnPropertyNames(new constructor());
  const objKeys = Array.from(Object.keys(obj));
  return objKeys.every((key) => requiredKeys.some((attr) => attr === key));
}

export async function readContentAsync(absolutePath: string): Promise<string> {
  try {
    return readFile(absolutePath, "utf8");
  } catch (error) {
    console.error("读取文件出错:", error);
    throw error;
  }
}

export function validateEnum<T extends string>(
  value: any,
  enumObject: Record<string, T>,
): T {
  if (Object.values(enumObject).includes(value as T)) {
    return value as T;
  } else {
    return enumObject.default;
  }
}

export function splitObject<T>(
  obj: Required<T>,
): [Partial<T>, Omit<T, keyof T>] {
  const included = obj as Pick<T, keyof T>;
  const excluded = obj as Omit<T, keyof T>;
  return [included as T, excluded];
}
