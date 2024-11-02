export const removeDuplicates = (arr: string[] | undefined) => {
  if (!arr) return [];

  return arr.filter((value, index) => arr.indexOf(value) === index);
};
