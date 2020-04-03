
# fluidscroll
Simple &amp; light weight vanilla javascript plugin to add fluid scrolling to page

## Demo
[Demo](https://ufoworks.github.io/fluidscroll/index.html)
  
## Setup

1) Add fluidscroll to your html
```html
<script src="fluidscroll.min.js" >
```  

2) Initialize
```javascript
var fluidscroll = new FluidScroll({
	el: document.querySelector('.wrapper'),
	onAnimate: function(scroll){
		console.log(scroll)
	}
})
fluidscroll.init()
```

## Options

| Property | Type | Description | Default |
|---------------------------|-------------|---------------|---------|
| `el` | HtmlElement | The html element on which the effect will be applied | `document.querySelector('main')` |
| `speed` | Number | Deceleration factor will be applied to the movement of the element | `0.05` |
| `resizeFactor` | Number | Factor to be applied to calculate the scale of the element as a function of the speed of the scroll | `25` |
| `maxScale` | Number | Maximum element scale, to disable the scaling effect set 1 | `1.8` |
| `resizeBody` | Boolean | Sets the height of the body to the height of the element | `true` |
| `onAnimate` | Function | Function that is called in each animation frame of the element. This function returns information about the position and percentage of the scroll and about the position and scale of the element | `null` |

## API

| Method name | Description |
|---------------------------|-------------|
| `init` | Setup elemento, init events and animations |
| `resizeBody` | Sets the height of the body to the height of the element |

Public methods are available after initialization:  
```js
const fluid = new FluidScroll()
fluid.init()
fluid.resizeBody()
```

## License

Created by [Óscar Montañés](https://github.com/ufoworks). Released under the [MIT License](https://github.com/ufoworks/fluidscroll/blob/master/LICENSE).