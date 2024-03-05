//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; //especifica a versão do copilador solidity a ser usado

import "hardhat/console.sol"; //Debugar contratos inteligentes é desafiador então essa linha importa um arquivo do hardhart que facilita esse processo

//Ao iniciar o contrato, o construtor será executado e imprimirá a mensagem nos console
//contract WavePortal {
//    constructor(){
//        console.log("Hello World");
//    }
//}

//define a estrutura do contrato
contract WavePortal {
    event novaOnda(address indexed from, uint256 timestamp, string message);

    uint256 public totalWaves; //cria uma variável publica que armazena permanentemente na área de armazenamento do contrato
    uint256 totalHi;
    //define uma strutura que armazenará os detalhes da onda
    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
    }

    //declara uma lista publica para armazenar as ondas
    Wave[] public waves;

    constructor() payable {
        console.log("Ueba, eu sou um contrato inteligente!");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s mandou uma mensagem!", msg.sender); //msg.sender é o endereço da carteira que chamou a função
    
        //Cria uma uma nova instância de Wave chamada newWave com os detalhes necessários
        Wave memory newWave = Wave({
            waver: msg.sender,
            timestamp: block.timestamp,
            message: _message
        });

        //Registra a nova onda
        waves.push(newWave);

        emit novaOnda(msg.sender, block.timestamp, _message);

        uint256 valor_premio = 0.0002 ether;

        require(
            valor_premio <= address(this).balance, 
            "Saque maior do que disponivel no contrato."
        );

        (bool success, ) = (msg.sender).call{value: valor_premio}("");
        require(success, "Falha no saque.");
    
    }

    function getTodasWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getWave(uint256 index) public view returns (address, uint256, string memory) {
        //Verificar se o indice está dentro do alcance
        require(index < totalWaves, "Numero inexistente");
    
        //Encontra a onda na lista de waves
        Wave storage wave_result = waves[index];
        return (wave_result.waver, wave_result.timestamp, wave_result.message);
    }

    function hi() public {
        totalHi += 1;
        console.log("%s deu Oizinho!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Temos um total de %d tchauzinhos e %d Oizinhos!", totalWaves, totalHi);
        return totalWaves;
    }


}

