function $(id) { return document.getElementById(id);}

var app = angular.module('app', [])
app.controller('ImageController', function($scope, $http){
  $http.get('/page/' + page)
    .success(function(images){
      $scope.images = images
    })
    .error(function(err){
      console.log('images not found for page')
    })
})

var bookmaker = {
  init: function(){
    layer.init()

    document.addEventListener('mousemove', bookmaker.mouseMove)
    document.addEventListener('mouseup', bookmaker.mouseUp)
  },
  mouseMove: function(e){
    if(layer.isMouseDown)
      layer.mouseMove(e)
  },
  mouseUp: function(e){
    if(layer.isMouseDown)
      layer.mouseUp(e)
  }
}

var layer = {
  init: function(){
    $('layers').addEventListener('mousedown', layer.mouseDown)
  },
  activeLayer: null,
  depth: null,
  isMouseDown: false,
  mouseDown: function(e){
    layer.isMouseDown = true
    element = e.toElement
    if(element.className == 'delete'){
      console.log('delete this div')
    }
    else{
      layer.activeLayer = layer.getLayerFromChild(element)
      layer.depth = Number.parseInt(layer.activeLayer.dataset.depth)

      console.log(layer.activeLayer)
      console.log(layer.depth)
    }
  },
  mouseMove: function(e){
    console.log("mousemove")
  },
  getLayerFromChild: function(e){
    if(e.classList.contains("layer"))
      return e
    if(!e.parentElement)
      return null
    return layer.getLayerFromChild(e.parentElement)
  }

}

bookmaker.init()
