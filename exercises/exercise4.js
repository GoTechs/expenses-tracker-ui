// This function will have a side effect and return its input
/**
 * makeRequest module.
 * @module makeRequest
 */
const makeRequest = require("some-request-library");
/**
 * Class representing A.
 * @class
 */
class A {
  /**
   * @constructor
   * @param {string} someField
   */
  constructor(someField) {
    /**
     * @property {string} _someField
     *
     */
    this._someField = someField;
    /**
     * @property {string} _separator a separator to concatenate name fields
     */
    this._separator = " ";
  }
  /**
   * an array of input values
   * @param {Array<string>} values
   */

  /**
   * a function to concatenate all the fields by " "
   * @property {Function} concatNameFields
   * @returns  {string} -it return a string of fields concatenated by " "
   */

  concatNameFields(values) {
    // the Rest operator is useless, because it will wrap the argument in an array.
    return [...values].join(this._separator);
  }
  /**
   * An item
   * @typedef inputItem
   * @type {Object}
   * @property {string} name - item name
   */

  /**
   * a list of item
   * @async
   * @param {Array.<inputItem>} items
   * @return {Promise<string>} The result of the makeRequest call.
   *
   */

  async save(items) {
    const values = items.map(({ name }) => name); // We should add the () for using the destruction
    const finalValue = this.concatNameFields(values);
    const result = await makeRequest(finalValue);
    return `THE RESULT IS: ${result}`;
  }
}
/**
 * Class representing B.
 * @class
 * @extends A
 */

class B extends A {
  /**
   * @constructor
   * @param {string} someField
   */
  constructor(someField) {
    super(someField);
    this._separator = "-";
  }

  /**
   * an array of input values
   * @param {Array<string>} values
   */

  /**
   * a function to concatenate all the fields by "-"
   * @property {Function} concatNameFields
   * @returns  {Array<string>} -it returns a an array of string fields concatenated by "-"
   */

  concatNameFields(values) {
    return `[${super.concatNameFields(values)}]`;
  }
}

async function testQuestion4() {
  const testInput = [
    { name: "this" },
    { name: "test" },
    { name: "is" },
    { name: "fun" },
  ];

  const a = new A("base A");
  const b = new B("base B");

  const aResult = await a.save(testInput);
  const bResult = await b.save(testInput);
  const aIsOK = aResult === "THE RESULT IS: this test is fun";
  const bIsOK = bResult === "THE RESULT IS: [this-test-is-fun]";

  return aIsOK && bIsOK;
}
