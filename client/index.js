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
 //   if(typeof window.ethereum !== 'undefined') {
   //   const web3 = new Web3(window.ethereum);
   //   window.ethereum.enable()
   //     .then(() => {
  //       resolve(
   //         new Web3(window.ethereum)
   //       );
   //     })
    //    .catch(e => {
    //      reject(e);
    //    });
 //     return;
  //  }
  //  if(typeof window.web3 !== 'undefined') {
  //    return resolve(
  //      new Web3(window.web3.currentProvider)
  //    );
   // }
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
	//const $createResult = document.getElementById('create-result');
	const $read = document.getElementById('read');
	//const $readResult = document.getElementById('read-result');
	const $edit = document.getElementById('update');
	const $find = document.getElementById('find');
	//const $editResult = document.getElementById('edit-result');
	const $delete = document.getElementById('delete');
	//const $deleteResult = document.getElementById('delete-result');
	let accounts = [];
	
	web3.eth.getAccounts().then(_accounts =>{
		accounts = _accounts;
	});
	//create
	$create.addEventListener('submit',e => {
		e.preventDefault();
		const title = e.target.elements[0].value;
		const date = e.target.elements[1].value;
		const description = e.target.elements[2].value;
		const photo = e.target.elements[3].value;
		_memory.methods.create(title, date, description, photo)
					.send({from: accounts[0]})
					.then(() => {
						$createResult.innerHTML = `New user ${name} was succefully created!`;
					}).catch(() =>{
						$createResult.innerHTML = `there was an error whiile creating the user ${name}`;
					});
	});
	
	
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
	$find.addEventListener('submit',e => {
		e.preventDefault();
		const id = e.target.elements[0].value;
		
		_memory.methods.find(id)
					.send({from: accounts[0]})
					.then(result => {
						index = result;
					}).catch(() =>{
						
					});
	});
	
	
	//edit
	$edit.addEventListener('submit',e => {
		e.preventDefault();
		const title = e.target.elements[0].value;
		const date = e.target.elements[1].value;
		const description = e.target.elements[0].value;
		const photo = e.target.elements[1].value;
		_memory.methods.update(index, title, date, description, photo)
					.send({from: accounts[0]})
					.then(() => {
						
					}).catch(() =>{
						
					});
	});
	
	
	
	
	
	
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
