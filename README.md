Physical training of kinesitherapy and physiotherapy as easy to edit WebVR experiences.

The exercises featured here  are solely examples that are adapted to one specific physical issue (diagnosed right pain shoulder). Please do consult with your physical therapist first.

This is shared in order to avoid duplicate work and more efficiently exchange expertise that could make kinesitherapy and physiotherapy in VR more efficient.

# Features

- sequential practice of exercises
- customizable exercises in
  - duration `dur="1000"` (making sure to respect the pace)
  - repetitions `repeat="4"` (no need to count, you can mentally drift),
  - amplitude `from="-3 1.8 -0.5" to="3 1.8 -0.5"` and
  - stay motived for the next session (score is saved via URL)
- personal meaningful target practices ()
  - target (see below)
- point counting based on sustained gaze
  - video that play/pause once started using `src="#video"`
  - subreddit (e.g. r/Awww) as slider using `reddit-slider="Awww"`
- instruction per exercise using `target-practice="head vertical rotation"`
- illustration per exercise using `illustration="KineVR/twist.jpg"`
- mirror to check own position
- the entire environment is customizable
        
# To do

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
- server side
  - option to share exercise data with timestamp, name, etc with kine
    - he/she would receive notification only if a certain pattern (e.g. no data for a 1 week, score too low, etc)
- document how to make a training session including 
  - how to make a target move
  - how to make a target more attractive (glTF, video, etc)
  - share catalogue of exercises (PR?)
- make it bullproof but tricky order (e.g. no camera available yet or trying to get ID while element isn't yet created)
- exercises for VR folks (i.e. identifying and counter balance the effects OF wearing a HMD)

# done
- find ways to keep it entertaining (video with ending displayed only if above threshold)
  - random pics from 
    - https://www.reddit.com/r/aww/ changed every time you look long enough
- audio (as suggested by Thomas)
- improve mirror resolution (as suggested by Thomas)  
- display div with https://calendar.google.com/calendar/render?action=TEMPLATE&text=Next+training+:+URL#Score
- added contact information for contributions
- motivated by sketch https://pbs.twimg.com/media/DPa3M2bX4AEFXbd.jpg
- name for exercise
  - with optional visual aid e.g. http://www.humankinetics.com/AcuCustom/Sitename/DAM/086/18art1_Main.png
- showcase with
  - calendar event creation with score
  - in HMD (needs a video recording)