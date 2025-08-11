# Owlficina Web: Front-End Essentials 🦉 💻

Este workshop foi desenvolvido para fornecer aos participantes uma compreensão sólida dos fundamentos do desenvolvimento front-end. Ao final do workshop, os participantes terão um clone personalizado do jogo Termo criado com HTML, CSS e JavaScript puro.

>  Este repositório é um código de exemplo com as principais funcionalidades do jogo. Você pode usilizá-lo para consultas durante as *Owlficinas* ou fazer um *Fork* deste repositório e melhorá-lo para o entregável. 

## O que é o Termo?
Baseado no jogo de navegador [Wordle](https://www.nytimes.com/games/wordle/index.html") criando pelo engenheiro de software Josh Wardle, o 
[Term.ooo](Https://term.ooo) foi um projeto criativo desenvolvido durante as férias do trabalho pelo brasileiro Fernando Serboncini qie explodiu pelo mundo dos falantes de português.

Descubra a palavra em 6 tentativas. A cada tentativa, as letras vão indicando o quão próximo você está!

---

## Estrutura básica do projeto:

Mapa conceitual de *estruturas* no [HTML](./index.html).

![Diagrama das estruturas HTML utilzadas no projeto](./assets/diagrama.png)

**Lista de arquivos:**
- [./assets](./assets/) : *Fontes complementares ao projeto - imagens, pdfs, arquivos, etc...*
- [./index.html](index.html) : *Arquivo HTML principal.*  
- [./index.css](index.css) : *Arquivo de estilização CSS principal.*  
- [./script.js](script.js) : *Script de interações da página HTML.* 

---

## Entenda o código:

### Variáveis do Sistema
``` const estadoDoJogo ``` - matriz 5x6 de armazenamento da classe de estado de cada letra digitada em linhas concluídas do jogo principal. A Seus valores são atualizados sempre que uma nova linha é concluída, classificando letras como 'presente', 'ausente' ou 'correta'.

``` const palavraSecreta ``` - vetor ordenado de 5 letras que constituem a palavra secreta. 

``` let tentativaAtual ``` - contador que armazena o endereço (0 a 5) da linha de tentativa ativa atual do jogador.

``` let letraAtual ``` - armazena o endereço (0 a 4) da letra ativa selecionada atualmente peo jogador. 

### Funções
``` function bloquearInputsClassificados() ``` -  bloqueia todos os inputs do DOM de letras já jogadas (e classificadas) ou em espera.

``` function verificarStatus() ``` - compara as letras de uma tentativa com as letras da *palavra secreta*. Após essa validação, atualiza o conteúdo da tentativa na matriz de estado do jogo. Retorna *TRUE* caso a tentativa tenha acertado a palavra, retorna *FALSE* caso contrário.

``` function reinicializarLinha(tentativaAtual) ``` - remove a classificação 'espera' de todas as letras de uma nova linha de tentativa.

### Eventos

``` document 'keydown' ``` - verifica se a tecla apertada no dispositivo fora 'Enter'. Neste caso, checa se todas as letras da linha de tentativa atual foram preenchidas para chamar a função *verificarStatus()* e desativar todos os inputs caso o jogo tenha terminado; caso contrário, aumenta o contador da tentativa e chama as funções *reinicializarLinha()* e *bloquearInputsClassificados()*.

``` document 'DOMContentLoaded' ``` - após carregamento do DOM, chama a função *bloquearInputsClassificados()* e adiciona eventos aos botões do teclado virtual.

``` button 'click' ``` - preenche o input em destaque na linha de tentativa com o valor do botão após o clique em qualquer botão de *LETRA* do teclado virtual. No botão *DELETE*, elimina o valor preenchido no input em destaque. No botão *ENTER*, cria um evento de 'keydown' na tecla enter do teclado do dispositivo.

---

## Sugestões de melhoria:

Estas são algumas sugestões de melhorias que você pode ou não utilizar para personalizar a sua versão do programa:

- [ ] Recriar o "Dueto" e "Quarteto".

- [ ] Revelar a palavra secreta após o jogador errar todas as suas tentativas.

- [ ] Acrescentar um pop-up de vitória quando o jogador acertar a palavra!

- [ ] Acrescentar uma nota personalizada sobre o autor do projeto, divulgando suas redes sociais.

- [ ] Validar se a palavra digitada existe no dicionário da língua portuguesa.