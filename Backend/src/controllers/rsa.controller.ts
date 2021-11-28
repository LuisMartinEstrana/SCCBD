import { Request, Response } from 'express'

const crypto = require('crypto')

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa',{
    modulusLength: 2048
})
const pub123 = publicKey.export({
    type: "pkcs1",
    format: "pem"
})

export const publi = async (req: Request, res: Response) => {
    const pub = publicKey.export({
        type: "pkcs1",
        format: "pem"
    })
    console.log(publicKey.export({
        type: "pkcs1",
        format: "pem"
    }))
    console.log(privateKey.export({
        type: "pkcs1",
        format: "pem"
    }))
    return res.json({message: pub})
}

export const decipherMensaje = async (req: Request, res: Response) => {
    console.log(publicKey.export({
        type: "pkcs1",
        format: "pem"
    }))
    console.log(privateKey.export({
        type: "pkcs1",
        format: "pem"
    }))
    const {cifrado, firmado} = await req.body
    //Descifrar mensaje
    const decipher = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    },
    cifrado)
    console.log(decipher.toString())

    //Verificar
    const verificar = crypto.verify(
        "sha256",
        Buffer.from(firmado),
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING
        },
        firmado
    )

    if (verificar == true) {
        console.log(decipher.toString())
        return res.json({message: "Descifrado"})
    }else {
        return res.json({message: "No descifrado"})
    }
    
}

//El servidor envia un mensaje firmado al cliente para que verifique la firma
export const firmaServidor = async (req: Request, res: Response) => {
    const mensaje = "Firma del servidor para el cliente"
    const signature = crypto.sign("sha256", Buffer.from(mensaje), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    })
    console.log(signature)
    return res.json({message: signature.toString("hex")})
}


// 1. Cuando establece conexión con un cliente, envia la clave publica y el cliente encripta y firma el mensaje
export const getPublicKey = async (req: Request, res: Response) => {
    
    //Prueva:
    //Cifra el mensaje
    const mensaje = "Quiero encriptar esto"
    const cifrado = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    },
    Buffer.from(mensaje))
    console.log(cifrado.toString("base64"))

    //El servidor descifra el mensaje
    const decipher = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    },
    cifrado)
    console.log(decipher.toString())

    return res.json ({message: "HOLA"})
}