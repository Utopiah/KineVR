Physical training of kinesitherapy and physiotherapy as easy to edit WebVR experiences.

The exercises featured here  are solely examples that are adapted to one specific physical issue (diagnosed right pain shoulder). Please do consult with your physical therapist first.

This is shared in order to avoid duplicate work and more efficiently exchange expertise that could make kinesitherapy and physiotherapy in VR more efficient.

![in VR](https://vatelier.net/MyDemo/KineVR/inVR.jpg)

Videos
- [First person view](https://vatelier.net/MyDemo/KineVR/demo.mp4)
- [Example of video with head-mounted display](https://vatelier.net/MyDemo/KineVR/hmd.mp4) (can be used to check after or with the kine that the movement was indeed correct)


# Features

- online working right now, no install, free [http://kinevr.glitch.me/](http://kinevr.glitch.me/)
  - editable right now, no install, free [https://glitch.com/edit/#!/kinevr](https://glitch.com/edit/#!/kinevr)
- sequential practice of exercises
- customizable exercises in (using on A-Frame `<a-animation>`)
  - duration `dur="1000"` (making sure to respect the pace)
  - repetitions `repeat="4"` (no need to count, you can mentally drift),
  - amplitude `from="-3 1.8 -0.5" to="3 1.8 -0.5"` and
  - stay motived for the next session (score is saved via URL)
- personal meaningful target practices
  - video that play/pause once started using `src="#video"`
  - subreddit (e.g. r/Awww) as slider using `reddit-slider="Awww"` (you only see the next image if you look long enough)
- point counting based on sustained gaze
  - generated link to add to Google Calendar with your last score
![Add to Google Calendar](https://vatelier.net/MyDemo/KineVR/AddToCalendar_preview.jpg)
- per exercise instructions
  - as text using `target-practice="head vertical rotation"`
  - as visual illustration using `illustration="KineVR/twist.jpg"` 
![neck twist](https://vatelier.net/MyDemo/KineVR/twist_preview.jpg)
- mirror to check own position
- the entire environment is customizable

 # Example of exercise
 
```html

<a-entity sequential-practice>
  <a-box target-practice="deep head lateral rotation" position="-10 0.5 -3" rotation="0 45 0" color="#4CC3D9">
     <a-animation attribute="position" fill="forwards" begin="start" direction="alternate"
                         repeat="2" dur="1000" to="10 0.5 -3"></a-animation>
  </a-box>
</a-entity>
        
```
        
# F.A.Q.

- Your exercises are too fast and they don't include the ones I need, how can I do it?
  - Please feel free to make your own exercise (cf example above) and share them back (via Github comment or pull request)
- I need to train my arms or legs, can I use this?
  - Yes right now it's focusing on head because that is my personal need but using controllers for limbs is not complicated.
- What's coming next?
  -  Editing exercise without coding, using limbs, etc. For details see [the TODO file](https://github.com/Utopiah/KineVR/blob/master/TODO.md)
