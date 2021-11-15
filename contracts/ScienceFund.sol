// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/utils/Strings.sol';
import './ScienceFundToken.sol';


/**
 * @title Science Fund 
 *
 * @notice this is the science fund contract that
 *      - permanently stores donation value, donation pool on chain on minting
 *      - returns a dynamically generated receipt in tokenURI
 *      - allows update to allocation and completion hash later by owner
 *      - reflects the updates in tokenURI
 * 
 *
 */

contract ScienceFund is 
    ScienceFundToken,
    ERC721Enumerable, 
    Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    constructor() ERC721("ScienceFund", "SFT"){}



    /** 
     * @notice donate function to mint a sftoken receipt
     *
     * @dev this function triggers a SFTokenMinted event and returns the tokenID
     */
    function donate(string memory _selectedPool) public payable returns(uint){
        
        require(msg.value > 3 * 10 ** 17, "ScienceFund: minimum value of 0.3ETH is required");

        /// generate a new tokenID
        _tokenIds.increment();
        uint256 newTokenID = _tokenIds.current();


        // mint 
        _safeMint(msg.sender, newTokenID);
 
        // update SFTokens
        _setSFToken(newTokenID, SFtoken(
            newTokenID, 
            msg.value, 
            _selectedPool, 
            getStage(Stage.AwaitAllocation), 
            getStage(Stage.AwaitAllocation)
            ));
        
        //emit a donated event
        emit SFTokenMinted(newTokenID, msg.value, _selectedPool);
        return newTokenID;
 
    }
 

    /** 
     * @notice this generates a dynamic sftoken receipt for the donation and this receipt will update the allocation and completion status accordingly
     *
     * @dev input is a tokenID
     */
    function tokenURI(uint _tokenId) override public view returns(string memory){

        require (_tokenId <= totalSupply(), "ScienceFund: Token needs to be minted first" );
 
        return _constructTokenURImetadata(getSFToken(_tokenId));
    
    }


 
    /**
     * @dev call allocate() after the token has been allocated to update allocation hash 
     */
    
    function allocate(uint _tokenId, string memory _allocationHash) public onlyOwner { 

        _updateStage(_tokenId, Stage.AwaitAllocation, _allocationHash);
        
        /// @notice Emit Event TokenAllocated()
        emit SFTokenAllocated(_tokenId,  _allocationHash);
    }


   /**
     * @dev call complete() after the token has been allocated to update complete hash 
     */
    
    function complete(uint _tokenId, string memory _completeHash) public onlyOwner { 

        _updateStage(_tokenId, Stage.AwaitCompletion, _completeHash);
    
        /// @notice Emit Event SFTokenComplete() 
        emit SFTokenCompleted(_tokenId, _completeHash);

    }

    /**
    * @dev this helper function helps update the allocation/completion stage using a tokenID
    */
    function _updateStage(uint _tokenId, Stage _oldStage, string memory _newHash) internal virtual {
        
        require (_exists(_tokenId), "ScienceFund: Token needs to be minted first" );
        
        SFtoken memory token = getSFToken(_tokenId);

        if (_oldStage == Stage.AwaitAllocation){

            require(keccak256(bytes(token.alloHash)) == keccak256(bytes(getStage(_oldStage))),  "ScienceFund: the token need not been allocated yet");

            token.alloHash = _newHash;
            token.completeHash = getStage(Stage.AwaitCompletion);

        }

        if (_oldStage == Stage.AwaitCompletion){
            
            require(keccak256(bytes(token.completeHash)) == keccak256(bytes(getStage(Stage.AwaitCompletion))),  "ScienceFund: the token needs to be allocated and yet not been completed ");



            token.completeHash = _newHash;

        }

        _setSFToken(_tokenId, token);
    }


    function withdraw() public onlyOwner{
        // TODO: withdraw with respect to funding pool?
    }

}