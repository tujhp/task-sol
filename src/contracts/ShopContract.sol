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
        products["Ticket 1"] = 100;
        products["Ticket 2"] = 500;
        products["Flag"] = 2000;
    }

    function clearCart() public {
        carts[msg.sender].length = 0;
    }
    function getCart() public returns (Product[] memory) {
        return carts[msg.sender];
    }

    function getPurchased() public returns(string[] memory){
        return purchased[msg.sender];
    }

    function deposit() public payable {
        require(msg.value <= 0.5 ether && balanceOf[msg.sender] + (msg.value / 100000000000000) <= 500);
        balanceOf[msg.sender] += msg.value / 100000000000000;
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

    function register(string memory _nickname, string memory _role) public {
        string[] memory _cart;
        users[msg.sender] = User(_nickname, msg.sender, _cart, _role, 1);
    }

    function createProduct(string memory _name, uint _price) public onlyOwner returns(uint) {
        require(products[_name] == 0);
        products[_name] = _price;
    }

    function getPromocode(uint _amount) public onlyAdmin returns (bytes32) {
        return generatePromocode(_amount, msg.sender);   
    }

    function generatePromocode(uint _amount, address _wallet) public onlyAdmin returns (bytes32) {
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