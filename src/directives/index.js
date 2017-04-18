/**
 * Register a global custom directive called v-like
 * v-like="{ isCompleted: true, isLike: false, likenum: likeNum}"
 * @param  {[type]} el       						[description]
 * @param  {[type]} binding) {}         [description]
 */
export function like (el, binding) {
	console.log(el)
	console.log(binding)
	// 可以再次点击
	if (binding.value.isCompleted) {

		let likeNum = +(binding.value.likenum)

		if (binding.value.isLike) {

		} else {

		}
	}
}

