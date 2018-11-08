# Functional Programming

## Onderzoek

Aan de hand van de data uit de [API](https://zoeken.oba.nl/api/v1/) van de [OBA](https://www.oba.nl) heb ik vragen opgesteld.

### Vragen

Ik had graag willen onderzoeken wat de invloed van de komst van internationale studenten (in Amsterdam) is op de collectie van de OBA. Voor deze data had ik in ieder geval de volgende keys nodig uit de API: `target-audience`, `language`, `genre` en `import-time`.

Probleem met deze vraag:

- er is **niet één genre met alle educatieve boeken**. Het is teveel werk om uit te zoeken welke boeken in het genre onderwijs zouden kunnen vallen.
- de **import-time van de artikelen niet erg betrouwbaar**. Van bijna elk artikel is de import-time: 2017-07-17.

#### Uiteindelijke onderzoeksvraag

Daarom heb ik mijn onderzoeksvraag verandert naar: Wat is de verhouding van de genres per taal?
Voor deze vraag heb ik de volgende keys nodig: `language`, `format-type`, `genre.`

## Data ophalen

## Facets

Opzoeken met behulp van een link:

`&` gelijk aan een spatie

• https://zoeken.oba.nl/api/v1/search/?q=boek&authorization=1e19898c87464e239192c8bfe422f280&refine=true

`https://zoeken.oba.nl/api/v1/` link naar de API
`search/` endpoint (zie endpoints)
`?q=boek` query, een _parameter_ die meegegeven kan worden aan het endpoint: _search_
`authorization=1e19898c87464e239192c8bfe422f280` “wachtwoord”, geeft toegang
`refine=true` parameter refine staat op true, refine maakt het mogelijk om facetten op te vragen per query (q), zie hierboven

• https://zoeken.oba.nl/api/v1/refine/?rctx=AWNkYOZmYGcwLDJKNUmuSK3KKMzLKTbMSM82TspISco3YmZk4MxNzMxjZGaQzEnMSy9NTE$1Ss1LZ2Rkls6ML0pNLi5ILSoACrIaGTAx3Glh6prPCERMPWdZGTUu7GRk9mBgYM9PSmRgYFDUL8rPL9HPySwszUzRB4qxlxblMLDm5TACAA==&authorization=1e19898c87464e239192c8bfe422f280&count=100

`refine/` endpoint (zie endpoints)
`rctx=AWNkYO...CAA==` rctx, een _parameter_ die meegegeven kan worden aan het endpoint: _refine_. rctx volgens de documentatie van de API: “_An opaque token that represents previous API activity, it is the Request Context. This token should be included for improved performance and if search context/history is important._”
`authorization=1e19898c87464e239192c8bfe422f280` “wachtwoord”, geeft toegang
`count=100` parameter count staat op 100, en laat dus max. 100 resultaten zien

## Externe bronnen

De volgende bronnen zou ik in de toekomst kunnen gebruiken:

Internationalisering op economisch gebied: [Nederland in Europese top economische internationalisering](https://www.cbs.nl/nl-nl/achtergrond/2014/38/nederland-in-europese-top-economische-internationalisering)

De meerwaarde van internationalisering in het onderwijs: [De meerwaarde van internationalisering | Nieuwsbericht | Rijksoverheid.nl](https://www.rijksoverheid.nl/actueel/nieuws/2018/06/04/de-meerwaarde-van-internationalisering)

Innovatie en internationalisering, omdat “innovatieve bedrijven
zijn doorgaans vaker internationaal georiënteerd”: [Innovatie en internationalisering](https://www.cbs.nl/nl-nl/achtergrond/2018/13/innovatie-en-internationalisering)
