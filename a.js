const ethers = require("ethers") // Biblioteca WEB3
const fs = require("fs") // Trabalhar com arquivos
require("dotenv").config() // Para acessar as variáveis de ambiente

async function main() {
    // Para se conectar com a blockchain da Ganache (de maneira segura encriptando e usando variáveis)
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // Maneira segura
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8")
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD) // Desencripta com uma senha
    // wallet = await wallet.connect(provider) // Realiza a conexão

    // Arquivos que foram criados do contrato
    const abi = fs.readFileSync("./SimpleStorage_sol_Armazenamento.abi", "utf-8")
    const binary = fs.readFileSync("./SimpleStorage_sol_Armazenamento.bin", "utf-8")

    // Para fazer o deploy de fato, Ganache precisa estar rodando
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Fazendo deploy, aguarde ...")
    const contract = await contractFactory.deploy() // Função await espera isso ocorrer para seguir com o código (precisa estar em uma async function)
    await contract.deployTransaction.wait(1) // Espera mais um pouco para a transação ser efetuada com sucesso
    console.log(`Endereço do contrato: ${contract.address}`)

    // Acessar funções do contrato
    // Se for uma function view, não terá custo pois está apenas visualizando uma informação da Blockchain    
    // Se for outra que altera o estado, terá que fazer mais um await para confirmar que a transação ocorreu

    // Mostra valor
    const num = await contract.leNumero()
    console.log(`Numero: ${num.toString()}`) // Js não consegue ler um valor tão grande

    // Alterar valor
    const updateNum = await contract.salvaNumero("7")
    await updateNum.wait(1)

    // Mostra novo valor
    const novoValor = await contract.leNumero()
    console.log(`Novo valor: ${novoValor}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })