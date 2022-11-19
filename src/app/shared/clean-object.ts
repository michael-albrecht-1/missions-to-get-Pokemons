export const cleanObject = (obj: any) => {
  for (var propName in obj) {
    const condition =
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === '' ||
      obj[propName].length === 0;

    if (condition) {
      delete obj[propName];
    }
  }

  return obj;
};
