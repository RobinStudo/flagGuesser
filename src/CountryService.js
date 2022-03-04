import { ArrayUtil } from "./ArrayUtil.js";

export class CountryService{
    constructor(){
        if(self.instance){
            throw new Error();
        }

        this.options = {
            apiUrl: 'https://restcountries.com/v3.1/all',
            imageUrl: 'https://countryflagsapi.com/svg/',
        };

        this.load();
    }

    load(){
        this.ready = new Promise(resolve => {
            fetch(this.options.apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.countries = data;
                    resolve();
                })
            ;
        });
    }

    getRandom(){
        return ArrayUtil.randomElement(this.countries);
    }

    buildImageUrl(code){
        return this.options.imageUrl + code;
    }

    static get(){
        if(!self.instance){
            self.instance = new CountryService();
        }

        return self.instance;
    }
}