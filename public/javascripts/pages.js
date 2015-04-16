function $(id) { return document.getElementById(id);}

var app = angular.module('app', [])
var http = null
app.controller('ImageController', function($scope, $http){
  $http.get('/page/' + page)
    .success(function(images){
      $scope.images = images
    })
    .error(function(err){
      console.log('images not found for page')
    })
  http = $http
})

var bookmaker = {
  init: function(){
    layer.init()
    weight.init()
    pageSelect.init()
    util.init()

    document.addEventListener('drop', layer.drop)
    document.addEventListener('dragover', layer.drop)
    document.addEventListener('dragleave', layer.drop)
    document.addEventListener('mousedown', bookmaker.mouseDown)
    document.addEventListener('mousemove', bookmaker.mouseMove)
    document.addEventListener('mouseup', bookmaker.mouseUp)
  },

  mouseDown: function(e){
    if(pageSelect.dropdownOpen && !e.toElement.descendantOf($('page-container'))) pageSelect.hideDropdown()
  },

  mouseMove: function(e){
    if(layer.isMouseDown) layer.mouseMove(e)
    if(weight.isMouseDown) weight.mouseMove(e)
  },

  mouseUp: function(e){
    document.body.classList.remove('dragging')
    if(layer.isMouseDown) layer.mouseUp(e)
    if(weight.isMouseDown) weight.mouseUp(e)
    if(pageSelect.isMouseDown) pageSelect.mouseUp(e)
  }
}

var util = {
  init: function(){
    HTMLElement.prototype.descendantOf = function(e){
      if(this == e) return true
      if(this.parentElement) return this.parentElement.descendantOf(e)
      return false
    }
  }
}

var pageSelect = {
  init: function(){
    $('page-container').addEventListener('mousedown', pageSelect.mouseDown)
  },

  dropdownOpen: false,
  //clickedOpen is for when they aren't dragging to select an element, but are rather clicking once to open, then clicking once again to select
  clickedOpen: false,
  isMouseDown: false,

  showDropdown: function(){
    if(!pageSelect.dropdownOpen){
      document.body.classList.add('dragging')
      $('page-dropdown').style.display = "block"
      pageSelect.dropdownOpen = true
    }
  },

  hideDropdown: function(){
    if(!pageSelect.isMouseDown && pageSelect.dropdownOpen){
      $('page-dropdown').style.display = "none"
      pageSelect.dropdownOpen = false
      pageSelect.clickedOpen = false
    }
  },

  mouseDown: function(e){
    pageSelect.isMouseDown = true
    pageSelect.showDropdown(e)
  },

  mouseUp: function(e){
    console.log("mouseup")
    pageSelect.isMouseDown = false
    if(!pageSelect.clickedOpen) pageSelect.clickedOpen = true
    else pageSelect.hideDropdown()
  },

  clickOutsideContainer: function(e){
    return !e.descendantOf($('page-container'))
  }
}

var weight = {
  init: function(){
    $('x-weight-control').addEventListener('mousedown', weight.mouseDown)
    $('y-weight-control').addEventListener('mousedown', weight.mouseDown)
  },

  active: null,
  x: 50,
  y: 50,
  dom: null,
  innerBar: null,
  isMouseDown: false,

  mouseDown: function(e){
    weight.dom = weight.getDomFromChild(e.toElement)
    if(weight.dom){
      weight.isMouseDown = true
      document.body.classList.add('dragging')
      weight.innerBar = weight.dom.getElementsByClassName('inner-bar')[0]
      weight.active = weight.dom.id.charAt(0)
      weight.innerBar.style.width = weight.getWidthFromPosition(e.layerX) + "%"
    }
  },

  mouseMove: function(e){
    weight.innerBar.style.width = weight.getWidthFromPosition(e.layerX) + "%"
  },

  mouseUp: function(e){
    weight.isMouseDown = false
  },

  getWidthFromPosition: function(p){
    offset = p - weight.dom.offsetLeft - 8
    if(offset < 0) return 0
    if(offset > weight.dom.offsetWidth - 16) return 100
    return offset * 100 / (weight.dom.offsetWidth - 16)
  },

  getDomFromChild: function(e){
    if(e.className == 'bar-container')
      return e
    if(e.parentElement)
      return weight.getDomFromChild(e.parentElement)
    return null
  }
}

