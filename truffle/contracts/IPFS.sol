// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IPFS {
    string ipfsHash = "QmT54CFWx21AfYzjqWrHGxRWccNk8waXqnxmbfDPU2SBYL";
        
    function getHash() public view returns (string memory) {
        return ipfsHash;
    }
}




