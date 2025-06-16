let estado = "menu";
let dificuldade = "";
let perguntaAtual = 0;
let pontuacao = 0;
let perguntas = [];

let perguntasFacil = [
  {pergunta: "De onde vem o leite?", opcoes: ["Vaca 🐄", "Cachorro 🐶", "Cavalo 🐎"], correta: "Vaca 🐄"},
  {pergunta: "Qual é uma fruta?", opcoes: ["Maçã 🍎", "Cimento 🧱", "Cadeira 🪑"], correta: "Maçã 🍎"},
  {pergunta: "Onde vivem as galinhas?", opcoes: ["Galinheiro 🐔", "Piscina 🏊‍♂️", "Escritório 🏢"], correta: "Galinheiro 🐔"},
  {pergunta: "Qual planta é usada para fazer pão?", opcoes: ["Trigo 🌾", "Pimenta 🌶️", "Girassol 🌻"], correta: "Trigo 🌾"},
  {pergunta: "O que usamos para regar plantas?", opcoes: ["Água 💧", "Fumaça 💨", "Areia ⏳"], correta: "Água 💧"}
];

let perguntasMedio = [
  {pergunta: "O que é agroecologia?", opcoes: ["Agricultura sustentável ♻️", "Pintura rural 🎨", "Fabricação de móveis 🪵"], correta: "Agricultura sustentável ♻️"},
  {pergunta: "Qual cultura é muito produzida no cerrado?", opcoes: ["Soja 🌱", "Batata 🥔", "Uva 🍇"], correta: "Soja 🌱"},
  {pergunta: "O que é rotação de culturas?", opcoes: ["Alternar tipos de plantas 🔄", "Rodar plantas fisicamente 🌀", "Vender plantas 🛒"], correta: "Alternar tipos de plantas 🔄"},
  {pergunta: "O que é pecuária?", opcoes: ["Criação de animais 🐄", "Cuidar de jardins 🌷", "Fazer móveis 🪵"], correta: "Criação de animais 🐄"},
  {pergunta: "Qual é a principal função do trator?", opcoes: ["Arar a terra 🚜", "Fazer café ☕", "Dirigir na cidade 🚗"], correta: "Arar a terra 🚜"}
];

let perguntasInferno = [
  {pergunta: "O que é agricultura de precisão?", opcoes: ["Uso de tecnologia no campo 📡", "Arar manualmente 💪", "Cortar árvores 🌳"], correta: "Uso de tecnologia no campo 📡"},
  {pergunta: "O que é ILPF?", opcoes: ["Sistema sustentável 🌿🐄🌲", "Fazer churrasco 🍖", "Caçar animais 🦌"], correta: "Sistema sustentável 🌿🐄🌲"},
  {pergunta: "Qual equipamento mede umidade do solo?", opcoes: ["Sensor de umidade 🌡️", "Termômetro 🌡️", "Bússola 🧭"], correta: "Sensor de umidade 🌡️"},
  {pergunta: "O que são culturas perenes?", opcoes: ["Plantio que dura vários anos 🌳", "Plantas anuais 🌱", "Flores de papel 📄🌸"], correta: "Plantio que dura vários anos 🌳"},
  {pergunta: "O que é agrobiodiversidade?", opcoes: ["Diversidade no agro 🌽🌾🍅", "Vender máquinas 🚜", "Fazer estradas 🛣️"], correta: "Diversidade no agro 🌽🌾🍅"}
];

