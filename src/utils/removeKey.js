const removeKey = (obj, key) => {
  const { [key]: removedKey, ...rest } = obj;
  return rest;
};

module.exports = removeKey;