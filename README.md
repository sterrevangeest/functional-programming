# Functional Programming

## To-Do

## Onderzoek

Aan de hand van de data uit de [API](https://zoeken.oba.nl/api/v1/) van de [OBA](https://www.oba.nl) heb ik vragen opgesteld.

### Vragen

Ik had graag willen onderzoeken wat de invloed van de komst van internationale studenten (in Amsterdam) is op de collectie van de OBA. Voor deze data had ik in ieder geval de volgende keys nodig uit de API: `target-audience`, `language`, `genre` en `import-time`.

Probleem met deze vraag:

- er is niet één `genre` met alle educatieve boeken. Het is teveel werk om uit te zoeken welke boeken in het genre onderwijs zouden kunnen vallen.
- de `import-time` van de artikelen niet erg betrouwbaar. Van bijna elk artikel is de import-time: `2017-07-17`.

#### Uiteindelijke onderzoeksvraag

Daarom heb ik mijn onderzoeksvraag verandert naar: Wat is de verhouding van de genres per taal?
Voor deze vraag heb ik de volgende keys nodig: `language`, `format-type`, `genre.`

Deelvragen:

- Van welke talen heeft de OBA boeken? Van welke taal zijn de meeste boeken?
- Wat zijn de grootste genres binnen een taal?
- Is er een verschil in de verdeling tussen de genres van buitenlandstalige boeken?
- Is er een verschil in de verdeling tussen de genres voor buitenlandstalige boeken en Nederlandstalige boeken?

#### Hypotheses

Ik verwacht vooral dat er een verschil zal zijn in de genres tussen Nederlandstalige en buitenlandstalige boeken. Ik verwacht bijvoorbeeld dat bepaalde genres als `islamitisch-milieu`, `streek-boeren-verhaal` en `homofiel-thema` niet in alle talen even populair zullen zijn. En dat bepaalde genres zelfs in bepaalde talen niet eens voorkomen in de OBA.

## Data ophalen

Vanuit het [node-oba-api](https://github.com/rijkvanzanten/node-oba-api) pakketje van Rijk ben ik begonnen met het ophalen van data.

Om van een taal alle boeken per genre op te halen schreef ik twee `.get` requests op de endpoints `search` en `refine`.

Via `search` worden alle artikelen opgehaald die het `format:book` hebben, alle **boeken** dus.

```javascript
client.get(
  // vraag alle boeken op
  "search",
  {
    q: "format:book",
    librarian: true,
    refine: true
  },
  "title"
);
```

Via `refine` wordt de facet informatie over alles vanuit **boeken** van een bepaalde taal opgehaald. Dit request geeft in o.a. het genre facet de aantallen per genre aan voor de verschillende talen.

```javascript
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
```

```
stuk code over ophalen van data: getGenreFacet(response);
```

### Facets

De faetten werken als volgt:
https://zoeken.oba.nl/api/v1/search/?q=boek&authorization=1e19898c87464e239192c8bfe422f280&refine=true

- `https://zoeken.oba.nl/api/v1/` link naar de API
- `search/` endpoint (zie endpoints)
- `?q=boek` query, een _parameter_ die meegegeven kan worden aan het endpoint: _search_
- `authorization=1e19898c87464e239192c8bfe422f280` “wachtwoord”, geeft toegang
- `refine=true` parameter refine staat op true, refine maakt het mogelijk om facetten op te vragen per query (q), zie hierboven

https://zoeken.oba.nl/api/v1/refine/?rctx=AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1Ss1LZ2Rkls6ML0pNLi5ILSoACrIaGTAx3Glh6prPCERMPWdZGTUu7GRk9mBgYM9PSmRgYFDUL8rPL9HPySwszUzRB4qxlxblMLDm5TACAA==&authorization=1e19898c87464e239192c8bfe422f280&count=100

- `refine/` endpoint (zie endpoints)
- `rctx=AWNkYO...CAA==` rctx, een _parameter_ die meegegeven kan worden aan het endpoint: _refine_. rctx volgens de documentatie van de API: “_An opaque token that represents previous API activity, it is the Request Context. This token should be included for improved performance and if search context/history is important._”
- `authorization=1e19898c87464e239192c8bfe422f280` “wachtwoord”, geeft toegang
- `count=100` parameter count staat op 100, en laat dus max. 100 resultaten zien

`&` gelijk aan een spatie

Tijdens het ophalen van de data vond het lastig om in te schatten hoe ik de data het beste in kon delen. Hier heb ik dan ook veel tijd aan besteed voordat ik aan D3 begon. Terwijl toen ik in D3 begon, ik ontdekte dat ik mijn data liever nog weer anders had willen structureren.

### De datavisualisatie

![schets][schets.png]

## Extra bronnen

De volgende bronnen zou ik in de toekomst kunnen gebruiken:

Internationalisering op economisch gebied: [Nederland in Europese top economische internationalisering](https://www.cbs.nl/nl-nl/achtergrond/2014/38/nederland-in-europese-top-economische-internationalisering)

De meerwaarde van internationalisering in het onderwijs: [De meerwaarde van internationalisering | Nieuwsbericht | Rijksoverheid.nl](https://www.rijksoverheid.nl/actueel/nieuws/2018/06/04/de-meerwaarde-van-internationalisering)

Innovatie en internationalisering, omdat “innovatieve bedrijven
zijn doorgaans vaker internationaal georiënteerd”: [Innovatie en internationalisering](https://www.cbs.nl/nl-nl/achtergrond/2018/13/innovatie-en-internationalisering)
