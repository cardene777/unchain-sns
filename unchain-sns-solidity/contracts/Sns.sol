// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Sns {

    event NewPost(address indexed user, string text, uint postId, uint good, uint timestamp, address[] goodUser);
    uint public postCounter = 0;

    struct PostData {
        address user;  // 投稿者
        string text;  // 投稿文
        uint postId; // 投稿ID
        uint good;  // いいね数
        uint timestamp; // 投稿日時
        address[] goodUser; //いいねしたユーザー
    }

    PostData[] postData;
    mapping(uint => PostData) public postIdData;

    function post(string memory _text) public {
        address[] memory _userWallet;
        PostData memory newPostData = PostData(msg.sender, _text, postCounter, 0, block.timestamp, _userWallet);
        postData.push(newPostData);
        postIdData[postCounter] = newPostData;
        postCounter++;
        emit NewPost(msg.sender, _text, postCounter, 0, block.timestamp, _userWallet);
    }

    function getAllPost() public view returns (PostData[] memory) {
        return postData;
    }

    function getPost(uint _postId) public view returns (address, string memory, uint, uint, uint, address[] memory) {
        return (postIdData[_postId].user, postIdData[_postId].text, postIdData[_postId].postId,
        postIdData[_postId].good, postIdData[_postId].timestamp, postIdData[_postId].goodUser);
    }

    function goodPost(uint _postId) public {
        require(msg.sender != postIdData[_postId].user, "Contributors are not allowed to like the post.");
        bool judge = true;
        for (uint i = 0; i < postIdData[_postId].goodUser.length; i++) {
            if (postIdData[_postId].goodUser[i] == msg.sender) {
                judge = false;
            }
        }

        require(judge == true, "You cannot press like twice.");
        postIdData[_postId].good ++;
        postData[_postId].good ++;
        postIdData[_postId].goodUser.push(msg.sender);
        postData[_postId].goodUser.push(msg.sender);
    }

    function goodRemove(uint _postId) public {
        require(msg.sender != postIdData[_postId].user, "The submitter cannot delete a like.");
        require(postIdData[_postId].good > 0, "Not one like has been pressed.");
        bool judge = false;
        for (uint i = 0; i < postIdData[_postId].goodUser.length; i++) {
            if (postIdData[_postId].goodUser[i] == msg.sender && judge == false) {
                judge = true;
                if (postIdData[_postId].goodUser.length > 1) {
                    postData[_postId].goodUser[i] = postData[_postId].goodUser[i+1];
                    postIdData[_postId].goodUser[i] = postIdData[_postId].goodUser[i+1];
                }
            } else if (postIdData[_postId].goodUser.length-1 > i && judge) {
                postData[_postId].goodUser[i] = postData[_postId].goodUser[i+1];
                postIdData[_postId].goodUser[i] = postIdData[_postId].goodUser[i+1];
            }
        }

        require(judge == true, "You cannot remove like twice.");
        postData[_postId].goodUser.pop();
        postIdData[_postId].goodUser.pop();
        postData[_postId].good --;
        postIdData[_postId].good --;

    }

}
