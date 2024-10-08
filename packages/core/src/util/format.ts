export const formatErrorPosition = (input: string, count?: number) => {
  const letterCount = count !== undefined ? count : 20;
  if (input.length <= letterCount) {
    return input;
  }

  return input.slice(0, letterCount) + "..";
};