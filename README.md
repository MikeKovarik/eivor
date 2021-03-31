<img src="https://raw.githubusercontent.com/MikeKovarik/exifr/exifr/img/app-demo.gif" width="35%" align="right">

# eivor

🎭 Library for seamless transition animations of images.

View [demo page](https://mutiny.cz/eivor/) or [the sample app](https://flexus-next.netlify.app/demos/google-photos/grid-detail.html) from the gif on the right.

## What & How

1. **You give it two images**
<br>`<img>` tag or element with `background-image`
<br>Could be different scales, cropped, 
2. **It calculates how A and B overlap**
<br>Handles physical image size, crop and different aspect ratio; sizing (`object-fit`, `background-size`: `cover`, `contain` and percentages), positioning `background-position`, `clip-path`, etc...
4. **Creates intermediary element for animation**
<br>Or picks the suitable one of the A and B. (Either the higher quality one, or one that contains the other)
3. **Runs smooth animation**
<br>Transitioning from the position and location of the first image, to the second one.
4. **???**
5. **Profit**

## Usage

### `ImageTransition` class

`source` and `target` can be `<img>` tag or any html element with `background-image` css property. Third and optional argument is an `options` object.

```js
let transition = new ImageTransition(source, target, {duration: 1000})
await transition.play()
```

Optionally you can await `transition.ready` `Promise` if you need to wait for images to load.

```js
let transition = new ImageTransition(source, target)
// Wait for source and target images to load. Calculating position delta hasn't yet begun.
await transition.ready
// Images are now loaded, here you can do something
await transition.play()
// animation is over, temporary files are removed from DOM, source and target have returned to their original positions, any additional CSS props are removed.
```

### `options` object

* `options.easing`: `string`
* `options.duration`: `number`
* `options.fill`: `string`
* `options.mode`: `'crop'|'recreate'|'clone'` automatically determined. Can be overriden with caution.
<br>*Eivor figures out which image to animate (depending on crop, size and image quality) wheter a) source to target's position while the target is hidden or b) target from source's position while the source is hidden. If cropping one whithin the other is not possible, then a temporary node with the full image is created for the duration of the transition*
<br>`crop`: Crop, scale and translation are applied to the larger image. Only available if one image fits into the other.
<br>`recreate`: The larger image is temporarily resized in order to display the whole image uncropped. Then the target image is animated like `crop`.
<br>`clone`: Like `recreate`, but animation is applied to a clone of the target image while the original is hidden. 

## TODOs & Ideas

The script is already mighty as is right now. But there are still some edge cases or nice to have things I'd like to implement.

* [ ] Figure out a way to write unit tests
<br> testing animations is hard. There's an extensive example/debug file but it has to be tested manually.
* [ ] Add option to specify which image to animate.
<br> Now you specify source and target nodes. Until recently the script always animated target node from source node's position and size. Now it can also animate source into target's position.
<br> It'd be nice if user could specify which image to use for transition (either which node to manipulate if `*ContainedWithinTarget` allows it, or which url to use for clone node)
* [ ] Detect which image is higher quality and use that for animation
<br> Will work perfectly with 1:1 images. (maybe it should be default case in this scenario)
<br> May collide with variously shaped and clipped source/target images, thus ignoring `sourceContainedWithinTarget` / `targetContainedWithinSource` and forcing use of clone instead of manipulating the image that covers more imge space. (maybe it should be just an option defaulting to false)
* [ ] Ahead of time animation
<br> Right now, both source and target images have to be in the DOM, and the script waits for both of them to load in order to calculate their position, size, clip, etc...
<br> If user could provide that information to script, we could launch the animation while the target image is still loading (e.g. navigating to new view)
* [ ] Option to insert clone globally into body instead of source's/target's container
* [ ] Option to force clone instead of manipulating source or target nodes
* [ ] work with pixel values in background-position
* [ ] Investigate use of transform-origin (maybe as an API for user)

## Licence

MIT, Mike Kovařík, Mutiny.cz