// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStorage {
    string public jsonData;

    function storeData(string memory _data) public {
        jsonData = _data;
    }
}
