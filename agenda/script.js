let contatos = [];
contatoEditando = -1;

const form = document.getElementById("agenda-form");

const listaContatos = document.getElementById('lista-contatos');


function addContato(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    const contato = {
        nome,
        telefone,
        endereco,
    };

    contatos.push(contato)

    form.reset();

    mostrarContatos()
}

function mostrarContatos() {

    listaContatos.innerHTML = "";

    if (contatos.length === 0) {
        listaContatos.innerHTML = "<p>Nenhum contato adicionado.</p>"
    } else {
        const table = document.createElement('table');
        table.classList.add('contato-table')

        table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        `
        contatos.forEach((contato, index) => {
            const row = table.insertRow();
            row.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.telefone}</td>
            <td>${contato.endereco}</td>
            <td>
                <button onclick="PreencherFormularioParaEdicao(${index})">Editar</button>
                <button onclick="excluirContato(${index})">Excluir</button>
            </td>
            `
        });

        listaContatos.appendChild(table)
    }



}

function PreencherFormularioParaEdicao(index) {
    contatoEditando = index;
    const contato = contatos[index];

    document.getElementById('nome').value = contato.nome
    document.getElementById('telefone').value = contato.telefone
    document.getElementById('endereco').value = contato.endereco
    document.getElementById('submit-button').innerText = "Salvar edição"

}



function excluirContato(index) {
    contatos.splice(index, 1)
    mostrarContatos()
}

function salvarEdicao (e) {
    e.preventDefault()

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    const contato = {
        nome,
        telefone,
        endereco,
    };

    contatos[contatoEditando] = contato;

    form.reset()
    document.getElementById('submit-button').innerText = "Adicionar contato"
    contatoEditando = -1 

    mostrarContatos()

}


async function buscarEnderecoPorCep(cep) {
    const cepError = document.getElementById('cep-error');
    cepError.textContent = '';

    const response =
        await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.ok) {
        const data = await response.json();

        if (!data.erro) {
            document.getElementById('endereco').value =
                `${data.logradouro}, ${data.bairro}, 
            ${data.localidade}, ${data.uf} `
        } else {
            cepError.textContent = 'Cep não encontrado.'
        }
    } else {
        cepError.textContent = "Erro ao buscar o cep."
        " Tente novamante";
    }
}

document.getElementById('buscar-cep').addEventListener('click', () => {
    const cep = document.getElementById('cep').value.trim();
    if(cep != '' && cep.length ==8){
        buscarEnderecoPorCep(cep);
    }else{
        const cepError = document.getElementById('cep-error');
        cepError.textContent = 'Digite um cep válido.'
    }
});

document.getElementById('reset-button').addEventListener('click',()=>{
    contatos=[];
    form.reset();
    contatoEditando=-1;
    const cepError = document.getElementById('cep-error');
    cepError.textContent = '';
    mostrarContatos();
});




form.addEventListener('submit', function (e) {

    if (contatoEditando === -1) {
        addContato(e);
    } else {
        salvarEdicao(e)
    }
    
});


const telefoneInput = document.getElementById('telefone');

const phoneMask = (value) => {
    if (value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    } else {
        return '';
    }
}

telefoneInput.addEventListener('input', function () {
    const inputValue = this.value;
    this.value = phoneMask(inputValue);
})

mostrarContatos()
