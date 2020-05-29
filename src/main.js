// API KEY: abb493012a5a47909c682c381a8e855b
var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=abb493012a5a47909c682c381a8e855b';


const app = new Vue({
    el: '#app',
    data: {
        articles: [],
    },
    
    mounted: function() {
        fetch('https://cors-anywhere.herokuapp.com/' + url)
            .then(response => response.json())
            .then(articlesResponse => {
                this.articles = articlesResponse;
            })
    }
})

fetch('https://cors-anywhere.herokuapp.com/' + url)
 .then(response => response.json())
 .then(json => console.log(json))