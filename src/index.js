const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors');

const labelContentList = [
    {
        id: 123913,
        title: 'Introdução à java',
        description: 'Conheça o mundo java agora mesmo!',
        content: `<h1>Introdução à Java</h1>
        <p>Professor: Nelson Kenmochi</p>
        <hr>
        <p>Eae galera! Sejam bem vindos ao curso de java!
        Já pegue o seu café e se ajeita nessa cadeira que
        hoje falaremos sobre a linguagem de programação Java!</p>`,
    },
];

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser);
// app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

app.get('/admin', (req, res) => {
    return res.send(`
        <!DOCTYPE html>
        <head>
            <title>Admin | Page</title>
        </head>
        <style>
        * { margin: 10px; }
        </style>

        <body>
            <h1>Mochila Digital | Servidor</h1>
            <a href="/">Visualizar documentação</a>
            <p>Utilize esta interface para controlar acesso ao servidor ou ao seu conteúdo interno</p>

            <hr>
            <h2>Adicionar um novo conteúdo</h2>
            <form action="/content" method="post">
                <input type="text" name="title" placeholder="Título do conteúdo"><br>
                <input type="text" name="description" placeholder="Descrição do conteúdo"><br>
                <input type="text" name="content" placeholder="Conteúdo"><br>
                <input type="submit">
            </form>

            <hr>
            <h2>Conteúdos atuais</h2>
            ${labelContentList.map(item =>
        `<b>${item.title}</b>
            <p>${item.description}</p>
            <hr>`
    )}
        </body>
        </html>
    `);
})

app.get('/content', (req, res) => {
    return res.send(
        labelContentList,
    );
});

app.get('/content/:id', (req, res) => {
    const contentID = req.params.id;

    const content = labelContentList.find(item => item['id'] === parseInt(contentID));
    return res.send(content.content);
});

// Registra novo conteúdo
app.post('/content', (req, res) => {
    const { title, description, content } = req.body;
    const id = Date.now();

    labelContentList.push({
        id,
        title,
        description,
        content
    });

    console.log('Novo conteúdo');

    res.redirect('/admin');
    // return res.status(204).end();

    // return res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
})

const PORT = process.env.PORT || 5000;
// '192.168.0.8',
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});