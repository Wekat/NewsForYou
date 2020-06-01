// API KEY: abb493012a5a47909c682c381a8e855b
let url = 'http://newsapi.org/v2/top-headlines?pageSize=50&';

let country = 'country=se&';
let api = 'apiKey=abb493012a5a47909c682c381a8e855b';

// const app = new Vue({
//     el: '#app',
//     data: {
//         articles: [],
//     },
    
//     mounted: function() {
//         fetch(url + country + api)
//             .then(response => response.json())
//             .then(articlesResponse => {
//                 this.articles = articlesResponse.articles
//             })
//     }
// })

const app = new Vue({
    el: '#app',
    data () {
        return {
            apiUrl:'',
            isBusy: false,
            showloader: false,
            currentPage: 1,
            maxPerPage: 50,
            inputCategory: '',
            inputCountry: '',
            inputPhrase:'',
            articles: [],
        }
    },
    
    mounted: function() {
        fetch(url + country + api)
            .then(response => response.json())
            .then(articlesResponse => {
                this.articles = articlesResponse.articles
            })
    },

    methods: {
        resetData() {
            this.currentPage = 1;
            this.articles = [];
        },
        fetchSearchNews() {
            if(this.inputCategory !== '' || this.inputCountry !== '' || this.inputPhrase !== '') {
                this.apiUrl = url + country + api;
                this.isBusy = true;

                this.resetData();
                this.fetachData();
            }
            else {
                this.fetchTopNews();
            }
            
        },
        fetchTopNews() {
            this.apiUrl = url + 'category=' + this.inputCategory + '&'
            + 'country=' + this.inputCountry + '&'
            + 'q=' + this.inputPhrase + '&' + api;

            this.isBusy = true;
            this.inputCategory = '';
            this.inputCountry = '';
            this.inputPhrase = '';

            this.resetData();
            this.fetchData();
        },
        fetchData() {
            let req = new Request(this.apiUrl + '&page=' + this.currentPage);
            fetch(req)
                .then((resp) => resp.json())
                .then((data) => {
                    this.totalResults = data.totalResults;
                    data.articles.forEach(element => {
                        this.article.push(element);
                    });
                    this.isBusy = false;
                    this.showLoader = false;
                })
                .catch((error) => {
                    Console.log(error);
                })
        },
        created() {
            this.fetachTopNews();
        }
    }
})

Vue.component('search-button', {
    data: function () {
      return {
        inputCategory: '',
        inputCountry: '',
        inputPhrase: ''
      }
    },
    template: '<button @click="fetchSearchNews" class="button"><i class="fas fa-search"></button>',
    methods: {
        fetchSearchNews() {
            if(this.inputCategory !== '' || this.inputCountry !== '' || this.inputPhrase !== '') {
                this.apiUrl = url + country + api;
                this.isBusy = true;

                this.resetData();
                this.fetachData();
            }
            else {
                this.fetchTopNews();
            }
            
        },
        fetchTopNews() {
            this.apiUrl = url + 'category=' + this.inputCategory + '&'
            + 'country=' + this.inputCountry + '&'
            + 'q=' + this.inputPhrase + '&' + api;

            this.isBusy = true;
            this.inputCategory = '';
            this.inputCountry = '';
            this.inputPhrase = '';

            this.resetData();
            this.fetchData();
        },

        

    }
})

// Vue.component('search-button', {
//     data: function () {
//       return {
//         inputCategory: "",
//         inputCountry: "",
//         inputPhrase: ""
//       }
//     },
//     template: '<button @click="fetchSearchNews" class="button"><i class="fas fa-search"></button>',
//     methods: {
//         onSearch() {
//             const inputCathegory = this.inputCategory;
//             const inputCountry = this.inputCountry;
//             const inputPhrase = this.inputPhrase;

//             fetch (url + 'country=' + inputCountry + '&' + 'category=' + inputCategory + '&' + 'q=' + inputPhrase + api)
//                 .then(response => response.json())
//                 .then(articlesResponse => {
//                     this.articles = articlesResponse.articles
//                 })
//         },

        

//     }
// })