

const { createHash } = require('crypto');

class BloomFilter {
  constructor(sizeInBytes) {
    this.sizeInBits = sizeInBytes * 8;
    this.hashFunctions = 6; // Number of hash functions (chunks of 48 bits)
    this.bitArray = new Array(this.sizeInBits).fill(0);
  }

  add(element) {
    for (let i = 0; i < this.hashFunctions; i++) {
      const hash = this.getHash(element, i);
      this.bitArray[hash] = 1;
    }
  }

  contains(element) {
    for (let i = 0; i < this.hashFunctions; i++) {
      const hash = this.getHash(element, i);
      if (this.bitArray[hash] !== 1) {
        return false;
      }
    }
    return true;
  }

  getHash(element, index) {
    const hash = createHash('sha256')
      .update(`${element}${index}`)
      .digest('hex');
    const hashInt = parseInt(hash, 16);
    return hashInt % this.sizeInBits;
  }
}

// Example usage
const bloomFilterSizeInBytes = 10 * 1024 * 1024; // 10 MB
const bloomFilter = new BloomFilter(bloomFilterSizeInBytes);

bloomFilter.add('example_element');

console.log(bloomFilter.contains('example_element')); // Output: true
console.log(bloomFilter.contains('non_existent_element')); // Output: false
