export const mapComponents = (components) => {
  let result = {};
  if (components.length > 0) {
    result = components.reduce((acc, curr) => {
      const name = curr.location.substr(0, 2);
      if (!acc || !acc[name]) {
        acc = { ...acc, [name]: { [curr.location]: curr } };
      } else {
        acc = { ...acc, [name]: { ...acc[name], [curr.location]: curr } };
      }
      return acc;
    }, {});
  }
  return result;
};

export const removeLocations = (locations, o) => {
  // for shalow copy of the object
  // let result = Object.assign({}, o);
  const result = JSON.parse(JSON.stringify(o));
  locations.forEach((location) => {
    const name = location.substr(0, 2);
    if (result[name]) {
      delete result[name][location];
    }
  });
  return result;
};
