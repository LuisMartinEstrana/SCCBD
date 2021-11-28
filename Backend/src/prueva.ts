const crypt = require('crypto')

class RSA {
    publicKey: any
    privateKey: any
    constructor(publicKey: any, privateKey: any){
        this.publicKey = publicKey
        this.privateKey = privateKey
    }

    //Generar par de claves
    const generarclaves = async (req: Request, res: Response) => {
        const { publicKey, privateKey} = crypt.generateKeyPairSync('rsa', {
            modulusLength: 2048
        })
        this.publicKey = publicKey.export({
            type: "pkcs1",
            format: "pem"
        })
        this.privateKey = privateKey.export({
            type:"pkcs1",
            format: "pem"
        })
    }

    //La clave publica se comparte con el cliente y el cliente la utilizaria para encryptar
    encrytp() {
        const mensaje = "Quiero encriptar este mensaje"
        const mensajeCifrado = crypt.publicEncrypt({
            key: this.publicKey,
            padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256"
        })
        Buffer.from(mensajeCifrado)
        console.log(mensajeCifrado.toString("base64"))
    }

}

//crear un documento documet.write("HOLA")