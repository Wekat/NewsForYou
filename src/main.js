// API KEY: abb493012a5a47909c682c381a8e855b
let url = 'http://newsapi.org/v2/top-headlines?';

let country = 'country=se';
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
            inputCategory: 'undefined',
            inputCountry: 'undefined',
            inputPhrase:'',
            pageSize: 50,
            articles: [],
        }
    },

    computed: {
        apiUrl() {
            let urlParams = [api];
            if (this.inputCategory !== '' && this.inputCategory !== 'undefined') {
                urlParams.push(`category=${this.inputCategory}`);
            }
            if (this.inputCountry !== '' && this.inputCountry !== 'undefined') {
                urlParams.push(`country=${this.inputCountry}`);
            }
            if (this.inputPhrase !== '') {
                urlParams.push(`q=${this.inputPhrase}`);
            }
            if (urlParams.length === 1) {
                urlParams.push(country);
            }

            urlParams.push(`pageSize=${this.pageSize}`);
            return url + urlParams.join('&');
        },
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
                    this.articles = articlesResponse.articles;
                    this.articles.forEach(element => {
                        element.publishedAt = new Date (element.publishedAt).toDateString();
                    });
                })

                .catch((error) => {
                    Console.log(error);
                })
        },
        
    },

    mounted() {
        this.fetchData();
    },

    // denna vill kunna ha bara genom anrop på fetchData, som längre ner!
    // mounted: function() {
    //     fetch(url + country + api)
    //         .then(response => response.json())
    //         .then(articlesResponse => {
    //             this.articles = articlesResponse.articles
    //         })
    // },
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