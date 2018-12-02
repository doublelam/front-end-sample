import * as assert from "assert";
import { Tool } from "./src/script/ts/utils/Tool";

const test = config => {
  const spaces = Object.keys(config);
  for (const spaceName of spaces) {
    describe(spaceName, () => {
      const methods = Object.keys(config[spaceName]);
      for (const methodName of methods) {
        describe(methodName, () => {
          for (const method of config[spaceName][methodName]) {
            it(`Method: ${methodName}, expect: ${method.expected}, params are ${method.params}`, function () {
              assert.deepEqual(method.expected, method.method(...method.params));
            });
          }
        });
      }
    });
  }
};

const testConfig = {
  tool: {
    getListFromChars: [
      {
        expected: ["11", "22", "33", "44", "55", "66", "77", "88", "", "99", "10"],
        method: Tool.getListFromChars,
        params: ["11,22,33, 44 , 55 ,66   ,77   , 88 , , 99, 10"],
      },
    ],
  },
};

test(testConfig);
