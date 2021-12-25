const {ROPSTEN,networks,complete_tx,EULER_COIN_LIST,faucet_abi_url,rpc_url,net_url} = require('../utils');
const axios = require('axios')
const {ethers,Wallet,BigNumber,utils,Contract,constants} = require('ethers');

const rbn_addr = '0x8799b1095ba49f499ab66b9bfa8f6d2ac4e62e6b'
const usdc_addr = '0xf1c735564171b8728911adaacbeca1a23294aa98'
const yfi_addr = '0xa8daa10c0e6ddf98c5e64f1ee5331b1368581e54'

const lp_addr = '0x9db95307ffd122323cf297ac91145c2155e3eb62'

const usdc_mint_data = '0x40c10f190000000000000000000000006de680887c6291c892fbe5f1541964edd0fc1e7a000000000000000000000000000000000000000000000000000000174876e800'
const rbn_mint_data = '0x40c10f190000000000000000000000006de680887c6291c892fbe5f1541964edd0fc1e7a0000000000000000000000000000000000000000000000008ac7230489e80000'
const yfi_mint_data  = '0x40c10f190000000000000000000000006de680887c6291c892fbe5f1541964edd0fc1e7a0000000000000000000000000000000000000000000000008ac7230489e80000'


const rbn_approve_data = '0x095ea7b30000000000000000000000009db95307ffd122323cf297ac91145c2155e3eb620000000000000000000000000000000000000000000000008ac7230489e80000'
const usdc_approve_data = '0x095ea7b30000000000000000000000009db95307ffd122323cf297ac91145c2155e3eb62000000000000000000000000000000000000000000000000000000000081c4bf'
const rbn_usdc_lp_data = '0xaa02d4ac9e7bf7c77f60e25551ee5edc00ea714125707e6457a917f0b2ea2585145b034f0000000000000000000000008799b1095ba49f499ab66b9bfa8f6d2ac4e62e6b000000000000000000000000f1c735564171b8728911adaacbeca1a23294aa980000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000081c4bf000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004fb5ebe5644e21f'

const yfi_approve_data= '0x095ea7b30000000000000000000000009db95307ffd122323cf297ac91145c2155e3eb620000000000000000000000000000000000000000000000004563918244f40000'
const yfi_usdc_lp_data = '0xaa02d4aca071d8daeea126a898b53b2e3f337e14ca4732512b735a453b0ce8efe03f4308000000000000000000000000a8daa10c0e6ddf98c5e64f1ee5331b1368581e54000000000000000000000000f1c735564171b8728911adaacbeca1a23294aa980000000000000000000000000000000000000000000000004563918244f4000000000000000000000000000000000000000000000000000000000025966644d9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004a6d7c83543127a'

// mint (who, val)
async function interact_once(wallet)
{
    console.log("start interact:%s",wallet.address)
    //await complete_tx("mint_rbn",wallet.sendTransaction({to : rbn_addr,data : rbn_mint_data,gasLimit : 500000}),3)
    //await complete_tx("mint_usdc",wallet.sendTransaction({to : usdc_addr,data : usdc_mint_data,gasLimit : 500000}),3)
    await complete_tx("rbn_approve",wallet.sendTransaction({to:rbn_addr,data:rbn_approve_data,gasLimit:500000}),3)
    await complete_tx("usdc_approve",wallet.sendTransaction({to:usdc_addr,data:usdc_approve_data,gasLimit:500000}),3)
    await complete_tx("rbn_usdc_lp",wallet.sendTransaction({to:lp_addr,data:rbn_usdc_lp_data,gasLimit:500000}),3)

    await complete_tx("mint_yfi",wallet.sendTransaction({to : yfi_addr,data : yfi_mint_data,gasLimit : 500000}),3)
    await complete_tx("mint_usdc",wallet.sendTransaction({to : usdc_addr,data : usdc_mint_data,gasLimit : 500000}),3)
    await complete_tx("yfi_approve",wallet.sendTransaction({to:yfi_addr,data:yfi_approve_data,gasLimit:500000}),3)
    await complete_tx("usdc_approve",wallet.sendTransaction({to:usdc_addr,data:usdc_approve_data,gasLimit:500000}),3)
    await complete_tx("yfi_usdc_lp",wallet.sendTransaction({to:lp_addr,data:yfi_usdc_lp_data,gasLimit:500000}),3)

    console.log("end interact:%s".wallet.address)
}

module.exports = {
    interact: interact_once
}