// Alternância simples entre tema escuro e tema claro.
const botaoTema = document.getElementById("trocar-tema");
const textoTema = document.getElementById("texto-tema");
const iconeTema = document.getElementById("icone-tema");

function aplicarTema(tema) {
  document.body.dataset.tema = tema;
  const escuro = tema === "escuro";
  textoTema.textContent = escuro ? "Tema claro" : "Tema escuro";
  iconeTema.textContent = escuro ? "☼" : "☾";
  localStorage.setItem("tema-mundo-das-redes", tema);
}

const temaSalvo = localStorage.getItem("tema-mundo-das-redes");
aplicarTema(temaSalvo || "escuro");

botaoTema.addEventListener("click", () => {
  const temaAtual = document.body.dataset.tema;
  aplicarTema(temaAtual === "escuro" ? "claro" : "escuro");
});

// Banco com 25 perguntas, quatro alternativas e uma resposta correta.
const perguntas = [
  {p:"O que é uma rede de computadores?",o:["Dispositivos conectados para trocar informações","Um tipo de monitor","Um programa de desenho","Uma peça do teclado"],c:0,e:"Uma rede conecta dispositivos para que eles compartilhem dados e recursos."},
  {p:"Qual equipamento normalmente distribui a internet em uma casa?",o:["Impressora","Roteador","Monitor","Teclado"],c:1,e:"O roteador encaminha os dados entre a rede doméstica e outras redes."},
  {p:"O que faz parte da infraestrutura de rede?",o:["Cabos e equipamentos","Somente papéis","Apenas programas de edição","Móveis da sala"],c:0,e:"A infraestrutura reúne cabos, conectores, equipamentos e espaços necessários à rede."},
  {p:"Para que serve o cabeamento estruturado?",o:["Organizar os cabos e pontos de conexão","Aumentar o brilho da tela","Apagar arquivos","Criar senhas"],c:0,e:"A organização facilita a manutenção e a ampliação da rede."},
  {p:"Na topologia estrela, os dispositivos se conectam a:",o:["Um ponto central","Uma bateria","Uma tela","Um cabo de energia"],c:0,e:"Na estrela, os dispositivos se ligam a um equipamento central, como um switch."},
  {p:"O que é um protocolo de rede?",o:["Um conjunto de regras de comunicação","Um tipo de cadeira","Uma marca de computador","Um cabo de energia"],c:0,e:"Protocolos definem regras para que os dispositivos troquem dados."},
  {p:"Qual é uma característica do TCP?",o:["Ajuda a garantir a entrega correta dos dados","Não utiliza rede","Serve para imprimir","Desliga o computador"],c:0,e:"O TCP controla a transmissão e verifica a entrega dos dados."},
  {p:"O UDP é bastante usado em:",o:["Chamadas e transmissões ao vivo","Impressão em papel","Digitação de textos","Carregamento de bateria"],c:0,e:"O UDP tem menos etapas de verificação e pode ser útil em comunicações em tempo real."},
  {p:"Para que serve o DNS?",o:["Localizar o IP relacionado ao nome de um site","Aumentar a memória","Proteger o teclado","Ligar cabos"],c:0,e:"O DNS ajuda a encontrar o endereço IP associado ao nome do site."},
  {p:"O que o HTTPS oferece?",o:["Comunicação protegida por criptografia","Internet sem roteador","Mais espaço no disco","Impressão rápida"],c:0,e:"O HTTPS protege a comunicação entre o navegador e o site usando criptografia."},
  {p:"Qual é um exemplo de endereço IPv4?",o:["192.168.0.10","www.site.com","AB-CD-EF","MeuComputador"],c:0,e:"O IPv4 é formado por quatro números separados por pontos."},
  {p:"Para que serve a máscara de rede?",o:["Separar a parte da rede e a parte do dispositivo no IP","Aumentar o volume","Trocar a senha","Abrir páginas"],c:0,e:"A máscara indica quais partes do endereço identificam a rede e o dispositivo."},
  {p:"O que é gateway?",o:["Saída da rede para outras redes","Tipo de mouse","Programa de edição","Cabo de energia"],c:0,e:"O gateway, geralmente o roteador, encaminha dados para outras redes."},
  {p:"O endereço MAC identifica:",o:["Uma interface de rede","O nome do usuário","O tamanho do monitor","A velocidade do teclado"],c:0,e:"O MAC é um identificador associado à interface de rede do equipamento."},
  {p:"Qual tecnologia permite conexão sem fio?",o:["Wi-Fi","HDMI","VGA","Cabo de força"],c:0,e:"O Wi-Fi conecta dispositivos por ondas de rádio."},
  {p:"Qual é a função de um switch?",o:["Conectar dispositivos em uma rede local","Exibir imagens","Imprimir documentos","Armazenar energia"],c:0,e:"O switch conecta vários equipamentos dentro de uma rede local."},
  {p:"Para que serve um roteador?",o:["Encaminhar dados entre redes","Aumentar o brilho","Guardar documentos impressos","Substituir o teclado"],c:0,e:"O roteador encaminha os dados entre redes diferentes."},
  {p:"Qual equipamento controla o tráfego conforme regras de segurança?",o:["Firewall","Monitor","Mouse","Caixa de som"],c:0,e:"O firewall filtra conexões de acordo com regras de segurança."},
  {p:"Qual comando testa se outro dispositivo responde na rede?",o:["ping","mkdir","copy","paint"],c:0,e:"O ping envia solicitações e verifica se o destino responde."},
  {p:"No Windows, qual comando mostra configurações de rede?",o:["ipconfig","notepad","calc","paint"],c:0,e:"O ipconfig mostra informações como endereço IP, máscara e gateway."},
  {p:"Qual comando do Windows mostra o caminho até um destino?",o:["tracert","dir","type","cls"],c:0,e:"O tracert mostra as etapas do caminho percorrido pelos dados."},
  {p:"O que é computação em nuvem?",o:["Uso de recursos de tecnologia pela internet","Uso exclusivo de disquetes","Um tipo de monitor","Uma rede sem dados"],c:0,e:"A nuvem oferece serviços como armazenamento, programas e servidores pela internet."},
  {p:"O que significa SaaS?",o:["Programa oferecido como serviço pela internet","Cabo de rede","Tipo de endereço IP","Equipamento elétrico"],c:0,e:"SaaS é um programa pronto que pode ser utilizado pela internet."},
  {p:"Qual modelo de nuvem oferece infraestrutura, como máquinas virtuais?",o:["IaaS","SaaS","HTTP","DNS"],c:0,e:"IaaS oferece recursos de infraestrutura, como servidores virtuais e armazenamento."},
  {p:"Qual família de padrões IEEE está relacionada ao Wi-Fi?",o:["802.11","802.3 somente","HTML","IPv4"],c:0,e:"A família IEEE 802.11 reúne padrões usados em redes Wi-Fi."}
];

