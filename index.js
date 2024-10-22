require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();
const port = process.env.PORT;

app.use(cors({
    credentials: true,
    origin: ["INSERIR IP"],
    methods: ["POST", "GET"],
}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/routes'))
app.listen(port);
console.log('API funcionando!');


app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
