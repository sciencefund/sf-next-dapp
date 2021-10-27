// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract ScienceFund is ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

    constructor() ERC721("ScienceFund", "SFT"){}

    // Mapping from token ID to funding poolId
    mapping(uint256 => string) public tokenFundingPools;

    // Mapping from token ID to donated value
    mapping(uint256 => uint256) public tokenValues;


    // TODO: donate event

    //@notice: the main donate function 
    function donate(address donor, string memory selectedPool) public payable {
        
        //generate a new tokenID
        _tokenIds.increment();
        uint256 newTokenID = _tokenIds.current();


        //setting an arbitrary supply limit for now
        require(newTokenID > 0 && newTokenID < 9999, "Exceeds token maximum supply");
        _safeMint(donor, newTokenID);

        //record selected funding pools
        tokenFundingPools[newTokenID] = selectedPool;

        
        //record donated value in eth
        tokenValues[newTokenID] = msg.value;

        //TODO: emit a donate event

    }

    //set tokenURI to record the funding pool and the amount donated
    // @dev: somthing is wrong here
    function tokenURI(uint256 tokenId) override public view returns(string memory){

        require(tokenId > 0 && tokenId <= _tokenIds.current(), "Not a valid token");

        string[5] memory parts;

        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><rect fill="black" /><text x="10" y="20">';
        
        parts[1] = tokenFundingPools[tokenId];

        parts[2] = '</text><text x="10" y="40">';

        parts[3] = string(abi.encodePacked(tokenValues[tokenId], " ", "ETH"));

        parts[4] = '</text></svg>';

        string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4]));
        
        return output;
    }



}