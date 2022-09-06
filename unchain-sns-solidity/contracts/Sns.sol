// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Sns {
    uint public postCounter = 1;

    struct PostData {
        address user;  // 投稿者
        string text;  // 投稿文
        uint good;  // いいね数
        uint timestamp; // 投稿日時
    }

    PostData[] public postData;
    mapping(uint => PostData) public postIdData;
    mapping(uint => address[]) public goodWallet;

    function post(string memory _text) public {
        PostData memory newPostData = PostData(msg.sender, _text, 0, block.timestamp);
        postData.push(newPostData);
        postIdData[postCounter] = newPostData;
        postCounter++;
    }

    function getPost(uint _postId) public view returns (address, string memory, uint) {
        return (postIdData[_postId].user, postIdData[_postId].text, postIdData[_postId].good, postIdData[_postId].timestamp);
    }

    function goodPost(uint _postId) public {
        require(msg.sender != postIdData[_postId].user, "Contributors are not allowed to like the post.");
        bool judge = true;
        for (uint i = 0; i < goodWallet[_postId].length; i++) {
            if (goodWallet[_postId][i] == msg.sender) {
                judge = false;
            }
        }

        require(judge == true, "You cannot press like twice.");
        postIdData[_postId].good ++;
        goodWallet[_postId].push(msg.sender);
    }

    function goodRemove(uint _postId) public {
        require(msg.sender != postIdData[_postId].user, "The submitter cannot delete a like.");
        require(postIdData[_postId].good > 0, "Not one like has been pressed.");
        bool judge = false;
        uint _walletIndex = 0;
        for (uint i = 0; i < goodWallet[_postId].length; i++) {
            if (goodWallet[_postId][i] == msg.sender) {
                judge = true;
            }
        }

        require(judge == true, "You cannot remove like twice.");
        delete goodWallet[_postId][_walletIndex];
        postIdData[_postId].good --;

    }
}
