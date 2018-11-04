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
// PARAMS = API url parameter options (see api docs for more info) https://zoeken.oba.nl/api/v1/

// Client returns a promise which resolves the APIs output in JSON

var rctx;

client
  .get(
    "search",
    {
      q: "format:book",
      librarian: true,
      refine: true
      //facet: "language(eng)"
    },
    "title"
  )
  .then(response => JSON.parse(response).aquabrowser)
  .then(response => {
    //console.log(response);
    var rctx = response.meta.rctx;
    console.log(rctx);
    return rctx;
  })
  .then(rctx => {
    client
      .get("refine", {
        rctx: rctx,
        count: 100
      })
      .then(rctx => JSON.parse(rctx).aquabrowser)
      .then(rctx => {
        var originalQuery = rctx.meta["original-query"];
        // console.log(originalQuery);
        var facet = rctx.facets.facet;
        var languageFacet = getLanguageFacet(facet);
        var facetDate = getFacetData(facet);
      });
  })
  .catch(err => console.log(err)); // Something went wrong in the request to the API

function getLanguageFacet(facetData) {
  facetData.forEach(function(facetData) {
    var facetId = facetData.id;
    if (facetId === "Genre") {
      console.log(facetData);
    }
  });
}

function getFacetData(data) {
  console.log("getFacetData");
}

function getRctx(data) {
  console.log("getRctx");
}
