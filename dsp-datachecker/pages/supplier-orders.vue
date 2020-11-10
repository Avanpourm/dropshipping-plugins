<template>
  <div class="container">
    <div style="padding:16px;">
      <h1 class="title">
        Supplier Orders
      </h1>
    </div>
    <div>
      <Modal v-model="block_modal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>拦截订单确认</span>
        </p>
        <div style="text-align:center">
          <p>是否订单出现了什么异常，需要拦截此订单？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="blockOrder">确认拦截</Button>
        </div>
      </Modal>
    </div>
    <div style="padding:16px; width: 100% !important;
  margin: 0 !important;">
      <Input v-model="am_api_key" type="password" placeholder="am-api-key" style="width: 220px"/>
      <Select v-model="requestEnv" style="width:100px">
        <Option v-for="(item, index) in requestEnvMap" :value="index" :key="index">{{ index }}</Option>
      </Select>
      <!--      <Select v-model="orderStatus" style="width:100px">-->
      <!--        <Option v-for="(item) in orderStatusMap" :value="item.name" :key="item.name">{{ item.name }}</Option>-->
      <!--      </Select>-->
      <div style="display: inline-block;vertical-align: middle;">
        <Input style="width: 220px" placeholder="App key"/>
      </div>
      <div style="display: inline-block;vertical-align: middle;">
        <Input search enter-button v-model="reqData.dropshipping_order_ids" style="width: 220px"
               placeholder="Dropshipping order Id" @on-search="searchStart" :loading="search_loading" />
      </div>
    </div>
    <div style="display: flex;">
      <div style="padding: 6px;background: #fff;width:94%; margin:0 auto">
        <List item-layout="vertical" border="true">
          <ListItem v-for="order in supplierList" :key="order.title">
            <ListItemMeta :avatar="order.avatar" :title="order.id" :description="order.buyer"/>
            <Divider>Supplier Orders</Divider>
            <div>
              <Table stripe :columns="ordersColumns" :data="order.list_content">
                <template slot-scope="{ row, index }" slot="date">
                  {{ row.date | formatDate }}
                </template>
              </Table>
            </div>
            <Collapse simple>
              <Panel name="1">
                Supplier Orders Items (下单用)
                <div slot="content">
                  <div v-for="oitem in order.items">
                    <div class="order-item-introduce">
                      <Row type="flex">

                        <Col span="4" v-for="itemImageUrl in oitem.image_urls"><img :src="itemImageUrl" height="90px"/>
                        </Col>
                        <Col span="16">
                          <p style="font-weight: bolder">{{ oitem.product_title }} —— {{ oitem.title }}</p>
                          <span
                            v-for="oitemOption in oitem.options">{{ oitemOption.name }}:{{ oitemOption.value }} ; </span>
                          <br/>
                          <b>${{ oitem.unit_price.amount / 100 }} X {{ oitem.quantity }}</b>
                        </Col>
                      </Row>
                    </div>
                    <!-- TODO: 1688 下单功能，如果V2版本上线了，需要注释回来    -->
                    <!--<div class="order-item-operate">
                      <div style="margin-bottom: 15px">
                        <RadioGroup type="button" v-model="oitem.provider.code">
                          <Radio label="Eprolo" border></Radio>
                          <Radio label="1688" border></Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <Form ref="formInline" inline>
                          <FormItem> qwe45uio[
                            <Input placeholder="Provider Product ID" v-model="oitem.provider.product_id">
                            </Input>
                          </FormItem>
                          <FormItem>
                            <Input placeholder="Provider Variant ID" v-model="oitem.provider.variant_id">
                            </Input>
                          </FormItem>
                        </Form>
                      </div>
                    </div>-->
                  </div>
                  <!-- 如果已经有数据了，就不下单了 -->
                  <div class="operate-button"  v-if="order.order_status === ''">
                    <Button type="primary" @click="toOrder(order)">下单</Button>
                  </div>
                </div>
              </Panel>
            </Collapse>
            <Collapse simple>
              <Panel name="1">
                Fulfillment Center (回填单号用。)
                <div slot="content">
                  <div v-for="vendor_order in order.vendor_orders">
                    <div>
                      Eprolo 订单状态：{{vendor_order.eprolo_status_label}} - 拦截状态：{{vendor_order.eprolo_status_exception_label}}
                    </div>
                    <Table :columns="ordersItemsColumns" :data="vendor_order.items" style="margin-bottom: 10px">
                      <template slot-scope="{ row, index }" slot="tracking_numbers">
                        <p v-for="(tn) in row.tracking_numbers">- {{ tn }} </p>
                      </template>
                    </Table>
                    <Form inline>
                      <FormItem>
                        <Input v-model="vendor_order.tracking_number" placeholder="Tracking number"></Input>
                      </FormItem>
                      <FormItem>
                        <Select v-model="vendor_order.tracking_courier" placeholder="Courier" filterable>
                          <Option v-for="courier in couriers" :value="courier" :key="courier">{{ courier }}</Option>
                        </Select>
                      </FormItem>
                    </Form>
                    <div style="margin-bottom: 10px">
                      <Button type="primary" :loading="request_loading" @click="patchTrackingInfo(vendor_order)">
                        回填Tracking number
                      </Button>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
            <!--<div style="width:635px">
              <Table stripe :columns="ordersColumns" :data="order.list_content">
                <template slot-scope="{ row, index }" slot="date">
                    {{row.date | formatDate}}
                  </template>
              </Table>
            </div>
            <template slot="action">
                <li>
                    &lt;!&ndash; <Icon type="ios-star-outline" /> 123 &ndash;&gt;
                    <Button size="small" type="warning" @click="showBlockOrderModal(order.vendor_orders)">拦截订单</Button>
                </li>
            </template>
            <template slot="extra">
              &lt;!&ndash; <img :src="order.items[0].image_urls[0]" style="width: 180px"> &ndash;&gt;
              <div style="margin-top: 54px;">
                <h3>商品信息</h3>
                <Table stripe :columns="ordersItemsColumns" :data="order.items">
                  <template slot-scope="{ row, index }" slot="image">
                    <img v-for="(ri) in row.image_urls" :src="ri" width="70px">
                  </template>
                  <template slot-scope="{ row, index }" slot="unit_price">
                    ${{row.unit_price.amount / 100}}
                  </template>
                </Table>
              </div>
              &lt;!&ndash; <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px"> &ndash;&gt;
            </template>-->
          </ListItem>
        </List>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import jsonView from 'vue-json-views'
import JsonCSV from 'vue-json-csv'
// import Billing from '~/components/Billing.vue'

const config = require('~/nuxt.config.js')
export default {
  components: {
    Logo,
    jsonView,
    JsonCSV
    // Billing
  },
  data() {
    return {
      exportData: [],
      supplierList: {},
      vendorList: {},
      am_api_key: "",
      reqData: {
        dropshipping_order_ids: "",
      },
      couriers: ["yunexpress", "4px"],
      orderStatus: 'normal',
      orderStatusMap: [
        {name: "normal"},
        {name: "abnormal"}
      ],
      ordersItemsColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        // {
        //   title: '图片',
        //   width: 150,
        //   align: 'center',
        //   slot: 'image',
        // },
        {
          title: '标题',
          // key: 'price',
          key: 'title',
          width: '200px'
        },
        {
          title: 'Tracking number',
          // key: 'price',
          // key: 'tracking_number',
          width: '200px',
          slot: 'tracking_numbers'
        },
        // {
        //   title: '单价',
        //   // key: 'price',
        //   slot: 'unit_price',
        //   width: '90px'
        // },
        {
          title: '数量',
          key: 'quantity',
          width: '90px'
        }
      ],
      ordersColumns: [
        {
          title: '订单平台',
          key: 'platform',
          width: '110px'
        },
        {
          title: '下单金额',
          key: 'price',
          width: '90px'
        },
        {
          title: '运费',
          key: 'shipping_price',
          width: '80px'
        },
        {
          title: '下单时间',
          // key: 'date',
          slot: 'date',
          width: '150px'
        },
        // {
        //   title: '订单id',
        //   key: 'order_id',
        //   // width:'200px'
        // },
        // {
        //   title: '下单成本',
        //   key: 'cost'
        // },

        {
          title: '订单状态',
          key: 'order_status',
          width: '100px'
        },
        {
          title: '支付状态',
          key: 'financial_status',
          width: '100px'
        },
        // {
        //   title: '买家信息',
        //   key: 'buyer'
        // }
      ],
      orderList: [],
      requestEnv: "dev",
      requestEnvMap: {
        dev: {
          product_url: "",
          platform_url: "",
        },
        testing: {
          product_url: "https://testing-incy-platform.automizelyapi.io",
          platform_url: "https://testing-incy-product.automizelyapi.io",
        },
        release: {
          product_url: "https://release-incy-platform.automizelyapi.io",
          platform_url: "https://release-incy-product.automizelyapi.io",
        },
        stage: {
          product_url: "https://staging-platform.automizelyapi.com",
          platform_url: "https://staging-product.automizelyapi.com",
        },
        production: {
          product_url: "https://platform.automizelyapi.com",
          platform_url: "https://product.automizelyapi.com",
        },
      },
      //模态框
      block_modal: false,
      modal_loading: false,
      block_order_ids: [],
      request_loading: false,
      search_loading: false,
    };
  },
  created: function () {
    const self = this;

    console.log(config.default.constants.platform_url);
    console.log(config.default.constants.product_url);

    self.initApiKey();
    self.searchStart();
  },
  methods: {
    async initApiKey() {
      const self = this;
      self.am_api_key = self.$cookies.get('am-api-key')
    },
    async searchStart() {
      const self = this;
      self.search_loading = true

      if (self.am_api_key) {
        self.$cookies.set('am-api-key', self.am_api_key)
      }

      await self.getSuppliersList()
      self.search_loading = false
    },
    async patchTrackingInfo(vendor_order) {
      const self = this

      if (!confirm("是否确定信息无误，并进行回填tracking number动作吗？")) {
        return false
      }

      // 页面Loading
      self.request_loading = true

      if (!vendor_order.tracking_number || !vendor_order.tracking_courier) {
        self.$Message.error('tracking number or tracking courier is required');
        self.request_loading = false
        return false
      }

      // 补充items id
      let trackingItems = []
      for (let i of vendor_order.items) {
        trackingItems.push({
          // id: i.supplier_order_item_id
          id: i.id
        })
      }
      if (trackingItems.length == 0) {
        self.$Message.error('item selection is required.');
        self.request_loading = false
        return false
      }

      // 数据请求：
      let patchData = {
        trackings: [{
          items: trackingItems,
          tracking_number: vendor_order.tracking_number,
          slug: vendor_order.tracking_courier,
          additional_fields: {
            postal_code: "",
            ship_date: "",
            account_number: "",
            origin_country: "",
            destination_country: "",
            state: "",
            key: ""
          }
        }]
      }

      const res = await this.$axios.$patch(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/vendors-orders/' + vendor_order.id, patchData, {
        params: {},
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
      })
      if (res.meta.code != 20000) {
        console.log(res);
        self.$Message.error('下单修改商品失败，请联系管理员');
        self.request_loading = false
        return false;
      }

      // 弹框
      self.$Message.success('修改物流信息成功');


      self.request_loading = false
      self.searchStart()
      return true
    },
    async toOrder(order) {
      const self = this
      if (!confirm("是否确定信息无误，并进行下单动作吗？")) {
        return false
      }

      // 状态常量
      const SO_STATUS_OPEN = "open"
      const SO_STATUS_SPLITED = "splited"
      const SO_STATUS_PARTIAL_PLACE = "partial_place"
      const SO_STATUS_PLACE = "place"
      const SO_STATUS_PARTIAL_PAY = "partial_pay"
      const SO_STATUS_PAY = "pay"

      const SO_FULFILLMENT_STATUS_UNFULFILLED = "unfulfilled"
      const SO_FULFILLMENT_STATUS_PARTIAL = "partial"
      const SO_FULFILLMENT_STATUS_FULFILLED = "fulfilled"
      const SO_FULFILLMENT_STATUS_RESTOCKED = "restocked"

      //逻辑开始
      if (!order) {
        alert("找不到订单")
        return "";
      }
      if (!order.id) {
        self.$Message.error("找不到订单id")
        return "";
      }

      // 如果这个订单不是xx 状态，就不执行
      if (inArray(order.order_status, [SO_STATUS_OPEN])) {
        // 发起请求去Patch orders
        let patchData = {
          id: order.id,
          items: [],
        }
        for (let oitem of order.items) {
          patchData.items.push({
            provider: {
              code: oitem.provider.code,
              name: oitem.provider.code,
              product_id: oitem.provider.product_id,
              variant_id: oitem.provider.variant_id,
            }
          })
        }

        const res = await this.$axios.$patch(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v2/orders/' + order.id, patchData, {
          params: {},
          headers: {
            "am-api-key": self.am_api_key,
            "am-organization-id": self.reqData.organization_id
          },
        })
        if (res.meta.code != 20000) {
          self.$Message.error("下单修改商品失败，请联系管理员")
          return false;
        }

        // 调用 split 拆单
        const splitRes = await this.$axios.$post(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v2/orders/' + order.id + '/split', {}, {
          params: {},
          headers: {
            "am-api-key": self.am_api_key,
            "am-organization-id": self.reqData.organization_id
          },
        })
        if (splitRes.meta.code != 20000) {
          console.log(res);
          alert("下单拆单失败。")
          return false;
        }
        order.order_status = splitRes.data.order_status
        order.fulfillment_status = splitRes.data.fulfillment_status
      }

      if (inArray(order.order_status, [SO_STATUS_SPLITED, SO_STATUS_PARTIAL_PLACE])) {
        // 调用 Place 下单接口
        const placeRes = await this.$axios.$post(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v2/orders/' + order.id + '/place', {}, {
          params: {},
          headers: {
            "am-api-key": self.am_api_key,
            "am-organization-id": self.reqData.organization_id
          },
        })
        if (placeRes.meta.code != 20000) {
          console.log(res);
          alert("下单Place失败。")
          return false;
        }

        order.order_status = placeRes.data.order_status
        order.fulfillment_status = placeRes.data.fulfillment_status
      }


      if (inArray(order.order_status, [SO_STATUS_PLACE, SO_STATUS_PARTIAL_PAY])) {
        // 调用 Pay 支付接口
        await this.$axios.$post(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v2/orders/' + order.id + '/pay', {}, {
          params: {},
          headers: {
            "am-api-key": self.am_api_key,
            "am-organization-id": self.reqData.organization_id
          },
        })
      }
    },
    async sortData(orders) {
      const self = this
      for (let order of orders) {
        //整理order信息
        let orderTemp = [{
          platform: "supplier",
          price: (order.order_total.amount / 100),
          date: order.created_at,
          order_id: order.id,
          // cost: order.,
          shipping_price: (order.shipping_total.amount / 100),
          order_status: order.order_status,
          financial_status: order.financial_status,

        }];

        let vendor_order_price_total = 0;
        let vendor_order_price_cost_total = 0;
        //整理vendor信息
        if (order.vendor_orders) {

          for (const vendor_order of order.vendor_orders) {
            // const vendor_order = order.vendor_orders
            if (!vendor_order.order_total_cost.amount) {
              vendor_order.order_total_cost.amount = 0
            }
            orderTemp.push(
              {
                platform: "Vendor",
                price: vendor_order.order_total_cost.amount / 100,
                date: vendor_order.created_at,
                order_id: vendor_order.id,
                // cost: vendor_order.,
                shipping_price: vendor_order.shipping_total_cost.amount / 100,
                order_status: vendor_order.order_status,
                financial_status: vendor_order.financial_status,
                // buyer: vendor_order.,
              });
            vendor_order_price_total += vendor_order.order_total.amount
            vendor_order_price_cost_total += vendor_order.order_total_cost.amount
          }
        }
        orderTemp.push(
          {
            platform: "利润",
            price: (vendor_order_price_total - vendor_order_price_cost_total) / 100,
            date: '',
            order_id: '',
            // cost: vendor_order.,
            shipping_price: '',
            order_status: '',
            // buyer: vendor_order.,
          });


        //整理Buyer信息
        order.buyer = `姓名: ${order.shipping_address.first_name} ${order.shipping_address.last_name}  |  电话：${order.shipping_address.phone.country_code}-${order.shipping_address.phone.number} | 地址: ${order.shipping_address.address_line_1}, ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.postal_code} | email: ${order.shipping_address.email}`

        order.list_content = orderTemp
      }
      self.supplierList = orders
    },
    async supplementContent(order) {
      const self = this
      // 组装 order items 的商品数据
      order = await self.getSupplierProducts(order)

      // 组装vendor
      const supplier_order_id = order['id']
      const vendorOrders = await self.getVendorList(supplier_order_id);
      if (!vendorOrders) {
        return '';
      }
      order['vendor_orders'] = vendorOrders;

      //  补全物流信息
      order = await self.completeTrackingInfo(order)
    },
    async getSuppliersList() {
      const self = this

      // TODO: 1688 下单功能，如果V2版本上线了，换成下面那个v2版本
      const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/orders', {
      // const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v2/orders', {
        params: {
          page: 1,
          limit: 3,
          business_order_ids: self.reqData.dropshipping_order_ids,
        },
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
      })

      if (!res.data.orders) {
        self.supplierList = {}
        return ''
      }

      const promiseQueue = [];
      for (let order of res.data.orders) {
        promiseQueue.push(self.supplementContent(order));
      }
      await Promise.all(promiseQueue).then(responses => {
        // responses.map(response => write(response));
      });

      //整理数据。
      await self.sortData(res.data.orders)
    },
    async getSupplierProducts(order) {
      const self = this
      if (!order) {
        return order
      }
      for (let item of order.items) {
        const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/products', {
          params: {
            universal_product_ids: item.universal_product_id,
          },
          headers: {
            "am-api-key": self.am_api_key,
          }
        })

        // 把SKU 信息赋值进去、
        if (!res.data.products) {
          return order
        }
        if (res.data.products.length == 0) {
          return order
        }
        if (res.data.products[0].variants.length == 0) {
          return order
        }

        // 补全商品信息
        for (let variant of res.data.products[0].variants) {
          if (variant.universal_variant_id == item.universal_variant_id) {
            item.product_title = res.data.products[0].title
            item.title = variant.title
            item.options = variant.options
            item.image_urls = variant.image_urls
            item.weight = variant.weight
            item.image_urls = variant.image_urls
            item.vendor = res.data.products[0].vendor
          }
        }
      }
      return order
    },
    async completeTrackingInfo(order) {


      return order
    },
    async getEproloOrder(external_vendor_order_id) {
      const self = this
      let defaultOrder = {
        status_label: "无",
        status_exception_label: "正常",
      }
      if(!external_vendor_order_id){
        return defaultOrder
      }

      const res = await this.$axios.post(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/tools', {
        "path": "order_list.html?orderid=" + external_vendor_order_id,
        "code": "eprolo"
      },{
        params: {
        },
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
      })
      console.log(res);

      if (!res.data)
        return defaultOrder;
      if (!res.data.data)
        return defaultOrder;
      if(!res.data.data.Body)
        return defaultOrder;
      if (!res.data.data.Body.data)
        return defaultOrder;
      if (!res.data.data.Body.data.list)
        return defaultOrder;
      if (res.data.data.Body.data.list.length == 0)
        return defaultOrder;

      let eproloOrder = res.data.data.Body.data.list[0]

      let statusMap = {
        0: "全部",
        1: "未支付",
        2: "已支付",
        3: "已退款",
        4: "采购中",
        6: "已发货",
        8: "订单取消 ",
        7: "部分发货"
      }
      let statusException = {
        1: "未拦截",
        2: "已拦截"
      }
      console.log(eproloOrder.status);
      console.log(eproloOrder.status_exception);
      eproloOrder.status_label = statusMap[eproloOrder.status] || "无"
      eproloOrder.status_exception_label =  statusException[eproloOrder.status_exception] || "正常"

      return eproloOrder
    },
    async getVendorList(supplier_order_id) {
      const self = this
      if (!supplier_order_id) {
        self.vendorList = {}
        return ''
      }

      // TODO: 1688 下单功能，如果V2版本上线了，换成下面那个v2版本  npm
      const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/vendors-orders', {
      // const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v2/vendors-orders', {
        params: {
          supplier_order_id: supplier_order_id
        },
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
      })
      if (!res.data.orders) {
        return [];
      }
      // self.vendorList = res.data.orders

      for (let order of res.data.orders) {
        // 读取 eprolo 信息

        if(order.external_vendor_order_id){
          const eproloOrders = await self.getEproloOrder(order.external_vendor_order_id);
          order.eprolo_status_label = eproloOrders.status_label
          order.eprolo_status_exception_label = eproloOrders.status_exception_label
        }else{
          order.eprolo_status_label = "无"
          order.eprolo_status_exception_label = "无"
        }

        // 组装tracking
        if (order.trackings.length != 0) {
          for (let item of order.items) {
            for (let tracking of order.trackings) {
              for (let trackingItem of tracking.items) {
                // if (trackingItem.id == item.supplier_order_item_id) {
                if (trackingItem.id == item.id) {
                  if (!item.tracking_numbers) {
                    item.tracking_numbers = []
                  }
                  item.tracking_numbers.push(tracking.tracking_number)
                }
              }
            }
          }
        }
      }

      return res.data.orders
    },
    async showBlockOrderModal(vendor_orders) {
      const self = this
      self.block_order_ids = []
      for (let vendor_order of vendor_orders) {
        self.block_order_ids.push(vendor_order.id);
      }

      self.block_modal = true
    },
    async blockOrder() {
      const self = this

      if (!self.block_order_ids[0]) {
        alert('订单不存在')
        return false
      }
      self.modal_loading = true;

      for (let block_order_id of self.block_order_ids) {
        const res = await this.$axios.$post(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/vendors-orders/' + block_order_id + '/block', {
          "status": "blocked",
          "remark": "block order"
        }, {
          params: {},
          headers: {
            "am-api-key": self.am_api_key,
            "am-organization-id": self.reqData.organization_id
          },
        })
      }

      self.modal_loading = false;
      self.block_modal = false;
      this.$Message.info('拦截成功');
    },
  },
  filters: {
    formatDate: function (value) {
      if (!value) {
        return ''
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  }
}

function inArray(search, array) {
  for (var i in array) {
    if (array[i] == search) {
      return true;
    }
  }
  return false;
}

</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* justify-content: center; */
  /* align-items: center; */
  /* text-align: center; */
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.json-card {
  height: 600px;
  overflow-y: scroll;
}
</style>
