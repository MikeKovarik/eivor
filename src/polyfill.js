// It looks stupid but is necessary. Animation class is not globally accessible.
let dummy = document.createElement('div')
let animation = dummy.animate({})
let Animation = animation.constructor
if (!('finished' in Animation.prototype)) {
	Object.defineProperty(Animation.prototype, 'finished', {
		get() {
			if (this._finished)
				return this._finished
			if (this.playState === 'finished')
				return this._finished = new Promise.resolve()
			return this._finished = new Promise((resolve, reject) => {
				this.onfinish = resolve
				this.oncancel = reject
			})
		}
	})
}