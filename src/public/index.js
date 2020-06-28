

function LoadHTMLFromServer(id) {
    fetch(`https://cf2c8564ab0c.ngrok.io/content/${id}`, {
        method: 'GET',
    }).then(response => {
        response.text().then(function (response) {
            document.getElementById('view-document').innerHTML = response;
        });
    })
    toggleFooter(true);
}

function LoadHTMLFromLocalStorage(id) {
    const response = localStorage.getItem(`content-${id}`);
    document.getElementById('view-document').innerHTML = response;
}

function toggleFooter(isEnabled) {
    // document.getElementById('footer').innerHTML = "Voltar";
    document.getElementById('footer').innerHTML = isEnabled ? `
        <button onclick="loadHomePage()">VOLTAR</button>
    ` : ``;
}

function loadHomePage() {
    toggleFooter(false);

    function fetchTimeout(url, options, timeout = 3000) {
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(resolve, reject)
            setTimeout(reject, timeout);
        })
    }

    fetchTimeout('https://cf2c8564ab0c.ngrok.io/content', {
        method: 'GET',
    }, 500).then(response => {
        response.json().then(function (json) {
            const itemList = [];
            const renderedPage = [];
            json.map(item => {
                localStorage.setItem(`content-${item.id}`, item.content);

                itemList.push({
                    title: item.title,
                    description: item.description,
                    id: item.id
                });

                renderedPage.push(`
                <div class="content-card">
                    <h1>${item.title}</h1>
                    <p>${item.description}</p>
                    <button onclick="LoadHTMLFromServer(${item.id})">Abrir</button>
                </div>
                `);
            });
            document.getElementById('view-document').innerHTML = `
                <p class="alert">Mostrando resultados do servidor</p>
                ${renderedPage}
            `;

            localStorage.setItem("content", JSON.stringify(itemList));
        });
    }).catch(err => {
        const storedContent = JSON.parse(localStorage.getItem("content"));
        const itemList = [];
        const renderedPage = [];
        storedContent.map(item => {
            itemList.push({
                title: item.title,
                description: item.description,
                id: item.id
            });

            renderedPage.push(`
                <div class="content-card">
                    <h1>${item.title}</h1>
                    <p>${item.description}</p>
                    <button onclick="LoadHTMLFromLocalStorage(${item.id})">Abrir</button>
                </div>
                `);
        });

        document.getElementById('view-document').innerHTML = `
        
            <p class="alert">Sem conexão com o servidor, mostrando conteúdo armazenado</p>
            ${renderedPage}`;
    });
}