<template>
  <article id="cart">
    <div className="product-main clearfix">
      <ProductSlide sliders={this.state.productData.images}></ProductSlide>
      <div className="product-info">
          <div className="product-title">{{ productData.name }}</div>
          <div className="product-price">
              <div className="product-price-box">
                    <span className="sale-price">¥{{ price }}</span>
                    <span v-if="originalPrice" className="original-price">¥{{ originalPrice }}</span>
              </div>
          </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductSlide from '../components/ProductSlide.vue'

function fetchProductDetail (store) {
  return store.dispatch('FETCH_PRODUCTDETAIL')
}

export default {
  name: 'productdetail',

  components: { Spinner ,SlideCommodity },
  data () {
    return {
      likeNum: 52,
      "goods_list": [
        {
          "goods_id":"2611",
          "goods_name":"iPhone 7 Plus 透明浮雕背壳",
          "shop_price":"128.00",
          "goods_thumb":"http://7xp9qs.com1.z0.glb.clouddn.com/57fb2ec898f2e.jpg"
        },
        {
          "goods_id":"2610",
          "goods_name":"iPhone 7 透明浮雕背壳",
          "shop_price":"128.00",
          "goods_thumb":"http://7xp9qs.com1.z0.glb.clouddn.com/57fb2f1ebbb32.jpg"
        },
        {
          "goods_id":"2607",
          "goods_name":"outdoor音箱",
          "shop_price":"599.00",
          "goods_thumb":"http://7xp9qs.com1.z0.glb.clouddn.com/57fa047e976aa.jpg"
        },
        {
          "goods_id":"2606",
          "goods_name":"travel音箱",
          "shop_price":"218.00",
          "goods_thumb":"http://7xp9qs.com1.z0.glb.clouddn.com/57fa04350231c.jpg"
        },
        {
          "goods_id":"2608",
          "goods_name":"PEARLTY多一折蓝牙自拍杆",
          "shop_price":"158.00",
          "goods_thumb":"http://7xp9qs.com1.z0.glb.clouddn.com/57fb03001225c.jpg"
        }
      ],
    }
  },
  computed: mapGetters({
    homepageData: 'activeHomepage'
  }),
  // preFetch: fetchHomepage,
  beforeMount () {
    fetchHomepage(this.$store)
  },
  mounted () {
    console.log("test")
 },
 updated (){
    console.log(window)
    console.log(window.Swiper)
    console.log($('#contentContent').html())
    console.log(this)
  },
  methods: {
    updateLikeNum () {
      this.likeNum += 1
      console.log(this)
    },
    // 获取对应sku 产品
    selectSku (variantId) {
      const data = this.state.cleanedData;
      for (let idx = 0; idx < data.variants.length; idx++) {
        if (variantId === data.variants[idx].id) {
          const currentVariant = Object.assign({}, data.variants[idx]);
          const currentData = data.variants[idx];
          // suites
          if (currentData.suites.length > 0) {
            if (currentData.suites[0].id !== 0) {
              currentData.suites.unshift({'id': 0, 'name': '裸机', 'only_cell': true});
            }
          }
          // 计算出可选的item
          const secondItem = {};
          const thirdItem = {};
          if (this.state.cleanedData.rank > 1) {
            for (let variantIdx = 0; variantIdx < this.state.cleanedData.variants.length; variantIdx++) {
              const attrArray = this.state.cleanedData.variants[variantIdx].attr_array;
              const oneItemKey = attrArray[0].key;
              const oneItemValue = attrArray[0].value;
              const secondItemKey = attrArray[1].key;
              const secondItemValue = attrArray[1].value;
              if (currentData.attr[oneItemKey] === oneItemValue && !secondItem[secondItemValue]) {
                secondItem[secondItemValue] = true;
              }
              if (this.state.cleanedData.rank === 3 && attrArray[2]) {
                const thirdItemValue = attrArray[2].value;
                if (currentData.attr[oneItemKey] === oneItemValue && currentData.attr[secondItemKey] === secondItemValue) {
                  if (!thirdItem[thirdItemValue]) {
                    thirdItem[thirdItemValue] = true;
                  }
                }
              }
            }
            // 渲染原始数据 添加可选属性
            const values = this.state.cleanedData.choices[1].values;
            for (let choiceSecond = 0; choiceSecond < values.length; choiceSecond++) {
              if (secondItem[values[choiceSecond].vid]) {
                values[choiceSecond].hasItem = true;
              } else {
                values[choiceSecond].hasItem = false;
              }
            }

            if (this.state.cleanedData.rank === 3) {
              const valuesThird = this.state.cleanedData.choices[2].values;
              for (let choiceThird = 0; choiceThird < valuesThird.length; choiceThird++) {
                if (thirdItem[valuesThird[choiceThird].vid]) {
                  valuesThird[choiceThird].hasItem = true;
                } else {
                  valuesThird[choiceThird].hasItem = false;
                }
              }
            }
          }
          return currentVariant;
        }
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
