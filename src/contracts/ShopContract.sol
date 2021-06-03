pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;
import './ZNToken.sol';

contract ShopContract {

    address public owner;
    ZNToken public znToken;
    struct User {
        string nickname;
        address wallet;
        uint balance;
        string[] purchased;
        string role;
    }

    struct Product {
        string name;
        uint price;
    }


    mapping(address => User) public users;
    mapping(address => Product[]) public carts;
    mapping(string => uint) public products;
    mapping(bytes32 => uint) private promocodes;
    mapping(address => string[]) public purchased;

    constructor(ZNToken _znToken) public {
        owner = msg.sender;
        znToken = _znToken;
        string[] memory _a;
        users[msg.sender] = User("admin", msg.sender, 300000, _a, "admin");
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyAdmin() {
        require(keccak256(abi.encodePacked("admin")) == keccak256(abi.encodePacked(users[msg.sender].role)));
        _;
    }

    function register(string memory _nickname, string memory _role) public {
        string[] memory _cart;
        users[msg.sender] = User(_nickname, msg.sender, 0, _cart, _role);
    }

    function createProduct(string memory _name, uint _price) public onlyAdmin returns(uint) {
        require(products[_name] == 0);
        products[_name] = _price;
    }

    function generatePromocode(uint amount) public onlyAdmin returns (bytes32) {
        require(amount <= 1000);
        bytes32 promocode = keccak256(abi.encodePacked(amount + uint(msg.sender)));
        promocodes[promocode] = amount;
        return promocode;
    }

    function addProductToCart(string memory _name, bytes32 _promocode) public {
        uint discount = promocodes[_promocode];
        uint price = products[_name];
        Product memory product = Product(_name, price - discount);
        carts[msg.sender].push(product);
    }

    function buyProducts() public {
        require(users[msg.sender].balance >= summCart(msg.sender));
        //ZNToken.transfer(owner, sumCart(msg.sender));
        users[msg.sender].balance -= summCart(msg.sender);
        Product[] memory _products = carts[msg.sender];
        for (uint i = 0; i < _products.length; i++) {
            purchased[msg.sender].push(_products[i].name);
        }
    }

    function summCart(address _wallet) public returns (uint) {
        uint sum = 0;
        Product[] memory _products = carts[_wallet];
        for(uint i = 0; i < _products.length; i++) {
            sum += _products[i].price;
        }
        return sum;
    }

    function balanceOf() public returns(uint) {
        return users[msg.sender].balance;
    }
}

//Не забыть сделать промокоды private(нет не делать пусть кто хочет тот достаёт())