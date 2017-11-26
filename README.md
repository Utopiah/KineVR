motivated by https://pbs.twimg.com/media/DPa3M2bX4AEFXbd.jpg

# to do

- give example with controllers to showcase it can be done also for limbs
  - including legs/arms by strapping the controller around
- adjust height
  - cf https://github.com/rdub80/aframe-gravr-component to keep it personalized
- properly handle mobile (right now just a quick hack)
- if no score first time thus give a tutorial (clone robot?)
  - share about timing, links, show by blinking or similar how gaze works (with visible line)
  - first session have another robot with a laser coming out of his eyes and when he follows the target we see his score inscreasing? 
  - in addition to the text for non technical people
- compare with previousScore if it is exists
  - give tips  
- add more feedback
  - poping up stars for each second watching
- easiest way for non technical people to add exercises
  - Github PR or even comment isn't super non technical friendly
  - dedicated interface? (saving in this Glitch with node?)
  
  
# failed  
- tried to make it bullproof via but didn't help because of order (e.g. no camera available yet or trying to get ID while element isn't yet created)
 
AFRAME.registerComponent('physical-practice', {
  init: function () {
      //<a-entity position="0 1.8 -0.5" id="conclusion" text="value: Start your physical re-education training in 5sec;"></a-entity>
      var conclusionEl = document.querySelector("#conclusion");
      if (!conclusionEl){
        conclusionEl = document.createElement("a-entity");
        conclusionEl.setAttribute("text", "value", "Start your physical re-
- clarify why centralizing makes sense (does it?)
  - avoid duplicate work
  - efficiently share expertise
- server side
  - option to share exercise data with timestamp, name, etc with kine
    - he/she would receive notification only if a certain pattern (e.g. no data for a 1 week, score too low, etc)
- name for exercise
  - with optional visual aid e.g. http://www.humankinetics.com/AcuCustom/Sitename/DAM/086/18art1_Main.png
- showcase with
  - calendar event creation with score
  - in HMD (needs a video recording)
- document how to make a training session including 
  - how to make a target move
  - how to make a target more attractive (glTF, video, etc)
  - share catalogue of exercises (PR?)
    education training in 5sec");
        conclusionEl.setAttribute("id", "conclusion");
        conclusionEl.id = "conclusion";
        conclusionEl.setAttribute("position", "0 1.8 -0.5");
        AFRAME.scenes[0].appendChild(conclusionEl);
      }
    
      //<a-entity camera look-controls position="0 1.8 0">
       // <a-entity position="0.5 0.1 -0.5" id="score" text="value: 0;"></a-entity>
      var scoreEl = document.querySelector("#score");
      if (!scoreEl){
        scoreEl = document.createElement("a-entity");
        scoreEl.setAttribute("text", "value", score);
        scoreEl.setAttribute("id", "score");
        scoreEl.id = "score";
        scoreEl.setAttribute("position", "0.5 0.1 -0.5");
        AFRAME.scenes[0].camera.el.appendChild(scoreEl);
      }
  }
});

# done
- find ways to keep it entertaining (video with ending displayed only if above threshold)
  - random pics from 
    - https://www.reddit.com/r/aww/ changed every time you look long enough
- audio (as suggested by Thomas)
- improve mirror resolution (as suggested by Thomas)  
- display div with https://calendar.google.com/calendar/render?action=TEMPLATE&text=Next+training+:+URL#Score
- added contact information for contributions