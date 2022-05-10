const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Retiring tokens", function () {
  var BCT_Token;
  var Betterfund;
  var tokensToBeretired = "0.00001";

  before(async function () {
    accounts = await hre.ethers.getSigners();
    var betterFundInterface = await ethers.getContractFactory("BetterFund");
    var token = await ethers.getContractFactory("ERC20Custom");

    Betterfund = await betterFundInterface.deploy();
    await Betterfund.deployed();
    await (
      await Betterfund.init("0xf2438A14f668b1bbA53408346288f3d7C71c10a1", {
        gasLimit: 2500000,
        gasPrice: accounts[0].getGasPrice(),
      })
    ).wait();

    BCT_Token = new ethers.Contract(
      "0xf2438A14f668b1bbA53408346288f3d7C71c10a1",
      token.interface,
      accounts[0]
    );
    console.log(await BCT_Token.balanceOf(accounts[0].address));
  });

  it("Should transfer some tokens to contract and check its balance", async function () {
    await (
      await BCT_Token.transfer(
        Betterfund.address,
        ethers.utils.parseEther(tokensToBeretired),
        { gasLimit: 2500000, gasPrice: accounts[0].getGasPrice() }
      )
    ).wait();
    expect(
      Number(await BCT_Token.balanceOf(Betterfund.address))
    ).to.be.greaterThanOrEqual(
      Number(ethers.utils.parseEther(tokensToBeretired))
    );
  });

  it("Should retire the tokens", async function () {
    await (
      await expect(
        Betterfund.RedeemBCTTRetireTCO2(
          ethers.utils.parseEther(tokensToBeretired),
          { gasLimit: 2500000, gasPrice: accounts[0].getGasPrice() }
        )
      ).to.not.be.reverted
    ).wait();
  });
});
