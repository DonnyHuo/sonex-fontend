export const displayAddress = (str: string, index: number = 4) => {
  return `${str.substring(0, 4)}...${str.substring(
    str.length - index,
    str.length
  )}`;
};
