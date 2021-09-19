// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TravelManager {
    struct ShippingCompany {
        string name;
        address payable shipper_wallet;
    }

    struct Driver {
        string name;
        address payable driver_wallet;
    }

    struct Client {
        string name;
        string client_address;
        address payable client_wallet;
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

    struct Status {
        bool client;
        bool driver;
        bool shipping_company;   
        uint8 current_status; //0 not started, 1 started, 2 on going, 3 finished
    }

    struct Travel {
        uint256 travel_cost;
        string from;
        string to;
        Status status;
        Product product;
        Client client;
        ShippingCompany shipping_company;
        Driver driver;
    }
    
    mapping(uint256 => Travel) travels;
    uint256 travels_size = 0;
    mapping(address => Driver) drivers;
    mapping(address => Client) clients;
    mapping(address => ShippingCompany) shipping_companies;

    function buildStatus() private pure returns (Status memory){
            Status memory status;
            status.client = false;
            status.shipping_company = true;
            status.driver = false;
            status.current_status = 0;
            
            return status;
    }

    function createTravel(address driver_wallet, address client_wallet, address shipper_wallet, 
        uint256 travel_cost, string memory from, string memory product_name, uint256 weight, 
        uint256 width, uint256 height) public returns (uint256) {
            
            Dimensions memory dimensions;
            dimensions.width = width;
            dimensions.height = height;
            dimensions.weight = weight;

            Product memory product;
            product.name = product_name;
            product.dimensions = dimensions;
      
            Travel memory travel;
            travel.travel_cost = travel_cost;
            travel.from = from;
            travel.to = getClient(client_wallet).client_address;
            travel.status = buildStatus();
            travel.product = product;
            travel.client = getClient(client_wallet);
            travel.shipping_company = getShippingCompany(shipper_wallet);
            travel.driver = getDriver(driver_wallet);

            travels[travels_size] = travel;
            travels_size +=1;
            return 1;
    }

    function createShippingCompany(string memory name, address payable shipper_wallet) public returns (uint256) {
        if(shipping_companies[shipper_wallet].shipper_wallet == shipper_wallet){
            return 0;
        }
        
        ShippingCompany memory shipping_company;
        
        shipping_company.name = name;
        shipping_company.shipper_wallet = shipper_wallet;

        shipping_companies[shipper_wallet] = shipping_company;
    
        return 1;
    }
        
    function getShippingCompany(address shipper_wallet) public view returns (ShippingCompany memory){
        return shipping_companies[shipper_wallet];
    }

    function createDriver(string memory name, address payable driver_wallet) public returns (uint256) {
        if(drivers[driver_wallet].driver_wallet == driver_wallet){
            return 0;
        }
        
        Driver memory driver;
        
        driver.name = name;
        driver.driver_wallet = driver_wallet;

        drivers[driver_wallet] = driver;
    
        return 1;
    }
        
    function getDriver(address driver_wallet) public view returns (Driver memory){
        return drivers[driver_wallet];
    }

    function createClient(string memory name, address payable client_wallet, string memory client_address) public returns (uint256) {
        if(clients[client_wallet].client_wallet == client_wallet){
            return 0;
        }
        
        Client memory client;
        
        client.name = name;
        client.client_wallet = client_wallet;
        client.client_address = client_address;

        clients[client_wallet] = client;
    
        return 1;
    }
        
    function getClient(address client_wallet) public view returns (Client memory){
        return clients[client_wallet];
    }
    
    function checkCurrentStatusUpdate(uint256 travel_id) private{
        Travel memory _travel = travels[travel_id];

        //Se todos concordaram o status vai para o próximo passo
        if(_travel.status.shipping_company && _travel.status.client && _travel.status.driver){
            _travel.status.current_status += 1;
            
            if(_travel.status.current_status == 1){
                // payDriver1(_travel.driver.driver_wallet, travel_id);   
                _travel.status.shipping_company = false;
                _travel.status.driver = false;
            }

            if(_travel.status.current_status == 2){
                   _travel.status.driver = false;
                   _travel.status.client = false;
            }

            if(_travel.status.current_status == 3 && _travel.status.driver == true && _travel.status.client == true){
                payDriver2(_travel.driver.driver_wallet, travel_id);
            }
        }

        travels[travel_id] = _travel;
    }

    function getTravel(uint256 travel_id) public view returns(Travel memory){
        return travels[travel_id];
    }

    function getTravels() public view returns(Travel[] memory){
        Travel[] memory ret = new Travel[](travels_size);
        for (uint i = 0; i < travels_size; i++) {
            ret[i] = travels[i];
        }
        return ret;
    }

    function alterAgreement(uint256 travel_id) public payable returns(uint) {
        Travel memory _travel = travels[travel_id];
        
        if(msg.sender == _travel.shipping_company.shipper_wallet  && _travel.status.shipping_company == false) {
            if(_travel.status.current_status == 1){
                if(msg.value == _travel.travel_cost/2) {
                    depositToContract();
           } else{
               return 0;
           } 
           }
            _travel.status.shipping_company = true;
        } 

        if(msg.sender == _travel.driver.driver_wallet  && _travel.status.driver == false) {
            if(_travel.status.current_status == 1){
                payDriver1(_travel.driver.driver_wallet, travel_id);   
            }
            
            _travel.status.driver = true;
        }
        
        if(msg.sender == _travel.client.client_wallet && _travel.status.client == false) {
            if(msg.sender.balance > _travel.travel_cost && _travel.status.current_status == 0 ){
                if(msg.value == _travel.travel_cost) {
                    payShippingCompany(travel_id);
                } else {
                    return 0;
                }
            } 
        
            _travel.status.client = true;
        } 

        travels[travel_id] = _travel;
        checkCurrentStatusUpdate(travel_id);

        return 1;
    }

    //valor vai direto para a transportadora
    function payShippingCompany(uint256 travel_id) internal returns(bool) {
        Travel memory _travel = travels[travel_id];
        
        _travel.shipping_company.shipper_wallet.transfer(msg.value);
    
        return true;
    }
    
    //valor cai na conta do contrato e é pago pela transportadora
    function depositToContract() public payable{}

    function payDriver1(address payable driver, uint256 travel_id) internal{
        Travel memory _travel = travels[travel_id];
    
        driver.transfer(_travel.travel_cost/4);
    }

    function payDriver2(address payable driver, uint256 travel_id) internal{
        Travel memory _travel = travels[travel_id];

        driver.transfer(_travel.travel_cost/4);
    }

    function check() external view returns (uint){
        return address(this).balance;
    }
}







// not started = todos,

// started = shipping_company, driver.

// on_going = client, driver.

// finished.



    // Client 
    // alterAgrement -> paguei a transportadora com o travel_cost. 

    // AlterAgreement 1: 
    // shipping_company -> 50% do travel_cost eu deposito no contrato. -> 

    // Motorista -> Recebe 30% do que tem no contrato. 

    // AlterAgreement 3:
    // Motora e cliente confirmam -> Motora recebe 70% faltantes.