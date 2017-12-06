'use strict';

window.onload = () => {

    for (let ind = 0; ind < document.querySelector('#num-cards').value; ind++) {
        document.querySelector('.board').appendChild(createCard());
    }
    document.querySelector('.restart').addEventListener('click', (event) => {
        event.preventDefault();
        newGame(document.querySelector('#num-cards').value);
    })
}

const colors = ['red', 'green', 'blue', 'orange', 'magenta', 'yellow', 'slime', 'greyish', 'darkness', 'lightness'];

const cardLogic = (card) => {
    let flippedCards = document.querySelectorAll('.flip');
    flippedCards.forEach((card) => {
        setTimeout(() => { card.classList.remove('flip') }, 2000);
    });
}

const shuffle = (cards)=>{
    cards.forEach((element, i) => {
        setTimeout(() => {
            element.classList.add("shuffle")
        }, 100 * (i-1));
        setTimeout(() => {
            element.classList.remove("shuffle")
        }, (100 * cards.length)+500);
    });
}

const positionCards = (cards) => {
    cards.forEach(card => {
        card.style.left = Math.floor((Math.random() * (window.innerWidth - 260))+100)+"px";
        card.style.top = Math.floor((Math.random() * (window.innerHeight - 340)))+"px";
    });
}

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

const createCard = () => {
    let card = document.createElement('div');
    card.classList.add('flip-container');

    let flipper = document.createElement('div');
    flipper.classList.add('flipper');

    let front = document.createElement('div');
    front.classList.add('front');
    flipper.appendChild(front);

    let back = document.createElement('div');
    back.classList.add('back');
    flipper.appendChild(back);

    card.appendChild(flipper);
    card.addEventListener('click', (event) => {
        findAncestor(event.target, "flip-container").classList.toggle('flip');
        //cardLogic(event.target);
    })

    return card;

}

const randCards = (cards)=>{
    this.colors = colors.sort(function(a, b){return 0.5 - Math.random()});;
    for (let index = 0; index < cards.length; index+=2) {
        cards[index].querySelector('.back').style.backgroundColor = `var(--${this.colors[Math.floor(index/2)]})`;
        cards[index+1].querySelector('.back').style.backgroundColor = `var(--${this.colors[Math.floor(index/2)]})`;
    }
}

const newGame = (cards) => {
    this.cards = document.querySelectorAll('.flip-container');
    randCards(this.cards);
    // setTimeout(() => {
    //     shuffle(this.cards);
    //     setTimeout(() => {
    //         positionCards(this.cards);
    //     }, 2000);
    // }, 1000);
    positionCards(this.cards);
}
