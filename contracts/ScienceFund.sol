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
        Stage stage;
    }

    Counters.Counter private _tokenIds;
    //mapping from tokenId to sfToken
    mapping(uint => SFtoken) private _sfTokens;

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
        _sfTokens[newTokenID] = SFtoken(newTokenID, msg.value, _selectedPool, getStage(Stage.AwaitAllocation), getStage(Stage.AwaitAllocation), Stage.AwaitAllocation );

        //emit a donated event
        emit SFTokenMinted(newTokenID, msg.value, _selectedPool);

    }
 


    function tokenURI(uint _tokenId) override public view returns(string memory){

        //TODO: note this is tokenIndex not tokenId

        return constructTokenURImetadata(_sfTokens[_tokenId]);
    }



    function constructTokenURImetadata(SFtoken memory _params) internal pure returns (string memory){


        // TODO:change from big number to decimal representation to string
        string memory tokenIDstring = _params.tokenId.toString();
        
        // TODO:change from WEI to ETH representation to string
   
        string memory value1 = (_params.value/1e18).toString();
        string memory value2 = (_params.value/1e17 % 10).toString();
        string memory tokenValueString = string(abi.encodePacked(value1,'.',value2));

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
                    ReceiptImage(tokenIDstring, tokenValueString, _params.pool, _params.alloHash, _params.completeHash))),
                '"}'
            ) 
        );

    } 

    function ReceiptImage(string memory _id, string memory _amount, string memory _pool, string memory _alloHash, string memory _completeHash) internal pure returns(string memory svg){

        // add randomness here for visual enhancement

        svg=string(
            abi.encodePacked(
                '<svg version="1.1" viewBox="0 0 331 426" width="331" height="426" preserveAspectRatio="xMidYMin" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF" /><text x="165" y="60" font-size="45" text-anchor="middle" fill="black" font-weight="normal">SFT-',_id,'</text><text x="165" y="90" font-size="12" text-anchor="middle" fill="black" font-weight="noraml" font-style="italic">Reimagine Scientific Discovery</text><filter id="insetshadow"><feOffset in="SourceGraphic" dx="0" dy="20" result="offOut" /><feGaussianBlur in="offOut" stdDeviation="20" result="offset-blur"/><feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/><feFlood flood-color="#F99500" flood-opacity=".35" result="color"/><feComposite operator="in" in="color" in2="inverse" result="shadow"/></filter><g filter="url(#insetshadow)"><circle cx="167" cy="212" r="100" fill="#FFFFFF" stroke="#F99500" stroke-width="5" /></g><circle cx="168" cy="167" r="15" fill="#FFFFFF" stroke="#F99500" stroke-width="4" /><circle cx="217" cy="208" r="15" fill="#FFFFFF" stroke="#F99500" stroke-width="4" /><circle cx="125" cy="241" r="15" fill="#FFFFFF" stroke="#F99500" stroke-width="4" /><line x1="168" y1="188" x2="168" y2="312" stroke="#068B0B" stroke-width="4" stroke-linecap="round" /><path d="M 168 312 Q 168 241, 198 218" stroke="#068B0B" stroke-width="4" fill="transparent" stroke-linecap="round" /><path d="M 168 312 Q 168 261, 144 249" stroke="#068B0B" stroke-width="4" fill="transparent" stroke-linecap="round" /><text x="165" y="344" font-size="12" text-anchor="middle" font-weight="normal" fill="black">', _amount, ' ETH </text><text x="165" y="362" font-size="10" text-anchor="middle" font-weight="normal" fill="black">Allocation Hash : ',_alloHash,'</text><text x="165" y="380" font-size="10" text-anchor="middle" font-weight="normal" fill="black">Completion Hash: ',_completeHash,'</text><text x="165" y="409" font-size="12" text-anchor="middle" font-weight="bold" fill="#F99500">', _pool,'</text></svg>'
            )
        );
    }


    /**
     * @dev call allocate() after the token has been allocated to update allocation hash 
     */
    
    function allocate(uint _tokenId, string memory _allocationHash) public onlyOwner { 
        SFtoken memory token = _sfTokens[_tokenId];
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