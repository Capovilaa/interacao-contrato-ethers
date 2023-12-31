// Esse arquivo vai encriptar a Wallet

const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

async function main(){
    // Função que encripta e salva em um arquivo json    
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD, process.env.PRIVATE_KEY)
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })