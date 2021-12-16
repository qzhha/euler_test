
const xlsx = require('node-xlsx');
const fs = require('fs');


function batch_create_account(count, excel_path, provider) {
    var accounts = new Array()
    var header = new Array('address', 'public_key', 'private_key', 'mnemonic')
    var data_raws = new Array()

    data_raws.push(header)
    for (var i = 0; i < count; ++ i) {
        var account = Wallet.createRandom()
        accounts.push(new Wallet(account.privateKey, provider))
        data_raws.push(new Array(account.address, account.publicKey, account.privateKey, account.mnemonic.phrase))
        console.log(account.address, account.publicKey, account.privateKey, account.mnemonic.phrase)
    }
    if (excel_path != '') {

        var data = [{
            name : 'accounts',
            data : data_raws
        }]

        var buffer = xlsx.build(data)

        var callback = (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('completed export to', excel_path)
            }
        }
        fs.open(excel_path,'w',function(err, fd) { 
            if (err) 
            { 
                return console.error(err);
            }
            fs.writeFile(excel_path, buffer, callback);
            fs.close(fd);
        });
    }
    return accounts
}

function load_accounts_excel(excel_path, provider) 
{
    var accounts = new Array();
    var sheets = xlsx.parse(excel_path)
    var data_raws = sheets[0].data
    var row_cnt = data_raws.length
    for (var i = 1; i < row_cnt; ++i)
    {
        var rowData = data_raws[i];
        var col_cnt = rowData.length
        if (rowData.length < 4)
        {
            console.log("xls format error");
            continue;
        }
        console.log(rowData[0].toString(), rowData[2].toString().substr(2))
        accounts.push(new Wallet(rowData[2].toString().substr(2), provider));
    }
    return accounts;
}


async function complete_tx(msg, response, confirms)
{
    console.log('--',msg, '...')
    try {
        var res = await response
        var rec = await res.wait(confirms = !!confirms?confirms:6)
    }catch(e) {
        console.log('--',msg, 'failed')
        throw e
    }
    console.log('--',msg, 'done')                                  
    return rec
}

const EULER_TEST_COIN = [
'0x95689Faeed6691757Df1AD48B7beA1B8Acf2dABe',
'0xB7fe2334CD47383C17bfb97B09823F11cc1A91B8',
'0xCAfC3274Ba43825fCDCcE3D3263132A399658C7D',
'0x5D4553bc5dE02216322306A8f5ed8398eCB6d411',
'0x8230335ea1980A124678fF2297Be692cF2FDE6BE',
'0x318010fe8ee7c627e60dcfBF52A16fA79c22ad5F',
'0x604a8d0AAdD03AF55Fbf4445468d6bC90A94aF8B',
'0x19bBa4A58dD289635c48a407542D5B815e4f7094',
'0x92470540255656BA36EF50fC9dba77011922284d',
'0x6F37e457464B7D605F468FAB68F4f64ac48C2dEa'
]

module.exports = {
    networks : {
        MAINNET : 1,
        ROPSTEN : 3,
    },
    EULER_COIN_LIST : EULER_TEST_COIN,
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
