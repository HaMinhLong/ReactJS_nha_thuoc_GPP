export const handleConvertObjectToArray = (object: any) => {
  const arr = Object.entries(object || {});
  return arr?.map((item) => {
    return {
      key: item[0],
      value: item[1],
    };
  });
};
