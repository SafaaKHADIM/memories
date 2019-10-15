const Memory = artifacts.require('Memory');

contract('Memory', () => {
	let memory =null;
	before(async () =>{
		memory = await Memory.deployed();
	});
	
	it('should create a new memory', async()=> {
		await memory.create('voyage', '20janvuer2019', 'voyage au japon avec les amies', 'photo');
		const mymemory = await memory.read(1);
		assert(mymemory[0].toNumber() === 1);
		assert(mymemory[1] ==='voyage');
		assert(mymemory[2] ==='20janvuer2019');
		assert(mymemory[3] ==='voyage au japon avec les amies');
		assert(mymemory[4] ==='photo');
	});
	it('should update a memory', async()=> {
		await memory.update(1,'v','janvier', 'japon', 'pic');
		const mymemory = await memory.read(1);
		assert(mymemory[0].toNumber() === 1);
		assert(mymemory[1] ==='v');
		assert(mymemory[2] ==='janvier');
		assert(mymemory[3] ==='japon');
		assert(mymemory[4] ==='pic');
	});
	it('should not update a non existing memory', async()=> {
		try{
		await memory.update(2,'v','janvier', 'japon', 'pic');
		}catch(e){
			assert(e.message.includes('memory does not exist!'));
			return;
		}
		assert(false);
	});
	it('should destroy a  memory', async()=> {
		await memory.destroy(1);
		try{
		await memory.read(1);
		}catch(e){
			assert(e.message.includes('memory does not exist!'));
			return;
		}
		assert(false);	
	});
	
	it('should not destry a non existing memory', async()=> {
		try{
		await memory.destroy(10);
		}catch(e){
			assert(e.message.includes('memory does not exist!'));
			return;
		}
		assert(false);
	});
});


