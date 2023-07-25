const { expect } = require("chai")
const { ethers } = require("hardhat")


describe("first series of tests for erc20 introduction project",function(){

    let token;
    let accounts;
    const amount = ethers.utils.parseEther("3");
    //the above line will take input in str format and convert to ether/wei format


    before(async ()=>{
        accounts=await ethers.getSigners();
        const contract = await ethers.getContractFactory("AKToken");
        token= await contract.deploy();
        await token.deployed();
    })


    it("assigning initial balance", async function(){  
        const totalSupply =await token.totalSupply();
        expect(await token.balanceOf(accounts[0].address)).to.equal(totalSupply);
    })


    it("trasfer from owner to some account", async function(){
        await token.transfer(accounts[1].address, 10000);
        expect(await token.balanceOf(accounts[1].address)).to.equal(10000);
    })


    it("transfer from different account to some account", async function(){
        const wallet = await token.connect(accounts[1]);
        await wallet.transfer(accounts[2].address, 5000);
        expect(await wallet.balanceOf(accounts[1].address)).to.equal(await wallet.balanceOf(accounts[2].address));
    })


    it("do not have permission to mint token", async function(){
        const wallet = token.connect(accounts[2]);
        await expect(wallet.mint(accounts[2].address, 10000)).to.be.reverted;
    })


    it("do not have permission to burn token", async function(){
        const wallet = token.connect(accounts[3]);
        await expect(wallet.burn(accounts[1].address, 10000)).to.be.reverted;
    })

    

    it("buy token with ether", async function(){
        const wallet = token.connect(accounts[3]);
        const option = {value:amount};
        const calc = amount.mul(1000);
        await wallet.buy(option);
        expect(await wallet.balanceOf(accounts[3].address)).to.equal(calc);
        
    })


    it("you do not have permission to withdraw ethers from a non-owner account", async function(){
        const wallet = token.connect(accounts[4]);
        await expect(wallet.withdraw(1)).to.be.reverted;
    })


    it("test minting token", async function()
    {
        const before_mint = await token.balanceOf(accounts[0].address);
        await token.mint(accounts[0].address, amount);
        const after_mint = await token.balanceOf(accounts[0].address);
        expect(after_mint).to.equal(before_mint.add(amount));
    })


    it("test burn token", async function()
    {
        
        const before_burn = await token.balanceOf(accounts[0].address);
        await token.burn(accounts[0].address, amount);
        const after_burn = await token.balanceOf(accounts[0].address);
        expect(after_burn).to.equal(before_burn.sub(amount));
    })


    it("withdraw ethers from smart contract", async function(){
        const before_withdraw = await accounts[0].getBalance();
        await token.withdraw(amount);
        const after_withdraw = await accounts[0].getBalance();
        expect(before_withdraw.lt(after_withdraw)).to.equal(true);
    })

    it("do not have enough ether to buy token", async()=>{
        const wallet = token.connect(accounts[3]);
        const big_amount = ethers.utils.parseEther("999");
        const option = {value:big_amount};
        let error;
        try{
            await wallet.buy(option);
        }catch(err){
            error="sender does not have enough funds";
        }
        expect(error).to.equal("sender does not have enough funds");
    })

})



//bb85ce5f-fde9-43e4-9ee4-58555df17ead