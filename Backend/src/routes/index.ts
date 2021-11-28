import { Router } from "express";

import { getPublicKey, publi, decipherMensaje, firmaServidor } from '../controllers/rsa.controller'


const router = Router()

//localhost:4000/

//-----------------------//
//--------.-RSA----------//
//-----------------------//

//Estabecer conexión
//Envia la clave publica
router.get('/rsa', publi)

//Recibir un mensaje y descifrar y lo verificar
router.post('/rsa', decipherMensaje)

//Firma del servidor
router.get('/rsa/sign', firmaServidor)

//Prueva
router.get('/', getPublicKey)


export default router