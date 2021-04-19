// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Similar to Promise.allSettled which isn't available in all of our supported environments.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
 */
export async function settleAllTasks(tasks: Promise<any>[]): Promise<any[]> {
  const results = [];
  for (const task of tasks) {
    try {
      const result = await task;
      results.push(result);
    } catch (err) {
      results.push(err);
    }
  }
  return results;
}
