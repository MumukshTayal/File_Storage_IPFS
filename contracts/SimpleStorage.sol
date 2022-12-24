// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  
  string value;
  string file;
  constructor() {
  value = 'bafybeibbk5pk4zt5v5lgzjyjsmw7hws5adro4ov4jsqlspvkzrcvfzecie';
  file = '38598.jpg';
  }
  
  function read() public view returns (string memory) {
    return value;
  }

  function readfile() public view returns (string memory) {
    return file;
  }

  function write(string memory newValue, string memory newFile) public {
    file = newFile;
    value = newValue;
  }
}
