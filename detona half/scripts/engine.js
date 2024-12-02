// Inicialização do stage
const stage = {
    view: {
        squares: [], // Onde os quadrados serão armazenados
        timeleft: document.getElementById('timeleft') // Elemento para mostrar o tempo
    },
    values: {
        score: 0,
        gameVelocity: 1000, // Intervalo em ms para mover o inimigo
        timeId: null, // Para armazenar o ID do setInterval
        countDownTimeId: null, // Armazenar o ID do setInterval para a contagem regressiva
        hitPosition: 0,
        currentTime: 60, // Tempo inicial do jogo
    }
};

function playSound(){
    let audio = new Audio("./audios/hit.m4a")
    audio.volume = 0.2,
    audio.play();
}

// Selecionando todos os quadrados do jogo
const squares = document.querySelectorAll('.square');
stage.view.squares = Array.from(squares); // Convertendo NodeList para Array

// Função de contagem regressiva
function countDown() {
    if (stage.values.currentTime > 0) {
        stage.values.currentTime--; // Diminui o tempo
        stage.view.timeleft.textContent = stage.values.currentTime; // Atualiza o tempo na tela
    } else {
        alert("Game Over! O seu resultado foi: " + stage.values.score); // Exibe a pontuação final
        clearInterval(stage.values.timeId); // Para o jogo
        clearInterval(stage.values.countDownTimeId); // Para o contador de tempo
        stage.view.timeleft.textContent = '0'; // Define o tempo como 0
    }
}

// Função para colocar o inimigo em um quadrado aleatório
function randomSquare() {
    // Remover a classe 'enemy' de todos os quadrados
    stage.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Gerar um número aleatório para selecionar um quadrado
    let randomNumber = Math.floor(Math.random() * stage.view.squares.length);

    // Selecionar o quadrado aleatório e adicionar a classe 'enemy'
    let randomSquare = stage.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    stage.values.hitPosition = randomSquare.id; // Armazena a posição do quadrado com o inimigo
}

// Função para mover o inimigo a cada intervalo de tempo
function moveEnemy() {
    // Se já houver um intervalo em andamento, pare-o antes de iniciar um novo
    if (stage.values.timeId) {
        clearInterval(stage.values.timeId);
    }

    // Configurar um intervalo para chamar a função randomSquare de tempos em tempos
    stage.values.timeId = setInterval(() => {
        randomSquare();
    }, stage.values.gameVelocity);
}

// Função para adicionar ouvintes de clique aos quadrados
function addListenHitBox() {
    stage.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            // Verifica se o quadrado clicado contém a classe 'enemy'
            if (square.classList.contains("enemy")) {
                // Se o quadrado clicado for o inimigo, aumenta a pontuação
                console.log("Inimigo acertado!");
                stage.values.score++; // Incrementa a pontuação
                document.getElementById("Score").textContent = stage.values.score; // Atualiza a pontuação na tela
                playSound();
            }
        });
    });
}

// Função de inicialização
function initialize() {
    // Inicializa a pontuação
    stage.values.score = 0;
    document.getElementById("Score").textContent = stage.values.score; // Exibe a pontuação inicial

    // Coloca o inimigo em um quadrado aleatório inicialmente
    randomSquare();

    // Começa a mover o inimigo a cada intervalo
    moveEnemy();

    // Adiciona os ouvintes de clique aos quadrados
    addListenHitBox();

    // Inicia a contagem regressiva apenas uma vez
    stage.values.countDownTimeId = setInterval(countDown, 1000);
}

// Inicializa o jogo
initialize();
