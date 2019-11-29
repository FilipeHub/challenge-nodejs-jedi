define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_dev_Desktop_FILIPE_Projetos_LiveOnSolutions_challenge_nodejs_docs_main_js",
    "groupTitle": "C__Users_dev_Desktop_FILIPE_Projetos_LiveOnSolutions_challenge_nodejs_docs_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/pokemons",
    "title": "Add a new Pokemon",
    "name": "AddPokemon",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Pokemon name, not unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Pokemon description, not unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Pokemon type, not unique</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "attack",
            "description": "<p>Pokemon attack, not unique</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "defense",
            "description": "<p>Pokemon defense, not unique</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "speed",
            "description": "<p>Pokemon speed, not unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abilities",
            "description": "<p>String of the abilities of the Pokemon separeted by comma, not unique</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JSON Body Example:",
          "content": "{ \n      \"name\": \"pikachu\",\n      \"description\" : \" Electric mouse\", \n      \"type\": \"Electric\", \n      \"attack\": 40, \n      \"defense\" : 30, \n      \"speed\": 50, \n      \"health\": 55,\n      \"abilities\": \"super-speed, thunder\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Pokemon id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Pokemon name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Pokemon description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Pokemon type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "attack",
            "description": "<p>Pokemon attack.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "defense",
            "description": "<p>Pokemon defense.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "speed",
            "description": "<p>Pokemon speed.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "abilities",
            "description": "<p>Array of the abilities of the Pokemon.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"_id\": \"5ddfa6bb8fd756266051cc62\",\n \"name\": \"pikachu\",\n \"description\": \" Electric mouse\",\n \"type\": \"Eletric\",\n \"attack\": 40,\n \"defense\": 30,\n \"speed\": 50,\n \"health\": 55,\n \"abilities\": [\n    \"super-speed\",\n    \"thumder\"\n ],\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/controllers/PokemonController.js",
    "groupTitle": "Pokemons"
  },
  {
    "type": "get",
    "url": "/pokemons/:id",
    "title": "Get all the pokemons' informations",
    "name": "GetPokemon",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Pokemon id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Pokemon id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Pokemon name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Pokemon description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Pokemon type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "attack",
            "description": "<p>Pokemon attack.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "defense",
            "description": "<p>Pokemon defense.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "speed",
            "description": "<p>Pokemon speed.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "abilities",
            "description": "<p>Array of the abilities of the Pokemon.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"_id\": \"5ddfa6bb8fd756266051cc62\",\n \"name\": \"pikachu\",\n \"description\": \" Electric mouse\",\n \"type\": \"Electric\",\n \"attack\": 40,\n \"defense\": 30,\n \"speed\": 50,\n \"health\": 55,\n \"abilities\": [\n    \"super-speed\",\n    \"thumder\"\n ],\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/controllers/PokemonController.js",
    "groupTitle": "Pokemons"
  },
  {
    "type": "get",
    "url": "/pokemons",
    "title": "Get the basic pokemons informations",
    "name": "GetPokemons",
    "group": "Pokemons",
    "version": "0.0.0",
    "filename": "./src/controllers/PokemonController.js",
    "groupTitle": "Pokemons"
  }
] });