var layer = {
  init: function(){
    $('layers').addEventListener('mousedown', layer.mouseDown)
  },

  dom: null,
  depth: null,
  isMouseDown: false,
  spacingInterval: 5,
  yDown: 0,
  yPos: 0,
  innerHeight: 0,

  mouseDown: function(e){
    layer.isMouseDown = true
    element = e.toElement
    if(element.className == 'delete'){
      console.log('delete this div')
    }
    else{
      dom = layer.getLayerFromChild(element)
      if(dom){
        document.body.classList.add('dragging')
        layer.yDown = e.y
        layer.dom = layer.getLayerFromChild(element)
        layer.dom.style.transition = ""
        layer.yPos = layer.dom.offsetTop
        layer.depth = Number.parseInt(layer.dom.dataset.depth)
        layer.innerHeight = window.innerHeight - 96 - 120
      }
    }
  },

  mouseMove: function(e){
    difference = layer.yDown - e.y
    position = layer.yPos - difference
    if(position < 0) position = 0
    if(position > layer.innerHeight) position = layer.innerHeight
    layer.dom.style.top = position + "px"
    layer.dom.style.zIndex = Math.ceil(100 - layer.getPercentFromPx(layer.dom.offsetTop))
  },

  mouseUp: function(e){
    if(layer.dom){
      layer.isMouseDown = false

      layer.yPos = layer.getPercentFromPx(layer.dom.offsetTop)
      layer.dom.style.top = layer.yPos + "%"

      //set the yPos to an integer percent, add the transition state, 
      //then apply the yPos to the dom
      roundedPos = layer.closestFreeSpace(layer.yPos)
      /*
      roundedPos = Math.round(layer.yPos / layer.spacingInterval) * layer.spacingInterval
      if(!layer.freeSpaceForLayerAtPosition(roundedPos)){
        console.log("collision found")
        console.log("closest free space: " + layer.closestFreeSpace(layer.yPos))
      }
     */
      layer.yPos = roundedPos
      layer.dom.style.transition = "top 0.1s ease-in-out, z-index 0.1s ease-in-out"
      setTimeout(function(){
        layer.dom.style.top = layer.yPos + "%"
        layer.dom.style.zIndex = 100 - layer.yPos

        //remove the transition once it completes
        setTimeout(function(){ 
          layer.dom.style.transition = "" 
          layer.dom = null
        }, 100)

      }, 50)
      layer.dom.dataset.depth = layer.yPos
    }
  },

  drop: function(e){
    e.stopPropagation()
    e.preventDefault()
    if(e.type == "drop"){
      console.log(e)
      http.post('/page', {title: "test post"}, {headers: {'Content-Type': 'application/json', enctype:'multipart/form-data'}}).success(function(data, status, headers, config){
        console.log('post success')
      }).
      error(function(data, status, headers, config){
        console.log('post error')
      })
    }
  },

  getPxFromPercent: function(p){
    return (p * layer.innerHeight) / 100
  },

  getPercentFromPx: function(p){
    return (p) * 100 / layer.innerHeight
  },

  freeSpaceForLayerAtPosition: function(p){
    if(p > 100 || p < 0) return false

    layers = $('layers').children
    for(var i = 0; i < layers.length; i++){
      if(layers[i] != layer.dom)
        if(layers[i].dataset.depth == p)
          return false
    }

    return true
  },

  closestFreeSpace: function(p){
    roundedPos = Math.round(layer.yPos / layer.spacingInterval) * layer.spacingInterval

    for(var i = 0; i < 100 / layer.spacingInterval; i++){
      delta = layer.spacingInterval * i
      //we're above the collision
      if(p < roundedPos){
        if(layer.freeSpaceForLayerAtPosition(roundedPos - delta))
          return roundedPos - delta

        if(layer.freeSpaceForLayerAtPosition(roundedPos + delta))
          return roundedPos + delta
      }
      //we're below the collision
      else{
        if(layer.freeSpaceForLayerAtPosition(roundedPos + delta))
          return roundedPos + delta

        if(layer.freeSpaceForLayerAtPosition(roundedPos - delta))
          return roundedPos - delta
      }

    }
  },

  getLayerFromChild: function(e){
    if(e.classList.contains("layer"))
      return e
    if(!e.parentElement || e.id == "layers")
      return null
    return layer.getLayerFromChild(e.parentElement)
  }

}

bookmaker.init()
