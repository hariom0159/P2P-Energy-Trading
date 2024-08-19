// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EnergyTrading{

    //User Data String: Use in Admin Portal
    struct User{
        bytes32 id;
        string area;
        string typ;
        string hash;
        uint256 balance;
    }

    //Use in Buy Units
     struct Order{
        bytes32 pid;
        bytes32 cid;
        string area;
        uint256 kwh;
        uint256 price;
        uint256 cbal;
        uint256 time;
    }

    struct MyStruct {
        bytes32 id;
        string area;
        uint256 kwh;
        uint256 price;
        uint256 time;
    }
    
    Order[] public allOrders;
    event FCalled(MyStruct[] _a);
    
    User[] public allUsers;

    function addUser(string memory id, string memory area, string memory typ, string memory hash, uint256 balance) public payable returns(bytes32){
        uint256 flag = 0;
        bytes32 _id = keccak256(abi.encodePacked(id));

        for(uint i=0; i<allUsers.length; ++i){
            if(allUsers[i].id == _id){
                flag = 1;
            }
            else if(keccak256(abi.encodePacked(allUsers[i].hash)) == keccak256(abi.encodePacked(hash))){
                flag = 2;
            }
        }

        if(flag == 0){
            allUsers.push(User(_id, area, typ, hash, balance));
        }

        return allUsers[allUsers.length - 1].id;
    }

    function addBalance(string memory id, uint256 balance) public payable returns(uint256){
        bytes32 _id = keccak256(abi.encodePacked(id));

        for(uint i=0;i<allUsers.length; ++i){
            if(allUsers[i].id == _id){
                allUsers[i].balance = allUsers[i].balance + balance;
            }
        }

        return allUsers[allUsers.length - 1].balance;
    }

    function subBalance(string memory id, uint256 balance) public payable returns(uint256){
        bytes32 _id = keccak256(abi.encodePacked(id));

        for(uint i=0;i<allUsers.length; ++i){
            if(allUsers[i].id == _id){
                allUsers[i].balance = allUsers[i].balance - balance;
            }
        }

        return allUsers[allUsers.length - 1].balance;
    }

    function viewBalance(string memory id) public view returns(uint256){
        bytes32 _id = keccak256(abi.encodePacked(id));

        for(uint i=0;i<allUsers.length; ++i){
            if(allUsers[i].id == _id){
                return allUsers[i].balance;
            }
        }

        return 65536;
    }

    function addOrder(string memory pid, string memory cid, string memory area, uint kwh, uint price, uint cbal) public payable returns (bytes32){
        
        uint flag = cbal - (price*kwh);

        bytes32 _pid = keccak256(abi.encodePacked(pid));
        bytes32 _cid = keccak256(abi.encodePacked(cid));

        uint time = block.timestamp;

        if(flag >=0 ){
            cbal = flag;
            allOrders.push(Order(_pid, _cid, area, kwh, price, cbal, time));
        }

        return allOrders[allOrders.length-1].pid;
    }

    function viewHash(string memory id) public view returns (string memory){

        bytes32 _id = keccak256(abi.encodePacked(id));
        for(uint i=0;i<allUsers.length;i++)
        {
            if(allUsers[i].id == _id){
                return allUsers[i].hash;
            }
        }

        return "user404";
    }

    function viewCustOrder(string memory id) public {
        uint count = 0;
        bytes32 _id = keccak256(abi.encodePacked(id));
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].cid == _id)
            {
                count = count + 1;
            }
        }
        MyStruct[] memory a = new MyStruct[](count);
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].cid == _id)
            {
                a[i] = MyStruct(allOrders[i].pid, allOrders[i].area, allOrders[i].kwh, allOrders[i].price, allOrders[i].time);
            }
        }

        emit FCalled(a);
    }

    function viewProsOrder(string memory id) public {
        uint count = 0;
        bytes32 _id = keccak256(abi.encodePacked(id));
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].pid == _id)
            {
                count = count + 1;
            }
        }
        MyStruct[] memory a = new MyStruct[](count);
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].pid == _id)
            {
                a[i] = MyStruct(allOrders[i].cid, allOrders[i].area, allOrders[i].kwh, allOrders[i].price, allOrders[i].time);
            }
        }

        emit FCalled(a);
    }

    function stringsEquals(string storage _a, string memory _b) internal view returns (bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
        for (uint i = 0; i < a.length; i ++)
        {
            if (a[i] != b[i])
                return false;
        }
        return true;
    }
}