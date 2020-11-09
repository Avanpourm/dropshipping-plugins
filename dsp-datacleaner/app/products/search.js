const axios = require("axios")
const _ = require("lodash")
var faker = require('faker');

// stage 环境
// const DROPSHIPPING_URL = "https://staging-product.automizelyAPI.com/dropshipping/v1"
// const SUPPLIER_URL = "https://staging-platform.automizelyAPI.com/suppliers/v1"

// 正式环境
// const DROPSHIPPING_URL = "https://product.automizelyAPI.com/dropshipping/v1"
// const SUPPLIER_URL = "https://platform.automizelyAPI.com/suppliers/v1"
// const AM_API_KEY = "c3o4yJyfv6Q6ghIDak8D5czARw9w2NQd"

// testing环境
// const DROPSHIPPING_URL = "https://testing-incy-product.automizelyapi.io/dropshipping/v1"
// const SUPPLIER_URL = "https://testing-incy-platform.automizelyapi.io/suppliers/v1"
const AM_API_KEY = "XPgDpsLedcKQ3hq9bNNK4AEs4LMyFgv7"

// 测试环境
// const DROPSHIPPING_URL = "http://127.0.0.1:8079/dropshipping/v1"
const SUPPLIER_URL = "http://127.0.0.1:8080/suppliers/v1"
// const AM_API_KEY = ""

let hasNext = true;


const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    let configGet = {
        params: {
            page: 5,
            limit: 10,
            search: faker.random.word(),
        },
        headers: {
            "am-api-key": AM_API_KEY,
            "am-organization-id": "db95bf6a874c48538bb3af995dc0ca4f",
        },
    }
    console.log(configGet);
    try {
        let res = await axios.get(SUPPLIER_URL + "/products", configGet)
        // console.log(res);
    } catch (e) {
        console.log(e.response)
        // console.log(JSON.stringify(e.response))
    }

    ctx.body = 'OK';
});

const port = 3000
app.listen(port);
console.log(port);

