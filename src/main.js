// API KEY: abb493012a5a47909c682c381a8e855b
let url = 'http://newsapi.org/v2/top-headlines?pageSize=50&';

let country = 'country=se&';
let api = 'apiKey=abb493012a5a47909c682c381a8e855b';

const app = new Vue({
    el: '#app',
    data: {
        articles: [],
    },
    
    mounted: function() {
        fetch(url + country + api)
            .then(response => response.json())
            .then(articlesResponse => {
                this.articles = articlesResponse.articles
            })
    }
})

Vue.component('search-button', {
    data: function () {
      return {
        inputCategory: "",
        inputCountry: "",
        inputPhrase: ""
      }
    },
    template: '<button @click="onSearch" class="button"><i class="fas fa-search"></button>',
    methods: {
        onSearch() {
            const inputCathegory = this.inputCategory;
            const inputCountry = this.inputCountry;
            const inputPhrase = this.inputPhrase;

            fetch (url + 'country=' + this.inputCountry + '&' + 'category=' + this.inputCategory + '&' + 'q=' + this.inputPhrase + api)
                .then(response => response.json())
                .then(articlesResponse => {
                    this.articles = articlesResponse.articles
                })
        },

        

    }
})