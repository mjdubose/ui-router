function calculateDuration(width, speed){
  return width/speed + "s";
}

function startMarquee(element,speed){
  console.log("start")
  var span = element.children('span');
  span.addClass('marquee');
  span.css("animation-duration", (element[0].firstChild.offsetWidth / speed) + "s")
  span.css("transform", "translateX(" + element[0].clientWidth + "px)");
}

function stopMarquee(element){
  element.children('span').removeClass("marquee");
}

function checkMarquees(element, speed){
  textWidth = element[0].firstChild.offsetWidth
  parentWidth = element[0].offsetWidth
  if(textWidth > parentWidth){
    startMarquee(element, speed)
  } else {
    stopMarquee(element)
  }
}

angular.module("marquee-overflow", [])
.directive('marqueeOverflow', ['$window', function($window){
  return {
    scope: {
      speed: "=?",
      paused: "=?"
    },
    restrict:"EA",
    transclude: true,
    template: "<span><ng-transclude></ng-transclude></span>",
    link: function(scope, element, attrs){
      console.log(scope) 
      console.log(element)
      console.log(attrs)

      var parentWidth = element[0].offsetWidth
      var textWidth = element[0].firstChild.offsetWidth
      attrs.speed = parseInt(attrs.speed)

      if(textWidth > parentWidth){
        startMarquee(element)
      }

      scope.$watch(function(){
        checkMarquees(element, attrs.speed)
      })

      angular.element($window).bind('resize', function(){
        checkMarquees(element, attrs.speed)
      })
    }
  }
}])
