const {ethers,Wallet,BigNumber,utils,Contract,constants} = require('ethers');
const {ROPSTEN,networks,complete_tx,EULER_COIN_LIST,faucet_abi_url,rpc_url} = require('./utils');
const {erc20} = require('./abi')

const euler_abi = require('./Euler_sol_Euler.json')
const exec_abi = require('./euler-abi/contracts/modules/Exec.sol/Exec.JsonRpcProvider')
const config = require('./config')
const axios = require('axios')
const addr_json = require('./euler-abi/addresses/euler-addresses-ropsten.json')

// --- contract addr ---
const faucet_contract_addr = '0xEacEC657dAd8923e057f62EB7F0D6b10ede1E716'
// --- contract addr ---

// --- contract abi ---
const etoken_json = require('./euler-abi/contracts/modules/EToken.sol/EToken.json')
const dtoken_json = require('./euler-abi/contracts/modules/DToken.sol/DToken.json')
// --- contract abi ---



const provider = new ethers.providers.JsonRpcProvider(rpc_url)


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

function getitems(type)
{
    const items = []
    switch(type){
        case "deposit":
        {
            
            break
        }
    }
}

async function deposit(wallet,token_addr)
{
    var exec_contract = new Contract(addr_json['exec'],exec_abi,wallet)
    var token_contract = new Contract(token_addr,erc20,wallet)

    await complete_tx("approve "+token_addr,token_contract.approve(wallet.address,constants.MaxUInt256))

    //get items

    await complete_tx("dispatch",exec_contract.batchDispatch())


}

async function main()
{
    
    var wallet = new Wallet(config.pri_key,provider)
    get_test_coin(wallet)
}

async function express_abi(abi)
{
    const iface = new ethers.utils.Interface(abi);
    console.log(iface.getFunction("0xeb937aeb"))
}

//main()

//express_abi(exec_abi)

