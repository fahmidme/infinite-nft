import React, {useState, useEffect} from "react"
import './App.css';

import * as fcl from "@onflow/fcl"
import {AuthCluster} from './auth-cluster'
import {initAccount} from './flow/js/transactions/setup-account'
import {mintNFT} from './flow/js/transactions/mint-nft'
import {fetchNFTs} from './flow/js/scripts/fetch-nfts'

function App() {
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  async function getMyNFTs(){
    console.log('getting nfts')
    console.log(user)
    let nfts = await fetchNFTs(user.addr)
    console.log(nfts)
  }
  return (
    <div className="App">
      <AuthCluster/>
      <button onClick={initAccount}>Init My NFT Collection!</button>
      <button onClick={getMyNFTs}>Get my NFTs!</button>
      <button onClick={mintNFT}>MINT NFT</button>
    </div>
  );
}

export default App;
