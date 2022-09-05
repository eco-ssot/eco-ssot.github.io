export const mapObject = (object, mapper) => {
  const ret = {};
  const isObject = (value) => typeof value === 'object' && value !== null;
  const mapArray = (array) => array.map((element) => (isObject(element) ? mapObject(element, mapper) : element));
  if (Array.isArray(object)) {
    return mapArray(object);
  }

  for (const [key, value] of Object.entries(object)) {
    const mapResult = mapper(key, value, object);
    let [newKey, newValue] = mapResult;
    if (isObject(newValue)) {
      newValue = Array.isArray(newValue) ? mapArray(newValue) : mapObject(newValue, mapper);
    }

    ret[newKey] = newValue;
  }

  return ret;
};
