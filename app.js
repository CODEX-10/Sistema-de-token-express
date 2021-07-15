const express = require('express')
const jwt = require('jsonwebtoken') // gera e verifica tokens: comentar quando passar para auth-service.js
const authService = require('./services/auth-service');
const app = express()
const port = 8080
const SECRET = 'melina'

// CONFIGURAÇÕES
app.use(express.json())


//ROTAS
app.get('/', (req, res) => {
    res.json({ message: "Rota principal" })
})


// FUNÇÃO DE VERIFICAÇÃO DE AUTORIZAÇÃO:


//app.get('/clientes', authService.authorize, (req, res) => { // TORNAR ESSA ROTA SEGURA
app.get('/client', authService.authorize, (req, res) => { // TORNAR ESSA ROTA SEGURA   

    res.json({ id: 1, nome: "codeX" })
})

app.post('/login', (req, res) => {
    // NO TRABALHO DEVE BUSCAR DADOS DA req NO DB E COMPARAR PARA AUTENTICAR
    if (req.body.username === 'codeX' && req.body.password === '150120') {    
        const token = authService.generateToken({ userId: 1 })
        return res.status(200).json({ auth: true, token })
    }
    return res.status(401).json({ auth: false, message: "Acesso negado! Login inválido..." })
})


app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
});