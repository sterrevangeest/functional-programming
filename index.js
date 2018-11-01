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
      refine: true
    },
    "title"
  )
  .then(response => JSON.parse(response).aquabrowser.results.result)
  .then(response => {
    //console.log(response);
    var keys = getKeys(response);
    var importTime = getImortTime(response);
    var languages = getLanguages(response);
    var subjects = getSubjects(response);
  })
  .catch(err => console.log(err)); // Something went wrong in the request to the API

function getKeys(data) {
  //console.log(data);
  var keys = Object.keys(data[0]);
  console.log("Keys: ", keys);
  return keys;
}

function getImortTime(data) {
  data.forEach(function(data) {
    console.log(data["librarian-info"].info["import-time"]);
  });
}

function getLanguages(data) {
  data.forEach(function(data) {
    console.log(data.languages.language["search-term"]);
  });
}

function getSubjects(data) {
  data.forEach(function(data) {
    console.log(data.subjects["topical-subject"]["search-term"]);
  });
}
