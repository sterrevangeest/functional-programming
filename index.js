// console.log("testtesttest");
const OBA = require("oba-api");
require("dotenv").config();

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client
  .get(
    "search",
    {
      q: "format:book",
      librarian: true,
      refine: true,
      facet: "language(eng)"
    },
    "title"
  )
  // .get(
  //   "refine",
  //   {
  //   rctx:
  //     "ARXIMQ6CMBQG4P@REEI4ggtuDiYIOnkZ08ILNJYWCk2ME5Mn8CZuHsSbuIvLN3wEkSFB6Ss$1Te$d6M1U9m116PqGuUqQUh7qS0EUuV47ZV9HvTcsvKsm7zn$fxPEht98VxPA@tBthxXhwifFy1mMdH7K2j3fBABiVMSwLbwzs2F0WPQTbFeErxBbA39AA==",
  //   count: 100
  // })

  .then(response => JSON.parse(response).aquabrowser)
  .then(response => {
    //console.log(response);
    var result = response.results.result;
    console.log(result);
    var keys = getKeys(result);
    var format = getFormat(result);
    var languages = getLanguages(result);
    var genres = getGenres(result);

    var facet = response.facets;
    console.log(facet);
  })

  .catch(err => console.log(err)); // Something went wrong in the request to the API

function getKeys(data) {
  //console.log(data);
  var keys = Object.keys(data[0]);
  //console.log("Keys: ", keys);
  return keys;
}

function getFormat(data) {
  data.forEach(function(data) {
    //console.log(data.formats.format["search-term"]);
  });
}

function getLanguages(data) {
  data.forEach(function(data) {
    //console.log(data.languages.language["search-term"]);
  });
}

function getGenres(data) {
  data.forEach(function(data) {
    //console.log(data.genres.genre["search-term"]);

    var genres = data.genres;

    if (genres == undefined) {
      console.log("there is no genre");
    } else {
      var genre = genres.genre;
      var genreSearchTerm = genre["search-term"];
      //console.log(genre);
      console.log(genreSearchTerm);
      console.log(typeof genre);

      if (genreSearchTerm == undefined) {
        console.log("Dit boek heeft meer dan 1 genre:");
        genre.forEach(function(genre) {
          console.log("genre : " + genre["search-term"]);
        });
      } else {
        //console.log("error");
      }
    }
  });
}
