export const getEntryWithMaxValueFromObject = (object) => {
  const result = { key: '', value: 0 };

  Object.entries(object).forEach(([key, value]) => {
    if (value > result.value) {
      result.key = key;
      result.value = value;
    }
  });

  return result;
};
