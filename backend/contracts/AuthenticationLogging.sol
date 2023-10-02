// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuthenticationLogging {
    string public jsonData;

    function storeData(string memory _data) public {
        jsonData = _data;
    }
}
