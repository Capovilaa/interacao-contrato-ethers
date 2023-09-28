// SPDX-License-Identifier: MIT

pragma solidity 0.8.7; // Dizendo a versão que vamos usar

contract Armazenamento{
    address carteira = 0x95E7851B6a390dA02c6552D4dd28af202e5630BF;

    // Variável
    uint256 numero;    
    Pessoa[] public pessoa;

    // Struct igual do C, será acessado por objetos depois
    struct Pessoa {
        uint numero;
        string nome;
    }    

    // Mapear algo para que seja chamado por "nomeParaNumeroFavorito"
    mapping (string => uint256) public nomeParaNumeroFavorito;

    // Função que armazena dados (virtual para dizes que esta pode ser sobrescrita)
    function salvaNumero(uint256 _numero) public virtual {
        numero = _numero;
    }

    // Função que lê dados
    function leNumero() public view returns (uint256){
        return numero;
    }

    // Função adicionar um novo objeto pessoa à lista
    // Precisa setar o tipo de armazenamento, onde memory e calldata ficam apenas disponíveis temporariamentes
    // Storage armazena de fato a variável e essa pode ser vista fora

    function adicionaPessoa(string memory _nome, uint _numero) public {
        pessoa.push(Pessoa(_numero, _nome));
        // Aqui adiciona ao mapping, para que possa buscar pela chave o valor
        nomeParaNumeroFavorito[_nome] = _numero;
    }
}