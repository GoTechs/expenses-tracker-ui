/**
 * calculate the average of the `value` fields for items where `name` matches `targetName`
 * @param {Array.<item>} items -items objects
 * @param {string} targetName
 * @returns {number} -the average of the matches values
 */
const getAverageElementsByName = (items, targetName) => {
  const sum = items.reduce(
    (accumulator, currentItem) =>
      currentItem.name === targetName
        ? (accumulator += currentItem.value)
        : accumulator,
    0
  );
  const matches = items.filter((item) => item.name === targetName).length;
  const average = sum / matches;
  return Number(average.toFixed(2));
};
