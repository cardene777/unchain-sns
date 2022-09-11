// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Sns {

    // user: 投稿者, text: 投稿文, postId: 投稿ID, good: いいね数, goodUser: いいねしたユーザー
    event NewPost(address indexed user, string text, uint postId, uint good, uint timestamp, address[] goodUser);

    // 投稿ID
    uint public postCounter = 0;

    struct PostData {
        address user;  // 投稿者（ウォレットアドレス）
        string text;  // 投稿文
        uint postId; // 投稿ID
        uint good;  // いいね数
        uint timestamp; // 投稿日時
        address[] goodUser; //いいねしたユーザー（ウォレットアドレスの配列）
    }

    PostData[] postData;

    // 投稿ID => PostData
    mapping(uint => PostData) public postIdData;

    // 投稿
    function post(string memory _text) public {
        // いいねしたユーザーは最初いないため、からの配列を定義
        address[] memory _userWallet;
        PostData memory newPostData = PostData(msg.sender, _text, postCounter, 0, block.timestamp, _userWallet);
        postData.push(newPostData);
        postIdData[postCounter] = newPostData;

        // 投稿IDをインクリメント
        postCounter++;

        // フロントに渡す
        emit NewPost(msg.sender, _text, postCounter, 0, block.timestamp, _userWallet);
    }

    // 全ての投稿データ（postData）を取得
    function getAllPost() public view returns (PostData[] memory) {
        return postData;
    }

    // 単一の投稿データを取得（今回の実装では使用していないが、今後の拡張のため）
    function getPost(uint _postId) public view returns (address, string memory, uint, uint, uint, address[] memory) {
        return (postIdData[_postId].user, postIdData[_postId].text, postIdData[_postId].postId,
        postIdData[_postId].good, postIdData[_postId].timestamp, postIdData[_postId].goodUser);
    }

    // 投稿にいいねをする。
    function goodPost(uint _postId) public {
        // 自分の投稿にはいいねができない
        require(msg.sender != postIdData[_postId].user, "Contributors are not allowed to like the post.");

        // 特定IDにいいねをしたユーザーの配列を取得し１つずつ確認。
        // １ユーザーにつき、１つの投稿に対し1回しかいいねができない
        bool judge = true;
        for (uint i = 0; i < postIdData[_postId].goodUser.length; i++) {
            if (postIdData[_postId].goodUser[i] == msg.sender) {
                judge = false;
            }
        }

        // １つの投稿に対し、いいねを2回できない
        require(judge == true, "You cannot press like twice.");

        // いいね数をインクリメントし、ユーザー配列にユーザーのウォレットアドレスを追加
        postIdData[_postId].good ++;
        postData[_postId].good ++;
        postIdData[_postId].goodUser.push(msg.sender);
        postData[_postId].goodUser.push(msg.sender);
    }

    // いいねの取り消し
    function goodRemove(uint _postId) public {
        // 投稿者は自分の投稿にいいねの取り消しができない
        require(msg.sender != postIdData[_postId].user, "The submitter cannot delete a like.");
        // いいね数が０の時はエラーを出力する
        require(postIdData[_postId].good > 0, "Not one like has been pressed.");

        // 特定IDにいいねをしたユーザーの配列を取得し１つずつ確認。
        // いいねしたユーザー配列の中にいいねを取り消したいユーザーがいるか確認。
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

        // いいねをしていないユーザーにはエラーを出力
        require(judge == true, "I have not liked it.");

        // いいね数をデクリメントし、ユーザー配列からユーザーのウォレットアドレスを削除
        postData[_postId].goodUser.pop();
        postIdData[_postId].goodUser.pop();
        postData[_postId].good --;
        postIdData[_postId].good --;

    }

}
