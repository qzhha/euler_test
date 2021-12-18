const {utils,wait,net_url} = require('./utils')
const config = require('./config')
const {NFTSale_url} = require('./abi')
const axios = require('axios')


const {ethers,Wallet,Contract} = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(net_url.MATIC)
const chumbi_addr = '0x9eD4b724dAb2C201Ef1942348360Be77329c0347'

async function listenEvent()
{
    console.log(await provider.getNetwork())
    // 监听最新区块，查看当中
    var num = await provider.getBlockNumber()
    while(true)
    {
        var new_num = await provider.getBlockNumber()
        if (new_num > num)
        {
            console.log("get latest block:%s",new_num)
            var blk = await provider._getBlock(new_num)
            console.log(blk.transactions)
            for (var i in transactions)
            {
                console.log(transactions[i])
            }
            break
        }
    }
    
    /* 
    //检测新块
    //查看新块上监控地址的动作
    var wallet = new Wallet(config.pri_key,provider)
    console.log(wallet.address)
    
    const rsp = await axios.post(NFTSale_url)
    if (rsp.status != 200)
    {
        return
    }
    

    const abi = rsp.data.result
    console.log(abi)

    var contract = new Contract(chumbi_addr,abi,provider)
    while(true)
    {
        contract._runningEvents
        wait(1)
    }
    */

}

listenEvent()