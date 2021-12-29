const ethers = require('ethers');
require("dotenv").config();
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const axios = require('axios');
const abicoder = new ethers.utils.AbiCoder()
const {complete_tx,load_accounts_excel} = require('../utils')

let keys = process.env.KEYS.split(",");

function get_invite_data(address)
{
    return '0x65b8e524' + abicoder.encode(["address"],[address]).slice(2)
}

async function invite(wallet,address)
{
    var tx_data = get_invite_data(address)
    await complete_tx('invite '+address,wallet.sendTransaction({to:'0xf1869edab2c3ab3461f2a2bc521a016c75e90553',data:tx_data,gasLimit:500000}),3)
}
async function startloop()
{
    // 无脑邀请x+1个人
    
    var wallets = load_accounts_excel('../new_matcha.xls');
    
    var cur_idx = 0

    while (cur_idx < length)
    {
        if (cur_idx + 1 < length)
        {
            await invite(wallets[cur_idx],wallets[cur_idx+1].address)
        }
        else if (cur_idx+2 < length)
        {
            await invite(wallets[cur_idx],wallets[cur_idx+2].address)
        }
        else if (cur_idx + 3 < length)
        {
            await invite(wallets[cur_idx],wallets[cur_idx+3].address)
        }
        else if (cur_idx + 4 < length)
        {
            await invite(cur_idx[cur_idx],cur_idx[cur_idx+4].address)
        }
        else if (cur_idx + 5 < length)
        {
            await invite(wallets[cur_idx],wallets[cur_idx+5].address)
        }
        cur_idx = cur_idx + 1;
    }
}

startloop()