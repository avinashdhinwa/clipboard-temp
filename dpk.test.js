const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("trimCandidateToMaxLen", () => {
  it("Returns the input when length less than max", () => {
    const input = "abcde"
    const output = trimCandidateToMaxLen(input);
    expect(output).toBe(input);
  });
});

describe("stringifyCandidateWhenEmpty", () => {
  it("Returns the literal '0' when given no input", () => {
    const output = stringifyCandidate();
    expect(output).toBe("0");
  });
});

describe("stringifyCandidateWhenNonEmpty", () => {
  it("Returns the literal '1234' when given input is non-string 1234", () => {
    const output = stringifyCandidate(1234);
    expect(output).toBe("1234");
  });
});

describe("getCandidateFromEventWithoutPartitionKey", () => {
  it("Returns the hash of object key if partition key is not present in input object and object is not nil", () => {
    const object = {"a": "b"}
    const hash = "f267c82286ef3cb4fb52a53658427e953ba8720f541a00cebb56ef28450c2c17b95adc7d4e865fd004cd1e8202216e7adc912866f47cec7c3086f88904368bd8"
    const output = getCandidateFromEvent(object);
    expect(output).toBe(hash);
  });
});

describe("getCandidateFromEventWithEmptyObject", () => {
  it("Return undefined if input is empty", () => {
    const output = getCandidateFromEvent();
    expect(output).toBe(undefined);
  });
});
