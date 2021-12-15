const {
    ethers,
    Provider,
    Wallet,
    BigNumber,
    utils,
    Contract,
    constants
} = require('ethers');

const {
    complete_tx
} = require('./utils');

const axios = require('axios')

const faucet_contract = '0xEacEC657dAd8923e057f62EB7F0D6b10ede1E716'
const rpc_url = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
const faucet_abi_url = 'http://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xeacec657dad8923e057f62eb7f0d6b10ede1e716&format=raw'


async function main()
{
    const faucet_abi = await axios.get(faucet_abi_url)
    console.log(faucet_abi)
}

main()