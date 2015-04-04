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

var layer = {
  init: function(){
    $('layers').addEventListener('click', layer.mousedown)
  },
  layers: [
    {
      dom: $('layer123'),
      y: 100
    },
    {
      dom: $('layer124'),
      y: 140
    },
    {
      dom: $('layer123'),
      y: 300
    },
    {
      dom: $('layer123'),
      y: 500
    },
  ],
  mousedown: function(e){
    element = e.toElement
    if(element.className == 'delete'){
      console.log('delete this div')
    }
    else{
      console.log(layer.getLayerFromChild(element))
    }
  },
  getLayerFromChild: function(e){
    if(e.className == "layer")
      return e
    if(!e.parentElement)
      return null
    return layer.getLayerFromChild(e.parentElement)
  }

}

layer.init()
