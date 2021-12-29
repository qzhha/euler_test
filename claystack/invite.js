const ethers = require('ethers');
require("dotenv").config();
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const axios = require('axios');
const abi = require('../abi');

//let keys = process.env.KEYS.split(",");

async function start()
{
    const abi_req = await axios.get('http://api-goerli.etherscan.io/api?module=contract&action=getabi&address=0x1b8CCBf5E8dBE1599905349E24b92a61175F9A10&format=raw')
    if (abi_req.status != 200)
    {
        console.log("get abi err.%s",abi_req.status)
        return
    }

    console.log(abi_req)
}

start()