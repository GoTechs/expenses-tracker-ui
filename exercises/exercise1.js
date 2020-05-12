//@ts-check

/**
 * An item
 * @typedef item
 * @type {Object}
 * @property {string} name - item name
 * @property {number} value - item value
 */

/**
 * calculate the sum of the `value` fields for items where `name` matches `targetName`
 * @param {Array.<item>} items -items objects
 * @param {string} targetName
 * @returns {number} -sum of the matches values
 */

const sumAllElementsByName = (items, targetName) =>
  items.reduce(
    (accumulator, currentItem) =>
      currentItem.name === targetName
        ? (accumulator += currentItem.value)
        : accumulator,
    0
  );
