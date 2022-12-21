---
id: ''
title: How to Stream Video Games to Zoom
tags:
- engineering
- remote
- how to

---
One of the big challenges with working at a remote/distributed company is that it is difficult to replace the watercooler, off-the-cuff team bonding experience. Video calls tend to focus on business and meeting efficiency and it is awkward to try and shoot the breeze for a few minutes and learn something personal about each other.

One solution that my team has discovered is video games, and in this case specifically, [Overcooked 2](https://store.steampowered.com/app/728880/Overcooked_2/) on the Nintendo Switch. For deeper thoughts on how to socialize from home, see my [companion article](https://tims.io/2020-04-02-how-to-team-build-remotely/), this article will focus on the nuts and bolts of getting your computer setup.

## What you will need:

1. [Nintendo Switch](https://www.nintendo.com/switch/) (Not the Switch Lite)
2. [Nintendo Dock](https://www.amazon.com/gp/product/B07VHZC2T6/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1) (I prefer this after-market one)
3. [Mirabox HDMI Capture Card](https://www.amazon.com/gp/product/B07C6KCBYB/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
4. [OBS Studio](https://obsproject.com/)
5. [Zoom](https://zoom.us/)

## Setup Capture Card

The [Mirabox Capture Card](https://www.amazon.com/gp/product/B07C6KCBYB/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1) is a bit of an investment at $99.99 but it is still on the low-end for these devices and roughly half the cost of the more premium [Elgato Capture Cards](https://www.amazon.com/Elgato-Game-Capture-HD60-PlayStation/dp/B07VWXCXM7?th=1). I'm not looking to be a professional Twitch streamer so the Mirabox suits my needs just fine.

The hardware setup is pretty straightforward. Your Nintendo Dock HDMI plugs directly into the Mirabox, which then plugs into your computer via USB 3.0. I would also recommend using the HDMI loopout to forward the signal to a spare computer monitor. Trying to play directly from the Zoom stream will prove to be too laggy to be useful.

![](/img/Screen Shot 2020-04-03 at 3.16.33 PM.png)

Just a note, I had difficulty getting the Mirabox to register properly when attaching it through a USB dock so I ended up connecting it directly to my Macbook.

## Setup OBS Studio

So after you download and install OBS Studio, you should be able to open it and add your Mirabox as input.

Once you have OBS open, click the "+" sign under "Sources" and select "Video Capture Device".

![](/img/Screen Shot 2020-04-03 at 3.26.19 PM.png)

Next, give the device a name and then select "Mirabox Video Capture" from the dropdown menu.

![](/img/Screen Shot 2020-04-03 at 3.26.41 PM.png)

Now you should see a stream from your Nintendo inside of OBS.

![](/img/Screen Shot 2020-04-03 at 3.28.33 PM.png)

You can repeat this same process for audio by adding an "Audio Input Capture" device as well to bring in sound from the Nintendo. I found this process to be a bit finicky so I did have to do some googling and adjust some Mac settings the first time.

Ok, the last thing we need to do is view a Window preview of the screen so that we can screenshare just the Nintendo viz Zoom and not all of the OBS options and chrome.

Right-click on the preview and select "Windowed Projector (Source)".

![](/img/Screen Shot 2020-04-03 at 3.36.00 PM.png)

This will give us a new window with just the video capture screen.

![](/img/Screen Shot 2020-04-03 at 3.36.36 PM.png)

## Setup Zoom

Now that we have done all the tricky bits, setting up the Zoom call should be pretty familiar.

First, start a meeting.

![](/img/Screen Shot 2020-04-03 at 3.54.31 PM.png)

In my case I like to run the meeting from my work laptop and add my personal laptop to run the game screen share.

Now, share your screen in Zoom and select the Windows Project screen to share and make sure to hit the check mark to "Share computer sound".

![](/img/Screen Shot 2020-04-03 at 3.55.48 PM.png)

Now you should be looking at a stream of your Nintendo Switch!

![](/img/Screen Shot 2020-04-03 at 3.56.16 PM.png)

That's it! From my experience sharing the screen is useful as we usually have a few people playing and a few more spectating and rotating out taking turns. Plus, for Overcooked specifically, half the fun is yelling instructions at team members through the chaos as everyone learns how to work together. Now if that isn't team building, I don't know what is.