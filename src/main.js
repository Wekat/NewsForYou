// API KEY: abb493012a5a47909c682c381a8e855b
let url = 'http://newsapi.org/v2/top-headlines?';

let country = 'country=se';
let api = 'apiKey=abb493012a5a47909c682c381a8e855b';

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
        
        fetchData() {
            let req = new Request(this.apiUrl);
            fetch(req)

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
})