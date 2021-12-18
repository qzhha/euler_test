const erc20 = [
    'function name() view returns (string name)',
    'function symbol() view returns (string symbol)',
    'function decimals() view returns (uint8 decimal)',
    'function totalSupply() view returns (uint256 totalSupply)',
    'function balanceOf(address _owner) view returns (uint256 balance)',      
    'function transfer(address _to, uint _value) returns (bool success)',     
    'function transferFrom(address _from, address _to, uint _value) returns (bool success)',
    'function approve(address _spender, uint256 _value) payable returns (bool success)',
    'function allowance(address _owner, address _spender) view returns (uint remaining)',
    'event Transfer(address indexed _from, address indexed _to, uint _value)',
    'event Approval(address indexed _owner, address indexed _spender, uint _value)',
    'function deposit(uint256 _pid, uint256 _wantAmt, address _sponsor)'      
]                                    
const uniswap = [
    'function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline) payable',
    'function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) payable',
]

const erc721 =
[
     'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)'
]

const polygonNFTSale_url = 'https://api.polygonscan.com/api?module=contract&action=getabi&address=0x9ed4b724dab2c201ef1942348360be77329c0347'

module.exports = {
NFTSale_url: polygonNFTSale_url,
erc20 : erc20,
erc721 : erc721,
uniswap : uniswap,
}
                                                                                                                                                               