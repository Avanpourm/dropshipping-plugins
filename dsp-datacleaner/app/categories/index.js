const axios = require("axios")
const _ = require("lodash")

// stage 环境
const DROPSHIPPING_URL = "https://staging-product.automizelyAPI.com/dropshipping/v1"
const SUPPLIER_URL = "https://staging-platform.automizelyAPI.com/suppliers/v1"
const AM_API_KEY = "c3o4yJyfv6Q6ghIDak8D5czARw9w2NQd"

// 正式环境
// const DROPSHIPPING_URL = "https://product.automizelyAPI.com/dropshipping/v1"
// const SUPPLIER_URL = "https://platform.automizelyAPI.com/suppliers/v1"
// const AM_API_KEY = "c3o4yJyfv6Q6ghIDak8D5czARw9w2NQd"

// testing环境
// const DROPSHIPPING_URL = "https://testing-incy-product.automizelyapi.io/dropshipping/v1"
// const SUPPLIER_URL = "https://testing-incy-platform.automizelyapi.io/suppliers/v1"
// const AM_API_KEY = "XPgDpsLedcKQ3hq9bNNK4AEs4LMyFgv7"

// 测试环境
// const DROPSHIPPING_URL = "http://127.0.0.1:8079/dropshipping/v1"
// const SUPPLIER_URL = "http://127.0.0.1:8080/suppliers/v1"
// const AM_API_KEY = ""

let hasNext = true;


class Services {
    constructor() {
        this.run()
    }

    //正式环境
    async run() {

        // Consumer Electronics
        // Home Improvement
        // Phones & Accessories
        // Fashion & Clothing
        // Beauty & Health
        // Jewelry & Accessories
        // Mother & Kids
        // Cars & Motorcycles
        // Shoes & Bags
        // Sports & Outdoors

        // testing
        // let categoryMap = [
        //     {id:"f6a81de7d3b84620ac53a6e04e014eb5",name:"Consumer Electronic"},
        //     {id:"8e4a49b2dcfa47eabad35614dd34608c",name:"Home Improvement"},
        //     {id:"bca084a78ef94200d74ae9188ac14812",name:"Phones & Accessories"},
        //     {id:"ea0a69166def4e2387ab085b4a1445cf",name:"Fashion & Clothing"},
        //     {id:"bee3e64ac3ce401cb072df70d77de757",name:"Beauty & Health"},
        //     {id:"71482f0085e9467fc3a37fd6bb424efa",name:"Jewelry & Accessories"},
        //     {id:"1be958acebc44096936cfcfc2526f912",name:"Mother & Kids"},
        //     {id:"21c7e69231df472dce68b8136e4345a3",name:"Cars & Motocycles"},
        //     {id:"a2291bc218824922d80bddf66fa8e0e1",name:"Shoes & Bags"},
        //     {id:"07b986c302f44867ae66cb63eea64078",name:"Sports & Outdoors 2"},
        // ]

        //product
        let categoryMap = [
            {id:"f6a81de7d3b84620ac53a6e04e014eb5",name:"Consumer Electronic"},
            {id:"8e4a49b2dcfa47eabad35614dd34608c",name:"Home Improvement"},
            {id:"bca084a78ef94200d74ae9188ac14812",name:"Phones & Accessories"},
            {id:"ea0a69166def4e2387ab085b4a1445cf",name:"Fashion & Clothing"},
            {id:"bee3e64ac3ce401cb072df70d77de757",name:"Beauty & Health"},
            {id:"71482f0085e9467fc3a37fd6bb424efa",name:"Jewelry & Accessories"},
            {id:"1be958acebc44096936cfcfc2526f912",name:"Mother & Kids"},
            {id:"21c7e69231df472dce68b8136e4345a3",name:"Cars & Motocycles"},
            {id:"a2291bc218824922d80bddf66fa8e0e1",name:"Shoes & Bags"},
            {id:"07b986c302f44867ae66cb63eea64078",name:"Sports & Outdoors"},
        ];

        let sortBegin = 100
        for (let item of categoryMap) {
            const self = this;
            // let configGet = {
            //     params: {
            //         page: 1,
            //         limit: 100,
            //         app_platform: "shopify",
            //         app_key: appInfo.app_key,
            //         published_statuses: "draft",
            //     },
            //     headers: {
            //         "am-api-key": AM_API_KEY,
            //         "am-organization-id": appInfo.org_id,
            //     },
            // }
            sortBegin += 100
            let patchData = {
                // id: item.id,
                sort: sortBegin
            }

            let patchConfig = {
                headers: {
                    "am-api-key": AM_API_KEY,
                    // "am-organization-id": product.organization_id,
                }
            }
            let patchResp ={ status: 0, data:"fail"}
            try {
                console.log();

                patchResp = await axios.patch(SUPPLIER_URL + "/categories/" + item.id, patchData, patchConfig)
            } catch (e) {
                console.log(e.message())
            }

            if (patchResp.status != 200) {
                console.log(JSON.stringify(patchResp.data));
            }
            console.log(JSON.stringify(patchResp.data));
        }
    }

}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

new Services()


// axios.
