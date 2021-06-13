pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract ShopContract {

    address public owner;
    struct User {
        string nickname;
        address wallet;
        string[] purchased;
        string role;
        uint register;
    }

    struct Product {
        string name;
        uint price;
    }


    mapping(address => User) public users;
    mapping(address => Product[]) public carts;
    mapping(address => string[]) public purchased;
    mapping(string => uint) public products;
    mapping(bytes32 => uint) public promocodes;
    mapping(address => uint) public balanceOf;

    constructor() public {
        owner = msg.sender;
        string[] memory _a;
        users[msg.sender] = User("admin", msg.sender, _a, "admin", 1);
        balanceOf[msg.sender] = 1 ether;
        products["prod 1"] = 100;
        products["prod 2"] = 400;
        products["flag"] = 2000;
    }

    function getCart() public returns (Product[] memory) {
        return carts[msg.sender];
    }

    function getPurchased() public returns(string[] memory){
        return purchased[msg.sender];
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyAdmin() {
        require(keccak256(abi.encodePacked("admin")) == keccak256(abi.encodePacked(users[msg.sender].role)));
        _;
    }

    function isRegister() public returns (bool){
        if(users[msg.sender].wallet == msg.sender) {
            return true;
        }
        return false;
    }

    function isAdmin() public returns (bool) {
        if(keccak256(abi.encodePacked(users[msg.sender].role)) == keccak256(abi.encodePacked("admin"))) {
            return true;
        }
        return false;
    }

    function isExist(bytes32 _promocode) public returns(uint) {
        return promocodes[_promocode];
    }

    function register(string memory _nickname, string memory _role) public {
        string[] memory _cart;
        users[msg.sender] = User(_nickname, msg.sender, _cart, _role, 1);
    }

    function createProduct(string memory _name, uint _price) public onlyAdmin returns(uint) {
        require(products[_name] == 0);
        products[_name] = _price;
    }

    function getPromocode(uint _amount) public onlyAdmin returns (bytes32) {
        return generatePromocode(_amount, msg.sender);   
    }

    function generatePromocode(uint _amount, address _wallet) public returns (bytes32) {
        require(_amount <= 1000);
        bytes32 promocode = keccak256(abi.encodePacked(_amount + uint(_wallet)));
        promocodes[promocode] = _amount;
        return promocode;
    }

    function addProductToCart(string memory _name, bytes32 _promocode) public {
        uint discount = promocodes[_promocode];
        uint price = products[_name];
        Product memory product = Product(_name, price - discount);
        carts[msg.sender].push(product);
    }

    // function getCart() public returns(string memory) {
    //     Product[] memory products = carts[msg.sender];
    //     uint len = products.length;
    //     string memory result;
    //     for (uint i = 0; i < len; i++) {
    //         result = products[i].name + ":" + products[i].price) + " "; 
    //     }
    //     return result;
    // }

    function buyProducts() public {
        require(balanceOf[msg.sender] >= summCart(msg.sender));
        balanceOf[msg.sender] -= summCart(msg.sender);
        Product[] memory _products = carts[msg.sender];
        for (uint i = 0; i < _products.length; i++) {
            purchased[msg.sender].push(_products[i].name);
        }

        carts[msg.sender].length = 0;
    }

    function summCart(address _wallet) public returns (uint) {
        uint sum = 0;
        Product[] memory _products = carts[_wallet];
        for(uint i = 0; i < _products.length; i++) {
            sum += _products[i].price;
        }
        return sum;
    }
}

//Не забыть сделать промокоды private(нет не делать пусть кто хочет тот достаёт())