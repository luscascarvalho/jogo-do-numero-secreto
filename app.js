let listNumeroSorteados = [];
let limitadorLista = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function msgInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

msgInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Parabéns, você acertou!");

    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";

    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

    exibirTextoNaTela("p", mensagemTentativas);

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "Seu chute foi maior que o número secreto");
    } else {
      exibirTextoNaTela("p", "Seu chute foi menor que o número secreto");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * limitadorLista + 1);

  let qtdDeElementoNaLista = limitadorLista;

  if (qtdDeElementoNaLista == 10) {
    listNumeroSorteados = [];
  }

  if (listNumeroSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listNumeroSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input").value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  msgInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
