const ethers = require("ethers") // Biblioteca WEB3
const fs = require("fs") // Trabalhar com arquivos
require("dotenv").config() // Para acessar as variáveis de ambiente

async function main() {    
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    
    const abi = fs.readFileSync("./SimpleStorage_sol_Armazenamento.abi", "utf-8")
    const binary = fs.readFileSync("./SimpleStorage_sol_Armazenamento.bin", "utf-8")
    
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Fazendo deploy, aguarde ...")
    const contract = await contractFactory.deploy() // Função await espera isso ocorrer para seguir com o código (precisa estar em uma async function)
    await contract.deployTransaction.wait(1) // Espera mais um pouco para a transação ser efetuada com sucesso
    console.log(`Endereço do contrato: ${contract.address}`)

    const num = await contract.leNumero()
    console.log(`Numero: ${num.toString()}`) // Js não consegue ler um valor tão grande

    const updateNum = await contract.salvaNumero("7")
    await updateNum.wait(1)

    const novoValor = await contract.leNumero()
    console.log(`Novo valor: ${novoValor}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })


async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    
    const abi = fs.readFileSync("./SimpleStorage_sol_Armazenamento.abi", "utf-8")
    const binary = fs.readFileSync("./SimpleStorage_sol_Armazenamento.bin", "utf-8")
}