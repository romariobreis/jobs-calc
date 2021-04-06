const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

//usar template engine
server.set('view engine','ejs')

//mudar localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos estaticos
server.use(express.static('public'))

server.use(express.urlencoded({extended:true}))

server.use(routes)
  
server.listen(3000, ()=>console.log('rodando'))