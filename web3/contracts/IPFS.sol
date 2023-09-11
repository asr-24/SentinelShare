// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IPFS {
    string ipfsHash = "Qmeyctz97S8bW3AsvpU7N9xQYUtE6RVWQo3Y3FVuERipyn";
        
    function getHash() public view returns (string memory) {
        return ipfsHash;
    }
}
