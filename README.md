# Sprite Studio
This is a personal tool i've used to animate sprites and create spritesheets.
Note that there are problems and not-well-planned things, but it works like a charm, it saves a lot of time.

**<a href ='https://andrewdevcup.github.io/SpriteStudio/index.html'>Try it!</a>**

## Things it has
- Create spritesheets from individual sprites, automatically adds them to a spritesheet which you can resize, it also supports multiple spritesheets.
- Exports sprites, adjust offsets and create animations frame by frame with looping.
- Saves modified spritesheet data in csv and animations in json

## Controls (Must know)
- In every arrow icon, hover your cursor over the text and use the mouse wheel to increase or decrease the value.
- In the sprite view, hold and drag left click to move, use mouse wheel to zoom and right click to reset the view.
- If some of those doesn't respond, move the cursor a little to focus on the item and try again.
<br>

# Creating Spritesheets

Click on <code>Import Sprites</code> and navigate to where your sprites are, select them to add it to the sheet (adding one by one will result in clearing the sheet)

If the sprites are too large or too many, there'll be a message telling which sprites were not drawn, make sure to select only those which can fit all in the sheet.

**Note:** At the moment, it doesn't support Sprite cropping, tough i've experimented with this in a TrueType to BitmapFont converter.

### Sheet index 
This is the index of your spritesheet on where those sprites are, if you have more sprites that doesn't fit:
- Save that spritesheet with it's data.
- Then add one (mouse wheel up) to the index.
- Add the next batch of sprites (resume from the next sprite of the last one drawn)
- Repeat until you're done.

### Canvas size
Resize the spritesheet if your need, there's a limit of 4096 by 4096 pixels, maximum for mobile phones.<br>
When resized, your sprites will be redrawn.
<br>
<br>
## Before Animating!
**Make sure to merge the spritesheet data**<br>
Because the sprites are in multiple sheets, you must merge them to use in the same Atlas, if you only have one sheet, skip to **Animating Sprites.**<br>
Merging spritesheet data, use any text editor:
- Open the csv file with the Index 0 *(name)-0.csv*, we'll be using as the main spritesheet data file.
- Open the next csv file, i.e *(name)-1.csv* select all the data under the header (index,x,y,w,h,ox,oy,name) and paste it at the bottom of the first one.
- Repeat the above with all the other csv files, at the end all the data should be on the Index 0 csv.
- Now you can delete all the other files except for *(name)-0.csv*, save it and rename it since the 0 not it's not necessary.
<br>

# Animating Sprites
To get started:
- Select all the spritesheets you want to animate (corresponding to your spritesheet data)
- Select your spritesheet data (merged)
- Select an animation (if you made one already) to edit.

Basics:
- To go back or advance a frame, click on the arrow icons respectively.
- To go to the first or last frame, click on the double arrow icons respectively.
- Play/Pause button: *Left click* to toggle playback, *Right click* to play looped.
- **You can also use the mouse wheel on the play/pause button to quicky back / advance frames, remember this!**
- **To change the sprite offsets, use the arrow keys!**

Sprite:
- Centered: Used previously on the Booty5 engine internally, if you're editing sprites of that engine, set to *"No, else it must be set to *"Yes"*.
- Alignment: Used to define the center of the sprite when Centered is set to *"No*.
- Aliasing: Disable pixel smoothing, to enable it set it to *"No"*.

### Creating an Animation
Select Create Anim, type a name and add the corresponding frames to it, separated with commas without spaces, frames can repeat. The animation speed is the framerate.

### Playing an Animation
Select an Animation, and it'll start playing. Right click on the play button to loop it.
Note: To edit the sprite offset, go to the first frame by clicking on the arrows, and manually increment it to your desired frame.

### Editing an Animation
Click on Edit Anim, change things and select Add, then select your animation and play it.

### Clear
Clears the current animation and sets the current sprite frame to 0, it doesn't clear the animation speed.

<br>
When you're done, click on *Save Frames* and *Save Anims* it'll export the new csv file and the json animation file.

## Known issues
- When creating a spritesheet, the canvas is actually 2048x2048 but the texts are at 1024x1024 and when resizing it, it sets the canvas to it's values. It's not damaging since your sprites are redrawn.
- Sometimes when animating, if a frame corresponds to a spritesheet that doesn't exist, the engine can stop working, and won't respond, make sure to save your data before testing animations.
