import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
          <div className="flex w-full max-w-screen-lg">
            <div className="flex flex-col w-64 py-4 pr-3">
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" href="#">Home</a>
              <a className="flex px-3 py-2 mt-2 mt-auto text-lg rounded-sm font-medium hover:bg-gray-200" href="#">
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
                <button className="flex items-center h-8 px-2 text-sm bg-gray-300 rounded-sm hover:bg-gray-400">New post</button>
              </div>
              <div className="flex-grow h-0 overflow-auto">
                <div className="flex w-full p-8 border-b-4 border-gray-300">
                  <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
                  <div className="flex flex-col flex-grow ml-4">
                    <textarea className="p-3 bg-transparent border border-gray-500 rounded-sm" name id rows={3} placeholder="What's happening?" defaultValue={""} />
                    <div className="flex justify-between mt-2">
                      <button className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">Post</button>
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
