// SPDX-Liceense-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTToken is ERC721Enumerable, Ownable{
    using Strings for uint256;
    string baseURI;
    string public baseImage = ".webp";
    //format pour open sea
    string public baseExtension = ".json";
    uint256 public cost = 0.001 ether;
    uint256 public maxSupply = 99;
    bool public paused = false;
    
    event Sale(
        uint256 id,  
        address indexed buyer,
        uint256 cost,
        string indexed tokenURI,
        uint256 timestamp
    );

    struct SaleStruct{
        uint256 id;
        address buyer;
        uint256 cost;
        string imageURL;
        uint256 timestamp;
    }
    SaleStruct[] minted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
    }
    
    function payToMint() public payable{
        uint256 supply = totalSupply();
        require(!paused, "NFTs under maintenance");
        require(supply < maxSupply, "Sorry, all NFTs have been minted");
        require(msg.value > 0 ether , "Ether too low minting");

        if(msg.sender != owner()){
            require(msg.value >= cost, "Ether too low minting");
        } 
        //supply token id 
        _safeMint(msg.sender, supply + 1);
        //add an item in array in solidity
        minted.push(
            SaleStruct(
                supply + 1, 
                msg.sender, 
                msg.value, 
                toImage(supply + 1), 
                block.timestamp)
            );
        //block.timestamp = current time that the nft is minted
        emit Sale(
            supply + 1,
            msg.sender,
            msg.value,
            tokenURI(supply + 1),
            block.timestamp
        );
    }
    function burnNFTT(uint256 _tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "ERC721: transfer caller is not owner nor approved");
        _burn(_tokenId);
    }
    function airdropNFT(uint256 _tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeMint(msg.sender, _tokenId);
    }

    //function convert tokenID to an image
    function toImage(uint256 tokenId) public view returns(string memory){
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseImage)) : "";
    }

    //function convertion tokenID to the specific metadata location
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)) : "";
    }

    function getAllNFTs() public view returns(SaleStruct[] memory){
        return minted;
    }

    function getAnNFT(uint256 tokenId) public view returns(SaleStruct memory){
        return minted[tokenId - 1];
    }

    
    function payTo(address to, uint256 amount) public onlyOwner{
        (bool success1, ) = payable(to).call{value: amount}(""); 
        require(success1, "Transfer failed");
    }
    //changing the location of your image metadata on ipfs
    function setBaseURI(string memory _newBaseURI) public onlyOwner{
        baseURI = _newBaseURI;
    }
    // pause the smart contract if you want to add a new set of nft in your collection
    function setPause(bool _state) public onlyOwner{
        paused = _state;
    }
    //return the base url address (just used by the smart contract itself)
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}