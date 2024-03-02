const { createHash } = require('crypto');

class BloomFilter {
  constructor(sizeInBytes) {
    this.sizeInBits = sizeInBytes * 8;
    this.hashFunctions = 5; // Number of hash functions (chunks of 48 bits)
    this.bitArray = new Array(this.sizeInBits).fill(0);
  }

  add(element) {
    const hash = this.getHash(element);
    for (let i = 0; i < this.hashFunctions; i++) {
      const chunk = (hash >> (i * 48)) & BigInt(0xFFFFFFFFFFFF); // Extract 48 bits each iteration
      this.bitArray[Number(chunk % BigInt(this.sizeInBits))] = 1;
    }
  }

  contains(element) {
    const hash = this.getHash(element);
    for (let i = 0; i < this.hashFunctions; i++) {
      const chunk = (hash >> (i * 48)) & BigInt(0xFFFFFFFFFFFF); // Extract 48 bits
      if (this.bitArray[Number(chunk % BigInt(this.sizeInBits))] !== 1) {
        return false;
      }
    }
    return true;
  }

  getHash(element) {
    const hash = createHash('sha256')
      .update(element)
      .digest('hex');
    return BigInt(`0x${hash}`);
  }
}

// Example usage
const bloomFilterSizeInBytes = 10 * 1024 * 1024; // 10 MB
const bloomFilter = new BloomFilter(bloomFilterSizeInBytes);

bloomFilter.add('example_element');

console.log(bloomFilter.contains('example_element')); // Output: true
console.log(bloomFilter.contains('non_existent_element')); // Output: false
