export function numberFormatter(val: number) {
  return new Intl.NumberFormat("ru-RU", {}).format(val).replace(",", ".");
}

export const readFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

export function checkImageFileType(target: string, pattern: string[]) {
  let value = 0;
  pattern.forEach(function (word) {
    value = value + +target.includes(word);
  });
  return value === 1;
}
