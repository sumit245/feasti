export const avatarify = (str) => {
  return str.match(/\b(\w)/g).join("");
};
