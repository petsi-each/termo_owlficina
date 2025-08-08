// Lista de listas: cada item representa uma tentativa
const estadoDoJogo = [
  ['', '', '', '', ''], // Tentativa 1
  ['', '', '', '', ''], // Tentativa 2
  ['', '', '', '', ''], // Tentativa 3
  ['', '', '', '', ''], // Tentativa 4
  ['', '', '', '', ''], // Tentativa 5
  ['', '', '', '', '']  // Tentativa 6
];

// Palavra secreta: PETSI
const palavraSecreta = ['P', 'E', 'T', 'S', 'I'];

// Contadores
let tentativaAtual = 0; // Começa na primeira linha (índice 0)
let letraAtual = 0;    // Começa na primeira coluna (índice 0)



// Função para verificar o status de cada letra
function verificarStatus() {
    // Captura os inputs da tentativa atual
    const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
    
    // Lista para armazenar os status das letras
    let status = [];
    
    // Verifica cada letra da tentativa
    inputs.forEach((input, index) => {
        const letraDigitada = input.value.toUpperCase(); // Considera a letra digitada
        const letraSecreta = palavraSecreta[index];      // Letra correspondente na palavra secreta

        // Verifica se a letra digitada está correta, presente ou ausente
        if (letraDigitada === letraSecreta) {
            input.classList.add('correta');
            status.push('correta');
        } else if (palavraSecreta.includes(letraDigitada)) {
            input.classList.add('presente');
            status.push('presente');
        } else {
            input.classList.add('ausente');
            status.push('ausente');
        }
    });
    
    // Atualiza a tentativa
    estadoDoJogo[tentativaAtual] = status;
}

// Função que re-inicializa uma linha
function reinicializarLinha(tentativaAtual) {
	const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
	
	// Verifica cada letra da tentativa
    inputs.forEach((input, index) => {
        input.classList.remove('espera');
    });
}

// Adiciona o evento para a tecla Enter (verifica se a palavra é correta)
document.addEventListener('keydown', (e) => {
	
    // Verifica se a tecla pressionada foi Enter
    if (e.key === 'Enter') {
        const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
        
        // Se todas as letras forem digitadas, verifica o status
        if (
				inputs[0].value !== '' &&
				inputs[1].value !== '' &&
				inputs[2].value !== '' &&
				inputs[3].value !== '' &&
				inputs[4].value !== ''
			) {
			
            // Verifica o status da tentativa
            verificarStatus();

            // Se a tentativa atual não for a última, vai para a próxima linha
            if (tentativaAtual < 5) {
                tentativaAtual++;
                letraAtual = 0; // Reinicia a coluna
				reinicializarLinha(tentativaAtual);
                document.querySelector(`#L${tentativaAtual} .letra`).focus(); // Foca na primeira letra da nova linha
            } else {
				// Tornar visível um texto
            }
        }
    }
});