let perguntasInsano = [
  {pergunta: "O que é fitossociologia?", opcoes: ["Estudo das relações entre plantas 🌿", "Comércio agrícola 💰", "Criação de animais exóticos 🐍"], correta: "Estudo das relações entre plantas 🌿"},
  {pergunta: "O que é pastejo rotacionado intensivo?", opcoes: ["Divisão rigorosa do pasto 🐄🌱", "Deixar animais soltos 🐂", "Plantar só milho 🌽"], correta: "Divisão rigorosa do pasto 🐄🌱"},
  {pergunta: "O que são bioestimulantes agrícolas?", opcoes: ["Melhoram crescimento 🌱✨", "Inseticidas 🐜☠️", "Combustíveis ⛽"], correta: "Melhoram crescimento 🌱✨"},
  {pergunta: "O que é manejo integrado de pragas?", opcoes: ["Uso de técnicas sustentáveis 🐞♻️", "Queima de plantações 🔥🌾", "Spray tóxico ☠️"], correta: "Uso de técnicas sustentáveis 🐞♻️"},
  {pergunta: "O que é fotoperiodismo nas plantas?", opcoes: ["Resposta à duração da luz 🌞🌛", "Uso de pesticidas ☠️", "Cortar folhas ✂️"], correta: "Resposta à duração da luz 🌞🌛"}
];

// Variáveis para efeito de feedback
let feedback = null; // "acerto" ou "erro"
let feedbackTimer = 0;
const feedbackDuration = 30; // frames (~0.5s)

function setup() {
  createCanvas(600, 400);
  textFont('Arial');
}

function draw() {
  desenhaFundoFazenda();

  if (estado === "menu") {
    telaMenu();
  } else if (estado === "dificuldade") {
    telaDificuldade();
  } else if (estado === "jogo") {
    telaJogo();
  } else if (estado === "fim") {
    telaFim();
  }

  if (feedback) {
    desenhaFeedback();
    feedbackTimer--;
    if (feedbackTimer <= 0) {
      feedback = null;
    }
  }
}

function desenhaFundoFazenda() {
  // Céu
  background(135, 206, 235); // azul claro
  noStroke();
  // Grama
  fill(50, 168, 82);
  rect(0, height * 0.75, width, height * 0.25);
  
  // Sol
  fill(255, 204, 0);
  ellipse(width - 70, 70, 80);

  // Casa simples
  fill(178, 34, 34);
  rect(70, height * 0.75 - 80, 150, 80);
  fill(139, 69, 19);
  triangle(70, height * 0.75 - 80, 145, height * 0.75 - 140, 220, height * 0.75 - 80);
  fill(255);
  rect(120, height * 0.75 - 50, 40, 40);
  
  // Cerca
  stroke(139, 69, 19);
  strokeWeight(4);
  for(let x=0; x<width; x+=30){
    line(x, height * 0.75, x, height * 0.75 - 30);
  }
  noStroke();
}

function telaMenu() {
  textAlign(CENTER, CENTER);
  textSize(36);
  fill(50, 90, 20);
  text("🌾 Quiz Campo e Cidade 🌾", width / 2, height / 2 - 70);
  
  desenhaBotao("Jogar ▶️", width / 2 - 75, height / 2, 150, 50);
}

function telaDificuldade() {
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(50, 90, 20);
  text("Escolha a dificuldade:", width / 2, 60);
  
  desenhaBotao("🥦 Fácil", 100, 120, 150, 50);
  desenhaBotao("🌽 Médio", 350, 120, 150, 50);
  desenhaBotao("🔥 Inferno", 100, 200, 150, 50);
  desenhaBotao("💀 Insano", 350, 200, 150, 50);
}

function telaJogo() {
  let q = perguntas[perguntaAtual];
  
  textAlign(CENTER, TOP);
  textSize(22);
  fill(30, 60, 20);
  text(q.pergunta, width / 2, 40);
  
  for (let i = 0; i < q.opcoes.length; i++) {
    let y = 120 + i * 65;
    if (feedback && feedback.index === i && feedback.pergunta === perguntaAtual) {
      // Se estiver mostrando feedback nesta opção, mudar a cor do botão
      if (feedback.tipo === "acerto") fill(150, 255, 150);
      else fill(255, 150, 150);
    } else {
      fill(255);
    }
    stroke(0);
    strokeWeight(1);
    rect(width / 2 - 100, y, 200, 50, 12);
    fill(0);
    noStroke();
    textSize(18);
    text(q.opcoes[i], width / 2, y + 25);
  }
  
  // Info pergunta
  fill(30, 60, 20);
  textSize(16);
  text(`Pergunta ${perguntaAtual + 1} / ${perguntas.length}`, width / 2, height - 30);
  
  // Pontuação no topo direito
  textAlign(RIGHT, TOP);
  textSize(18);
  fill(50, 90, 20);
  text(`Pontuação: ${pontuacao}`, width - 20, 20);
}

