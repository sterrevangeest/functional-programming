// console.log("testtesttest");
const OBA = require("oba-api");
var fs = require("file-system");

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

var allData = [];
// 00 = nederlands , 01 = engels, 02 = frans, 03 = duits, 04 = spaans, 05 = ara/arabisch, 06 = turks
var selectedRctx = [
  "AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1SiktYWRkls6ML0pNLi5ILSoACrIaGTAx3DvJtO8gIxAxfdnByqhxaBIjswcDA3t$UiIDA4OiflF$fol$TmZhaWaKPlCMvbQoh4E1L4cRAA==",
  "AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1Ss1LZ2Rkls6ML0pNLi5ILSoACrIaGTAxTDjBdO0AIxAxXdvOyqhxZyIjswcDA3t$UiIDA4OiflF$fol$TmZhaWaKPlCMvbQoh4E1L4cRAA==",
  "AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1SitKZWRkls6ML0pNLi5ILSoACrIaGTAxPDvJdOggIxAx@dnByqhxbBIjswcDA3t$UiIDA4OiflF$fol$TmZhaWaKPlCMvbQoh4E1L4cRAA==",
  "AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1Sk8tYmRkls6ML0pNLi5ILSoACrIaGTAxLDrFdO8gIxAxbdrJyqjxYBIjswcDA3t$UiIDA4OiflF$fol$TmZhaWaKPlCMvbQoh4E1L4cRAA==",
  "AQ3IMQ7CIBQA0P9LGmI8gXFyc8Oik0tXdw9goCVAikB@JTGe0CM0poexb3wIbAscGpLm0r3Nx40xTI2zw1m7XifJEDZP5SMy2AUVbVHWXKesENneP8h0UzaU16zlqYKF5nZuq$WLePzd2Q2AJ60A4CAopZcIfiy$F$vxQgHqGPAP",
  "AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1SixKZGRkls6ML0pNLi5ILSoACrIaGTAxrCtucWhxYDp3kpFRY1IIswcDA3t$UiIDA4OiflF$fol$TmZhaWaKPlCMvbQoh4E1L4cRAA==",
  "AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1KiktYmRkls6ML0pNLi5ILSoACrIaGTAx3Cme5jDNgWndKUZGjSUhzB4MDOz5SYkMDAyK$kX5$SX6OZmFpZkp$kAx9tKiHAbWvBxGAA=="
];

var genreCount = [];

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
    selectedRctx.forEach(function(selectedRctx) {
      client
        .get("refine", {
          rctx: selectedRctx,
          count: 100
        })
        .then(response => JSON.parse(response).aquabrowser)
        .then(response => {
          var genreFacet = getGenreFacet(response);
        });
    });
  })

  .catch(err => console.log(err)); // Something went wrong in the request to the API

function getGenreFacet(data) {
  var languageId = data.meta["original-query"];
  var facets = data.facets.facet;

  facets.forEach(function(facets) {
    var facetId = facets.id;
    if (facetId === "Genre") {
      var values = facets.value;

      allData.push({
        languageId,
        counts: values
      });

      var allDataJson = JSON.stringify(allData);
      fs.writeFileSync("data.json", allDataJson, err => {
        if (err) throw err;
        console.log("All data written to file");
      });
    }
  });
}
