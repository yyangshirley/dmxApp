export function rgbStringToObject(rgbString) {
  // Extract numbers from the rgb string
  const matches = rgbString.match(/\d+/g);

  // If the extraction was successful, convert to the desired object format
  if (matches && matches.length === 3) {
    return {
      r: parseInt(matches[0], 10),
      g: parseInt(matches[1], 10),
      b: parseInt(matches[2], 10),
      w:
        parseInt(matches[0], 10) == 255 &&
        parseInt(matches[1], 10) == 255 &&
        parseInt(matches[2], 10) == 255
          ? 255
          : 0,
    };
  } else {
    // Return null or any default value if the string doesn't match the expected format
    return null;
  }
}

export function rgbObjectToString(rgbObj) {
  if ("r" in rgbObj && "g" in rgbObj && "b" in rgbObj) {
    return `rgb(${rgbObj.r},${rgbObj.g},${rgbObj.b})`;
  } else {
    return null; // Or any default value if the object doesn't match the expected format
  }
}
