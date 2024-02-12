// Definindo um array de perguntas com objetos que contêm informações sobre cada pergunta, suas opções de resposta e a resposta correta.
const perguntas = [
  {
    pergunta: "O que é JavaScript?",
    respostas: [
      "Uma linguagem de programação de servidor",
      "Uma linguagem de marcação para criar páginas web",
      "Uma linguagem de programação de alto nível",
      "Um framework para criar aplicativos móveis",
    ],
    correta: 2 // Índice da resposta correta no array 'respostas'
  },
  {
    pergunta: "Qual é a forma correta de declarar uma variável em JavaScript?",
    respostas: [
      "var myVar;",
      "variable myVar;",
      "v myVar;",
      "variável myVar;",
    ],
    correta: 0
  },
  {
    pergunta: "Como se refere a uma função em JavaScript?",
    respostas: [
      "função()",
      "call function()",
      "function{}",
      "function myFunction()",
    ],
    correta: 3
  },
  {
    pergunta: "Qual é o operador de comparação estrita em JavaScript?",
    respostas: [
      "==",
      "===",
      "!=",
      "<=",
    ],
    correta: 1
  },
  {
    pergunta: "Como você chama um loop que não tem uma condição de parada?",
    respostas: [
      "Loop indefinido",
      "Loop infinito",
      "Loop contínuo",
      "Loop persistente",
    ],
    correta: 1
  },
  {
    pergunta: "Qual método é usado para adicionar um novo elemento no final de um array?",
    respostas: [
      "push()",
      "add()",
      "append()",
      "addToEnd()",
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a sintaxe correta para comentários de uma linha em JavaScript?",
    respostas: [
      "// Este é um comentário",
      "<!-- Este é um comentário -->",
      "/* Este é um comentário */",
      "(* Este é um comentário *)",
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a função do operador 'typeof' em JavaScript?",
    respostas: [
      "Para comparar o tipo de dois valores",
      "Para retornar o tipo de uma variável",
      "Para converter um tipo de dado em outro",
      "Para verificar a igualdade estrita entre dois valores",
    ],
    correta: 1
  },
  {
    pergunta: "Qual é o resultado da expressão '3' + 2 em JavaScript?",
    respostas: [
      "32",
      "5",
      "6",
      "NaN",
    ],
    correta: 0
  },
  {
    pergunta: "O que o método 'parseInt()' faz em JavaScript?",
    respostas: [
      "Converte uma string para um número inteiro",
      "Arredonda um número para o inteiro mais próximo",
      "Retorna o valor absoluto de um número",
      "Converte um número para uma string",
    ],
    correta: 0
  },
];
// Selecionando elementos HTML
const quiz = document.querySelector('#quiz'); // Seleciona o elemento com o id 'quiz' na página HTML
const template = document.querySelector('template'); // Seleciona o elemento 'template' na página HTML

// Definindo um conjunto para armazenar as respostas corretas e exibindo o total de respostas corretas
const corretas = new Set();
const totalDePerguntas = perguntas.length;
const mostrarTotal = document.querySelector('#Acertos span');
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas;

// Iterando sobre cada pergunta no array 'perguntas'
for(const item of perguntas) {
  // Clonando o conteúdo do template para criar uma nova instância do item do quiz
  const quizItem = template.content.cloneNode(true);
  // Preenchendo o título da pergunta no item do quiz
  quizItem.querySelector('h3').textContent = item.pergunta;

  // Iterando sobre cada resposta no array 'respostas' dentro do objeto de pergunta
  for(let resposta of item.respostas) {
    // Clonando o template para criar uma nova instância do elemento de resposta
    const dt = quizItem.querySelector('dl dt').cloneNode(true);
    // Preenchendo o texto da resposta no elemento clonado
    dt.querySelector('span').textContent = resposta;
    // Definindo o atributo 'name' do input para distinguir as respostas de diferentes perguntas
    dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item));
    // Definindo o valor do input como o índice da resposta dentro do array de respostas da pergunta
    dt.querySelector('input').value = item.respostas.indexOf(resposta);
    // Adicionando um evento de mudança ao input para verificar se a resposta está correta
    dt.querySelector('input').onchange = (event) => {
      const estaCorreta = event.target.value == item.correta;
      corretas.delete(item);
      if(estaCorreta) {
        corretas.add(item);
      }
      // Atualizando o texto exibindo o número de respostas corretas
      mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas;
    };

    // Adicionando o elemento de resposta clonado ao item do quiz
    quizItem.querySelector('dl').appendChild(dt);
  }

  // Removendo o primeiro elemento de resposta (template) após o loop de adição de respostas
  quizItem.querySelector('dl dt').remove();

  // Adicionando o item do quiz preenchido ao elemento quiz na página HTML
  quiz.appendChild(quizItem);
}