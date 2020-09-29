const axios = require("axios")
const _ = require("lodash")

// stage 环境
const DROPSHIPPING_URL = "https://staging-product.automizelyAPI.com/dropshipping/v1"
const SUPPLIER_URL = "https://staging-platform.automizelyAPI.com/suppliers/v1"

// 正式环境
// const DROPSHIPPING_URL = "https://product.automizelyAPI.com/dropshipping/v1"
// const SUPPLIER_URL = "https://platform.automizelyAPI.com/suppliers/v1"
const AM_API_KEY = "c3o4yJyfv6Q6ghIDak8D5czARw9w2NQd"

// testing环境
// const DROPSHIPPING_URL = "https://testing-incy-product.automizelyapi.io/dropshipping/v1"
// const SUPPLIER_URL = "https://testing-incy-product.automizelyapi.io/suppliers/v1"
// const AM_API_KEY = "XPgDpsLedcKQ3hq9bNNK4AEs4LMyFgv7"

// 测试环境
// const DROPSHIPPING_URL = "http://127.0.0.1:8079/dropshipping/v1"
// const SUPPLIER_URL = "http://127.0.0.1:8080/suppliers/v1"
// const AM_API_KEY = ""

class Services {
    constructor() {
        this.run()
    }

    async run() {

        while (true){
            var axios = require('axios');
            console.log('-------------------');
            var config = {
                method: 'get',
                url: 'https://testing-incy-product.automizelyapi.io/dropshipping/v1/stores?organization_id=55660e6b98304423ae47ce8ef2a63964&app_platform=shopify&app_key=miaoxiaomixiao',
                headers: {
                    'am-organization-id': '55660e6b98304423ae47ce8ef2a63964',
                    'am-api-key': 'XPgDpsLedcKQ3hq9bNNK4AEs4LMyFgv7',
                    'Cookie': '__cfduid=d8232f9ddcba60ca4e7ca23de723740421597386615'
                }
            };
            let axiosPromise = []
            for (let i = 1; i<20;i++){
                await axios(config)
                    .then(function (response) {

                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {

                        console.log(error);
                    });
            }


        }

    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

new Services()


// axios.
