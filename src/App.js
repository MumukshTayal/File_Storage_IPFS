import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Meme from './contracts/SimpleStorage.json';
// import putFiles from './put-files.js';
// import { Web3Storage } from 'web3.storage'
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';


// require('dotenv').config();
// const projectId = process.env['API_KEY'];
// const projectSecret = process.env['API_SECRET'];


class App extends Component {
  
  // fileInput = useRef(null);

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Meme.abi, networkData.address);
      this.setState({ contract });
      console.log("reading contract");
      const memeHash = await contract.methods.read().call();
      const fileName = await contract.methods.readfile().call();
      this.setState({ memeHash });
      console.log("memeHash", memeHash);
      this.setState({ fileName });
    } else {
      window.alert('Smart contract not deployed to detected network.');
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      memeHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      file: null,
      fileName: '',
      tempName: ''
    }
  }

  
  makeStorageClient = () => {
    return new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyZWY1MzEyMDg0MTY4MkMxRjNhNjg3YzNmNzE3MTVCNTlFRDk3Y2UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2MTk3OTAxMzcsIm5hbWUiOiJGaXJzdF9JUEZTX1Byb2plY3QifQ.r0vAnXmhBB_fm408oD9a3X-bSzHZJCZ3KfvX0Ha4jeU' })
  }
  
  getFiles () {
      const fileInput = document.querySelector('input[type="file"]')
      return fileInput.files
  }

  async storeFiles (files) {
    const client = this.makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }

  captureFile = (event) => {
    event.preventDefault()
    console.log("file captured", event.target.files[0].name);
    const file = event.target.files[0];
    this.setState({file : file});
    this.setState({tempName : file.name});
  }

  onSubmit = async (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...");
    // const cid = await putFiles(this.state.file.name);
    const uploadFile = this.getFiles();
    console.log("uploadFile", uploadFile);
    this.storeFiles(uploadFile).then((cid) => {
      console.log("cid", cid);
      this.setState({ memeHash: cid });
      this.setState({fileName : this.state.tempName});
      this.state.contract.methods.write(this.state.memeHash, this.state.fileName).send({ from: this.state.account })
    }).catch((err) => {console.log("error", err);});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="github.com/MumukshTayal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pic of the Day
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                
                  <img src={`https://${this.state.memeHash}.ipfs.dweb.link/${this.state.fileName}`} alt = "logo" />
                
                <p>&nbsp;</p>
                <h2>Change Meme</h2>
                <form onSubmit={this.onSubmit} >
                  <input type='file' onChange={this.captureFile} />
                  <input type='submit' />
                </form>
              </div>
              <div>
                {/* <FileUpload /> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
