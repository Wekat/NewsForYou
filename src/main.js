// API KEY: abb493012a5a47909c682c381a8e855b
var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=abb493012a5a47909c682c381a8e855b';

// const vm = new Vue({
// el: '#app',
// data: {
//     results: [
//         {title: "the very first post", abstract: "lorem ipsum some test dimpsum"},
//         {title: "and then there was the second", abstract: "lorem ipsum some test dimsum"},
//         {title: "third time's a charm", abstract: "lorem ipsum some test dimsum"},
//         {title: "four the last time", abstract: "lorem ipsum some test dimsum"}
//         ]
//     }
// });


const app = new Vue({
    el: '#app',
    data: {
        articles: [],
    },
    
    mounted: function() {
        fetch(url)
            .then(response => response.json())
            .then(articlesResponse => {
                this.articles = articlesResponse;
            })
    }
})