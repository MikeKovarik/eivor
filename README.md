# image-transition

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