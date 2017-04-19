<template>
    <div class="g-item-content" >
        <div class="items-box" v-for="item in good_datas">
            <a class="g-item">
                <span class="g-img-box">
                    <img src="" alt="">
                </span>
                <span class="g-item-title">{{ item.goods_name }}</span>
                <span class="g-item-ex"></span>
                <span class="g-item-price">{{ item.shop_price }}</span>
            </a>
        </div>
    </div>
</template>



<script>
export default {
    name: 'product-card',
    props: ['good_datas'],
}
</script>


<style lang="stylus">
</style>