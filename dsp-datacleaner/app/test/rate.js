const axios = require("axios")
const _ = require("lodash")
var faker = require('faker');

const SHIPBER_URL = "http://api.stage.shipber.app"
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    let configGet = {
        params: {
        },
        headers: {
            "apiKey": "2lqdqrs64txosufp5nr3",
            "apiSecret": "45yRKcXyarjhxGokXuVf0tSq4Zc3npNzhzv9etvV3u2Tq0YsTtCoiJPGAFxGsWVb",
        },
    }
    let data = {
        "shipment": {
            "ship_from": {
                "ship_address": {
                    "postal_code": "90045",
                    "country_code": "US",
                    "state_province_code": "CA"
                }
            },
            "ship_to": {
                "ship_address": {
                    "postal_code": "92551",
                    "country_code": "US"
                }
            },
            "package_type": {"type": "common","name":"Package"},
            "parcels": [
                {
                    "quantity": 1,
                    "dimension": {
                        "width": 10,
                        "height": 10,
                        "length": 10,
                        "unit": "IN"
                    },
                    "weight": {
                        "unit": "LBS",
                        "value": 20
                    },
                    "confirmation": "Adult",
                    "insurance": {
                        "unit": "USD",
                        "value": 500
                    }
                }
            ],
            "pickup_date": "20201029"
        }
    }
    try {
        let res = await axios.post(SHIPBER_URL + "/v1/open-api/rate/all-rates", data, configGet)
        // let res = await axios.get(SHIPBER_URL + "/v1/open-api/label/0A0AA0A0000001", configGet)

        // ctx.body = JSON.stringify(res);
        ctx.body = "true"
    } catch (e) {
        console.log(e)
        ctx.body = "fail";
        // console.log(JSON.stringify(e.response))
    }


});

const port = 3000
app.listen(port);
console.log(port);

