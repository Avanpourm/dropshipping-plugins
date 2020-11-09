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

    productsPricesHandler(product){
        const self = this;
        // let shipping_prices = product.shipping_prices;
        // let variants = product.variants;
        if(product.shipping_prices.length == 0){
            return product
        }
        // let variantsMap = _.key(variants, 'id')

        let shippingPriceMap = {}

        for(let shipping_price of product.shipping_prices){
            let shipping_options = shipping_price.shipping_options
            let external_vendor_variant_ids = shipping_price.external_vendor_variant_ids

            let shippingOptionsMap = _.keyBy(shipping_options, function(o) {
                return o.country + '-'+ o.shipping_method;
            })   //读出所有物流方式，以国家+快递类型组合，如US-USPS

            //判断哪个价格低：
            let shippingOptionRes = null;
            let shippingTitle = "";
            if(shippingOptionsMap["USA-USPS"]){
                shippingTitle = "USPS";
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-USPS"])
            }else if(shippingOptionsMap["USA-US Express Shipping"]){
                shippingTitle = "USPS";
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-US Express Shipping"])
            }else if(shippingOptionsMap["USA-US Standard"]){
                shippingTitle = "4PX"
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-US Standard"])
            }else if(shippingOptionsMap["USA-4PX"]){
                shippingTitle = "4PX";
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-4PX"])
            }

            product.shipping_title = shippingTitle;
            try{
                shippingOptionRes.prices = _.keyBy(shippingOptionRes.prices, 'unit')
            }catch(e){

                // console.log(product.external_vendor_product_id);
                // console.log('+============');
            }

            //TODO： 若此处没有运费价格，应该是要返回报错的。
            if(!shippingOptionRes){
                return product
            }

            for(let universal_variant_id of shipping_price.universal_variant_ids){
                shippingPriceMap[universal_variant_id] = shippingOptionRes;
            }
        }

        for(let variant of product.variants){
            const variantShippingPrice = shippingPriceMap[variant.universal_variant_id]
            //循环给price 进行加价
            let variantxSellPrice = 0;

            variant.cost_price.origin_amount = variant.cost_price.amount;

            let variantShippingPricePricesAmount = 0
            try{
                variantShippingPricePricesAmount = variantShippingPrice.prices[1].amount;
            }catch(e){
            }

            variant.cost_price.shipping_amount = variantShippingPricePricesAmount
            variant.cost_price.shipping_method = variantShippingPricePricesAmount

            // for(let priceFactor of self.priceFactors){
            //     if(priceFactor.min <= variant.price.amount && variant.price.amount <= priceFactor.max){
            //         variant.price.amount = _.round(_.add(variant.price.amount, variantShippingPricePricesAmount, 0))
            //         variant.price.amount = _.round(_.multiply(variant.price.amount, priceFactor.factor),0)
            //     }
            // }
            //
            // variant.price.shipping_amount = variantShippingPricePricesAmount;

        }

        return product
    }

    async run() {

        //正式环境
        let appInfoMap = [

            {app_key:"black-wealth-gear",org_id:"4f8d2db787e746fcbc558645be5f9d09"},
            {app_key:"zhima002",org_id:"4d297deae5f649aabeef6c676940a1ca"},
            {app_key:"vuletura",org_id:"651eada5e23941a59c9eba263163f99f"},
            {app_key:"cloudswage",org_id:"3ae62d81bf7f4a28be815c3ddd7549a4"},
            {app_key:"feed-my-soul-more",org_id:"4dda95213a364512b8428e874b13c924"},
            {app_key:"steamer-dev",org_id:"f16f8b2db11b4f5a984b5a9299cdd28f"},
            {app_key:"dropshipping-release-incy",org_id:"a0e3a69143134ec58639081987978528"},
            {app_key:"trend-vixen",org_id:"6a86d8e44259423e97e5c2f3baff1d6c"},
            {app_key:"canchangethename",org_id:"a49fa79af0bf431ab146bbc6006cd6fb"},
            {app_key:"carp-test6",org_id:"a0e3a69143134ec58639081987978528"},
            {app_key:"raquea-exchange-group",org_id:"dce0ca1c70084748b6330d8891c1ca30"},
            {app_key:"gain-plus",org_id:"cfcdcc7c91394c0293555619295bc149"},
            {app_key:"mary-william-jewelry",org_id:"8efad827b17d4dc3926396d4d8d0fc69"},
            {app_key:"talekasjewelrybox",org_id:"e5fc05e15cb041dab537cd358e77d248"},
            {app_key:"dream-dealzz",org_id:"a7a0efe87b444ce5975c62f7c7d3b05e"},
            {app_key:"steamer-dp",org_id:"bc51e3f56b6347ca91d5a45c037e1790"},
            {app_key:"babyzparadise",org_id:"b6acc545cb184258a7dac693a6fc1432"},
            {app_key:"beams-sons",org_id:"d79ff6ed482c42989edf210af7615c6b"},
            {app_key:"i-have-2wo-have-1ne",org_id:"d7ad87c3542945dea8309b6981da303b"},
            {app_key:"crislex",org_id:"4cfb5462b3124e9a9acbfde538ada718"},
            {app_key:"knofi-co",org_id:"2d1bc75bd952414cb8e2dc5f3b187440"},
            {app_key:"myurbanity",org_id:"c5f04f3fb95e42f38462316afa471f47"},
            {app_key:"galleriavisit",org_id:"638fb22cdaa34ff1970f64aebffef25e"},
            {app_key:"dropshipping-production",org_id:"f50a64e07f904bed99bfb845a75725be"},
            {app_key:"miaoxiaomixiao",org_id:"4d297deae5f649aabeef6c676940a1ca"},


            // {app_key: "steamer-dev", org_id: "f16f8b2db11b4f5a984b5a9299cdd28f"},
            // {app_key: "black-wealth-gear", org_id: "4f8d2db787e746fcbc558645be5f9d09"},
            // {app_key: "zhima002", org_id: "4d297deae5f649aabeef6c676940a1ca"},
            // {app_key: "vuletura", org_id: "651eada5e23941a59c9eba263163f99f"},
            // {app_key: "cloudswage", org_id: "3ae62d81bf7f4a28be815c3ddd7549a4"},
            // {app_key: "feed-my-soul-more", org_id: "4dda95213a364512b8428e874b13c924"},
            // {app_key: "dropshipping-release-incy", org_id: "a0e3a69143134ec58639081987978528"},
            // {app_key: "trend-vixen", org_id: "6a86d8e44259423e97e5c2f3baff1d6c"},
            // {app_key: "canchangethename", org_id: "a49fa79af0bf431ab146bbc6006cd6fb"},
            // {app_key: "carp-test6", org_id: "a0e3a69143134ec58639081987978528"},
            // {app_key: "raquea-exchange-group", org_id: "dce0ca1c70084748b6330d8891c1ca30"},
            // {app_key: "gain-plus", org_id: "cfcdcc7c91394c0293555619295bc149"},
            // {app_key: "mary-william-jewelry", org_id: "8efad827b17d4dc3926396d4d8d0fc69"},
            // {app_key: "talekasjewelrybox", org_id: "e5fc05e15cb041dab537cd358e77d248"},
            // {app_key: "dream-dealzz", org_id: "a7a0efe87b444ce5975c62f7c7d3b05e"},
            // {app_key: "steamer-dp", org_id: "bc51e3f56b6347ca91d5a45c037e1790"},
            // {app_key: "babyzparadise", org_id: "b6acc545cb184258a7dac693a6fc1432"},
            // {app_key: "beams-sons", org_id: "d79ff6ed482c42989edf210af7615c6b"},
            // {app_key: "i-have-2wo-have-1ne", org_id: "d7ad87c3542945dea8309b6981da303b"},
            // {app_key: "crislex", org_id: "4cfb5462b3124e9a9acbfde538ada718"},
            // {app_key: "knofi-co", org_id: "2d1bc75bd952414cb8e2dc5f3b187440"},
            // {app_key: "myurbanity", org_id: "c5f04f3fb95e42f38462316afa471f47"},
            // {app_key: "galleriavisit", org_id: "638fb22cdaa34ff1970f64aebffef25e"},
            // {app_key: "dropshipping-production", org_id: "f50a64e07f904bed99bfb845a75725be"},
            // {app_key: "miaoxiaomixiao", org_id: "4d297deae5f649aabeef6c676940a1ca"},
        ]

        // testing环境
        // let appInfoMap = [
            // {app_key:"testfreetrail",	org_id:"db95bf6a874c48538bb3af995dc0ca4f"},
            // {app_key:"steamer-dev",	org_id:"2e79b3584ab4426fb161afdc096a414b"},
            // {app_key:"carp-test",	org_id:"86cf3a92b2c04d849a6056e7cd82e043"},


            // {app_key:"steamer-dev",org_id:"2e79b3584ab4426fb161afdc096a414b"},
            // {app_key:"landon-test-01",org_id:"0f456bfa2c394c94999cb7a6c465c1e6"},
            // {app_key:"miaoxiaomixiao",org_id:"55660e6b98304423ae47ce8ef2a63964"},
            // {app_key:"carp-test",org_id:"5536a6b96e6343f7aedcfa925576ef03"},
            // {app_key:"carp-test",org_id:"86cf3a92b2c04d849a6056e7cd82e043"},
            //
            // {app_key:"landon-test-01",org_id:"9bba1ea4d5a144049772bef6b7a1841a"},
            // {app_key:"landon-test-05",org_id:"9bba1ea4d5a144049772bef6b7a1841a"},
            // {app_key:"landon-test-07",org_id:"9bba1ea4d5a144049772bef6b7a1841a"},
            // {app_key:"automizely-store",org_id:"b82f5a20ae024f5f82f2a90e8a54bc35"},
            // {app_key:"automizely-store",org_id:"db95bf6a874c48538bb3af995dc0ca4f"},
            // {app_key:"canxuemianbao",org_id:"db95bf6a874c48538bb3af995dc0ca4f"},
        // ];
        for (let appInfo of appInfoMap) {
            const self = this;
            let configGet = {
                params: {
                    page: 1,
                    limit: 100,
                    app_platform: "shopify",
                    app_key: appInfo.app_key,
                    published_statuses:"draft",
                },
                headers: {
                    "am-api-key": AM_API_KEY,
                    "am-organization-id": appInfo.org_id,
                },
            }

            while (hasNext) {
                let productResp;
                try {
                    productResp = await axios.get(DROPSHIPPING_URL + "/products", configGet)
                } catch (e) {
                    console.log(e);
                }
                // console.log('--------------------获取到的数据---------------------');
                // console.log(JSON.stringify(productResp.data))
                // console.log('---------------------------------------------------');
                console.log(appInfo.app_key);
                const meta = productResp.data.meta
                if (meta.code != 20000) {
                    console.log(productResp.data.meta)
                    break
                }
                const data = productResp.data.data
                if (data.products.length == 0) {
                    console.log("本页没有数据")
                }

                //补全订单金额数据。
                let productPromise = []
                for (let product of data.products) {
                    //构建要更新的数据
                    let patchReq = {
                        id: product.id,
                        app: product.app,
                        organization_id: product.organization.id,
                        variants:[],
                    }

                    product = self.productsPricesHandler(product)

                    for (let variant of product.variants){
                        // 最终价格variant.cost_price.amount + shipping fee
                        let finalPrice = (variant.cost_price.amount + variant.cost_price.shipping_amount) * 2

                        if(variant.custom_price.amount !=0 ) {
                            continue
                        }
                        patchReq.variants.push({
                            id:variant.id,
                            selected: true,
                            cost_price: {
                                amount: variant.cost_price.amount,
                                currency: variant.cost_price.currency,
                                shipping_amount: variant.cost_price.shipping_amount,
                            },
                            custom_price:{
                                amount: finalPrice,
                                currency:"USD",
                            }
                        })
                    }

                    if(patchReq.variants.length == 0){
                        continue
                    }
                    // console.info(product.shipping_title);
                    console.info(patchReq.variants);
                    console.info(product.id);

                    productPromise.push(self.patchProducts(patchReq))
                }
                await Promise.all(productPromise)

                if (data.pagination.has_next_page != true) {
                    console.log("最后一页了。")
                    break
                }
                configGet.params.page++

                await sleep(400)
            }
        }

    }

    //更新products
    async patchProducts(product) {
        console.log('--------------------要patch的数据---------------------');

        let patchConfig = {
            headers: {
                "am-api-key": AM_API_KEY,
                "am-organization-id": product.organization_id,
            }
        }
        console.log(JSON.stringify(product));

        console.log('--------------------response---------------------');
        let patchResp

        try {
            patchResp = await axios.patch(DROPSHIPPING_URL + "/products/" + product.id, product, patchConfig)
        } catch (e) {
            console.log(e)
        }

        if (patchResp.status != 200) {
            console.log(JSON.stringify(patchResp.data));
        }
        console.log(JSON.stringify(patchResp.data));

        console.log('------------------------------------------------');

    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

new Services()


// axios.
