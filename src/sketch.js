export default function sketch (p) {
  var insideCircle = 0;
  var total = 0;
  
  p.setup = function () {
    p.createCanvas(300,300);
    p.background(17,17,17);
    p.strokeWeight(0);
    p.ellipse(150,150,300,300);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
       p.frameRate(props.frameRate);
       if(props.stop == "done") {
          p.noLoop();
          document.getElementById("counter").classList.add("hiddenv");
          document.getElementById("slider").classList.add("hiddenv");
          document.getElementById("frameRateText").classList.add("hiddenv");
          document.getElementById("piBox").classList.add("marginUp");
          document.getElementById("doAgain").classList.add("showv");
          document.getElementById("doAgain").classList.add("hiddenv");
          var valueOfPi = 4 * (insideCircle / total);
             if(document.getElementById("valueOfPi")!= null) {
              document.getElementById("valueOfPi").innerHTML =  "Value of Pi is " + valueOfPi;
           }
       }
     }
 
  p.draw = function () {
   var point = {x: p.random(1, 301), y: p.random(1, 301)};
   total++;
   if(Math.sqrt(Math.pow(150 - point.x,2) + Math.pow(150 - point.y, 2)) <=  150) {
      insideCircle++;
      p.stroke(221,221,221);
      p.strokeWeight(3);
      p.point(point.x, point.y);
    } else if(Math.sqrt(Math.pow(150 - point.x,2) + Math.pow(150 - point.y, 2)) > 150) {
      p.stroke(127,219,255);
      p.strokeWeight(3);
      p.point(point.x, point.y);
    }
  }
}
  