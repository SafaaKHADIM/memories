import Web3 from 'web3';
import Memory from '../build/contracts/Memory.json';
import "../assets/css/style.css";
import"../assets/css/bootstrap.min.css"
//import"../assets/css/bootstrap.min.css.map"
import"../assets/css/now-ui-dashboard.css"
//import"../assets/css/now-ui-dashboard.css.map"
//import"../assets/css/now-ui-dashboard.min.css"

let web3;
let _memory;
let index;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Memory.networks)[0];
  return new web3.eth.Contract(
    Memory.abi, 
    Memory
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
	const $create = document.getElementById('create');
	const $read = document.getElementById('read');
	const $edit = document.getElementById('update');
	const $find = document.getElementById('find');
	const $delete = document.getElementById('delete');
	const $titleUpdate = document.getElementById('title-update');
	const $dateUpdate = document.getElementById('date-update');
	const $descriptionUpdate = document.getElementById('description-update');
	const $photoUpdate = document.getElementById('photo-update');
	let accounts = [];	
	web3.eth.getAccounts().then(_accounts =>{
		accounts = _accounts;
	});
	
	
	//create
	if($create){
	$create.addEventListener('submit',e => {
				console.log("inside the create function");

		e.preventDefault();
		const title = e.target.elements[0].value;
		const date = e.target.elements[1].value;
		const description = e.target.elements[2].value;
		const photo = e.target.elements[3].value;
		_memory.methods.create(title, date, description, photo)
					.send({from: accounts[0], gas:3000000})
					.then(() => {
						console.log("created successfully");
					}).catch(e =>{					
						console.log("oooops there was an error : " + e );
						
					});
	});
	}
	
	//read
//	$read.addEventListener('submit',e => {
//		e.preventDefault();
//		const id = e.target.elements[0].value;
//		const id = e.target.elements[0].value;
//		const id = e.target.elements[0].value;
//		const id = e.target.elements[0].value;
//		_memory.methods.read(id)
//					.call()
//					.then(result => {
//						//$readResult.innerHTML = `Id: ${result[0]}, Name:${result[1]} `;
//					}).catch(() =>{
//						//$readResult.innerHTML = `there was an error whiile trying to read  the user ${id}`
//					});
//	});




	//find
	if($find){
	$find.addEventListener('submit',e => {
		console.log("inside the find function");
		e.preventDefault();
		
		const id = e.target.elements[0].value;		
		_memory.methods.find(id)
				.call({from: accounts[0]})
					.then(result => {
						index = result+1;
						console.log(result);
						
						_memory.methods.read(result+1).call()
								.then(result => {
									console.log(result);
									$titleUpdate.value = result[1];
									$dateUpdate.value = result[2];
									$descriptionUpdate.value = result[3];
									$photoUpdate.value = result[4];
									console.log("yeeeey we did read the memory we want to update")
								}).catch(() =>{
									console.log("Ooooops there is an error we couldn t read the mrmory we want to update");
								});	
						
						
					}).catch( error =>{		
						console.log("oooops an error while looking for the memory "+error);
					});
				
	});
	}
	
	//edit
	if($edit){
	$edit.addEventListener('submit',e => {
		console.log("inside edit function");
		console.log(index);
		e.preventDefault();
		const title = e.target.elements[0].value;
		const date = e.target.elements[1].value;
		const description = e.target.elements[0].value;
		const photo = e.target.elements[1].value;
		_memory.methods.update(index, title, date, description, photo)
					.send({from: accounts[0], gas:3000000})
					.then(() => {
						console.log("memory updated succefully");
					}).catch(error =>{
						console.log("oooops there was en error : "+error);						
					});
	});
	}
	
	
	
	
	
	//delete 
//	$delete.addEventListener('submit',e => {
//		e.preventDefault();
//		const id = e.target.elements[0].value;
//		_memory.methods.destroy(id)
//					.send({from: accounts[0]})
//					.then(() => {
////						$deleteResult.innerHTML = `the user ${id} was deleted succefully!`;
//					}).catch(() =>{
//						$deleteResult.innerHTML = `there was an error whiile deleting the user ${id}`;
//					});
//	});
	
	
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      _memory = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
