function toHAL(resource, host) {

  console.log(resource)

  const transformObject = (obj) => {
    const halObj = Array.isArray(obj) ? [] : {};

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        halObj[key] = value.map(item => transformObject(item));
      } else if (value && typeof value === 'object' && value.constructor.name === 'Object') {
        halObj[key] = transformObject(value);
      } else {
        halObj[key] = value;
      }

      if(key.toLocaleLowerCase().includes("id") && !Array.isArray(obj)){
        halObj._links = {
          ...halObj._links,
          self: {
            href: `${host}/${key.toLocaleLowerCase().replace("id","")}/${value}`
          }
        };
      }
    }

    return halObj;
  };
  return transformObject(resource);
}

module.exports = toHAL