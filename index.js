const express = require('express')
const server = express()
const usuarios = ["Joao", "Maria", "Bruxa"]
server.use(express.json())

//Middlewares
server.use((req,res,next)=>{
console.log(`Metodo: ${req.method} Url: ${req.url}`)
return next()
})

function checkNomeExistis(req, res, next){
    if(!req.body.nome){
        return res.status(400).json({error:'O nome é requerido!'})
    }

    return next()
}

function checkIndexExistis(req,res,next){
    if(!usuarios[req.params.index]){
        return res.status(400).json({error: 'O usuario nao existe!'})
    }
    return next()
}

//Busca usuario por index
server.get('/users/:index', checkIndexExistis, (req, res) => {
    // return res.send('Olá!')

    // const nome = req.query.nome
    // return res.send({'mensagem': `Olá ${nome}`})

    const index = req.params.index
    return res.send({ 'mensagem': `${usuarios[index]}` })
})

//Busca todos os usuarios
server.get('/users', (req, res) => {
    return res.json(usuarios)
})

//Cria usuario
server.post('/users', checkNomeExistis, (req, res) => {
const nome = req.body.nome
usuarios.push(nome)
return res.json(usuarios)
})

//Edita usuario
server.put('/users/:index', checkIndexExistis, checkNomeExistis, (req,res)=>{
    const index = req.params.index
    const novoNome = req.body.nome
    usuarios[index] = novoNome
    return res.json(usuarios)
})

//Deleta usuario
server.delete('/users/:index', checkIndexExistis, (req,res)=>{
    const index = req.params.index
    usuarios.splice(index,1)
    return res.send()
})

server.listen(3000)