function telaFim() {
  textAlign(CENTER, CENTER);
  textSize(36);
  fill(30, 60, 20);
  text("Fim de Jogo! 🎉", width / 2, height / 2 - 70);
  textSize(24);
  text(`Pontuação: ${pontuacao} / ${perguntas.length}`, width / 2, height / 2 - 20);
  
  desenhaBotao("Menu 🔁", width / 2 - 75, height / 2 + 40, 150, 50);
}

function mousePressed() {
  if (feedback) return; // bloqueia clique durante feedback

  if (estado === "menu") {
    if (clicouBotao(width / 2 - 75, height / 2, 150, 50)) {
      estado = "dificuldade";
    }
  } else if (estado === "dificuldade") {
    if (clicouBotao(100, 120, 150, 50)) iniciarJogo("facil");
    else if (clicouBotao(350, 120, 150, 50)) iniciarJogo("medio");
    else if (clicouBotao(100, 200, 150, 50)) iniciarJogo("inferno");
    else if (clicouBotao(350, 200, 150, 50)) iniciarJogo("insano");
  } else if (estado === "jogo") {
    let q = perguntas[perguntaAtual];
    for (let i = 0; i < q.opcoes.length; i++) {
      if (clicouBotao(width / 2 - 100, 120 + i * 65, 200, 50)) {
        let acertou = q.opcoes[i] === q.correta;
        if (acertou) pontuacao++;
        feedback = {tipo: acertou ? "acerto" : "erro", index: i, pergunta: perguntaAtual};
        feedbackTimer = feedbackDuration;
        // Só avança para a próxima pergunta depois do feedback
        setTimeout(() => {
          perguntaAtual++;
          if (perguntaAtual >= perguntas.length) {
            estado = "fim";
          }
          feedback = null;
        }, feedbackDuration * (1000 / 60)); // converte frames pra ms (aprox 30 frames = 500ms)
        break;
      }
    }
  } else if (estado === "fim") {
    if (clicouBotao(width / 2 - 75, height / 2 + 40, 150, 50)) {
      estado = "menu";
    }
  }
}

function iniciarJogo(nivel) {
  dificuldade = nivel;
  if (nivel === "facil") perguntas = embaralhaPerguntas(perguntasFacil);
  else if (nivel === "medio") perguntas = embaralhaPerguntas(perguntasMedio);
  else if (nivel === "inferno") perguntas = embaralhaPerguntas(perguntasInferno);
  else if (nivel === "insano") perguntas = embaralhaPerguntas(perguntasInsano);
  
  perguntaAtual = 0;
  pontuacao = 0;
  estado = "jogo";
}

// Desenha botões com sombra para ficar mais bonito
function desenhaBotao(texto, x, y, w, h) {
  stroke(0);
  strokeWeight(2);
  fill(255);
  rect(x, y, w, h, 10);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(texto, x + w / 2, y + h / 2);
}

// Verifica clique dentro do botão
function clicouBotao(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

// Embaralha perguntas e embaralha as opções dentro de cada pergunta
function embaralhaPerguntas(array) {
  let copia = [];
  for (let obj of array) {
    let op = [...obj.opcoes];
    shuffle(op, true);
    copia.push({pergunta: obj.pergunta, opcoes: op, correta: obj.correta});
  }
  return shuffle(copia, true);
}

// Desenha feedback de acerto ou erro com uma luz colorida no botão selecionado
function desenhaFeedback() {
  if (!feedback) return;
  let i = feedback.index;
  let y = 120 + i * 65;
  noFill();
  strokeWeight(5);
  if (feedback.tipo === "acerto") {
    stroke(0, 255, 0, map(feedbackTimer, 0, feedbackDuration, 0, 255));
  } else {
    stroke(255, 0, 0, map(feedbackTimer, 0, feedbackDuration, 0, 255));
  }
  rect(width / 2 - 100 + 3, y + 3, 194, 44, 12);
}
