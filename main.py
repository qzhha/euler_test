from eth_abi import decode_abi,encode_abi
from eth_utils import to_bytes

data = '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000006e4bd95e5b09140416c6578000000000000000000000000000000000000000000'
r = decode_abi(['uint256','uint256','bytes32'],to_bytes(hexstr=data[10:]))
print(r)
print(r[2].decode('utf-8'))

input_data = data[:10] + encode_abi(['uint256','uint256','bytes32'],[r[0],r[1],bytes('test',encoding='utf-8')]).hex()
print(input_data)

