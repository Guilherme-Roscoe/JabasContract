/*const main = async () => {
    //Copila o contrato e gera os códigos necessários para trabalhar com ele no diretório artifacts
    const waveContract = await hre.ethers.deployContract("WavePortal"); //hre é a abreviação de Hardhat Runtime Environment, um objeto que contém todas as funcionalidades do Hardhart ao executar uma tarefa, teste ou script
    await waveContract.waitForDeployment(); //Isso faz com que o hardhat crie uma rede Ethereum local, apenas para este contrato, e a destrua quando após a conclusão do script
    console.log("Contrato implantado em:", waveContract.target); // Printa o endereço do contrato no console, para possibilitar encontrá-lo no meio de outros contratos.
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
} )*/

const main = async () => {
    const waveContract = await hre.ethers.deployContract("WavePortal", {value: hre.ethers.parseEther('0.1') });
    await waveContract.waitForDeployment();
    console.log("Contrato implantado em ", waveContract.target);

    // Varificar o saldo do contrato    
    let saldo = await hre.ethers.provider.getBalance(
        waveContract.target
    );

    console.log("Saldo:", hre.ethers.formatEther(saldo));

    //Enviar uma mensagem
    let waveTxn = await waveContract.wave("Hello World!");
    await waveTxn.wait();

    //Ver o saldo novamente após o envio

    saldo = await hre.ethers.provider.getBalance(waveContract.target);
    console.log("Saldo atual: ", hre.ethers.formatEther(saldo));

    let allWaves = await waveContract.getTodasWaves();
    console.log(allWaves)

};


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

