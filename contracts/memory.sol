pragma solidity ^0.5.0;

contract Memory {
  struct mymemory {
    uint id;
    string title;
	string date;
	string description;
	string photo;
  }
  mymemory[] public memories;
  uint public nextId = 1;

  function create(string memory title, string memory date, string memory description, string memory photo) public {
    memories.push(mymemory(nextId, title, date, description, photo));
    nextId++;
  }

  function read(uint id) view public returns(uint, string memory, string memory, string memory, string memory) {
    uint i = find(id);
    return(memories[i].id, memories[i].title, memories[i].date, memories[i].description,  memories[i].photo);
  }

  function update(uint id, string memory title, string memory date, string memory description, string memory photo) public {
    uint i = find(id);
    memories[i].title = title;
	memories[i].date = date;
    memories[i].description =description ;
    memories[i].photo = photo;
  }

  function destroy(uint id) public {
    uint i = find(id);
    delete memories[i];
  }

  function find(uint id) view internal returns(uint) {
    for(uint i = 0; i < memories.length; i++) {
      if(memories[i].id == id) {
        return i;
      }
    }
    revert('memory does not exist!');
  }

}
