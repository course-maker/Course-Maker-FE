export const formatPhoneNumber = (value: string) => {
  value = value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  const parts = [];
  if (value.length > 3) {
    parts.push(value.substring(0, 3));
    if (value.length > 7) {
      parts.push(value.substring(3, 7));
      parts.push(value.substring(7));
    } else {
      parts.push(value.substring(3));
    }
  } else {
    parts.push(value);
  }

  return parts.join("-");
};
