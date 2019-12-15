define({ "api": [
  {
    "type": "get",
    "url": "/api/v2/group-by-country",
    "title": "Order by country",
    "name": "OrderByCountry",
    "description": "<p>Organize the informations of the chaotic_data.json by the country</p>",
    "group": "ChaoticData",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "county",
            "description": "<p>array of nameOfTheCountry objects.</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./src/controllers/ChaoticController.js",
    "groupTitle": "ChaoticData"
  },
  {
    "type": "get",
    "url": "/api/v2/order-major-values",
    "title": "Order by major amount values",
    "name": "OrderByMajorAmountValue",
    "description": "<p>Organize the informations of the chaotic_data.json by major amount values</p>",
    "group": "ChaoticData",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "status/amount",
            "description": "<p>array of the name of the status and values of total amount</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./src/controllers/ChaoticController.js",
    "groupTitle": "ChaoticData"
  },
  {
    "type": "get",
    "url": "/api/v2/order-by-status",
    "title": "Order by status",
    "name": "OrderByStatus",
    "description": "<p>Organize the informations of the chaotic_data.json by the status</p>",
    "group": "ChaoticData",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Pending",
            "description": "<p>array of Pending objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Paid",
            "description": "<p>array of Paid objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Canceled",
            "description": "<p>array of Canceled objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Refunded",
            "description": "<p>array of Refunded objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Expired",
            "description": "<p>array of Expired objects.</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./src/controllers/ChaoticController.js",
    "groupTitle": "ChaoticData"
  },
  {
    "type": "get",
    "url": "/api/v2/order-total/:status",
    "title": "Total Amount of some status",
    "name": "OrderByTotalAmount",
    "description": "<p>Returns the total amount of some status based on the informations of the chaotic_data.json</p>",
    "group": "ChaoticData",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>the wanted status</p>"
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
            "field": "totalAmountValue",
            "description": "<p>the total amount of the status</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./src/controllers/ChaoticController.js",
    "groupTitle": "ChaoticData"
  },
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
    "group": "_home_filipe_Documents_Projects_LifeOnSolutions_challenge_nodejs_jedi_docs_main_js",
    "groupTitle": "_home_filipe_Documents_Projects_LifeOnSolutions_challenge_nodejs_jedi_docs_main_js",
    "name": ""
  }
] });
