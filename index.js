import express from 'express';
import cors from 'cors';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaAutor from './Rotas/rotaAutor.js';
import rotaLivro from './Rotas/rotaLivro.js';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaPedido from './Rotas/rotaPedido.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Seguranca/autenticacao.js';


dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const host = '0.0.0.0';
const porta = process.env.PORT || 3000; // Permite configurar a porta via variável de ambiente

// Configuração do middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração da sessão
app.use(session({
    secret: process.env.SEGREDO || 'default_secret', // Usar um segredo padrão caso não esteja definido no .env
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 6 } // Definir maxAge dentro do objeto cookie
}));

// Configuração das rotas
app.use('/login', rotaLogin);
app.use('/autor', verificarAcesso, rotaAutor);
app.use('/livro', verificarAcesso, rotaLivro);
app.use('/pedido', verificarAcesso, rotaPedido);
app.use('/cliente', verificarAcesso, rotaCliente);

// Inicia o servidor
app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
