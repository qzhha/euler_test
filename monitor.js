const utils = require('./utils')
const config = require('./config')

const {ethers,Wallet} = require('ethers')

//监听合约事件
const provider = new ethers.providers.JsonRpcProvider(utils.net_url.BSC)

async function listenEvent()
{
    let wallet = new Wallet(config.pri_key,provider)
    console.log(wallet.address)
}

listenEvent()