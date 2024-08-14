function deleteEmptyValue(object) {
  for (const key in object) {
    if ([null, undefined, ''].includes(object[key])) delete object[key];
  }
  return object;
}


module.exports = deleteEmptyValue;
