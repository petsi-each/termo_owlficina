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

// Função para bloquear todos os inputs já usados ou classificados
function bloquearInputsClassificados() {

    const todasAsLetras = document.querySelectorAll('.letra');
    todasAsLetras.forEach(input => {
        if (
            input.classList.contains('correta') ||
            input.classList.contains('espera') ||
            input.classList.contains('presente') ||
            input.classList.contains('ausente')
        ) {
            input.disabled = true;
        }
        else {
            input.disabled = false;
        }
    });
}

// Função para verificar o status de cada letra
function verificarStatus() {
    const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
    
    // Lista para armazenar os status das letras
    let status = [];

    // Verifica se o jogo foi vencido
    let status_do_jogo = true;
    
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
            status_do_jogo = false;
        } else {
            input.classList.add('ausente');
            status.push('ausente');
            status_do_jogo = false;
        }
    });
    
    // Atualiza a tentativa se o jogo não terminou
    if(!status_do_jogo){
        estadoDoJogo[tentativaAtual] = status;
    }

    return status_do_jogo;
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
            let status_do_jogo = verificarStatus();

            // Desativa todos os inputs do jogo caso tenha terminado
            if(status_do_jogo){
                document.querySelectorAll('.letra').forEach(elemento => elemento.disabled = true);
                return; // PARA O JOGO
            }

            // Se a tentativa atual não for a última, vai para a próxima linha
            if (tentativaAtual < 5) {
                tentativaAtual++;
                letraAtual = 0; // Reinicia a coluna
				reinicializarLinha(tentativaAtual);
                bloquearInputsClassificados();
                document.querySelector(`#L${tentativaAtual} .letra`).focus(); // Foca na primeira letra da nova linha
            }
        }
    }
});

// Eventos do Teclado Virtual, criados após o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    bloquearInputsClassificados();

    // Acrescentando evento de clique a cada LETRA do teclado virtual
    document.querySelectorAll('.teclado').forEach(botao =>{
        botao.addEventListener('click', () => {

            const letra = botao.textContent.trim().toUpperCase();
            const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);


            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value === '' && !inputs[i].disabled) {
                    inputs[i].value = letra;
                    break;
                }
            }
        });
    });

    // ENTER simples
    const enter = document.querySelector('#teclado-do-jogo .enter');
    if (enter) enter.addEventListener('click', () => {

        // Criando um evento que simula o pressionamento da tecla Enter
        const eventoEnter = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(eventoEnter);        
    });

    // DELETE simples
    const deletar = document.querySelector('#teclado-do-jogo .backspace');
    if (deletar) deletar.addEventListener('click', () => {

        const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
        for (let i = inputs.length - 1; i >= 0; i--) {
            if (inputs[i].disabled) continue;

            if (inputs[i].value !== '') {
                inputs[i].value = '';
                break;
            }
        }
    });
});