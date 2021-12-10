import './App.css';
import Greeter from './Greeter.json'
import { ethers } from 'ethers';
import { useState } from 'react';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function App() {

  const [aGreeting, setAGreeting] = useState('')

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  } // Prompts user to connect metamask account. 
  
  async function displayGreeter() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        let greeting = await contract.greet()
        console.log(greeting)
      } catch (err) {
          console.log(err)
      }
    }
  }

  async function setGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum) 
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const greeting = await contract.setGreeting(aGreeting)
      setAGreeting('')
      await greeting.wait()
      displayGreeter()
    }
  }
  
  
  return (
    <div className="App">
      <h1>Hello!</h1>

      <input onChange={e => setAGreeting(e.target.value)} type="text" placeholder="Get greeting" />
      <input onClick={displayGreeter} type="submit" />
      <input onClick={setGreeting} type="submit" />







    </div>
  );
}

export default App;
