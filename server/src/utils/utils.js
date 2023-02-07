export function filterArrayOfObjects(array, condition) {
  return array.filter(function (obj) {
    return Object.entries(condition).every(([key, value]) => obj[key] === value)
  })
}

export function deepMerge(original, updates) {
  // Check if the object is a plain object (not an array or null)
  const isObject = (obj) =>
    obj && typeof obj === "object" && !Array.isArray(obj)

  // If either original or updates is not an object, return updates
  if (!isObject(original) || !isObject(updates)) {
    return updates
  }

  // Create a new object that is a shallow copy of original
  // const merged = { ...original }
  const merged = Object.assign({}, original)

  // Loop through the keys in the updates object
  Object.keys(updates).forEach((key) => {
    // Skip properties with undefined value in updates object
    if (updates[key] === undefined) {
      return
    }

    // If both original[key] and updates[key] are objects, do a deep merge
    if (isObject(original[key]) && isObject(updates[key])) {
      merged[key] = deepMerge(original[key], updates[key])
    } else {
      // Otherwise, simply set merged[key] to updates[key]
      merged[key] = updates[key]
    }
  })
  // Return the merged object
  return merged
}
