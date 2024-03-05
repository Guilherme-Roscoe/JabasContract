const main = async () => {
    let provider = ethers.getDefaultProvider();
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await provider.getBalance(deployer.address);

    console.log("Implantando contratos com a conta: ", deployer.address);
    console.log("Saldo em conta: ", accountBalance.toString());

    const Token = await hre.ethers.deployContract("WavePortal", { value: hre.ethers.parseEther("0.1") });
    const portal = await Token.waitForDeployment();

    console.log("WavePortal address: ", portal.target);
};

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});