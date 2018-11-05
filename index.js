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
var selectedValues = [];
var selectedFacetId = [];

client
  .get(
    // vraag alle boeken op
    "search",
    {
      q: "format:book",
      librarian: true,
      refine: true
    },
    "title"
  )
  .then(response => JSON.parse(response).aquabrowser)
  .then(response => {
    // neem rctx
    var rctx = response.meta.rctx;
    return rctx;
  })

  .then(rctx => {
    // kijk in de rctx naar het totaal aantal boeken per Genre
    client
      .get("refine", {
        rctx: rctx,
        count: 100
      })
      .then(rctx => JSON.parse(rctx).aquabrowser)
      .then(rctx => {
        var allFacets = rctx.facets.facet;
        var languageFacet = getLanguageFacet(allFacets);
        return selectedFacetId;
      })

      .then(rctx => {
        var selectedFacetIds = [
          "language(ger)",
          "language(eng)",
          "language(fre)"
        ]; // vervangen met automatisch gegenereerde Array
        selectedFacetIds.forEach(function(selectedFacetIds) {
          client
            .get("search", {
              q: "format:book",
              facet: selectedFacetIds,
              refine: true
            })
            .then(res => JSON.parse(res).aquabrowser)
            .then(res => {
              console.log("RCTX per taal");
              console.log(res.meta.rctx);
            });
        });
      });
  })
  .catch(err => console.log(err)); // Something went wrong in the request to the API

//!!!!! FUNCTIONS

function getLanguageFacet(facetData) {
  // facetData.forEach(function(facetData) {
  //   var facetKey = facetData.id;
  //
  //   if (facetKey === "Language") {
  //     var allLanguages = facetData.value;
  //     allLanguages.forEach(function(allLanguages) {
  //       var count = parseInt(allLanguages.count);
  //       var id = allLanguages.id;
  //       var facetId = "language(" + id + ")";
  //
  //       if (count > 20000) {
  //         // als aantal groter is dan ... sla data op in:
  //         selectedValues.push({
  //           languageId: id,
  //           languageCount: count
  //         });
  //         selectedFacetId.push({
  //           facetId
  //         });
  //       }
  //     });
  //   }
  // });
}
