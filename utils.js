
async function complete_tx(msg, response, confirms)
{
    console.log('--',msg, '...')
    try {
        var res = await response
        var rec = await res.wait(confirms = !!confirms?confirms:1)
    }catch(e) {
        console.log('--',msg, 'failed')
        throw e
    }
    console.log('--',msg, 'done')                                  
    return rec
}

module.exports = {
    networks : {
        MAINNET : 1,
        ROPSTEN : 3,
    },
    ETH_MAIN_COIN : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ROPSTEN: {
        // 参考：https://discord.com/channels/742749441697513632/780875050751623298/919243496920088639
        USDC : '0x95689Faeed6691757Df1AD48B7beA1B8Acf2dABe',
        DAI  : '0xB7fe2334CD47383C17bfb97B09823F11cc1A91B8',
        USDT : '0xCAfC3274Ba43825fCDCcE3D3263132A399658C7D',
        UNI  : '0x5D4553bc5dE02216322306A8f5ed8398eCB6d411',
        AAVE : '0x8230335ea1980A124678fF2297Be692cF2FDE6BE',
    },
    complete_tx: complete_tx,
}
