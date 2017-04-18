<template>
  <div id="contentContent" v-like="{isCompleted: true, isLike: false, likenum: likeNum }" v-on:click="updateLikeNum">
    <div id="brandRecommend" v-for="item in homepageData.brandArr">
      <p>{{ item.brandSpeclife.identity }}</p>
      <p>{{ likeNum }}</p>
<!--       <recommend-card speclife="{ brandSpeclife }"></recommend-card>
      <qqw-swiper selectorid={ brandid } brand={ brand }></qqw-swiper> -->
    </div>
    <slide-commodity :goods_list = "goods_list"></slide-commodity>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '../components/Spinner.vue'

import SlideCommodity from '../components/SlideCommodity.vue'

function fetchHomepage (store) {
  return store.dispatch('FETCH_HOMEPAGE')
}
export default {
  name: 'homepage',

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
    console.log(document.getElementById('#contentContent').innerHTML)
    console.log(this)
  },
  methods: {
    updateLikeNum () {
      this.likeNum += 1
      console.log(this)
    }
  }
}
</script>

<style lang="stylus">
</style>
