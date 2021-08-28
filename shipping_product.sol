// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Owner {
    struct ShippingCompany {
        string name;
        address shipper_account;
        string cnpj;
    }

    struct Driver {
        string name;
        address driver_account;
        string cpf;
    }

    struct Dimensions {
        uint256 width;
        uint256 height;
        uint256 weight;
    }

    struct Product {
        string name;
        Dimensions dimensions;
    }

    struct Client {
        string cpf;
        string name;
        string client_address;
        uint256 client_id;
    }

    struct Agreement {
        bool company;
        bool client;
    }
    struct Started{
        bool value;
        Agreement agreement;
    }   
    struct Status {
        Started started;
        // struct on_going{
        //   uint code;
        //   bool value;
        // };
        // struct finished{
        //   uint code;
        //   bool value;
        // };
    }

    struct Travel {
        int256 trip_cost;
        string from;
        string to;
        Status status;
        Product product;
        Client client;
        ShippingCompany shippingCompany;
        Driver driver;
    }

    Client client;
    Product product;

    //  function setClient() public {
    //     client = Client('859.627.940-79','Robertinho', 'TP', 1);
    //  }

    //  function setProduct() public {
    //     product = Product('Suco', '');
    //  }

    function changeStatus(value){
        if(msg.sender == company.company_address ){
            altera estado
        }else if(msg.sender == company.client_address ){
             altera estado
        }else if(msg.sender == company.client_address ){

        }else{
            erro
        }
    }


    mapping(uint256 => Travel) travels;

    function createTravel(Driver driver, ) public view return (uint256){

    }

    // function createClient(payload) private {
    //     return new Client(payload);
    // }

    // function getBookId() public view returns (uint256) {
    //     return client.client_id;
    // }

    // function handleChangeStatus(){
      
    // }

    // // event for EVM logging
    // event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // // modifier to check if caller is owner
    // modifier isOwner() {
    //     // If the first argument of 'require' evaluates to 'false', execution terminates and all
    //     // changes to the state and to Ether balances are reverted.
    //     // This used to consume all gas in old EVM versions, but not anymore.
    //     // It is often a good idea to use 'require' to check if functions are called correctly.
    //     // As a second argument, you can also provide an explanation about what went wrong.
    //     require(msg.sender == owner, "Caller is not owner");
    //     _;
    // }

    // /**
    //  * @dev Set contract deployer as owner
    //  */
    // constructor() {
    //     owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
    //     emit OwnerSet(address(0), owner);
    // }

    // /**
    //  * @dev Change owner
    //  * @param newOwner address of new owner
    //  */
    // function changeOwner(address newOwner) public isOwner {
    //     emit OwnerSet(owner, newOwner);
    //     owner = newOwner;
    // }

    // /**
    //  * @dev Return owner address
    //  * @return address of owner
    //  */
    // function getOwner() external view returns (address) {
    //     return owner;
    }
}
