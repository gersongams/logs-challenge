"use strict";

// Print all entries, across all of the sources, in chronological order.
const comparator = require("./utils");
const {Heap} = require("heap-js");

const minHeap = new Heap(comparator);

module.exports = (logSources, printer) => {
  for (const logSource of logSources) {
    let isDrained = false;
    // Each logSource has at least one log (assuming)
    // Adding the latest log to the heap
    minHeap.push(logSource.last)

    // Draining all the logSource
    while (!isDrained) {
      const latestLog = logSource.pop()
      if(latestLog) {
        minHeap.push(latestLog)
      }else {
        isDrained = true
      }
    }
  }

  // Now I can go through the minheap and print the logs chronologically
  for (const log of minHeap) {
    printer.print(log)
  }

  printer.done()
  return console.log("Sync sort complete.");
};
