import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import './App.css';
import abi from "./utils/Sns.json";

function App() {
  const contractAddress = "0x1E62568cA6a4ec79d5732576A359850341877076";

  // ユーザーのパブリックウォレットを保存するために使用する状態変数を定義
  const [currentAccount, setCurrentAccount] = useState("");
  // 入力フォーム
  const [text, setText] = React.useState("")

  // post情報を保存
  const [allPost, setAllPost] = useState([]);

  const textSet = e => setText(e.target.value);

  console.log("currentAccount: ", currentAccount);

  // ABIを参照
  const contractABI = abi.abi;

  // window.ethereumにアクセスできることを確認
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Get your Metamask ready!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      // ユーザーのウォレットへのアクセスが許可されているかどうかを確認
      // アカウントがあれば一番目のアドレスを表示。
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPost = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const SnsContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        /* コントラクトからgetAllWavesメソッドを呼び出す */
        const posts = await SnsContract.getAllPost();
        /* UIに必要なのは、アドレス、タイムスタンプ、メッセージだけなので、以下のように設定 */
        const postsCleaned = posts.map((onePost) => {
          return {
            user: onePost.user,
            text: onePost.text,
            good: onePost.good,
            timestamp: new Date(onePost.timestamp * 1000),
          };
        });

        /* React Stateにデータを格納する */
        setAllPost(postsCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let snsContract;

    const onNewPost = (user, text, good, timestamp) => {
      console.log("NewPost", user, text, good, timestamp);
      setAllPost((prevState) => [
        ...prevState,
        {
          user: user,
          text: text,
          good: good,
          timestamp: new Date(timestamp * 1000),
        },
      ]);
    };

    /* NewWaveイベントがコントラクトから発信されたときに、情報を受け取ります */
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      snsContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      snsContract.on("NewPost", onNewPost);
    }
    /*メモリリークを防ぐために、NewWaveのイベントを解除します*/
    return () => {
      if (snsContract) {
        snsContract.off("NewPost", onNewPost);
      }
    };
  }, []);

  // connectWalletメソッドを実装
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // waveの回数をカウントする関数を実装
  const post = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const UnchainSnsContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        await UnchainSnsContract.post(text);

        let postData
        postData = await UnchainSnsContract.getPost(11)

        console.log("Post Data...", postData);
        console.log("Signer:", signer);
        setText("")
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // WEBページロード時に実行。
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div>
        <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
          <div className="flex w-full max-w-screen-lg">
            <div className="flex flex-col w-64 py-4 pr-3">
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" href="#">Home</a>
              {/* ウォレットに接続されている確認 */}
              {!currentAccount && (
                <button className="waveButton px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" onClick={connectWallet}>
                  Connect Wallet
                </button>
              )}
              {currentAccount && (
                <button className="waveButton px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" onClick={connectWallet}>
                  { currentAccount.substr(0, 8) }...
                </button>
              )}
              <a className="flex px-3 py-2 mt-auto text-lg rounded-sm font-medium hover:bg-gray-200" href="#">
                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                <div className="flex flex-col ml-2">
                  <span className="mt-1 text-sm font-semibold leading-none">Username</span>
                  <span className="mt-1 text-xs leading-none">Post:</span>
                </div>
              </a>
            </div>
            <div className="flex flex-col flex-grow border-l border-r border-gray-300">
              <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
                <h1 className="text-xl font-semibold">Unchain SNS</h1>
              </div>
              <div className="flex-grow h-0 overflow-auto">
                <div className="flex w-full p-8 border-b-4 border-gray-300">
                  <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
                  <div className="flex flex-col flex-grow ml-4">
                    <textarea className="p-3 bg-transparent border border-gray-500 rounded-sm" rows={3} placeholder="What's happening?" value={text} onChange={textSet} />
                    <div className="flex justify-between mt-2">
                      <button className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400" onClick={post}>Post</button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-8 border-b border-gray-300">
                  <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
                  <div className="flex flex-col flex-grow ml-4">
                    <div className="flex">
                      <span className="font-semibold">Username</span>
                      <span className="ml-auto text-sm">Just now</span>
                    </div>
                    <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
                    <div className="flex mt-2">
                      <button className="text-sm font-semibold">Like</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Component End  */}
        <a className="fixed flex items-center justify-center h-8 pr-2 pl-1 bg-blue-600 rounded-full bottom-0 right-0 mr-4 mb-4 shadow-lg text-blue-100 hover:bg-blue-600" href="https://twitter.com/cardene777" target="_top">
          <div className="flex items-center justify-center h-6 w-6 bg-blue-500 rounded-full">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" /></g></svg>
          </div>
          <span className="text-sm ml-1 leading-none">@tailwind</span>
        </a>
      </div>
    </div>
  );
}

export default App;
