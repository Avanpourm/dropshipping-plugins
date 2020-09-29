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
// const SUPPLIER_URL = "https://testing-incy-product.automizelyapi.io/suppliers/v1"
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

    productsPricesHandler(product) {
        const self = this;
        // let shipping_prices = product.shipping_prices;
        // let variants = product.variants;
        if (product.shipping_prices.length == 0) {
            return product
        }
        // let variantsMap = _.key(variants, 'id')

        let shippingPriceMap = {}

        for (let shipping_price of product.shipping_prices) {
            let shipping_options = shipping_price.shipping_options
            let external_vendor_variant_ids = shipping_price.external_vendor_variant_ids

            let shippingOptionsMap = _.keyBy(shipping_options, function (o) {
                return o.country + '-' + o.shipping_method;
            })   //读出所有物流方式，以国家+快递类型组合，如US-USPS

            //判断哪个价格低：
            let shippingOptionRes = null;
            let shippingTitle = "";

            if (shippingOptionsMap["USA-USPS"]) {
                shippingTitle = "USPS";
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-USPS"])
            } else if (shippingOptionsMap["USA-US Express Shipping"]) {
                shippingTitle = "USPS";
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-US Express Shipping"])
            } else if (shippingOptionsMap["USA-US Standard"]) {
                shippingTitle = "4PX"
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-US Standard"])
            } else if (shippingOptionsMap["USA-4PX"]) {
                shippingTitle = "4PX";
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-4PX"])
            } else if (shippingOptionsMap["USA-CNE"]) {
                shippingTitle = "CNE";
                shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-CNE"])
            }
            // else if (shippingOptionsMap["USA-PostNL International Mail"]) {
            //     shippingTitle = "PostNL International Mail";
            //     shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-PostNL International Mail"])
            // }

            product.shipping_title = shippingTitle;
            try {
                shippingOptionRes.prices = _.keyBy(shippingOptionRes.prices, 'unit')
            } catch (e) {

                // console.log(product.external_vendor_product_id);
                // console.log('+============');
            }

            //TODO： 若此处没有运费价格，应该是要返回报错的。
            if (!shippingOptionRes) {
                return product
            }

            for (let universal_variant_id of shipping_price.universal_variant_ids) {
                shippingPriceMap[universal_variant_id] = shippingOptionRes;
            }
        }
        // console.log(JSON.stringify(shippingPriceMap));
        for (let variant of product.variants) {
            const variantShippingPrice = shippingPriceMap[variant.universal_variant_id]
            //循环给price 进行加价
            let variantxSellPrice = 0;

            variant.cost_price.origin_amount = variant.cost_price.amount;

            let variantShippingPricePricesAmount = 0
            let externalOptionId = ""
            try {
                variantShippingPricePricesAmount = variantShippingPrice.prices[1].amount;
                externalOptionId = variantShippingPrice.external_option_id;
            } catch (e) {
            }

            variant.cost_price.data = JSON.stringify(product.shipping_prices)
            variant.cost_price.external_option_id = externalOptionId
            variant.cost_price.shipping_amount = variantShippingPricePricesAmount
            variant.cost_price.shipping_method = product.shipping_title || ""


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
            {app_key:"sleep-pillow",org_id:"5485d8f1e8e84e12a934b6ce3108e350"},


            // {app_key:"club-1976-clothing",org_id:"2dbfed5978b94a7c80e6859aca88a172"},
            // {app_key:"azuria360-boutique",org_id:"d6e513e7567c478686a2e42d21781d7d"},
            // {app_key:"wholesale-guerrier",org_id:"6c80fef6d5884d3194028d27087c9940"},
            // {app_key:"stay-mad-goods",org_id:"504fc15104d94b069fca0869aa3ac5b9"},
            // {app_key:"cherish-dreams-apparel",org_id:"e7212abc93b44d95ad4979daf403180a"},
            // {app_key:"boss-bombs-and-more",org_id:"42af770155d045bbbc46b37a45ebe72f"},
            // {app_key:"ziena-organics",org_id:"b0819bc1f2784d028d86cff90eb09f74"},
            // {app_key:"sexceetreasure",org_id:"da0a4955fac542b5a86f3ac5f8ccf9bf"},
            // {app_key:"black-wealth-gear",org_id:"4f8d2db787e746fcbc558645be5f9d09"},
            // {app_key:"ooh-i-want",org_id:"c639afa02ea746f98b77afc5bf79d364"},
            // {app_key:"just-something-cute",org_id:"91c2d39b9d0142e7bcecaf0cb3daf93e"},
            // {app_key:"jerijstore",org_id:"97a0152f74b940208d09ba08ebe99a20"},
            // {app_key:"enjoyworkandlife",org_id:"a694730bc3a34be5a8accc4348abb5a1"},
            // {app_key:"tiktok-hot-products",org_id:"a12ad9e265b5414cb8249bd6b65bda59"},
            // {app_key:"angelbrandz2",org_id:"803c914597894642b4c68eb4ae91cb8b"},
            // {app_key:"orientflyer",org_id:"8285bdc3000944faa5a120919b3392d2"},
            // {app_key:"holistic-chaos",org_id:"4da3d1def0314fe0a29d16549d792b33"},
            // {app_key:"country-road-chic-boutique",org_id:"7c4b11f535d2448d8773df4d8261b55b"},
            // {app_key:"kulturcode",org_id:"6b4433e889a348f693e3c1dfe1d8ac12"},
            // {app_key:"amourinspire",org_id:"ac61843f6b7a49939d5ef9cc975ac0d1"},
            // {app_key:"safaite-com",org_id:"805368b5f17e4e849649099c591d3181"},
            // {app_key:"xox-dream",org_id:"d49a4e0a6c6d4ebd9a808c8c8b6a15ef"},
            // {app_key:"footballprint",org_id:"0ce6552bc9454c02bf09bc2f71a49689"},
            // {app_key:"your-beauty-hacks-com",org_id:"68b06be25883406d90eeb297d513a26e"},
            // {app_key:"jexie",org_id:"fb486c76cc27457ca2d9561072d0d110"},
            // {app_key:"posh-and-perfect-boutique",org_id:"0400da3998c148ba87fda8d2644cb33c"},
            // {app_key:"serenityapparelus",org_id:"fd87a2db0fbc4188beaa100b147d5355"},
            // {app_key:"yourhandbagstore",org_id:"d40c1887472c4dccb26444529fea5d6e"},
            // {app_key:"snowy-brush",org_id:"9284caed738649af807b3bdec371e77b"},
            // {app_key:"socialite-home-decor",org_id:"98e5458002e744c29162bf5fa6c5d125"},
            // {app_key:"tasarabusiness",org_id:"6baf51c617e24980adefd013828cdde4"},
            // {app_key:"makeupsuite",org_id:"f990ddc0869742e0a3c65b4a4d7285bd"},
            // {app_key:"gaoming-test2",org_id:"aa53acfff6564b168008d5f5bacf554c"},
            // {app_key:"shopgoldenlionessny",org_id:"be333e25707345bd8532ab9e0a15fe79"},
            // {app_key:"want-a-little",org_id:"6126b56bb16d45c89b1efe0fbae70b59"},
            // {app_key:"zhima002",org_id:"4d297deae5f649aabeef6c676940a1ca"},
            // {app_key:"vuletura",org_id:"651eada5e23941a59c9eba263163f99f"},
            // {app_key:"swi-onlineshop",org_id:"9a034a9222674bcaabd7dc8f9a455fb5"},
            // {app_key:"99fab",org_id:"652cae043a2e43e4acc654c2b04efc14"},
            // {app_key:"one-smart-future",org_id:"923a60250a7940df8f8614cb299bc8f7"},
            // {app_key:"uxiastore",org_id:"3a5a1b810e9e49cea11a33bfe140f48b"},
            // {app_key:"margies-closet-etc",org_id:"fd2505364d184d5f900b309ba038510d"},
            // {app_key:"e-nnova-com",org_id:"fb0f8354dea84bd19ad08b9da31b1464"},
            // {app_key:"31maskup",org_id:"344e7011266944dba4d93d86a790fc22"},
            // {app_key:"anime-x3",org_id:"9bbd7613cefd42b79397f74388922271"},
            // {app_key:"happypetbin",org_id:"d0abd07a74fd467383c326aabaac2262"},
            // {app_key:"simpleefashion01",org_id:"3b89c24c0abd440ba6df477679c53975"},
            // {app_key:"pelican-123",org_id:"4779d2ee35544c5e9ebd7e2b3ac95fd6"},
            // {app_key:"duxiaodu1",org_id:"4d297deae5f649aabeef6c676940a1ca"},
            // {app_key:"sassys-accessories-fun",org_id:"e5ad4797d78945268a7faa08c09e0fe7"},
            // {app_key:"bellandbloom",org_id:"07fd4f1aaa274a33b91504c6067a4911"},
            // {app_key:"8ngelfire",org_id:"68d426a1202640aba796156d25932561"},
            // {app_key:"jewels-of-lyfe",org_id:"8c88ea942f354c7e831d6f08465fe385"},
            // {app_key:"cloudswage",org_id:"3ae62d81bf7f4a28be815c3ddd7549a4"},
            // {app_key:"the-lemon-lady",org_id:"1094d18d309e471fb672677c4c459e7a"},
            // {app_key:"ezmart-shop",org_id:"93c3bd4668b143cda2be5d26cf105e60"},
            // {app_key:"the-suave-deal",org_id:"3fa611dd26624a95bba108a6022e4f42"},
            // {app_key:"sportsgearoutdoors",org_id:"5efb0b6c359045368daeef82021aa96e"},
            // {app_key:"xo-beauty-cave",org_id:"828e348b4f024808b2831ce3166e10cc"},
            // {app_key:"seasonal-shoppers-paradise",org_id:"782efa045dc74f339ef4d46e4a8e3c4e"},
            // {app_key:"julia80",org_id:"68f9c243566b400fb9657c00c4e96f88"},
            // {app_key:"fultons-warhouse",org_id:"c3821ef499744aabb2b036e1221948b1"},
            // {app_key:"autheticfashionclothes",org_id:"12f6d3001b034f6ca84cf5144ce93c2f"},
            // {app_key:"style-your-curves",org_id:"748dba9b5db044b3b6f5dbf6bf463429"},
            // {app_key:"peoplepowershop",org_id:"b20418ba179646b9ae0966bcb86a4b18"},
            // {app_key:"hagsatf13",org_id:"f1e1a1d8f99549f19d91e7d659f3eaeb"},
            // {app_key:"liuliangtest",org_id:"8adc74dc70184cc7a47055b239b6b0a5"},
            // {app_key:"caninesupplyonline",org_id:"859608940bb04c3b881f9a860a941e9d"},
            // {app_key:"ghost-rebel",org_id:"3c4129f999b24978b213f9230a704b04"},
            // {app_key:"e-goodies-and-accessories",org_id:"878ac2278f2b45c8bb872de79e8cd830"},
            // {app_key:"ayecessory",org_id:"411ee06a6c1243edb89756f8bf9a0505"},
            // {app_key:"luxuriously-styled",org_id:"d408874531ba489e9ec36b71220d9554"},
            // {app_key:"blue-panda-suplies",org_id:"818a5821cdf040cb880e0dc1cde7b6cd"},
            // {app_key:"the-bombshell-mamas",org_id:"0f1e7d82e93d45179c0f829784510c47"},
            // {app_key:"earthly-mother",org_id:"df252ff620fb459aa47d422e04404b83"},
            // {app_key:"true-dream-candles",org_id:"de3e855884364e6c9bbd7b36d26913cc"},
            // {app_key:"ma-ma-maria",org_id:"366445d7477f418e82a6a128a9301c68"},
            // {app_key:"bigshoppingss",org_id:"4f50f6f9ca8c42b18de3d1ec2a94f6c3"},
            // {app_key:"perks-for-your-pets",org_id:"335913e350684f36a170ee7de9816c1e"},
            // {app_key:"phonoclean",org_id:"8f937a58204c48438855bfdc8ea768a0"},
            // {app_key:"feed-my-soul-more",org_id:"4dda95213a364512b8428e874b13c924"},
            // {app_key:"dresses-dresses-dresses-and-more",org_id:"0e417af4079c49219dc584979dde5caf"},
            // {app_key:"nick123store",org_id:"2ef395a6a9374749a846c5f7b4189a7a"},
            // {app_key:"steamer-dev",org_id:"f16f8b2db11b4f5a984b5a9299cdd28f"},
            // {app_key:"b-cris",org_id:"4c5477266d8147c0afe63ffe588e93c8"},
            // {app_key:"gixi-couture-llc",org_id:"2605012fe37049d083f71e6fab897a01"},
            // {app_key:"dutch-stylezz",org_id:"c142fa58289d4b11a1dd82cba66784c7"},
            // {app_key:"western-solaria",org_id:"b12acb9a82d34519ae6afd8471a0806f"},
            // {app_key:"arter-store",org_id:"54a1fc49df4844cc9940394ce2218db2"},
            // {app_key:"shop-zel",org_id:"d5f0765414264c37b4edb06fad938186"},
            // {app_key:"bespoke-african-fashion-store",org_id:"d618eebf97354d55aa33bd0523e9b94a"},
            // {app_key:"townforst",org_id:"386b7b9137bc4b76b8031cfd67243dbe"},
            // {app_key:"elite-crossing-zone",org_id:"4a3bcebed78c4f85b0e68efb2e80c79f"},
            // {app_key:"dropshipping-release-incy",org_id:"a0e3a69143134ec58639081987978528"},
            // {app_key:"helen-dropshipping",org_id:"86aa928670c14cef96c964015d24ad14"},
            // {app_key:"muse-home-goods",org_id:"82d09ca8492a4bd8b8db6ac84a91b071"},
            // {app_key:"trend-vixen",org_id:"6a86d8e44259423e97e5c2f3baff1d6c"},
            // {app_key:"canchangethename",org_id:"a49fa79af0bf431ab146bbc6006cd6fb"},
            // {app_key:"my-organics-beauty",org_id:"4d7bd24b5ed546bb8108e8c57f5d014c"},
            // {app_key:"murfree-store",org_id:"a14fabfafe15417f97609910ccc67eec"},
            // {app_key:"you-name-ittt",org_id:"d2860c59ba074254bf65ced72b0b5cfb"},
            // {app_key:"thehangar26",org_id:"54bc9033e80548d2aadebfc9309890fd"},
            // {app_key:"roberthcohenmd",org_id:"12b9efe3885b418d9bdf9fa79fb97d01"},
            // {app_key:"haus-treats",org_id:"c3388d703b8b44d186f0814c7858b84b"},
            // {app_key:"mnjar",org_id:"419a6f0022fe459180519d9a60924192"},
            // {app_key:"carp-test6",org_id:"a0e3a69143134ec58639081987978528"},
            // {app_key:"shoptinythingsdev",org_id:"e65cfbe163914d0789ae1514da728ec1"},
            // {app_key:"rainbowpridedeals",org_id:"63ced6a8782743cdbccb309bf733007e"},
            // {app_key:"cornikisthingz",org_id:"3be0d3687baf4e9abbaa591726e686ee"},
            // {app_key:"word-pass",org_id:"d4dbcfb7835a4d7e82edfaedffb80ca2"},
            // {app_key:"monogram-this-and-that",org_id:"808a931ef11148fbb43d2340f0cddbae"},
            // {app_key:"arizylas",org_id:"beb0e2d8b7814e66a9cc9557b8815510"},
            // {app_key:"raquea-exchange-group",org_id:"dce0ca1c70084748b6330d8891c1ca30"},
            // {app_key:"miel-beauty-store",org_id:"ec6da902f1a6455f88315ceb1514295d"},
            // {app_key:"testing-dkt",org_id:"8416e0c4837c46dab6fd00b3b32a8064"},
            // {app_key:"health-for-live",org_id:"dfb0511c43dd405388b588de43a17118"},
            // {app_key:"crafting-feelings",org_id:"b7720fcf2793435dae7cb082de665ef4"},
            // {app_key:"blinkiss",org_id:"9e0c09f5c9ab4f4eb6aa9761cbb87530"},
            // {app_key:"omnipresent-online",org_id:"a35e8f039d9d47cf909baeaf80a444c5"},
            // {app_key:"belisto",org_id:"5fff2f2651124b91aa18e937e8a81017"},
            // {app_key:"gain-plus",org_id:"cfcdcc7c91394c0293555619295bc149"},
            // {app_key:"mary-william-jewelry",org_id:"8efad827b17d4dc3926396d4d8d0fc69"},
            // {app_key:"humantra",org_id:"77344261c0344f0c864e4e275e5dc191"},
            // {app_key:"goddess-divine-beauty-boutique",org_id:"5ca11e969c69421db6d0e759fb418aa7"},
            // {app_key:"lajigou",org_id:"75281830d56448069b4d5d138551b425"},
            // {app_key:"1-2-price-masks",org_id:"67b18659958140f99b69401f74e165d2"},
            // {app_key:"four-max",org_id:"834f5f2f5ec74d35b8e58a252b56ed7e"},
            // {app_key:"talekasjewelrybox",org_id:"e5fc05e15cb041dab537cd358e77d248"},
            // {app_key:"xn-zmc6czbsg",org_id:"6d30795cdfbf4e5990af44a78164256c"},
            // {app_key:"poiled-bratt",org_id:"04834390233746a2b807ab407574ea51"},
            // {app_key:"boujee-apparel-tt",org_id:"a15db8a8910c4738b634a06a258ea52c"},
            // {app_key:"dream-dealzz",org_id:"a7a0efe87b444ce5975c62f7c7d3b05e"},
            // {app_key:"lex-touch-decor",org_id:"312355ab029745c99d59efa519cad2cc"},
            // {app_key:"skulldaze",org_id:"f38088c2c016494c82c981789e394c1b"},
            // {app_key:"mamigold",org_id:"e13f145ab067434689bffa53c6152ab0"},
            // {app_key:"s8507806b",org_id:"c5695e4f594e4d0094ec7d4d5c4cd6c8"},
            // {app_key:"ja-global",org_id:"3039fe16f1174c58b804d3efe3b5f492"},
            // {app_key:"kingdom-of-heaven-apparel",org_id:"fdf44dfec8d14823be4553415e22713e"},
            // {app_key:"steamer-dp",org_id:"bc51e3f56b6347ca91d5a45c037e1790"},
            // {app_key:"joesdemostore",org_id:"110cc7db95a34d07af4fcb87e88e366c"},
            // {app_key:"reereesboutique",org_id:"6d2d6799fdf345c794711d3884f5f859"},
            // {app_key:"the-everyday-family",org_id:"ae9f639d9a21463ea79cbbd6e29fc631"},
            // {app_key:"urbanxfit",org_id:"e74fb75549004165856677f9460fa12a"},
            // {app_key:"shophygo4",org_id:"c41e07ccb76f433d933b23b50bdb7cfe"},
            // {app_key:"helens-drop-shipping",org_id:"86aa928670c14cef96c964015d24ad14"},
            // {app_key:"sassys-serenity",org_id:"42367545379247c0905c1629a1703cce"},
            // {app_key:"hip-hop-jewelry-market",org_id:"fa1135255bf14ef682f88398ddb674b1"},
            // {app_key:"babyzparadise",org_id:"b6acc545cb184258a7dac693a6fc1432"},
            // {app_key:"landon-test-06",org_id:"9d831ae494e74be1bf4a4cb0cd58d367"},
            // {app_key:"giuliagems-com",org_id:"3fbbc38a1c324e8988ba271bb813d8e6"},
            // {app_key:"time2scareu",org_id:"9b445b80b2394145988eb09cb0db3cf4"},
            // {app_key:"choicewill",org_id:"c8492ebb2ab34d7baada8138dee8cbde"},
            // {app_key:"candest",org_id:"fe28f129773b454e9930c77b08a496a9"},
            // {app_key:"justenjoyeverything",org_id:"9ba51eb0107640b187ac8939fa1c029a"},
            // {app_key:"teddy-test-currency",org_id:"87042c6b2ec04ddfa75c0e6049f55433"},
            // {app_key:"test001001001001",org_id:"760a570044234acb8571b4008e8bc8f6"},
            // {app_key:"duxiaodu",org_id:"4d297deae5f649aabeef6c676940a1ca"},
            // {app_key:"jpa-co",org_id:"6d306fb5ae884952b74ff83d49334de1"},
            // {app_key:"old-coins-420",org_id:"b4c725ee35724e16a1f4d53bbd396ff1"},
            // {app_key:"purrfectshops",org_id:"0c1c130927654f7786f0f9c1ba148108"},
            // {app_key:"kayz-krazy-beautique-llc",org_id:"cdc42ab788214eabad81cea48f37298d"},
            // {app_key:"health-happiness-and-wealth",org_id:"176865455c004e75ae5bd65e86575339"},
            // {app_key:"beams-sons",org_id:"d79ff6ed482c42989edf210af7615c6b"},
            // {app_key:"nnz-retail-solutions-llc",org_id:"309599408b9844a685662ee2f2d8154a"},
            // {app_key:"dipwa",org_id:"d2d96b0da44e499abbb2040c047c5203"},
            // {app_key:"dropshipping-production",org_id:"018a1759cc7a4bbbba6395e9ee942e22"},
            // {app_key:"faangshop",org_id:"bd0c2b88484d48e8956697b9fd6e545c"},
            // {app_key:"healthbeautyandfitness",org_id:"044b867041cf469f9bc053a67e5128ec"},
            // {app_key:"sunshine-supply-company",org_id:"a989310aa3414508b0508efee9869809"},
            // {app_key:"the-puzzle-shoppe",org_id:"bfd3617d4eb34e5086b08e1c3acca3aa"},
            // {app_key:"spooky-seasonnn",org_id:"5a8f5a91caa74d0a86dc69e66ffe43ca"},
            // {app_key:"afterglow-treasures",org_id:"27c3d2704c8e4ad690178e9e6554ee72"},
            // {app_key:"i-have-2wo-have-1ne",org_id:"d7ad87c3542945dea8309b6981da303b"},
            // {app_key:"welcome-messages",org_id:"3b505a816ec144fd9124052f99bfcfc7"},
            // {app_key:"crislex",org_id:"4cfb5462b3124e9a9acbfde538ada718"},
            // {app_key:"automizely-store",org_id:"b82f5a20ae024f5f82f2a90e8a54bc35"},
            // {app_key:"arhaan-kappa",org_id:"f41b0bb45baf482a9d0a317f4090941a"},
            // {app_key:"knofi-co",org_id:"2d1bc75bd952414cb8e2dc5f3b187440"},
            // {app_key:"d-h-craze",org_id:"5c73780a9d684210aceade86146cc682"},
            // {app_key:"outfitplaza",org_id:"96808b06d48b4b94aae734279e5a6b54"},
            // {app_key:"shop-babiva",org_id:"de13c8dc902c4ba7bc87ede38502a567"},
            // {app_key:"arcturian-vibe-tribe",org_id:"5ab2ea11d2ce4d5f9aead701edfd2ca6"},
            // {app_key:"iamsupport",org_id:"cd431ddaaa83497aa0097f8507f80028"},
            // {app_key:"shonall-international",org_id:"f9fbc5fc23c54cfe87c34aa4630ba593"},
            // {app_key:"primechoice-shopping",org_id:"10c42b53533a4878bf91a2316bef614b"},
            // {app_key:"myurbanity",org_id:"c5f04f3fb95e42f38462316afa471f47"},
            // {app_key:"nick123456store",org_id:"2ef395a6a9374749a846c5f7b4189a7a"},
            // {app_key:"cosmochix-cosmeticz",org_id:"f13828afedd2487ab96d2795c463c0a7"},
            // {app_key:"vesta-market",org_id:"88dac6f6a3d34471ab4ac97f6f5d9e7f"},
            // {app_key:"stonesherry",org_id:"b2cb1fa53b464722af272609a3323452"},
            // {app_key:"escape-boutique-by-jazmine",org_id:"6fef02d171e949cf98cb58fac8e28fa0"},
            // {app_key:"bellaandbaraka",org_id:"6749a4ce7543485287fb6ca246e8aa06"},
            // {app_key:"lazy-beach-girl-fashion",org_id:"66ddfc435c4642ada6d8ce12795417eb"},
            // {app_key:"galleriavisit",org_id:"638fb22cdaa34ff1970f64aebffef25e"},
            // {app_key:"smart-daily-objects",org_id:"17a10a7b93574d39991adf69ed9bff19"},
            // {app_key:"shopalt3r",org_id:"39249e1a799a4364b0808e280a5ca637"},
            // {app_key:"ann-since-1982",org_id:"7ed18fb7721644aab14c1441392856c5"},
            // {app_key:"trements",org_id:"f1db05f052c64b6795aa9beec7b4c454"},
            // {app_key:"hupsup",org_id:"27ba33c0ef134a1ba20c6f5b3eac86ac"},
            // {app_key:"dropshipping-production",org_id:"f50a64e07f904bed99bfb845a75725be"},
            // {app_key:"sellistore",org_id:"7d8ec635cda848e6acedffe2c892bd49"},
            // {app_key:"shop4fun42",org_id:"801191635ed149a3875afdef3ac3868c"},
            // {app_key:"she-and-i-print",org_id:"09cd45628ae64c249d29c9527f1e6eed"},
            // {app_key:"shape-your-body-shop",org_id:"52ad247302e64e60a989ff73aea00f33"},
            // {app_key:"testfreetrail",org_id:"4fc0990c90a04b5787e82deba0017a68"},
            // {app_key:"easy-ideal-shopping",org_id:"253abbec984444a3a69d3248b0f631d2"},
            // {app_key:"mymusic007",org_id:"4558a4ed96994d26946d621db15b4822"},
            // {app_key:"greenelixer",org_id:"95532b54125949ea9b9007f53021239a"},
            // {app_key:"nostalgia-outdoor-goods-store",org_id:"9f4cce9ab9f243189506322bebb5aa72"},
            // {app_key:"unique-grapics",org_id:"cce696beb37e48a4bc7f21b7efad9bf3"},
            // {app_key:"kapadakart",org_id:"ab3aab2d26de4fa9a3769b998efefdb0"},
            // {app_key:"eshopifiz",org_id:"7a7290555c5d4a6f87c97dae88857575"},
            // {app_key:"miaoxiaomixiao",org_id:"4d297deae5f649aabeef6c676940a1ca"},
            // {app_key:"dcw-shops",org_id:"47dc5920e1d845e6a4e191635aff9ae6"},
        ]


        // let appInfoMap = [
        //     {app_key:"black-wealth-gear",org_id:"4f8d2db787e746fcbc558645be5f9d09"},
        //     {app_key:"zhima002",org_id:"4d297deae5f649aabeef6c676940a1ca"},
        //     {app_key:"vuletura",org_id:"651eada5e23941a59c9eba263163f99f"},
        //     {app_key:"cloudswage",org_id:"3ae62d81bf7f4a28be815c3ddd7549a4"},
        //     {app_key:"feed-my-soul-more",org_id:"4dda95213a364512b8428e874b13c924"},
        //     {app_key:"steamer-dev",org_id:"f16f8b2db11b4f5a984b5a9299cdd28f"},
        //     {app_key:"dropshipping-release-incy",org_id:"a0e3a69143134ec58639081987978528"},
        //     {app_key:"trend-vixen",org_id:"6a86d8e44259423e97e5c2f3baff1d6c"},
        //     {app_key:"canchangethename",org_id:"a49fa79af0bf431ab146bbc6006cd6fb"},
        //     {app_key:"carp-test6",org_id:"a0e3a69143134ec58639081987978528"},
        //     {app_key:"raquea-exchange-group",org_id:"dce0ca1c70084748b6330d8891c1ca30"},
        //     {app_key:"gain-plus",org_id:"cfcdcc7c91394c0293555619295bc149"},
        //     {app_key:"mary-william-jewelry",org_id:"8efad827b17d4dc3926396d4d8d0fc69"},
        //     {app_key:"talekasjewelrybox",org_id:"e5fc05e15cb041dab537cd358e77d248"},
        //     {app_key:"dream-dealzz",org_id:"a7a0efe87b444ce5975c62f7c7d3b05e"},
        //     {app_key:"steamer-dp",org_id:"bc51e3f56b6347ca91d5a45c037e1790"},
        //     {app_key:"babyzparadise",org_id:"b6acc545cb184258a7dac693a6fc1432"},
        //     {app_key:"beams-sons",org_id:"d79ff6ed482c42989edf210af7615c6b"},
        //     {app_key:"i-have-2wo-have-1ne",org_id:"d7ad87c3542945dea8309b6981da303b"},
        //     {app_key:"crislex",org_id:"4cfb5462b3124e9a9acbfde538ada718"},
        //     {app_key:"knofi-co",org_id:"2d1bc75bd952414cb8e2dc5f3b187440"},
        //     {app_key:"myurbanity",org_id:"c5f04f3fb95e42f38462316afa471f47"},
        //     {app_key:"galleriavisit",org_id:"638fb22cdaa34ff1970f64aebffef25e"},
        //     {app_key:"dropshipping-production",org_id:"f50a64e07f904bed99bfb845a75725be"},
        //     {app_key:"miaoxiaomixiao",org_id:"4d297deae5f649aabeef6c676940a1ca"},
        // ]

        // 测试环境
        // let appInfoMap = [
        //     {app_key: "new-testing-old-coins", org_id: "effd165459ae40418655e3e4a98a4efc"},
        //     {app_key: "test-store-saif", org_id: "a5db0fe821254b25a5bd7cd8d1edb1b0"},
        //     {app_key: "shahbaz-test01", org_id: "a4c1aa26582d40938c6cdb1dea0a730f"},
        //     {app_key: "miaoxiaomixiao", org_id: "55660e6b98304423ae47ce8ef2a63964"},
        //     {app_key: "testfreetrail", org_id: "db95bf6a874c48538bb3af995dc0ca4f"},
        //     {app_key: "landon-test-05", org_id: "9bba1ea4d5a144049772bef6b7a1841a"},
        //     {app_key: "testnewfeaure-import-list", org_id: "74240da3bd774b5581ae4ce05612bd91"},
        //     {app_key: "steamer-dp", org_id: "2e79b3584ab4426fb161afdc096a414b"},
        //     {app_key: "steamer-dev", org_id: "2e79b3584ab4426fb161afdc096a414b"},
        //     {app_key: "jet1521", org_id: "6f542178e70740ce98c58e060ea50db1"},
        //     {app_key: "carp-test", org_id: "86cf3a92b2c04d849a6056e7cd82e043"},
        //     {app_key: "landon-test-07", org_id: "6760d3344d4a4ee0857feff7452fc3e9"},
        //     {app_key: "nick123store", org_id: "e5abfcf8d9214290a02f8111c83f0b71"},
        //     {app_key: "landon-test-077", org_id: "7760d3344d4a4ee0857feff7452fc3e9"},
        // ]

        for (let appInfo of appInfoMap) {
            const self = this;
            let configGet = {
                params: {
                    page: 1,
                    limit: 50,
                    app_platform: "shopify",
                    app_key: appInfo.app_key,
                    // published_statuses: "draft",
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
                    let oldProduct = product
                    //构建要更新的数据
                    let patchReq = {
                        id: product.id,
                        app: product.app,
                        organization_id: product.organization.id,
                        variants: [],
                    }

                    product = self.productsPricesHandler(product)
                    // console.log(product.id);

                    let first = true
                    for (let variant of product.variants) {
                        // 最终价格variant.cost_price.amount + shipping fee
                        // let finalPrice = (variant.cost_price.amount + variant.cost_price.shipping_amount) * 2
                        // console.log(variant.cost_price.external_option_id);
                        if (variant.external_shipping_method_option_id) {
                            continue
                        }
                        if (first ){
                            first= false
                            variant.selected = true
                        }

                        patchReq.variants.push({
                            id: variant.id,
                            selected: variant.selected,
                            external_shipping_method_option_id: variant.cost_price.external_option_id,
                        })
                        // console.info(variant.id);

                    }

                    if (patchReq.variants.length == 0) {
                        // console.log(product.id);
                        continue
                    }

                    // console.log(JSON.stringify(oldProduct));
                    // console.info(product.shipping_title);
                    console.info(patchReq.variants);

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
            console.log(e.message)
            return
        }

        if (patchResp.status != 200) {
            console.log(JSON.stringify(patchResp.data));
        }else{
            console.log(JSON.stringify(patchResp.data));
        }


        console.log('------------------------------------------------');

    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

new Services()


// axios.
