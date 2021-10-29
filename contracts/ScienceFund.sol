// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract ScienceFund is 
    ERC721URIStorage, 
    Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

    constructor() ERC721("ScienceFund", "SFT"){}


    event SFTokenAllocated(uint id, uint value, string pool);
    event SFTokenComplete(uint id, uint value, string pool);


    // Enums representing the life cycle of each token
    enum AllocationStage { AwaitAllocation, Allocated, Complete}  

    struct SFtoken {
        uint id;
        uint value;
        string pool;
        AllocationStage stage;  
    }

    SFtoken[] public sfTokens;



    ///@notice donate function to mint a sftoken receipt

    function donate(address _donor, string memory _selectedPool) public payable {
        
        require(msg.value > 1, "ScienceFund: minimum value of 0.3ETH is required");


        /// generate a new tokenID
        _tokenIds.increment();
        uint256 newTokenID = _tokenIds.current();


        // mint 
        _safeMint(_donor, newTokenID);
        sfTokens.push(SFtoken(newTokenID, msg.value, _selectedPool,  AllocationStage.AwaitAllocation));

    }
 


    function _updateTokenURI(uint _tokenId, string memory _newTokenURI) internal {
       
       /// @notice internal function to make sure TokenURI can only be updated when the stage cycle is not complete, thus disabling any change to URI and set it to permanent.

        SFtoken memory token = sfTokens[_tokenId];
        require( token.stage != AllocationStage.Complete,  "ScienceFund: the token life cycle must not be complete.");

        _setTokenURI(_tokenId, _newTokenURI);


    }


    /// @notice call allocate() after the token has been allocated to update tokenURI as well as allocation stage

    function allocate(uint _tokenId, string memory _newTokenURI) public onlyOwner { 
        SFtoken memory token = sfTokens[_tokenId];
        require( token.stage == AllocationStage.AwaitAllocation,  "ScienceFund: the token need not been allocated yet");
        

        //update token URI
        _updateTokenURI(_tokenId, _newTokenURI);

        //update token stage
        token.stage = AllocationStage.Allocated;


        /// @notice Emit Event TokenAllocated()
        emit SFTokenAllocated(token.id, token.value, token.pool);

    }

    /// @notice call complete() to update final tokenURI makes it permanent

    function complete(uint _tokenId, string memory _newTokenURI) external onlyOwner{
        SFtoken memory token = sfTokens[_tokenId];
        require(token.stage == AllocationStage.Allocated,  "ScienceFund: the token must have been allocated already");

        //update token stage
        token.stage = AllocationStage.Complete;

        //update token URI
         _updateTokenURI(_tokenId, _newTokenURI);        

        /// @notice Emit Event TokenCompleted()
        emit SFTokenComplete(token.id, token.value, token.pool);

    }

}