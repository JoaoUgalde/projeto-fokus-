const html = document.querySelector("html");
const focoBT = document.querySelector(".app__card-button--foco");
const curtoBT = document.querySelector(".app__card-button--curto");
const longoBT = document.querySelector(".app__card-button--longo");
const img = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = [focoBT, curtoBT, longoBT];
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBT = document.querySelector("#start-pause");
const startPauseBotton = document.querySelector("#startPauseBotton");
const playTimer = new Audio("/Fokus-projeto-base/sons/play.wav");
const pauseTimer = new Audio("/Fokus-projeto-base/sons/pause.mp3");
const imgPauseOrPlay = document.querySelector(".app__card-primary-butto-icon");
const TempoNaTela = document.querySelector("#timer");
const tempoEsgotado = new Audio("/Fokus-projeto-base/sons/beep.mp3");
const musica = new Audio("/Fokus-projeto-base/sons/luna-rise-part-one.mp3");
musica.loop = true;
let tempoEmSegundos = 1500;
let intervaloID = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBT.addEventListener("click", () => {
  tempoEmSegundos = 1500;
  alterarContexto("foco");
});

curtoBT.addEventListener("click", () => {
  tempoEmSegundos = 300;
  alterarContexto("descanso-curto");
});

longoBT.addEventListener("click", () => {
  tempoEmSegundos= 900;
  alterarContexto("descanso-longo");
});

function alterarContexto(contexto) {
  mostrarTempoNaTela();
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  html.setAttribute("data-contexto", `${contexto}`);
  img.setAttribute("src", `/Fokus-projeto-base/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML =
        "Otimize sua produtividade,<br><strong class = 'app__title-strong'>mergulhe no que importa</strong>";
      botton = document.querySelector(".app__card-button--foco");
      botton.classList.add("active");
      break;
    case "descanso-curto":
      titulo.innerHTML =
        "Que tal dar uma respirada?<br><strong class = 'app__title-strong'>Faça uma pausa curta</strong>";
      botton = document.querySelector(".app__card-button--curto");
      botton.classList.add("active");
      break;
    case "descanso-longo":
      titulo.innerHTML =
        "Hora de voltar a superficie.<br><strong class = 'app__title-strong'>Faça uma pausa longa</strong>";
      botton = document.querySelector(".app__card-button--longo");
      botton.classList.add("active");
      break;
    default:
      break;
  }
}
const clear = () => {
  clearInterval(intervaloID);
  intervaloID = null;
};

const TempoRegressivo = () => {
  mostrarTempoNaTela();
  tempoEmSegundos -= 1;
  if (tempoEmSegundos <= 0) {
    clear();
    tempoEmSegundos = 5;
    console.log("tempo esgotado!!");
    tempoEsgotado.play();
    startPauseBotton.textContent = "play";
    trocarImagem();
    return;
  }
};

const Intervalo = () => {
  if (intervaloID) {
    clear();
    pauseTimer.play();
    startPauseBotton.textContent = "play";
    trocarImagem();
    return;
  }
  playTimer.play();
  tempoEsgotado.pause();
  intervaloID = setInterval(TempoRegressivo, 1000);
  startPauseBotton.textContent = "pause";
  trocarImagem();
};

const trocarImagem = () => {
  if (startPauseBotton.textContent == "pause") {
    imgPauseOrPlay.setAttribute("src", "/Fokus-projeto-base/imagens/pause.png");
  } else {
    imgPauseOrPlay.setAttribute(
      "src",
      "/Fokus-projeto-base/imagens/play_arrow.png",
    );
  }
};

function mostrarTempoNaTela() {
  const tempo = new Date(tempoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  TempoNaTela.innerHTML = `${tempoFormatado}`;
}

startPauseBT.addEventListener("click", Intervalo);

mostrarTempoNaTela();
