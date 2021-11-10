// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/utils/Strings.sol';
import './Base64.sol';


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
    ERC721Enumerable, 
    Ownable {


    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ScienceFund", "SFT"){}

    event SFTokenMinted(uint id, uint value, string pool);
    event SFTokenAllocated(uint id, uint value, string pool, string allocationHash);
    event SFTokenComplete(uint id, uint value, string pool);


    // Enums representing the life cycle of each token
    enum Stage { AwaitAllocation, Allocated, Completed}  



    struct SFtoken {
        uint tokenId;
        uint value;
        string pool;
        string alloHash;
        string completeHash;
    }

    SFtoken[] public sfTokens;


 /**
  * @dev this helper function returns Enums to strings
  */
    function getStage(Stage stageEnum) public pure returns (string memory){
        if (stageEnum == Stage.AwaitAllocation) {
            return "Awaiting Allocation";
        } else if (stageEnum == Stage.Allocated){
             return "Allocated";
        } else {
            return "Completed";
        }
    }


    /** 
     * @notice donate function to mint a sftoken receipt
     *
     * @dev this function triggers a SFTokenMinted event
     */
    function donate(string memory _selectedPool) public payable {
        
        require(msg.value > 3 * 10 ** 17, "ScienceFund: minimum value of 0.3ETH is required");

        /// generate a new tokenID
        _tokenIds.increment();
        uint256 newTokenID = _tokenIds.current();


        // mint 
        _safeMint(msg.sender, newTokenID);
        sfTokens.push(SFtoken(newTokenID, msg.value, _selectedPool, getStage(Stage.AwaitAllocation), getStage(Stage.AwaitAllocation)));

        //emit a donated event
        emit SFTokenMinted(newTokenID, msg.value, _selectedPool);

    }
 


    function tokenURI(uint _tokenId) override public view returns(string memory){

        //TODO: require tokenID to exist or have minted

        return constructTokenURImetadata(sfTokens[_tokenId]);
    }



    function constructTokenURImetadata(SFtoken memory _params) internal pure returns (string memory){


        // TODO:change from big number to decimal representation to string
        string memory tokenIDstring = _params.tokenId.toString();
        
        // TODO:change from WEI to ETH representation to string
        string memory tokenValueString = _params.value.toString();


        string memory name=string(
            abi.encodePacked(
                'Science Fund Token - #',
                tokenIDstring
            )
        );

        string memory description=string(
            abi.encodePacked(
                'This NFT represents a permanent receipt to your donation of ',
                tokenValueString,
                ' Wei to Science Fund - ',
                _params.pool,
                ' funding pool. This token connects your donation to the recepient and the impact it enables for generations to come.'
            )
        );

        return string(
            abi.encodePacked(
                'data:application/json, {"name": "',
                name,
                '", "description":"',
                description,
                '", "image":"',
                'data:image/svg+xml;base64,',
                Base64.encode(bytes(
                    ReceiptImage()
                )),
                '"}'
            ) 
        );

    } 

    function ReceiptImage() internal pure returns(string memory svg){

        // add randomness here for visual enhancement

        svg=string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="110"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" /></svg>'
            )
        );
    }


    /**
     * @dev call allocate() after the token has been allocated to update allocation hash 
     */
    
    function allocate(uint _tokenId, string memory _allocationHash) public onlyOwner { 
        SFtoken memory token = sfTokens[_tokenId];
        require(keccak256(bytes(token.alloHash)) == keccak256(bytes(getStage(Stage.AwaitAllocation))),  "ScienceFund: the token need not been allocated yet");

        //update token stage
        token.alloHash = _allocationHash;

        /// @notice Emit Event TokenAllocated()
        emit SFTokenAllocated(token.tokenId, token.value, token.pool, _allocationHash);

    }


// // ------------------------------------------------------------



//     /// @notice call complete() to update final tokenURI makes it permanent

//     function complete(uint _tokenId, string memory _newTokenURI) external onlyOwner{
//         SFtoken memory token = sfTokens[_tokenId];
//         require(token.stage == AllocationStage.Allocated,  "ScienceFund: the token must have been allocated already");

//         //update token stage
//         token.stage = AllocationStage.Complete;

//         //update token URI
//          _updateTokenURI(_tokenId, _newTokenURI);        

//         /// @notice Emit Event TokenCompleted()
//         emit SFTokenComplete(token.id, token.value, token.pool);

//     }

}