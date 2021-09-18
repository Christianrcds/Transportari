import web3 from "./web3";

const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = [
  {
    inputs: [{ internalType: "uint256", name: "travel_id", type: "uint256" }],
    name: "alterAgreement",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xad117a69",
  },
  {
    inputs: [],
    name: "check",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x919840ad",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      {
        internalType: "address payable",
        name: "client_wallet",
        type: "address",
      },
      { internalType: "string", name: "cpf", type: "string" },
      { internalType: "string", name: "client_address", type: "string" },
    ],
    name: "createClient",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x992481e4",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      {
        internalType: "address payable",
        name: "driver_wallet",
        type: "address",
      },
      { internalType: "string", name: "cpf", type: "string" },
    ],
    name: "createDriver",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xdb589f92",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      {
        internalType: "address payable",
        name: "shipper_wallet",
        type: "address",
      },
      { internalType: "string", name: "cnpj", type: "string" },
    ],
    name: "createShippingCompany",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x6ee58194",
  },
  {
    inputs: [
      { internalType: "address", name: "driver_wallet", type: "address" },
      { internalType: "address", name: "client_wallet", type: "address" },
      { internalType: "address", name: "shipper_wallet", type: "address" },
      { internalType: "uint256", name: "travel_cost", type: "uint256" },
      { internalType: "string", name: "from", type: "string" },
      { internalType: "string", name: "product_name", type: "string" },
      { internalType: "uint256", name: "weight", type: "uint256" },
      { internalType: "uint256", name: "width", type: "uint256" },
      { internalType: "uint256", name: "height", type: "uint256" },
    ],
    name: "createTravel",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xef2f8743",
  },
  {
    inputs: [],
    name: "depositToContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xc8f781c2",
  },
  {
    inputs: [
      { internalType: "address", name: "client_wallet", type: "address" },
    ],
    name: "getClient",
    outputs: [
      {
        components: [
          { internalType: "string", name: "cpf", type: "string" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "client_address", type: "string" },
          {
            internalType: "address payable",
            name: "client_wallet",
            type: "address",
          },
        ],
        internalType: "struct TravelManager.Client",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xa0e32870",
  },
  {
    inputs: [
      { internalType: "address", name: "driver_wallet", type: "address" },
    ],
    name: "getDriver",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "address payable",
            name: "driver_wallet",
            type: "address",
          },
          { internalType: "string", name: "cpf", type: "string" },
        ],
        internalType: "struct TravelManager.Driver",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x65c301ab",
  },
  {
    inputs: [
      { internalType: "address", name: "shipper_wallet", type: "address" },
    ],
    name: "getShippingCompany",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "address payable",
            name: "shipper_wallet",
            type: "address",
          },
          { internalType: "string", name: "cnpj", type: "string" },
        ],
        internalType: "struct TravelManager.ShippingCompany",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x3bfcea9e",
  },
  {
    inputs: [{ internalType: "uint256", name: "travel_id", type: "uint256" }],
    name: "getTravel",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "travel_cost", type: "uint256" },
          { internalType: "string", name: "from", type: "string" },
          { internalType: "string", name: "to", type: "string" },
          {
            components: [
              { internalType: "bool", name: "client", type: "bool" },
              { internalType: "bool", name: "driver", type: "bool" },
              { internalType: "bool", name: "shipping_company", type: "bool" },
              { internalType: "uint8", name: "current_status", type: "uint8" },
            ],
            internalType: "struct TravelManager.Status",
            name: "status",
            type: "tuple",
          },
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              {
                components: [
                  { internalType: "uint256", name: "width", type: "uint256" },
                  { internalType: "uint256", name: "height", type: "uint256" },
                  { internalType: "uint256", name: "weight", type: "uint256" },
                ],
                internalType: "struct TravelManager.Dimensions",
                name: "dimensions",
                type: "tuple",
              },
            ],
            internalType: "struct TravelManager.Product",
            name: "product",
            type: "tuple",
          },
          {
            components: [
              { internalType: "string", name: "cpf", type: "string" },
              { internalType: "string", name: "name", type: "string" },
              {
                internalType: "string",
                name: "client_address",
                type: "string",
              },
              {
                internalType: "address payable",
                name: "client_wallet",
                type: "address",
              },
            ],
            internalType: "struct TravelManager.Client",
            name: "client",
            type: "tuple",
          },
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              {
                internalType: "address payable",
                name: "shipper_wallet",
                type: "address",
              },
              { internalType: "string", name: "cnpj", type: "string" },
            ],
            internalType: "struct TravelManager.ShippingCompany",
            name: "shipping_company",
            type: "tuple",
          },
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              {
                internalType: "address payable",
                name: "driver_wallet",
                type: "address",
              },
              { internalType: "string", name: "cpf", type: "string" },
            ],
            internalType: "struct TravelManager.Driver",
            name: "driver",
            type: "tuple",
          },
        ],
        internalType: "struct TravelManager.Travel",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xc5de6286",
  },
];

export default new web3.eth.Contract(abi, address);
