const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  
  let candidate = getCandidateFromEvent(event);

  candidate = stringifyCandidate(candidate)
  
  candidate = trimCandidateToMaxLen(candidate)

  return candidate;
};

getCandidateFromEvent = (event) => {
  let candidate;

  if (event && event.partitionKey) {
    candidate = event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    candidate = getHash(data);
  }

  return candidate
}

trimCandidateToMaxLen = (candidate) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getHash(candidate);
  }

  return candidate
}

stringifyCandidate = (candidate) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (! candidate) {
    candidate = TRIVIAL_PARTITION_KEY;
  } else if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  return candidate
}

getHash = (input) => {
  return crypto.createHash("sha3-512").update(input).digest("hex");
}