let indice = 0;
let acertos = 0;
let respondeu = false;

const progresso = document.getElementById("progresso");
const perguntaTexto = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const retorno = document.getElementById("retorno");
const proxima = document.getElementById("proxima");
const areaPergunta = document.getElementById("area-pergunta");
const resultado = document.getElementById("resultado");
const barra = document.getElementById("barra");

function mostrarPergunta() {
  respondeu = false;
  proxima.disabled = true;
  proxima.textContent = indice === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
  retorno.textContent = "";
  progresso.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  barra.style.width = `${(indice / perguntas.length) * 100}%`;
  perguntaTexto.textContent = perguntas[indice].p;
  alternativas.innerHTML = "";

  perguntas[indice].o.forEach((opcao, numero) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "alternativa";
    botao.textContent = `${String.fromCharCode(65 + numero)}) ${opcao}`;
    botao.addEventListener("click", () => conferirResposta(numero));
    alternativas.appendChild(botao);
  });
}

function conferirResposta(escolhida) {
  if (respondeu) return;
  respondeu = true;
  const atual = perguntas[indice];
  const botoes = alternativas.querySelectorAll("button");

  botoes.forEach((botao, numero) => {
    botao.disabled = true;
    if (numero === atual.c) botao.classList.add("certa");
    if (numero === escolhida && escolhida !== atual.c) botao.classList.add("errada");
  });

  if (escolhida === atual.c) {
    acertos++;
    retorno.textContent = `Muito bem! ${atual.e}`;
  } else {
    retorno.textContent = `Não foi dessa vez. ${atual.e}`;
  }
  proxima.disabled = false;
}

proxima.addEventListener("click", () => {
  if (indice < perguntas.length - 1) {
    indice++;
    mostrarPergunta();
  } else {
    areaPergunta.hidden = true;
    resultado.hidden = false;
    barra.style.width = "100%";
    document.getElementById("pontuacao").textContent = `${acertos} de ${perguntas.length} acertos`;
    const percentual = Math.round((acertos / perguntas.length) * 100);
    document.getElementById("mensagem-final").textContent =
      percentual >= 80 ? "Excelente resultado! Você demonstrou que entendeu bem os assuntos." :
      percentual >= 50 ? "Bom trabalho! Revise os temas e tente novamente para melhorar." :
      "Continue estudando. Leia os conteúdos e refaça o questionário para praticar.";
  }
});

document.getElementById("reiniciar").addEventListener("click", () => {
  indice = 0;
  acertos = 0;
  resultado.hidden = true;
  areaPergunta.hidden = false;
  mostrarPergunta();
});

mostrarPergunta();
