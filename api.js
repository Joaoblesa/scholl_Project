const urlCursos = 'https://lion-school-phbo.onrender.com/cursos';
const urlAlunosBase = 'https://lion-school-phbo.onrender.com/alunos/curso/';

let listaAlunosGeral = []; // Armazena os alunos para filtrar sem novo fetch

const desenharAlunos = (alunos) => {
    const grid = document.getElementById('grid-alunos');
    grid.innerHTML = '';
    
    alunos.forEach(aluno => {
        const card = document.createElement('div');
        const cor = aluno.status.toLowerCase() === 'finalizado' ? 'card-amarelo' : 'card-azul';
        card.className = `card-aluno ${cor}`;
        card.innerHTML = `
            <img src="${aluno.foto}" alt="${aluno.nome}">
            <span>${aluno.nome.toUpperCase()}</span>
        `;
        grid.appendChild(card);
    });
};

const carregarTelaAlunos = async (sigla, nome) => {
    const root = document.getElementById('root');
    root.classList.remove('mainzinho');
    root.innerHTML = `
        <div class="container-alunos">
            <h1 class="titulo-curso">${nome}</h1>
            <div class="barra-filtros">
                <div class="status-select">
                    <label>Status</label>
                    <select id="filtro-status">
                        <option value="todos">Status</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cursando">Cursando</option>
                    </select>
                </div>
                <div class="legenda">
                    <span>LEGENDA</span>
                    <div class="legenda-item"><div class="box azul"></div> Cursando</div>
                    <div class="legenda-item"><div class="box amarelo"></div> Finalizado</div>
                </div>
            </div>
            <div id="grid-alunos" class="grid-alunos"><p>Carregando...</p></div>
        </div>
    `;

    try {
        const response = await fetch(`${urlAlunosBase}${sigla}`);
        const data = await response.json();
        listaAlunosGeral = data.alunos;
        desenharAlunos(listaAlunosGeral);

        // Lógica do Filtro
        document.getElementById('filtro-status').addEventListener('change', (e) => {
            const statusFiltro = e.target.value;
            if (statusFiltro === 'todos') {
                desenharAlunos(listaAlunosGeral);
            } else {
                const filtrados = listaAlunosGeral.filter(a => a.status === statusFiltro);
                desenharAlunos(filtrados);
            }
        });
    } catch (e) { console.error("Erro ao buscar alunos"); }
};

const carregarHome = async () => {
    const root = document.getElementById('root');
    root.classList.add('mainzinho');
    root.innerHTML = `
        <section class="lado-esquerdo">
            <div class="textinho"><h1>Escolha um <span class="curso-blue">curso</span></h1><h1>para gerenciar</h1></div>
            <div class="container-ilustracao">
                <img src="./img/devices.svg" class="img-computas">
                <img src="./img/studant.svg" class="img-mulher">
            </div>
        </section>
        <section id="lado-direito" class="lado-direito"></section>
    `;

    const containerCursos = document.getElementById('lado-direito');
    try {
        const response = await fetch(urlCursos);
        const cursos = await response.json();
        cursos.forEach(c => {
            const card = document.createElement('div');
            card.className = 'card-curso';
            const icon = c.sigla.toUpperCase() === 'DS' ? './img/DS.svg' : './img/Redes.svg';
            card.innerHTML = `<img src="${icon}"><span>${c.sigla}</span>`;
            card.onclick = () => {
                const nomeCurto = c.nome.includes('-') ? c.nome.split('-')[1].trim() : c.nome;
                carregarTelaAlunos(c.sigla, nomeCurto);
            };
            containerCursos.appendChild(card);
        });
    } catch (e) { console.error("Erro na API"); }
};

document.addEventListener('DOMContentLoaded', carregarHome);