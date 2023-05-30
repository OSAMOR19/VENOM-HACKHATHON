export const Token_Root = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{"name":"initialSupplyTo","type":"address"},
				{"name":"initialSupply","type":"uint128"},
				{"name":"deployWalletValue","type":"uint128"},
				{"name":"mintDisabled","type":"bool"},
				{"name":"burnByRootDisabled","type":"bool"},
				{"name":"burnPaused","type":"bool"},
				{"name":"remainingGasTo","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "supportsInterface",
			"inputs": [
				{"name":"answerId","type":"uint32"},
				{"name":"interfaceID","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"bool"}
			]
		},
		{
			"name": "disableMint",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"bool"}
			]
		},
		{
			"name": "mintDisabled",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"bool"}
			]
		},
		{
			"name": "burnTokens",
			"inputs": [
				{"name":"amount","type":"uint128"},
				{"name":"walletOwner","type":"address"},
				{"name":"remainingGasTo","type":"address"},
				{"name":"callbackTo","type":"address"},
				{"name":"payload","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "disableBurnByRoot",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"bool"}
			]
		},
		{
			"name": "burnByRootDisabled",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"bool"}
			]
		},
		{
			"name": "burnPaused",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"bool"}
			]
		},
		{
			"name": "setBurnPaused",
			"inputs": [
				{"name":"answerId","type":"uint32"},
				{"name":"paused","type":"bool"}
			],
			"outputs": [
				{"name":"value0","type":"bool"}
			]
		},
		{
			"name": "transferOwnership",
			"inputs": [
				{"name":"newOwner","type":"address"},
				{"name":"remainingGasTo","type":"address"},
				{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}
			],
			"outputs": [
			]
		},
		{
			"name": "name",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"string"}
			]
		},
		{
			"name": "symbol",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"string"}
			]
		},
		{
			"name": "decimals",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"uint8"}
			]
		},
		{
			"name": "totalSupply",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"uint128"}
			]
		},
		{
			"name": "walletCode",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"cell"}
			]
		},
		{
			"name": "rootOwner",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"address"}
			]
		},
		{
			"name": "walletOf",
			"inputs": [
				{"name":"answerId","type":"uint32"},
				{"name":"walletOwner","type":"address"}
			],
			"outputs": [
				{"name":"value0","type":"address"}
			]
		},
		{
			"name": "deployWallet",
			"inputs": [
				{"name":"answerId","type":"uint32"},
				{"name":"walletOwner","type":"address"},
				{"name":"deployWalletValue","type":"uint128"}
			],
			"outputs": [
				{"name":"tokenWallet","type":"address"}
			]
		},
		{
			"name": "mint",
			"inputs": [
				{"name":"amount","type":"uint128"},
				{"name":"recipient","type":"address"},
				{"name":"deployWalletValue","type":"uint128"},
				{"name":"remainingGasTo","type":"address"},
				{"name":"notify","type":"bool"},
				{"name":"payload","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "acceptBurn",
			"id": "0x192B51B1",
			"inputs": [
				{"name":"amount","type":"uint128"},
				{"name":"walletOwner","type":"address"},
				{"name":"remainingGasTo","type":"address"},
				{"name":"callbackTo","type":"address"},
				{"name":"payload","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "sendSurplusGas",
			"inputs": [
				{"name":"to","type":"address"}
			],
			"outputs": [
			]
		}
	],
	"data": [
		{"key":1,"name":"name_","type":"string"},
		{"key":2,"name":"symbol_","type":"string"},
		{"key":3,"name":"decimals_","type":"uint8"},
		{"key":4,"name":"rootOwner_","type":"address"},
		{"key":5,"name":"walletCode_","type":"cell"},
		{"key":6,"name":"randomNonce_","type":"uint256"},
		{"key":7,"name":"deployer_","type":"address"}
	],
	"events": [
	],
	"fields": [
		{"name":"_pubkey","type":"uint256"},
		{"name":"_timestamp","type":"uint64"},
		{"name":"_constructorFlag","type":"bool"},
		{"name":"name_","type":"string"},
		{"name":"symbol_","type":"string"},
		{"name":"decimals_","type":"uint8"},
		{"name":"rootOwner_","type":"address"},
		{"name":"walletCode_","type":"cell"},
		{"name":"totalSupply_","type":"uint128"},
		{"name":"burnPaused_","type":"bool"},
		{"name":"burnByRootDisabled_","type":"bool"},
		{"name":"mintDisabled_","type":"bool"},
		{"name":"randomNonce_","type":"uint256"},
		{"name":"deployer_","type":"address"}
	]
}

