const {wait,net_url} = require('./utils')
const config = require('./config')
const {NFTSale_url} = require('./abi')
const axios = require('axios')
const HavaABI = require('./hav')


const {ethers,Wallet,Contract,utils} = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(net_url.BSC)
const chumbi_addr = '0x9eD4b724dAb2C201Ef1942348360Be77329c0347'
const milk_addr = '0x9447e3ed2a23572f7be359216321f7e67b364bac'

async function listenEvent()
{
    //检测新块
    //查看新块上监控地址的动作
    var wallet = new Wallet(config.pri_key,provider)
    var contract = new Contract(milk_addr,HavaABI,provider)

    filter = {
        address: milk_addr,
        topics: [
            utils.id("Harvest(address,uint256,uint256)")
        ]
    }
    var _map = new Map()
    var _cnt = 0
    provider.on(filter,(data) => {
        console.log(data)
        return
        /*
        _map.set(to.address,_map.get(to.address)+1)
        _cnt = _cnt + 1
        console.log(from)
        if (_cnt > 10) {
            console.log("cnt add!")
            for (let [k, v] of _map.entries()) {
                console.log(k + " 次数:" + v)
            }
        }
        */
        //console.log("some one harvest:%s",from.address)
    })

    
    
    /*
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
    }*/
 

}

async function monitor_someone()
{
    
}

//listenEvent()