const {ethers,Wallet,utils,Contract} = require('ethers');
const {load_accounts_excel,ROPSTEN,networks,complete_tx,EULER_COIN_LIST,faucet_abi_url,rpc_url,net_url} = require('./utils');
const {erc20} = require('./abi') // base abi
const config = require('./config')
const axios = require('axios')
const primitive = require('./primitive_finance/primitive')
const addr_json = require('./euler-abi/addresses/euler-addresses-ropsten.json')
const sysargs = require('minimist')(process.argv.slice(2))

// --- contract addr ---
const faucet_contract_addr = '0xEacEC657dAd8923e057f62EB7F0D6b10ede1E716'
// --- contract addr ---

// --- contract abi ---
const euler_json = require('./Euler_sol_Euler.json')
const exec_json = require('./euler-abi/contracts/modules/Exec.sol/Exec.json')
const etoken_json = require('./euler-abi/contracts/modules/EToken.sol/EToken.json')
const dtoken_json = require('./euler-abi/contracts/modules/DToken.sol/DToken.json')
const market_json = require('./euler-abi/contracts/modules/Markets.sol/Markets.json')
// --- contract abi ---



const provider = new ethers.providers.JsonRpcProvider(net_url.RINKEBY)


async function get_test_coin(wallet)
{
    const faucet_abi_req = await axios.get(faucet_abi_url)
    if (faucet_abi_req.status != 200)
    {
        console.log("abi req err. code:%s",faucet_abi_req.status)
        return
    }

    const faucet_abi = faucet_abi_req.data.result
    //console.log(faucet_abi)
    console.log("use wallet:%s\n",wallet.address)
    var faucet_contract = new Contract(faucet_contract_addr,faucet_abi,wallet)

    for (var i in EULER_COIN_LIST)
    {
        await complete_tx('withdraw:'+EULER_COIN_LIST[i],faucet_contract.withdraw(EULER_COIN_LIST[i]),{gasLimit:500000})

        console.log("get coin :%s\n",EULER_COIN_LIST[i])
    }
}

function getitems(type,wallet,amount)
{
    const etoken_addr = addr_json['modules']['eToken']
    const dtoken_addr = addr_json['modules']['dToken']
    const market_addr = addr_json['modules']['markets']

    console.log(etoken_addr)

    const etoken = new Contract(etoken_addr,etoken_json['abi'],wallet)
    const dtoken = new Contract(dtoken_addr,dtoken_json['abi'],wallet)
    const market = new Contract(addr_json['modules']['markets'],market_json['abi'],wallet)

    const items = []
    switch(type){
        case "deposit":
        {
            items.push(
                {
                    allowError: false,
                    proxyAddr: etoken_addr,
                    data: etoken.interface.encodeFunctionData("deposit", [0,amount]),
                },
                {
                    allowError: false,
                    proxyAddr: market_addr,
                    data: market.interface.encodeFunctionData("enterMarket",[1,market_addr])
                }
            )
            break
        }
    }
    return items
}

async function deposit(wallet,token_addr)
{
    var exec_contract = new Contract(addr_json['exec'],exec_json['abi'],wallet)
    var token_contract = new Contract(token_addr,erc20,wallet)
    

    //await complete_tx("approve "+token_addr,token_contract.approve(wallet.address,constants.MaxUint256))
    
    var balance = await token_contract.balanceOf(wallet.address)
    console.log("balance:%s",utils.formatEther(balance))

    //get items
    var items = getitems("deposit",wallet,balance)
    var address = []
    address.push(wallet.address)
    await complete_tx("dispatch",exec_contract.batchDispatch(items,address,{gasLimit:500000}))


}

async function primitive_fi(pri)
{
    var wallet = new Wallet(pri,provider)
    await primitive.interact(wallet)
}

async function main()
{
    //await get_test_coin(wallet)
    //await deposit(wallet,ROPSTEN.WBTC)
    var accounts = load_accounts_excel('./new_matcha.xls',provider)
    for (var i = 0 ;i < accounts.length; ++i)
    {   
        console.log("start interact:%s",accounts[i].address)
        primitive.interact(accounts[i]) 
    }
}

async function express_abi(abi)
{
    const iface = new ethers.utils.Interface(abi);
    console.log(iface.getFunction("0xeb937aeb"))
}

//primitive_fi(sysargs["pri"])
main()

