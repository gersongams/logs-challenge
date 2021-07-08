"use strict";

// Print all entries, across all of the sources, in chronological order.
const {Heap} = require("heap-js");
const comparator = require("./utils");

const minHeap = new Heap(comparator);

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const arrSourcePromises = [];

    const processLogSource = async (logSource) => {
      let isDrained = false;
      minHeap.push(logSource.last);

      while (!isDrained) {
        const latestLog = await logSource.popAsync()
        if(latestLog) {
          minHeap.push(latestLog)
        }else {
          isDrained = true
        }
      }
    }

    for (const logSource of logSources) {
      const logSourceResponse = processLogSource(logSource)
      arrSourcePromises.push(logSourceResponse)
    }

    // Here we handle each logSource independent
    await Promise.all(arrSourcePromises)

    for (const log of minHeap) {
      printer.print(log)
    }

    printer.done()

    resolve(console.log("Async sort complete."));
  });
};

