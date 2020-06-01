// API KEY: abb493012a5a47909c682c381a8e855b
let url = 'http://newsapi.org/v2/top-headlines?pageSize=50&';

let country = 'country=se&';
let api = 'apiKey=abb493012a5a47909c682c381a8e855b';

/* --- first alternative to fetching the api but need to find way to search! ---*/
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

/* second alternative but still no search that work --*/
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
            inputCountry: 'se',
            inputPhrase:'',
            articles: [],
        }
    },

    computed: {
        apiUrl() {
            if (this.inputCategory !== '' && this.inputCountry !== '' && this.inputPhrase !== '') {
                this.apiUrl = url + `category=${this.inputCategory}&`
                + `country=${this.inputCountry}&`
                + `q=${this.inputPhrase}&` + api;
            } else if (this.inputCategory !== '') {
                this.apiUrl = url + `country=${this.inputCountry}&`
                + `q=${this.inputPhrase}&` + api;
            } else if (this.inputCountry !== '') {
                this.apiUrl = url + `category=${this.inputCategory}&`
                + `q=${this.inputPhrase}&` + api;
            } else if (this.inputPhrase !== '') {
                this.apiUrl = url + `category=${this.inputCategory}&`
                + `country=${this.inputCountry}&`
                + api;
            }
        },
    },
    
    // denna vill kunna ha bara genom anrop på fetchData!
    mounted: function() {
        fetch(url + country + api)
            .then(response => response.json())
            .then(articlesResponse => {
                this.articles = articlesResponse.articles
            })
    },

    methods: {
        onSearch() {
            this.resetData();
            this.fetchData();
        },

        resetData() {
            this.articles = [];
        },
        // fetchSearchNews() {
        //     if(this.inputCategory !== '' || this.inputCountry !== '' || this.inputPhrase !== '') {
        //         this.apiUrl = url + country + api;
        //         this.isBusy = true;

        //         this.resetData();
        //         this.fetachData();
        //     }
        //     else {
        //         this.fetchTopNews();
        //     }
            
        // },
        // fetchTopNews() {
        //     this.apiUrl = url + 'category=' + this.inputCategory + '&'
        //     + 'country=' + this.inputCountry + '&'
        //     + 'q=' + this.inputPhrase + '&' + api;

        //     this.isBusy = true;
        //     this.inputCategory = '';
        //     this.inputCountry = '';
        //     this.inputPhrase = '';

        //     this.resetData();
        //     this.fetchData();
        // },
        fetchData() {
            let req = new Request(this.apiUrl);
            fetch(req)
                // .then((resp) => resp.json())
                // .then((data) => {
                //     this.totalResults = data.totalResults;
                //     data.articles.forEach(element => {
                //         this.articles.push(element);
                //     });
                //     this.isBusy = false;
                //     this.showLoader = false;

                .then(response => response.json())
                .then(articlesResponse => {
                    this.articles = articlesResponse.articles
                })

                .catch((error) => {
                    Console.log(error);
                })
        },
        mounted() {
            this.fetchData();
        }
    }
})

// Vue.component('search-button', {
//     data() {
//       return {
//         inputCategory: '',
//         inputCountry: '',
//         inputPhrase: ''
//       }
//     },
//     template: '<button @click="fetchSearchNews" class="button"><i class="fas fa-search"></i></button>',
//     methods: {
//         fetchSearchNews() {
//             if(this.inputCategory !== '' || this.inputCountry !== '' || this.inputPhrase !== '') {
//                 this.apiUrl = url + country + api;
//                 this.isBusy = true;

//                 this.resetData();
//                 this.fetchData();
//             }
//             else {
//                 this.fetchTopNews();
//             }
            
//         },
//         fetchTopNews() {
//             this.apiUrl = url + 'category=' + this.inputCategory + '&'
//             + 'country=' + this.inputCountry + '&'
//             + 'q=' + this.inputPhrase + '&' + api;

//             this.isBusy = true;
//             this.inputCategory = '';
//             this.inputCountry = '';
//             this.inputPhrase = '';

//             this.resetData();
//             this.fetchData();
//         },

        

//     }
// })

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