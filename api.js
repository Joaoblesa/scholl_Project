const urlCursos = 'https://lion-school-backend.onrender.com/cursos';

const carregarConteudo = async () => {
    const root = document.getElementById('root');
    root.classList.add('mainzinho');

    root.innerHTML = `
        <section class="lado-esquerdo">
            <div class="textinho">
                <h1>Escolha um <span class="curso-blue">curso</span></h1>
                <h1>para gerenciar</h1>
            </div>
            <div class="container-ilustracao">
                <img src="./img/devices.svg" alt="Computador" class="img-computas">
                <img src="./img/studant.svg" alt="Mulher" class="img-mulher">
            </div>
        </section>
        <section id="lado-direito" class="lado-direito">
            <p id="aviso">Carregando cursos...</p>
        </section>
    `;

    const ladoDireito = document.getElementById('lado-direito');

    try {
        const response = await fetch(urlCursos);
        const cursos = await response.json();

        ladoDireito.innerHTML = '';

        cursos.forEach(curso => {
            const card = document.createElement('div');
            card.className = 'card-curso';

            const icone = curso.sigla.toUpperCase() === 'DS' 
            ? './img/DS.svg' 
            : './img/Redes.svg';

            card.innerHTML = `
                <img src="${icone}" alt="${curso.sigla}">
                <span>${curso.sigla}</span>
            `;

            card.onclick = () => {
                localStorage.setItem('cursoSelecionado', curso.sigla);
                window.location.href = './alunos.html';
            };

            ladoDireito.appendChild(card);
        });

    } catch (error) {
        ladoDireito.innerHTML = `<p>Erro ao carregar dados do servidor</p>`;
    }
};

document.addEventListener('DOMContentLoaded', carregarConteudo);