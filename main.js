const {
    ethers,
    Wallet,
    BigNumber,
    utils,
    Contract,
    constants
} = require('ethers');

const {
    ROPSTEN,
    networks,
    complete_tx,
    EULER_COIN_LIST
} = require('./utils');

const config = require('./config')

const axios = require('axios')

const faucet_contract_addr = '0xEacEC657dAd8923e057f62EB7F0D6b10ede1E716'
const rpc_url = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
const faucet_abi_url = 'https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xeacec657dad8923e057f62eb7f0d6b10ede1e716'

const provider = new ethers.providers.JsonRpcProvider(rpc_url)

//[{"inputs":[{"internalType":"uint256","name":"_threshold","type":"uint256"}],
//"stateMutability":"nonpayable","type":"constructor"},
//{"inputs":[{"internalType":"uint256","name":"_threshold","type":"uint256"}]
//,"name":"setThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},
//{"inputs":[{"internalType":"address","name":"token","type":"address"}],
//"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function get_test_coin(wallet)
{
    const faucet_abi_req = await axios.get(faucet_abi_url)
    if (faucet_abi_req.status != 200)
    {
        console.log("abi req err. code:%s",faucet_abi_req.status)
        return
    }

    const faucet_abi = faucet_abi_req.data.result
    console.log(faucet_abi)
    console.log("use wallet:%s\n",wallet.address)
    var faucet_contract = new Contract(faucet_contract_addr,faucet_abi,wallet)

    for (var i in EULER_COIN_LIST)
    {
        await complete_tx('withdraw:'+i,faucet_contract.withdraw(EULER_COIN_LIST[i]),{gasLimit:500000})

        console.log("get coin :%s\n",EULER_COIN_LIST[i])
    }
}

async function main()
{
    
    var wallet = new Wallet(config.pri_key,provider)
    get_test_coin(wallet)
}

main()
