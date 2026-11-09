const btnAdicionartarefa = document.querySelector(".app__button--add-task");
const formAdicionartarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ul = document.querySelector(".app__section-task-list");
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const TarefaEmAndamento = document.querySelector(
  ".app__section-active-task-description",
);
const LimparTarefasConcluidas = document.querySelector('#btn-remover-concluidas');
const LimparTodasAsTarefas = document.querySelector('#btn-remover-todas') 

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let LiTarefaSelecionada = null;

function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
          <svg
            class="app__section-task-icon-status"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > 
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path
              d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
              fill="#01080E"
            ></path>
          </svg>
        `;

  const p = document.createElement("p");
  p.textContent = tarefa.descricao;
  p.classList.add("app__section-task-list-item-description");

  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");

  botao.onclick = () => {
    let novaDescricao = prompt("digite a nova tarefa");
    if (novaDescricao) {
      p.textContent = novaDescricao;
      tarefa.descricao = novaDescricao;
      atualizarTarefas();
    }
  };

  const imagemBotao = document.createElement("img");
  imagemBotao.setAttribute("src", "./imagens/edit.png");
  botao.append(imagemBotao);

  li.append(svg);
  li.append(p);
  li.append(botao);

  if (tarefa.completa) {
    li.classList.add("app__section-task-list-item-complete");
    botao.setAttribute('disabled','disabled');
  } else {
    li.onclick = () => {
      document.querySelectorAll(".app__section-task-list-item-active").forEach((elemento) => {
          elemento.classList.remove("app__section-task-list-item-active");
        });
      if (tarefaSelecionada == tarefa) {
        TarefaEmAndamento.textContent = "";
        tarefaSelecionada = null;
        return;
      }
      tarefaSelecionada = tarefa;
      LiTarefaSelecionada = li;
      li.classList.add("app__section-task-list-item-active");
      TarefaEmAndamento.textContent = tarefa.descricao;
    };
  }

  return li;
}

btnAdicionartarefa.addEventListener("click", () => {
  formAdicionartarefa.classList.toggle("hidden");
});

formAdicionartarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textArea.value,
  };
  tarefas.push(tarefa);
  atualizarTarefas();
  const Ulelement = adicionarTarefa(tarefa);

  ul.append(Ulelement);

  textArea.value = "";
  formAdicionartarefa.classList.add("hidden");
});

btnCancelar.addEventListener("click", () => {
  textArea.value = "";
  formAdicionartarefa.classList.toggle("hidden");
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = adicionarTarefa(tarefa);
  ul.append(elementoTarefa);
});

document.addEventListener("FocoFinalizado", () => {
  if (tarefaSelecionada && LiTarefaSelecionada) {
    LiTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    LiTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    LiTarefaSelecionada.querySelector("button").setAttribute(
      "disabled",
      "disabled",
    );
    tarefaSelecionada.completa = true;
    atualizarTarefas();
  }
});


function limparTarefas(TarefaConcluida){
  if(TarefaConcluida){
    document.querySelectorAll('.app__section-task-list-item-complete').forEach((elemento) => {
      elemento.remove();
      tarefas = tarefas.filter(tarefa => !tarefa.completa);
      atualizarTarefas();
      return;
    })
  }
  document.querySelectorAll('.app__section-task-list-item').forEach((elemento) => {
    elemento.remove();
  })
  tarefas = [];
  atualizarTarefas();
}

LimparTarefasConcluidas.onclick = () => limparTarefas(true);
LimparTodasAsTarefas.onclick = () => limparTarefas(false);


