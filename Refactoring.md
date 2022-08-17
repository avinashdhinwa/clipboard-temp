# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. 

Changed 
```
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }
```

to 

```
  if (event && event.partitionKey) {
      candidate = event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    candidate = getHash(data);
  }
```

did this in order to reduce nested if's (cyclomatic complexity), eases reading code


2. 

Moved 
```
crypto.createHash("sha3-512").update(data).digest("hex");
```
to 

```
getHash
```
removes redundancy, and expresses intent in lesser characters with the function name

3.
Broke down `deterministicPartitionKey` into 
- `getting candidate from event`
- `stringifying candidate, in case if it's nil, then set empty/trivial value`
- `trimming candidate to max len`