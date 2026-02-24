const urlBase = 'https://lion-school-phbo.onrender.com';



const getCursos = async () => {
    const response = await fetch(`${urlBase}/cursos`);
    const data = await response.json();
    return data;
};

const getAlunos = async () => {
    const response = await fetch(`${urlBase}/alunos`);
    const data = await response.json();
    return data;
};


const getAlunosPorCurso = async (idCurso) => {
    const response = await fetch(`${urlBase}/alunos?curso_id=${idCurso}`);
    const data = await response.json();
    return data;
};

const getAlunoPorID = async (idAluno) => {
    const response = await fetch(`${urlBase}/alunos/${idAluno}`);
    const data = await response.json();
    return data;
};