'use strict';
window.onload = () => {
    const board = document.querySelector('.board');
    const diffs = document.querySelector('.diff-btns');
    const restart = document.querySelector('.restart');
    const playbtn = document.querySelector('.play-btn');
    const winmenu = document.querySelector('.win');
    const winrestart = document.querySelector('.play-again');
    const tomenu = document.querySelector('.to-menu');

    restart.addEventListener('click', e=>{
        newGame();
    });

    board.setAttribute('style', 'display:none');
    restart.setAttribute('style', 'display:none');
    winmenu.setAttribute('style', 'display:none');

    diffs.querySelectorAll('li').forEach(e => {
        e.addEventListener('click', event => {
            newGame(parseInt(e.getAttribute('data-diff')));
            document.querySelector('.main-menu').setAttribute('style', 'display:none');
            restart.removeAttribute('style');
            board.removeAttribute('style');
            diffs.setAttribute('style', 'display:none')
        });
    });

    diffs.setAttribute('style', 'display:none;');

    playbtn.addEventListener('click', event => {
        playbtn.parentNode.setAttribute('style', 'display:none;');
        diffs.removeAttribute('style');
    });

    winrestart.addEventListener('click', e=>{
        winmenu.setAttribute('style', 'display:none');
        board.removeAttribute('style');
        document.querySelector('.main-menu').setAttribute('style', 'display:none');        
        newGame();
    });

    tomenu.addEventListener('click', e=>{
        winmenu.setAttribute('style', 'display:none');
        board.setAttribute('style', 'display:none');
        document.querySelector('.main-menu').removeAttribute('style');
        document.querySelector('.main-buttons').removeAttribute('style'); 
    });

}

const colors = ['red', 'green', 'blue', 'orange', 'magenta', 'yellow', 'slime', 'greyish', 'darkness', 'lightness'].sort(function (a, b) { return 0.5 - Math.random() });

let lastFlipped;
let lastDiff = 0;

const gameStatus = () => {
    if (document.querySelectorAll('.flip-container').length == 0) {
        document.querySelector('.board').setAttribute('style', 'display:none');
        document.querySelector('.restart').setAttribute('style', 'display:none');
        document.querySelector('.win').removeAttribute('style');
        document.querySelector('.main-menu').removeAttribute('style');
    }
}

const cardLogic = (card) => {
    if (!lastFlipped) {
        lastFlipped = card;
    } else {
        if (card.querySelector('.back').style.backgroundColor == lastFlipped.querySelector('.back').style.backgroundColor) {
            setTimeout(() => {
                card.remove();
                lastFlipped.remove();
                gameStatus();
                lastFlipped = false;
            }, 1000);
        } else {
            setTimeout(() => {
                lastFlipped.classList.remove('flip');
                card.classList.remove('flip');
                lastFlipped = false;
            }, 1000);
        }
    }

}

const unflipCards = (cards) => {
    cards.forEach(card => {
        card.classList.remove('flip');
    });
}

const shuffle = (cards) => {
    cards.forEach((element, i) => {
        setTimeout(() => {
            element.classList.add("shuffle")
        }, 100 * (i - 1));
        setTimeout(() => {
            element.classList.remove("shuffle")
        }, (100 * cards.length) + 500);
    });
}

const positionCards = (cards, diff) => {
    cards.forEach(card => {
        card.style.zIndex = Math.floor((Math.random() * 10) + 1);
        card.style.left = Math.floor((Math.random() * (window.innerWidth - card.clientWidth))) + "px";
        card.style.top = Math.floor((Math.random() * (window.innerHeight - card.clientHeight))) + "px";
        if (diff < 2) {
            card.classList.add('flip');
            setTimeout(() => {
                card.classList.remove('flip');
            }, 1000);
        }
    });
}

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

const createCard = (i) => {
    let card = document.createElement('div');
    card.classList.add('flip-container');
    card.setAttribute('data-color', colors[Math.floor(i / 2)]);

    let flipper = document.createElement('div');
    flipper.classList.add('flipper');

    let front = document.createElement('div');
    front.classList.add('front');
    flipper.appendChild(front);

    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundColor = `var(--${colors[Math.floor(i / 2)]})`;
    flipper.appendChild(back);

    card.appendChild(flipper);
    card.addEventListener('click', (event) => {
        let trgt = event.target;
        if (!trgt.classList.contains('flip-container'))
            trgt = findAncestor(event.target, 'flip-container');
        if (!trgt.classList.contains('flip')) {
            if (document.querySelectorAll('.flip').length < 2) {
                trgt.classList.toggle('flip');
                cardLogic(trgt);
            }
        }
    })

    return card;

}

const createCards = (numCards) => {
    let cards;
    for (let index = 0; index < numCards; index++) {
        document.querySelector('.board').appendChild(createCard(index));
    }
    return document.querySelectorAll('.flip-container');
}

const clearBoard = () => {
    document.querySelectorAll('.flip-container').forEach(elmnt => { elmnt.remove() });
}

const newGame = (diff=lastDiff) => {
    lastDiff = diff;
    let numCards = (8 + diff) * 2;
    if (numCards < 16) numCards = 4;
    if (numCards > 20) numCards = 20;
    if (document.querySelectorAll('.flip-container').length > 0)
        clearBoard();
    let cards = createCards(numCards);
    unflipCards(cards);
    shuffle(cards);
    setTimeout(() => {
        positionCards(cards, diff);
    }, 100 * cards.length + 500);
}
