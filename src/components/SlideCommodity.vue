<template>
    <header class="swiper-container qqw-banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide qqw-op-bg" v-for="item in goods_list">
                <div>
                    <img class="swiper-slide-brand-img" :src="item.goods_thumb">
                    <p class="swiper-brand-label">{{item.goods_name}}</p>
                    <span class="swiper-brand-tip">{{item.shop_price}}</span>
                </div>
            </div>

            <!-- Add Pagination -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </div>
    </header>
</template>
<style lang="stylus">
    @import "../css/swiper.min.css";
    .swiper-container
        width 100%
        height 100%
        background #fff

    .swiper-slide
        text-align center
        font-size 12px

        /* Center slide text vertically */
        display -webkit-box
        display -ms-flexbox
        display -webkit-flex
        display flex
        -webkit-box-pack center
        -ms-flex-pack center
        -webkit-justify-content center
        justify-content center
        -webkit-box-align center
        -ms-flex-align center
        -webkit-align-items center
        align-items center
    .qqw-op-bg
        width 100px
        margin 10px 10px
    .swiper-slide-brand-img
        border 1px solid #e6e6e6
        width 100px
        height 100px

    .swiper-brand-label
        color  #323232
        overflow  hidden
        white-space  nowrap
        text-overflow  ellipsis
        width 90px
    .swiper-brand-tip
        display block
        font-size 12px
        text-align center
        color #5cb531

</style>
<script>
    export default {
        name: 'swiper-wrapper',
        props: ['goods_list'],
        methods: {

        },
        updated(){
            var swiper = new window.Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 30
            })
        }


    }

    //  var swiper = new Swiper('.swiper-container', {
    //        pagination: '.swiper-pagination',
    //        slidesPerView: 3,
    //        paginationClickable: true,
    //        spaceBetween: 30
    //    });
    //    export default {
    //        data() {
    //            return {
    //                swiperOption: {
    //                    pagination: '.swiper-pagination',
    //                    slidesPerView: 3,
    //                    paginationClickable: true,
    //                    spaceBetween: 30
    //                }
    //            }
    //        }
    //    }
    //    export default {
    //        data() {
    //            return {
    //                swiperOption: {
    //                    pagination: '.swiper-pagination',
    //                    paginationClickable: true,
    //                    slidesPerView: 5,
    //                    spaceBetween: 50,
    //                    breakpoints: {
    //                        1024: {
    //                            slidesPerView: 4,
    //                            spaceBetween: 40
    //                        },
    //                        768: {
    //                            slidesPerView: 3,
    //                            spaceBetween: 30
    //                        },
    //                        640: {
    //                            slidesPerView: 2,
    //                            spaceBetween: 20
    //                        },
    //                        320: {
    //                            slidesPerView: 1,
    //                            spaceBetween: 10
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    }
</script>
