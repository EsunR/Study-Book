export const getThemeColor = (colorText: string): string => {
  return "";
};

export const judgedIsDeepColor = (color: string): boolean => {
  if (["#E3EBF5"].includes(color)) {
    return false;
  } else {
    return true;
  }
};
