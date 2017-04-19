import { fetchProductDetail } from '../api'

// initial state
const state = {
  productData: {
    'choices': null,
    'variant_id': null,
    'variants': null,
    'sku_product': null,
    'variant_product': null,
    'available_products': null,
    'step_rank': null,
    'description': null,
    'package_list': null,
    'parameter': null,
    'advertise_words': null,
    'sales_num': null,
    isSpringHoliday: null,
    isSelf: null,
    rank: null
  };
}

// mutations
const mutations = {
 SET_PRODUCTDETAIL: (state, { productData }) => {
   state.productData = getReflectData(productData.data.data)
 }
}

// 字典映射
function getReflectData(data) {
  console.log('产品详情页 = ');
  console.log(data);
  const choices = [];
  const isSelf = (data.variants[0].sale_model === 'self') ? true : false;
  for (const key in data.attrs) {
    if (data.attrs.hasOwnProperty(key)) {
      const choice = {
        'id': key,
        'name': data.attrs[key].name,
        'values': []
      };
      const values = data.choices[key];
      for (let idx = 0; idx < values.length; idx++) {
        const vname = data.values[values[idx]].name;
        if (vname.search('#') >= 0) {
          const color = '#' + vname.split('#')[1];
          const vcname = vname.split('#')[0];
          choice.values.push({
            'vname': vcname,
            'vid': values[idx],
            'color': color
          });
        } else {
          choice.values.push({
            'vname': vname,
            'vid': values[idx]
          });
        }
      }
      choices.push(choice);
    }
  }

  const stepRank = {};
  let rank = 0;
  for (const stepId in data.attrs) {
    if (data.attrs.hasOwnProperty(stepId)) {
      rank += 1;
      stepRank[stepId] = rank;
    }
  }

  function sortAttrAObject(obj) {
    const arr = [];
    for (const stepId in obj) {
      if (obj.hasOwnProperty(stepId)) {
        const choiceId = obj[stepId];
        const stepIdParseInt = parseInt(stepId, 10);
        arr.push({
          'key': stepIdParseInt,
          'value': choiceId
        });
      }
    }

    function compare(prev, next) {
      if (prev.key < next.key) {
        return -1;
      }
      if (prev.key > next.key) {
        return 1;
      }
      return 0;
    }

    arr.sort(compare);
    return arr;
  }

  const skuProduct = {};
  const variantProduct = {};
  const availableProducts = {};
  const availableItems = {};
  for (let idx = 0; idx < data.variants.length; idx++) {
    data.variants[idx].attr_array = sortAttrAObject(data.variants[idx].attr);
    const AttrArray = data.variants[idx].attr_array;
    // rank 大于0 计算出第一行可点击的元素
    if (rank > 0) {
      const key = AttrArray[0].key;
      const value = AttrArray[0].value;
      if (!availableItems[key]) {
        availableItems[key] = {};
        availableItems[key][value] = true;
      } else {
        if (!availableItems[key][value]) {
          availableItems[key][value] = true;
        }
      }
    }
    let skuChoice = '';
    for (const key in data.variants[idx].attr) {
      if (data.variants[idx].attr.hasOwnProperty(key)) {
        const stepChoice = key + ':' + data.variants[idx].attr[key];
        skuChoice += stepChoice + ';';
        if (stepChoice in availableProducts) {
          availableProducts[stepChoice].push(data.variants[idx].id);
        } else {
          availableProducts[stepChoice] = [data.variants[idx].id];
        }
      }
    }
    skuProduct[skuChoice] = data.variants[idx];
    variantProduct[data.variants[idx].id] = data.variants[idx];
  }
  const description = data.mobile_description.split(',');
  for (let idx = 0, len = description.length; idx < len; idx++) {
    description[idx] += '!/quality/70';
  }
  // 增加春节快递
  let isSpringHoliday = false;
  const currentTime = Math.round(new Date().getTime() / 1000);
  if (currentTime <= 1486051200) {
    isSpringHoliday = true;
  }
  // 初始化第一节数据可选
  for (const firstStep in availableItems) {
    if (availableItems.hasOwnProperty(firstStep)) {
      if (parseInt(firstStep, 10) === parseInt(choices[0].id, 10)) {
        for (let idx = 0; idx < choices[0].values.length; idx++) {
          if (availableItems[firstStep][choices[0].values[idx].vid]) {
            choices[0].values[idx].hasItem = true;
          }
        }
      }
    }
  }

  return {
    'choices': choices,
    'variant_id': data.variant_id,
    'variants': data.variants,
    'sku_product': skuProduct,
    'variant_product': variantProduct,
    'available_products': availableProducts,
    'step_rank': stepRank,
    'description': description,
    'package_list': data.package_list,
    'parameter': data.parameter,
    'advertise_words': data.advertise_words,
    'sales_num': data.sales_num,
    isSpringHoliday: isSpringHoliday,
    isSelf: isSelf,
    rank: rank
  };
}

export default {
  state,
  actions: {
    FETCH_PRODUCTDETAIL: ({ commit, state }) => {
      return fetchProductDetail().then(productData => commit('SET_PRODUCTDETAIL', { productData }))
    }
  },
  mutations,
  getters: {
    activeProductDetail(state) {
      console.log(state.productdetail.productData)
      return state.productdetail.productData
    }
  }
}