import { CountryService } from "./CountryService.js";
import { ArrayUtil } from "./ArrayUtil.js";

export class Game{
    constructor(){
        this.countryService = CountryService.get();
        this.countryService.ready.then(() => {
            this.createChallenge();
        });

        this.retrieveWidgets();
        this.bindEvents();
        this.setup();
    }

    setup(){
        this.score = 0;
        this.lock = false;
        this.widgets.bestScore.innerText = localStorage.getItem('bestScore') ?? 0;
        this.widgets.score.innerText = this.score;
    }

    retrieveWidgets(){
        this.widgets = {
            choices: document.querySelector('.choices'),
            flag: document.querySelector('.flag'),
            score: document.querySelector('.score span'),
            bestScore: document.querySelector('.best-score span')
        };
    }

    bindEvents(){
        this.widgets.choices.addEventListener('click', e => {
            if(e.target.classList.contains('choices') || this.lock){
                return;
            }

            this.lock = true;
            if(e.target.innerText === this.answer.translations.fra.common){
                this.score++;
                this.updateScore();
                e.target.classList.add('valid');
            }else{
                e.target.classList.add('error');
            }

            setTimeout(() => {
                this.createChallenge();
            }, 3000);
        });
    }

    createChallenge(){
        this.lock = false;
        this.choices = [];

        this.widgets.choices.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const randomCountry = this.countryService.getRandom();

            const choiceWidget = document.createElement('div');
            choiceWidget.innerText = randomCountry.translations.fra.common;
            this.widgets.choices.appendChild(choiceWidget);

            this.choices.push(randomCountry);
        }

        this.answer = ArrayUtil.randomElement(this.choices);

        const flagUrl = this.countryService.buildImageUrl(this.answer.cca2);
        this.widgets.flag.setAttribute('src', flagUrl);
    }

    updateScore(){
        this.widgets.score.innerText = this.score;

        const bestScore = localStorage.getItem('bestScore');
        if(bestScore < this.score){
            localStorage.setItem('bestScore', this.score);
            this.widgets.bestScore.innerText = this.score;
        }
    }
}
