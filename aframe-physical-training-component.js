var calendarURL = 'http://www.google.com/calendar/event?action=TEMPLATE&text=Next+training+';
var rewardURL ='http://vatelier.net/MyDemo/KineVR/reward.jpg';
var score = 0;
  // should instead be done per exercise
var points = [];
var threshold = 3;
var images = [];
var videoTimings = {};

function startMobile(){
  document.querySelector("#introduction").setAttribute("visible", true);
  document.querySelector("#mobile").style.display = "none";
  var videos = document.querySelectorAll("video");
  videos.forEach( (v) => { v.play(); });
  setTimeout( () => { document.querySelector("#video").pause(); }, 500);
}   

function subredditFetch(subreddit){
  if (!subreddit) subreddit = "Awww";
  var url = 'https://www.reddit.com/r/' + subreddit + '/.json?limit=100';

  if (images.length == 0) fetch(url)
  .then(res => res.json())
  .then((out) => {
    var allImages = out.data.children;
    for (var i in allImages){
      var url = allImages[i].data.url;
      // filtering to avoid CORS limitations
      if (url.indexOf("https://i.imgur.com") > -1)
        images.push(url);
    }
  })
  .catch(err => { throw err });

  //for (var i in images) { console.log(images[i].data.url); }
}
  
AFRAME.registerComponent('sequential-practice', {
  schema: {type: 'string', default: rewardURL},
  init: function () {
    var currentExercise = 0;
    var startTime = 5000;
    var exercises = this.el.children;
      
    var sliderInterval = null;
    
    if (AFRAME.utils.device.isMobile()){
      document.querySelector("#mobile").style.display = "block";      
    }
    
    for (var e of exercises){
      e.setAttribute("visible", false)
    }
    
    if(window.location.hash.length>0){
     var data = JSON.parse(decodeURI(window.location.hash).substring(1));
      var previousScore = data.previousScore;
      videoTimings = data.videoTimings;
      document.querySelector("#conclusion").setAttribute("text", "value",  "Your last score was " + previousScore[previousScore.length-1]
                                                         + " Can you do better this time? Starting in 5 seconds again...");
    } else {
       // first time, better give a tutorial
      document.querySelector("#conclusion").setAttribute('visible', false);
      document.querySelector("#score").setAttribute('visible', false);
      document.querySelector("#introduction").setAttribute("visible", true);
      document.querySelector("#demo").play();
      setTimeout(function(){ 
        document.querySelector("#hmd").play();
      }, 1000);
      startTime += document.querySelector("#demo").duration * 1000;
      setTimeout(function(){ 
        document.querySelector("#conclusion").setAttribute('position', '0 2.1 -0.5');
        document.querySelector("#conclusion").setAttribute('visible', true);
      }, document.querySelector("#demo").duration * 1000 - 5000);
    }
    
    setTimeout(function(){ 
      document.querySelector("#introduction").setAttribute("position", "0 100 100"); // avoid raycast block
      document.querySelector("#score").setAttribute('visible', true);
      document.querySelector("#introduction").setAttribute("visible", false);
      document.querySelector("#conclusion").setAttribute('visible', false);
      doNextExercise(currentExercise); 
    }, startTime);
    
    function doNextExercise(currentExercise){
      var e = exercises[currentExercise];
      //console.log('should start', e)
      e.setAttribute("visible", true);
      var slider = 0;
      
      var instructionsEl = document.querySelector("#instructions");
      var instructions = e.getAttribute("target-practice");
      if (instructions && instructions.length>0){
        instructionsEl.setAttribute('visible', true);
        instructionsEl.setAttribute('text', 'value', instructions);
      } else {        
        instructionsEl.setAttribute('visible', false);
      }
      
      if (e.tagName == "A-IMAGE"){
        var subreddit = e.getAttribute("reddit-slider");
        subredditFetch(subreddit);
        sliderInterval = setInterval(function(){ e.setAttribute("src", images[slider]); slider++; }, 3000);
        // unfortunately limited by CORS, need a local proxy or equivalent
        // had to filter by imgur only for now
      } else {
        clearInterval(sliderInterval);
      }
            
      var illustrationEl = document.querySelector("#illustration");
      var illustration = e.getAttribute("illustration");
      if (illustration && illustration.length>0){
        illustrationEl.setAttribute('visible', true);
        illustrationEl.setAttribute('src', illustration);
      } else {        
        illustrationEl.setAttribute('visible', false);
      }
      
      if (e.tagName == "A-VIDEO"){
        var src = e.getAttribute("src");
        if (videoTimings[src]) document.querySelector( src ).currentTime = videoTimings[src];
        document.querySelector( src ).play();
        console.log(videoTimings, document.querySelector( src ).currentTime)
      }
      
      setTimeout(function(){ e.emit("start"); }, 1000);
      // could request user interaction instead
      
      e.querySelector("a-animation").addEventListener("animationend", () => { 
        points.push(score);
        if (e.tagName == "A-VIDEO"){
          var src = e.getAttribute("src");
          document.querySelector( src ).pause();
          // should add the video current time to the data to save via URL
          var currentTime = document.querySelector( src ).currentTime;
          var duration = document.querySelector( src ).duration;
          videoTimings[src] = currentTime;
        }
        //console.log('finished exercise', e);
        if ( (points.length==1 && score > threshold) || (points.length>1 && ( score - points[points.length-2]) > threshold) ){
            document.querySelector("#success").play();
        }
        e.setAttribute("visible", false);
        if (currentExercise < exercises.length-1){
          setTimeout(function(){ 
            doNextExercise(++currentExercise);
          }, 2000);
        } else {
          allExercisesDone();
        }
      });
    }
    
    function allExercisesDone(){
      document.querySelector("#instructions").setAttribute('visible', false);
      document.querySelector("#illustration").setAttribute('visible', false);
      document.querySelector("#score").setAttribute('visible', false);
      document.querySelector("#conclusion").setAttribute('visible', true);
      // assume those entities exist, could also create them if they don't
      document.querySelector("#conclusion").setAttribute("text", "value", 
                                                         'Congratulations on finishing all ' + exercises.length + ' exercises, ' +
                                                         'your final score is ' + score
                                                        + ' copy/paste the URL in your calendar for your next session! (or link in top left corner)');
      // could also compare with previousScore if it is exists
      document.querySelector("#calendarURL").style.display = "block";
      document.querySelector("#contribute").style.display = "block";
      window.location.hash = JSON.stringify({previousScore: points, videoTimings: videoTimings});
      document.querySelector("#calendarURL").innerHTML = "<a target='_blank' href='"
        +calendarURL+encodeURIComponent(window.location)
        +"'>Add to Google Calendar</a>";
    }
  }
});  
  
AFRAME.registerComponent('target-practice', {
  schema: {type: 'string', default: ''},
  init: function () {
    var scoring = null;
    var scoreEl = document.querySelector("#score");
    var cursorEl = document.querySelector("[cursor]");
    this.el.addEventListener('mouseenter', function (evt) {
      cursorEl.setAttribute("material", "color", "#00FF00")
      scoring = setInterval(function(){ 
        scoreEl.setAttribute("text", "value", score++)
      }, 300);
    });
    this.el.addEventListener('mouseleave', function (evt) {
      clearInterval(scoring);
      cursorEl.setAttribute("material", "color", "black")
    });
  }
});