const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Retiring tokens", function () {
  var BCT_Token;
  var Betterfund;
  var tokensToBeretired = "0.00001";
  let impersonatedAccount;

  before(async function () {
    if (network.name === "hardhat") {
      const addressToImpersonate = process.env.ADDRESS_TO_IMPERSONATE || "";
      await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addressToImpersonate],
      });
      impersonatedAccount = await ethers.getSigner(addressToImpersonate);
    }

    accounts = await hre.ethers.getSigners();
    var betterFundInterface = await ethers.getContractFactory(
      "BetterFund",
      impersonatedAccount
    );
    var token = await ethers.getContractFactory(
      "ERC20Custom",
      impersonatedAccount
    );

    Betterfund = await betterFundInterface.deploy();
    await Betterfund.deployed({
      gasLimit: 2500000,
      gasPrice: impersonatedAccount.getGasPrice(),
    });

    await (
      await Betterfund.init("0x2F800Db0fdb5223b3C3f354886d907A671414A7F", {
        gasLimit: 2500000,
        gasPrice: impersonatedAccount.getGasPrice(),
      })
    ).wait();

    BCT_Token = new ethers.Contract(
      "0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
      token.interface,
      impersonatedAccount
    );
  });

  it("Should transfer some tokens to contract and check its balance", async function () {
    await (
      await BCT_Token.connect(impersonatedAccount).transfer(
        Betterfund.address,
        ethers.utils.parseEther(tokensToBeretired),
        { gasLimit: 2500000, gasPrice: impersonatedAccount.getGasPrice() }
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
        Betterfund.connect(impersonatedAccount).RedeemBCTTRetireTCO2(
          ethers.utils.parseEther(tokensToBeretired),
          { gasLimit: 2500000, gasPrice: impersonatedAccount.getGasPrice() }
        )
      ).to.not.be.reverted
    ).wait();
  });
});
