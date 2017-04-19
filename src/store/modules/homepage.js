import { fetchHomepage } from '../api'

// initial state
const state = {
  homepageData: {
  	brandArr: []
  }
}

// mutations
const mutations = {
 SET_HOMEPAGE: (state, { homepage }) => {
   console.log('有数据吗?------------------');
   console.log(homepage);
   state.homepageData = getReflectData(homepage.data.data)
 }
}

function getReflectData(data) {
      /*
        banner            活动banner图
        brand             品牌
        crowd_funding     众筹潮品
        purchase_articles 采购达人
        editer_articles   编辑专栏
        daren_articles    达人专栏
        column_list       专栏列表
       */
      let reflectData = {};
      let urlGoodTogo = '/app-goods/detail?id=';
      let urlArticlTogo = '/app-article/detail?id=';

      // 品牌特供
      let urlBrandTogo = '/app-goods/brand?brand_id=';
      reflectData.brandArr = [];
      Array.from(data.brand || []).map((brItem) => {
        let brandItem = {};
        let nickname = brItem.nickname;
        brandItem.brandid = 'brand' + brItem.id;
        brandItem.brandSpeclife = {
          id: brItem.id,
          class: 'brand',     // 图标
          identity: nickname + ' | ' + brItem.position,
          lovenum: brItem.love_num,
          bg: brItem.picurl1,
          url: urlArticlTogo + brItem.id + '&ref=special',
          slogan: brItem.title,
          tip: brItem.content,
        }
        if (nickname.length >= 20) {
          brandItem.brandSpeclife.identity = nickname.substring(0, 17) + '... | ' + brItem.position;
        }
        brandItem.brand = [];   // 品牌特供商品
        Array.from(brItem.goods_list || []).map((goodsItem) => {
          let reflectItem = {
            url: urlBrandTogo + goodsItem.brand_id,
            pic: goodsItem.brand_logo,
            name: goodsItem.brand_name,
            price: '￥' + (goodsItem.min_price || '0.00') + ' 起'
          };
          brandItem.brand.push(reflectItem);
        });
        brandItem.brand.push({
          url: urlArticlTogo + brItem.id + '&ref=special',
          more: '查看更多'
        });
        reflectData.brandArr.push(brandItem);
      });

      return reflectData;
    }

export default {
  state,
  actions: {
    FETCH_HOMEPAGE: ({ commit, state }) => {
      return fetchHomepage().then(homepage => commit('SET_HOMEPAGE', { homepage }))
    }
  },
  mutations,
  getters: {
    activeHomepage (state) {
      console.log(state.homepage.homepageData)
      return state.homepage.homepageData
    }
  }
}