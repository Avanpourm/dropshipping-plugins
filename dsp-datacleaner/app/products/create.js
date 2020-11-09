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
const DROPSHIPPING_URL = "https://testing-incy-product.automizelyapi.io/dropshipping/v1"
const SUPPLIER_URL = "https://testing-incy-platform.automizelyapi.io/suppliers/v1"
const AM_API_KEY = "XPgDpsLedcKQ3hq9bNNK4AEs4LMyFgv7"

// 测试环境
// const DROPSHIPPING_URL = "http://127.0.0.1:8079/dropshipping/v1"
// const SUPPLIER_URL = "http://127.0.0.1:8080/suppliers/v1"
// const AM_API_KEY = ""

let hasNext = true;


class Services {
    constructor() {
        // while(true){
            try {
                this.run()
            }catch (e){
                this.run()
            }
        // }


    }

    async run() {
        while(true){
            let productPromise = []

            for (let i=1; i <20; i++){
                var titleRandom = faker.commerce.productName();
                var externalNo = ("ab3" + faker.random.number()).toString() + (faker.random.number()).toString();
                var externalVariantNo1 = ("ab3" + faker.random.number()).toString() + (faker.random.number()).toString();
                var externalVariantNo2 = ("ab3" + faker.random.number()).toString() + (faker.random.number()).toString();
                var externalVariantNo3 = ("ab3" + faker.random.number()).toString() + (faker.random.number()).toString();

                let product = {
                    "external_vendor_product_id": externalNo,
                    "vendor": {
                        "name": "Eprolo",
                        "code": "eprolo"
                    },
                    "title": titleRandom,
                    "body_html": faker.commerce.productDescription(),
                    "categories": [
                        {
                            "id": "f42d948c3c174577fbae67df2d30b868",
                            "name": "Computer & Office",
                            "code": "computer-office"
                        }
                    ],
                    "available_to_sell": true,
                    "accept_refund": false,
                    "accept_returns": false,
                    "brand": {
                        "id": "",
                        "name": "",
                        "code": ""
                    },
                    "condition": "I am test product",
                    "image_urls": [
                        "https://dropshipping.am-static.io/images/v1/abbebf86b32cb4223459e7a5a549155a.jpg",
                        "https://dropshipping.am-static.io/images/v1/26b2fd40e3f4fbf2866062c668db70b0.jpg",
                        "https://dropshipping.am-static.io/images/v1/969ba032d58c5cf6b38831dc080573c3.jpg",
                        "https://dropshipping.am-static.io/images/v1/08a342545c54873f099c3da902029adb.jpg",
                        "https://dropshipping.am-static.io/images/v1/e18f4b17e0eae472e0a999cbddebae8e.jpg",
                        "https://dropshipping.am-static.io/images/v1/9e0f0876043ad4625df3e1b1d1288c56.jpg",
                        "https://dropshipping.am-static.io/images/v1/cd8172bdd5d8ccde0a8282c6b1eca004.jpg",
                        "https://dropshipping.am-static.io/images/v1/fefc1d088f06a14d0e25df8bb10821b2.jpg",
                        "https://dropshipping.am-static.io/images/v1/6cc985bdb80c647dec52bfe8dbbf861c.jpg",
                        "https://dropshipping.am-static.io/images/v1/79b14c855f9cd6a63c732102e3850a72.jpg",
                        "https://dropshipping.am-static.io/images/v1/faef3372b2a7309bcce34146c0f2a1d4.jpg"
                    ],
                    "shipping_prices": [
                        {
                            "external_vendor_variant_ids": [
                                externalVariantNo1,
                                externalVariantNo2,
                                externalVariantNo3
                            ],
                            "shipping_options": [
                                {
                                    "external_option_id": "213",
                                    "shipping_method": "4PX",
                                    "country": "DEU",
                                    "shipping_time_sla": "7-10 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 971,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1578,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2184,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2790,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3397,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "214",
                                    "shipping_method": "4PX",
                                    "country": "FRA",
                                    "shipping_time_sla": "7-10 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1150,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1808,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2465,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3123,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3780,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "215",
                                    "shipping_method": "AU Express Shipping",
                                    "country": "AUS",
                                    "shipping_time_sla": "6-9 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1089,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1660,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2232,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2782,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3332,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "216",
                                    "shipping_method": "CA Express Shipping",
                                    "country": "CAN",
                                    "shipping_time_sla": "6-10 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1494,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 2752,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 3911,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 5168,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 6274,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "218",
                                    "shipping_method": "PostNL International Mail",
                                    "country": "GBR",
                                    "shipping_time_sla": "10-20 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1169,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1899,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2630,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3360,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4090,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "220",
                                    "shipping_method": "USPS",
                                    "country": "USA",
                                    "shipping_time_sla": "5-8 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1064,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1447,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 1612,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 1612,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 1612,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "221",
                                    "shipping_method": "China Post",
                                    "country": "USA",
                                    "shipping_time_sla": "10-20 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1406,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 2538,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 3670,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 4803,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 5935,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "222",
                                    "shipping_method": "China Post",
                                    "country": "AUS",
                                    "shipping_time_sla": "10-20 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 971,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1541,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2111,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2681,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3250,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "223",
                                    "shipping_method": "China Post",
                                    "country": "CAN",
                                    "shipping_time_sla": "10-20 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 946,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1472,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 1998,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2524,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3050,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "294",
                                    "shipping_method": "NZ Express Shipping",
                                    "country": "NZL",
                                    "shipping_time_sla": "6-10 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 826,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1408,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 1990,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2572,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3154,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "295",
                                    "shipping_method": "MX Express Shipping",
                                    "country": "MEX",
                                    "shipping_time_sla": "8-15 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1497,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 2496,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 3704,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 4723,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 5742,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "296",
                                    "shipping_method": "4PX",
                                    "country": "GBR",
                                    "shipping_time_sla": "4-6 days\t",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 877,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1424,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 1972,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2520,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3068,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "297",
                                    "shipping_method": "4PX",
                                    "country": "ESP",
                                    "shipping_time_sla": "7-10 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1059,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1753,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2447,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3141,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3835,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "298",
                                    "shipping_method": "4PX",
                                    "country": "ITA",
                                    "shipping_time_sla": "5--10 days",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 968,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1516,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2063,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2611,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3159,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "299",
                                    "shipping_method": "4PX",
                                    "country": "SWE",
                                    "shipping_time_sla": "7--10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1023,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1680,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2337,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2995,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3652,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "300",
                                    "shipping_method": "4PX",
                                    "country": "BEL",
                                    "shipping_time_sla": "7--10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 968,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1516,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2063,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2611,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3159,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "301",
                                    "shipping_method": "4PX",
                                    "country": "DNK",
                                    "shipping_time_sla": "7--10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1087,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1707,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2328,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2949,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3570,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "302",
                                    "shipping_method": "4PX",
                                    "country": "POL",
                                    "shipping_time_sla": "12-15 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 758,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1196,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 1634,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2073,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 2511,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "303",
                                    "shipping_method": "4PX",
                                    "country": "RUS",
                                    "shipping_time_sla": "10-15 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1204,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 2097,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2990,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3884,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4777,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "304",
                                    "shipping_method": "4PX",
                                    "country": "NLD",
                                    "shipping_time_sla": "8-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 947,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1381,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 1815,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2249,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 2683,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "305",
                                    "shipping_method": "4PX",
                                    "country": "USA",
                                    "shipping_time_sla": "7-12 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1055,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1947,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2765,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3583,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4401,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "307",
                                    "shipping_method": "4PX",
                                    "country": "FRA",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 942,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1556,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2169,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2783,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3397,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "308",
                                    "shipping_method": "4PX",
                                    "country": "DEU",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 986,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1643,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2301,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2958,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3616,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "309",
                                    "shipping_method": "4PX",
                                    "country": "ESP",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1063,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1779,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2494,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3210,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3926,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "310",
                                    "shipping_method": "4PX",
                                    "country": "NLD",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1077,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1808,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2538,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3269,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3999,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "311",
                                    "shipping_method": "4PX",
                                    "country": "ITA",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1300,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 2016,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2732,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3448,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4163,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "312",
                                    "shipping_method": "4PX",
                                    "country": "CZE",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1003,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1667,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2332,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2997,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3661,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "313",
                                    "shipping_method": "4PX",
                                    "country": "IRL",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1200,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 2025,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2851,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3676,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4501,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "314",
                                    "shipping_method": "4PX",
                                    "country": "BEL",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1039,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1704,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2368,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3033,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3698,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "315",
                                    "shipping_method": "4PX",
                                    "country": "PRT",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1081,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1797,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2513,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3229,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3944,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "316",
                                    "shipping_method": "4PX",
                                    "country": "POL",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1035,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1715,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2394,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3073,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3753,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "317",
                                    "shipping_method": "4PX",
                                    "country": "HUN",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1032,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1726,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2420,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3113,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3807,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "318",
                                    "shipping_method": "4PX",
                                    "country": "FIN",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1267,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1969,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2670,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3371,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4072,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "319",
                                    "shipping_method": "4PX",
                                    "country": "DNK",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1227,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1943,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2659,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3375,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4090,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "320",
                                    "shipping_method": "4PX",
                                    "country": "HRV",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1090,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1806,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2522,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3238,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3953,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "321",
                                    "shipping_method": "4PX",
                                    "country": "GRC",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1099,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1742,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2385,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3028,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3670,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "322",
                                    "shipping_method": "4PX",
                                    "country": "SVN",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1046,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1645,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2244,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2843,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3442,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "323",
                                    "shipping_method": "4PX",
                                    "country": "SWE",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1127,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1806,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2485,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3165,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3844,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "324",
                                    "shipping_method": "4PX",
                                    "country": "LTU",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1003,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1667,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2332,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2997,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3661,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "325",
                                    "shipping_method": "4PX",
                                    "country": "CYP",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1337,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 2089,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2841,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3594,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4346,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "326",
                                    "shipping_method": "4PX",
                                    "country": "LVA",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1079,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1784,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2489,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3194,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3899,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "327",
                                    "shipping_method": "4PX",
                                    "country": "EST",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1172,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1925,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2677,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3429,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 4182,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "328",
                                    "shipping_method": "4PX",
                                    "country": "LUX",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1081,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1687,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2294,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2900,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3506,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "329",
                                    "shipping_method": "4PX",
                                    "country": "SVK",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1026,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1706,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2385,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 3064,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3743,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "330",
                                    "shipping_method": "4PX",
                                    "country": "AUT",
                                    "shipping_time_sla": "7-10 DAYS",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 1112,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1704,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 2295,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2887,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 3479,
                                            "currency": "USD"
                                        }
                                    ]
                                },
                                {
                                    "external_option_id": "331",
                                    "shipping_method": "CNE",
                                    "country": "GBR",
                                    "shipping_time_sla": "10-15 Dayd",
                                    "prices": [
                                        {
                                            "unit": 1,
                                            "amount": 712,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 2,
                                            "amount": 1150,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 3,
                                            "amount": 1589,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 4,
                                            "amount": 2027,
                                            "currency": "USD"
                                        },
                                        {
                                            "unit": 5,
                                            "amount": 2465,
                                            "currency": "USD"
                                        }
                                    ]
                                }
                            ],
                            "metrics": {
                                "updated_at": ""
                            }
                        }
                    ],
                    "options": [
                        {
                            "name": "color",
                            "values": [
                                "Blue",
                                "Pink",
                                "White"
                            ]
                        },
                        {
                            "name": "Type",
                            "values": [
                                "304dpi",
                                "203dpi"
                            ]
                        }
                    ],
                    "variants": [
                        {
                            "external_vendor_variant_id": externalVariantNo1,
                            "sku": externalVariantNo1,
                            "upc": "",
                            "ean": "",
                            "mpn": "",
                            "model": "",
                            "title": "Blue-304dpi-",
                            "available_quantity": 3000,
                            "warehouse": {
                                "country": "CHN"
                            },
                            "price": {
                                "currency": "USD",
                                "amount": 4948
                            },
                            "unit": "1 pcs",
                            "weight": {
                                "unit": "g",
                                "value": 400
                            },
                            "image_urls": [
                                "https://dropshipping.am-static.io/images/v1/26b2fd40e3f4fbf2866062c668db70b0.jpg"
                            ],
                            "sort": 103,
                            "options": [
                                {
                                    "name": "color",
                                    "value": "Blue"
                                },
                                {
                                    "name": "Type",
                                    "value": "304dpi"
                                }
                            ]
                        },
                        {
                            "external_vendor_variant_id": externalVariantNo2,
                            "sku": externalVariantNo2,
                            "upc": "",
                            "ean": "",
                            "mpn": "",
                            "model": "",
                            "title": "White-304dpi-",
                            "available_quantity": 3000,
                            "warehouse": {
                                "country": "CHN"
                            },
                            "price": {
                                "currency": "USD",
                                "amount": 4948
                            },
                            "unit": "1 pcs",
                            "weight": {
                                "unit": "g",
                                "value": 400
                            },
                            "image_urls": [
                                "https://dropshipping.am-static.io/images/v1/08a342545c54873f099c3da902029adb.jpg"
                            ],
                            "sort": 101,
                            "options": [
                                {
                                    "name": "color",
                                    "value": "White"
                                },
                                {
                                    "name": "Type",
                                    "value": "304dpi"
                                }
                            ]
                        },
                        {
                            "external_vendor_variant_id": externalVariantNo3,
                            "sku": externalVariantNo3,
                            "upc": "",
                            "ean": "",
                            "mpn": "",
                            "model": "",
                            "title": "Pink-304dpi-",
                            "available_quantity": 3000,
                            "warehouse": {
                                "country": "CHN"
                            },
                            "price": {
                                "currency": "USD",
                                "amount": 4948
                            },
                            "unit": "1 pcs",
                            "weight": {
                                "unit": "g",
                                "value": 400
                            },
                            "image_urls": [
                                "https://dropshipping.am-static.io/images/v1/50679f35cf0d9f9def02821a58f65ee5.jpg"
                            ],
                            "sort": 102,
                            "options": [
                                {
                                    "name": "color",
                                    "value": "Pink"
                                },
                                {
                                    "name": "Type",
                                    "value": "304dpi"
                                }
                            ]
                        }
                    ],
                    "metrics": {
                        "updated_at": "2020-07-03T14:13:08+00:00",
                        "created_at": "2020-06-10T02:19:35+00:00"
                    }
                }

                let postConfig = {
                    headers: {
                        "am-api-key": AM_API_KEY,
                        "Content-Type":"application/json",
                    }
                }
                // console.log(JSON.stringify(product));
                // console.log(SUPPLIER_URL + "/vendors-products");
                let postResp
                try {
                    productPromise.push(axios.post(SUPPLIER_URL + "/vendors-products", product, postConfig))

                    // postResp = await
                    // console.log(postResp.status);
                } catch (e) {
                    console.log(e.message)
                }
            }
            try {
                await Promise.all(productPromise)
                console.log(1)
            }catch (e){
                console.log(e.message)
            }

        }

    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

new Services()


// axios.
