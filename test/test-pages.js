var expect = require('chai').expect;
var request = require('request');
var chai = require('chai');

const server = require('../index.js');

chai.use(require('chai-http'));

describe('STATUS TESTING',function(){
	it('STATUS CHECK CREATE NEW PAGE',function(){
		return chai.request(server).get('/new').then(function(res){
			expect(res).to.have.status(201);
		});
	});
	
	it('STATUS CHECK STORING1',function(){
		return chai.request(server).post('/create').send({username: 'bhavya',password: '12'}).then(function(res){
			expect(res).to.have.status(400);
			expect(res).to.be.json;
       		expect(res.body.message).to.equal("Already exists!");
		});
	});
	
	it('STATUS CHECK LISTING USERS',function(){
		return chai.request(server).get('/list_users').then(function(res){
			expect(res).to.have.status(201);
		});
	});
	
});

describe('OUTPUT TESTING',function(){
	it('CHECK OUTPUT OF CREATING PAGE',function(){
		return chai.request(server).post('/create').send({username: 'ABC',password: 'haha'}).then(function(res){
			expect(res).to.be.json;
			expect(res).to.have.status(201);
			expect(res.body.CREATED).to.equal(true);
		});
	});
});