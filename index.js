/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

!window.cordova && (window.onload = onDeviceReady);

function onDeviceReady() {
	// Cordova is now initialized. Have fun!

	
	textData = {
		es: {
			createSheet: 'CREAR\nSPRITESHEET',
			createSheetDesc: "Importa sprites a una textura, se guardan\ncomo una imagen y tabla de frames.\nEl proceso de agrupación es\nautomático.",
			animateSprites: 'ANIMAR\nSPRITES',
			animateSpritesDesc: "Anima sprites de un spritesheet.\nGuarda la tabla de frames con alineaciones\ny animaciones como json."
		},
		en: {
			createSheet: 'CREATE\nSPRITESHEET',
			createSheetDesc: "Import sprites to a canvas, save them as\nan atlas image and frame table.\nPacking process is done automatically.",
			animateSprites: 'ANIMATE\nSPRITES',
			animateSpritesDesc: "Animate sprites from a spritesheet.\nSave frame table with offsets	and\nanimations as json files."
		},
		pt: {
			
		},
		appName: "Sprite Studio"
	}
	lang = b5.Utils.GetLanguage().language;
	texts = textData[lang];

	app = new b5.App(document.getElementById('gamecanvas'), false);
	app.setCanvasScalingMethod(b5.App.FitBest);
	app.canvas_smoothing = false;
	app.adapt_resolution = true
	app.prevent_default = true;
	app.canvas.style.position = 'absolute'

	b5.Display.setBackgroundColor('white');

	scene = new b5.Scene;
	scene.clip_children = false;
	scene.w = 1600;
	scene.h = 900;

	app.addScene(scene);
	app.focus_scene = scene;

	//Background
	bg = new b5.RectActor;
	bg.setSize(1600, 900);
	bg.fill_style = 'transparent';
	scene.addActor(bg);
	
	app.setBackgroundColor('white');
	app.clear_canvas = true;
	//Page
	page = new b5.Actor;
	page.setSize(scene.w, scene.h-page.y)
	scene.addActor(page)
	page.touchable = true


	loadPage = function (p) {
		page.removeAllActors();
		scene.destroyAllResources();
		if (window.urls) for (var i = 0; i < urls.length; i++) {
			URL.revokeObjectURL(urls[i]);
		}

		switch (p) {
			case 'main':
				// Starting text
				var actlabel = new b5.LabelActor
				actlabel.fill_style = 'black'
				actlabel.text = textData.appName
				page.addActor(actlabel)
				actlabel._scale = 2
				actlabel._y = -360;

				// Create spritesheet

				var createsheet = new b5.RectActor;
				createsheet.setSize(350, 350)
				createsheet.fill_style = '#eaeaea'
				createsheet.touchable = true
				page.addActor(createsheet)
				createsheet.corner_radius = 20
				createsheet.setPosition(-300, -100)
				createsheet.hover_start = false
				createsheet.onHover = function () {
					if (!this.hover_start) {
						this.hover_start = true
						app.setCursor('pointer')
						this.TweenTo('_scale', 1.1, 0.1, b5.Ease.quadout, true)
					}
				}
				createsheet.onHoverEnd = function () {
					if (this.hover_start) {
						this.hover_start = false
						app.setCursor('default')
						this.TweenTo('_scale', 1, 0.1, b5.Ease.quadout, true)
					}
				}
				createsheet.onBeginTouch = function() {
					loadPage('CreateSpritesheet')
				}

				var creatshlabel = new b5.LabelActor
				creatshlabel.text = texts.createSheet
				createsheet.addActor(creatshlabel)
				creatshlabel._scale = 2.2
				creatshlabel._y = -22
				creatshlabel.line_height = 21

				var creatshinf = new b5.LabelActor
				creatshinf.fill_style = 'black'
				creatshinf._scale = 1.4
				creatshinf.line_height = 24
				creatshinf.setPosition(-300, 140)
				creatshinf.text = texts.createSheetDesc
				page.addActor(creatshinf)

				// Animate spritesheet

				var animsheet = new b5.RectActor;
				animsheet.setSize(350, 350)
				animsheet.fill_style = '#eaeaea'
				animsheet.touchable = true
				page.addActor(animsheet)
				animsheet.corner_radius = 20
				animsheet.setPosition(300, -100)
				animsheet.hover_start = false
				animsheet.onHover = function () {
					if (!this.hover_start) {
						this.hover_start = true
						app.setCursor('pointer')
						this.TweenTo('_scale', 1.1, 0.1, b5.Ease.quadout, true)
					}
				}
				animsheet.onHoverEnd = function () {
					if (this.hover_start) {
						this.hover_start = false
						app.setCursor('default')
						this.TweenTo('_scale', 1, 0.1, b5.Ease.quadout, true)
					}
				}
				animsheet.onBeginTouch = function () {
					loadPage('AnimateSpritesheet');
				}

				var animshlabel = new b5.LabelActor
				animshlabel.text = texts.animateSprites;
				animsheet.addActor(animshlabel)
				animshlabel._scale = 2.2
				animshlabel._y = -22
				animshlabel.line_height = 21

				var animshinf = new b5.LabelActor
				animshinf.fill_style = 'black'
				animshinf._scale = 1.4
				animshinf.line_height = 24
				animshinf.setPosition(300, 140)
				animshinf.text = texts.animateSpritesDesc
				page.addActor(animshinf)
				break;

			case 'CreateSpritesheet':
				
				INDEX = 0;
				CanvasSizes = [32,64,128,256,512,1024,2048,4096];
				CanvasWIndex = 5;
				CanvasHIndex = 5;
				drawnSprites = [];

				app.setCursor('default')
				var navactor = createNavigationView(800, 800);
				navactor.setPosition(320, -5)
				page.addActor(navactor)

				var proc = new b5.BitmapProcessor(2048, 2048),
				cbg = new b5.BitmapProcessor(204, 204);

				proc.display.setSmoothing(false)


				cbg.drawBG = function () {
					var i = this.image,
					ns = false,
					prevc = false;
					for (var a = 0; a < i.width; a++) {
						ns = !prevc;
						for (var b = 0; b < i.height; b++) {
							this.display.setFillStyle(ns ? '#ddd': '#fff')
							this.display.drawRect(a, b, 1, 1, true)
							b == 0 && (prevc = ns);
							ns = !ns;
						}
						
					}
				}
				cbg.drawBG()

				var canvasbg = new b5.Actor
				canvasbg.bitmap = cbg;
				canvasbg.w = 800
				canvasbg.h = 800
				canvasbg.smoothing = false;
				navactor.view.addActor(canvasbg)

				var canvas = new b5.Actor();
				canvas.bitmap = proc;
				canvas.setSize(800, 800)
				canvas.smoothing = false;
				navactor.view.addActor(canvas)

				var txtinf = new b5.LabelActor
				txtinf.fill_style = 'black'
				txtinf._scale = 1.4
				txtinf.text = 'MOUSEWHEEL: Zoom, LCLICK+DRAG: Move, RCLICK: Reset view'
				page.addActor(txtinf)
				txtinf.setPosition(320, -430)

				// Import sprites button

				var impbtn = new b5.RectActor
				impbtn.fill_style = '#eaeaea'
				impbtn.corner_radius = 18
				impbtn.setSize(350, 110)
				impbtn.setPosition(-460, -284)
				impbtn.touchable = true
				page.addActor(impbtn)
				impbtn.onHover = function () {
					if (!this.hover_start) {
						this.hover_start = true
						app.setCursor('pointer')
						this.TweenTo('_scale', 1.1, 0.1, b5.Ease.quadout, true)
					}
				}
				impbtn.onHoverEnd = function () {
					if (this.hover_start) {
						this.hover_start = false
						app.setCursor('default')
						this.TweenTo('_scale', 1, 0.1, b5.Ease.quadout, true)
					}
				}

				impbtn.onBeginTouch = function () {
					b5.Utils.pickFile(true, 'image/png', function(files) {
						//Load bitmaps
						if (window.urls) for (var i = 0; i < urls.length; i++) {
							URL.revokeObjectURL(urls[i]);
						}
						scene.destroyAllResources();

						urls = []
						drawnSprites = [];

						for (var i = 0; i < files.length; i++) {
							urls[i] = URL.createObjectURL(files[i])
							var bitmap = new b5.Bitmap(files[i].name, urls[i], true);
							scene.addResource(bitmap, 'bitmap');

						}
						setTimeout(drawSprites, 1000);

					})
					this.onHoverEnd()
				}

				var implb = new b5.LabelActor
				implb.text = 'Import Sprites'
				impbtn.addActor(implb)
				implb._scale = 1.7;

				// Save canvas & frames button

				var savCFbtn = new b5.RectActor
				savCFbtn.fill_style = '#eaeaea'
				savCFbtn.corner_radius = 18
				savCFbtn.setSize(350,
					110)
				savCFbtn.setPosition(-460,
					-100)
				savCFbtn.touchable = true
				page.addActor(savCFbtn)
				savCFbtn.onHover = function () {
					if (!this.hover_start) {
						this.hover_start = true
						app.setCursor('pointer')
						this.TweenTo('_scale', 1.1, 0.1, b5.Ease.quadout, true)
					}
				}
				savCFbtn.onHoverEnd = function () {
					if (this.hover_start) {
						this.hover_start = false
						app.setCursor('default')
						this.TweenTo('_scale', 1, 0.1, b5.Ease.quadout, true)
					}
				}

				savCFbtn.onBeginTouch = function () {
					//Test
					var n = prompt('Save Sheet and Frames as:', 'SpriteAtlasTexture_sheetName');
				 	if(n) {
						n = n.replace(/\.png|\.csv/g,"");
						downloadText(framesToCsv(drawnSprites), n + '-' + INDEX + '.csv');
					        downloadCanvas(proc.image, n + '-'+INDEX+'.png');
					}
				}
				var savCFlab = new b5.LabelActor
				savCFlab.text = 'Save Sheet & Frames'
				savCFbtn.addActor(savCFlab)
				savCFlab._scale = 1.7;

				// Back button

				var backbtn = new b5.RectActor
				backbtn.fill_style = '#eaeaea'
				backbtn.corner_radius = 18
				backbtn.setSize(350, 110)
				backbtn.setPosition(-460, 300)
				backbtn.touchable = true
				page.addActor(backbtn)
				backbtn.onHover = function () {
					if (!this.hover_start) {
						this.hover_start = true
						app.setCursor('pointer')
						this.TweenTo('_scale', 1.1, 0.1, b5.Ease.quadout, true)
					}
				}
				backbtn.onHoverEnd = function () {
					if (this.hover_start) {
						this.hover_start = false
						app.setCursor('default')
						this.TweenTo('_scale', 1, 0.1, b5.Ease.quadout, true)
					}
				}

				backbtn.onBeginTouch = function () {
					loadPage('main');
					scene.destroyAllResources();
				}
				var backlab = new b5.LabelActor
				backlab.text = 'Back'
				backbtn.addActor(backlab)
				backlab._scale = 1.7;
				
				//Index and canvas sizes
				
				var indxlb = new b5.LabelActor;
				indxlb.onTick = function() {
					this.text = "Sheet Index ↕ " + INDEX
				}
				indxlb.w = 200;
				indxlb.touchable = true
				indxlb.h = 70;
				indxlb.fill_style = "black";
				indxlb._scale = 1.6;
				indxlb.onWheel = function(e) {
					var d = Math.sign(-e.deltaY)
					INDEX += d;
					INDEX <= 0 && (INDEX = 0);
				}
				indxlb.setPosition(-460,15)
				page.addActor(indxlb);
				
				
				var cwlb = new b5.LabelActor;
				cwlb.onTick = function() {
					this.text = "Canvas Width ↕ " + CanvasSizes[CanvasWIndex]
				}
				cwlb.w = 200;
				cwlb.touchable = true
				cwlb.h = 70;
				cwlb.fill_style = "black";
				cwlb._scale = 1.6;
				cwlb.onWheel = function(e) {
					var d = Math.sign(-e.deltaY)
					CanvasWIndex   d;
					
					CanvasWIndex = b5.Maths.cap(CanvasWIndex,0,CanvasSizes.length-1);
					
					//Resize canvas and draw
					proc.image.width = CanvasSizes[CanvasWIndex];
					proc.image.height = CanvasSizes[CanvasHIndex];
					
					cbg.image.width = proc.image.width/10;
					cbg.image.height = proc.image.height/10;
					
					cbg.drawBG();
					scene.bitmaps.length > 0 && drawSprites();
					
					canvas.setSize(
						800*(proc.image.width/2048),
						800*(proc.image.height/2048)
					);
					canvasbg.setSize(canvas.w, canvas.h);
				}
				cwlb.setPosition(-460,85)
				page.addActor(cwlb);
				
				
				var chlb = new b5.LabelActor;
				chlb.onTick = function() {
					this.text = "Canvas Height ↕ " + CanvasSizes[CanvasHIndex]
				}
				chlb.w = 200;
				chlb.touchable = true
				chlb.h = 70;
				chlb.fill_style = "black";
				chlb._scale = 1.6;
				chlb.onWheel = function(e) {
					var d = Math.sign(-e.deltaY)
					CanvasHIndex += d;
					
					CanvasHIndex = b5.Maths.cap(CanvasHIndex,0,CanvasSizes.length-1);
					
					//Resize canvas and draw
					proc.image.width = CanvasSizes[CanvasWIndex];
					proc.image.height = CanvasSizes[CanvasHIndex];
					
					cbg.image.width = proc.image.width/10;
					cbg.image.height = proc.image.height/10;
					
					cbg.drawBG();
					scene.bitmaps.length > 0 && drawSprites();
					
					canvas.setSize(
						800*(proc.image.width/2048),
						800*(proc.image.height/2048)
					);
					canvasbg.setSize(canvas.w, canvas.h);
				}
				chlb.setPosition(-460,155)
				page.addActor(chlb);


				var drawSprites = function () {
					proc.display.clear();
					var i = -1,
					notDrawnSprites = [],
					row = 0,
					ox = 0,
					oy = 0;
					app.onTick = function () {
						if (i < scene.bitmaps.length - 1) {
							i++
							var b = scene.bitmaps[i],
							iw = b.image.width,
							ih = b.image.height,
							pds = drawnSprites[i - 1] || {
								x: 0,
								y: 0,
								w: 0,
								h: 0,
								row: 0
							};

							if (ox + iw <= proc.image.width) ox += pds.w;
							if (ox + iw > proc.image.width) {
								row++;
								ox = 0
							}

							oy = (function () {
								for (var a = 0, h = 0; a < drawnSprites.length; a++) {
									var s = drawnSprites[a] || {
										x: 0,
										y: 0,
										w: 0,
										h: 0
									},
									va1 = {
										x: s.x + (s.w / 2),
										y: s.y + (s.h / 2),
										w: s.w,
										h: s.h
									};
									if (s.row == row - 1) {
										//Previous row sprites
										oy = s.y + (s.h / 2)
										if (b5.Utils.overlapTest({
											x: ox + (iw / 2), y: oy + (ih / 2), w: iw, h: ih
										}, va1)) {
											//Sprites over this one
											if (s.y + s.h > h) {
												h = s.y + s.h
											}; //Get maximum sprite height
										}
									}
								}
								return h || oy;
							})();

							if (ox + iw <= proc.image.width && oy + ih - 1 <= proc.image.height) {
								if (window.debugBounds) {
									proc.display.setGlobalAlpha(0.5)
									proc.display.setFillStyle(['red', 'green', 'yellow', 'magenta', 'aqua', 'gray', 'black'][b5.Maths.randomRange(0, 6)])
									proc.display.drawRect(ox, oy, iw, ih, true)
									proc.display.setFont('40pt Calibri')
									proc.display.drawText(row, ox, oy + 40)
								} else proc.display.drawAtlasImage(b.image, 0, 0, iw, ih, ox, oy, iw, ih);
								drawnSprites[i] = {
									x: ox,
									y: oy,
									w: iw,
									h: ih,
									row: row,
									name: b.name
								}
							} else {
								notDrawnSprites.push(b.name);
							}

						} else {
							app.onTick = undefined;
							if (notDrawnSprites.length > 0) showMessage('WARNING: Sprites not drawn:\n'+ notDrawnSprites+'\nAdd them to another sheet, remember to add one to the index!');
						}

					}
				}

				break;
			case 'AnimateSpritesheet':
				app.setCursor('default');
				
				sprite = null;
				delete scene.onKeyDown;
				scene.destroyAllResources();
				CSV_NAME = "SpriteAtlasTexture_sheetName.csv",
				ANIMS_NAME = "sheetNameAnims.atlas.json";
				//sprite view
				var navactor = createNavigationView(710,710);
				navactor.setPosition(0,-30)
				page.addActor(navactor);
				//Label
				var txtinf = new b5.LabelActor
				txtinf.fill_style = 'black'
				txtinf._scale = 1.2
				txtinf.line_height = 20;
				txtinf.text = 'MOUSEWHEEL: Zoom, LCLICK+DRAG: Move, RCLICK: Reset view\nARROWS: Set sprite offset'
				page.addActor(txtinf)
				txtinf.setPosition(0, -420);
				
				//Lines
				var xl = new b5.RectActor;
				xl.setSize(2048,1);
				xl.fill_style = "red";
				navactor.view.addActor(xl);
				
				var yl = new b5.RectActor;
				yl.setSize(1,2048);
				yl.fill_style = "#0a0";
				navactor.view.addActor(yl);
				
				xl.onTick = function() {
					this.visible = yl.visible = navactor.fill_style != 'transparent'
				}
				
				//Sprite 
				sprite = new b5.Actor;
				sprite.round_pixels = false;
				sprite.center_atlas = true;
				sprite.frames_repeat = false;
				sprite.getFramesLength = function() {
					return this.atlas ?
					  this.anim_frames ? this.anim_frames.length-1 : this.atlas.frames.length-1
					  : 0;
				}
				
				sprite.getFrame = function(f) {
					return this.atlas.frames[ this.anim_frames ? this.anim_frames[f] : f];
				}
				
				navactor.view.addActor(sprite);
				
				//Info text
				var nat = new b5.LabelActor;
				nat.text_align = "left";
				nat.fill_style = "black";
				nat.text = "load";
				nat.setPosition(navactor.w/-2,(navactor.h/-2)+15);
				nat.scale = 1.3;
				navactor.addActor(nat);
				nat.onTick = function() {
					this.visible = xl.visible
					this.text = "Current Anim: "+ sprite.current_anim+"\n"+
					"Speed: "+ sprite.frame_speed+"fps\n"+
					"Bitmap Index: " + sprite.current_bitmap+"\n"+
					"Frame: " + Math.round(sprite.current_frame) + " / "+sprite.getFramesLength() +"\n"+
					"Actual frame: "+ (sprite.anim_frames ? sprite.anim_frames[Math.round(sprite.current_frame)] : Math.round(sprite.current_frame))+"\n"+
					"Looping: "+ sprite.frames_repeat 
				}
				
				//Set offsets
				scene.onKeyDown = function(e) {
					if(page.active && sprite.atlas) {
						var f = sprite.getFrame(Math.round(sprite.current_frame));
						if(f) {
							f.oy += e.key == "ArrowUp" ? 1 : e.key == "ArrowDown" ? -.5 : 0;
							f.ox += e.key == "ArrowLeft" ? 1 : e.key == "ArrowRight" ? -.5 : 0;
						}
						sprite.dirty();
					}
				}
				var importSheet = createButton('Import Sheets',230,60);
				page.addActor(importSheet);
				importSheet.setPosition(-625,-360);
				importSheet.onBeginTouch = function() {
				  b5.Utils.pickFile(true, 'image/png', function(files) {
						//Load bitmaps
						if (window.urls) for (var i = 0; i < urls.length; i++) {
							URL.revokeObjectURL(urls[i]);
						}
						
				  scene.destroyAllResources();

						urls = []

						for (var i = 0; i < files.length; i++) {
							urls[i] = URL.createObjectURL(files[i])
							var bitmap = new b5.Bitmap(files[i].name, urls[i], true);
							scene.addResource(bitmap, 'bitmap');
						}
					  
					  sprite.atlas = new b5.ImageAtlas('Atlas', scene.bitmaps);
					  sprite.atlas.addFrame(0,0,0,0,0,0,0);
					//  sprite.current_bitmap = 0;
					

					})
					this.onHoverEnd()
				}
				
				var importCsv = createButton('Import Frames',230,60);
				page.addActor(importCsv);
				importCsv.setPosition(-625,-260);
				importCsv.onBeginTouch = ()=>{
					if(sprite.atlas) b5.Utils.pickFile(false, '.csv', function(files) {
						var f = new FileReader();
						f.readAsText(files[0]);
						CSV_NAME = files[0].name;
						f.onload=()=>{
							sprite.atlas.frames = [];
							sprite.atlas.parseFrames(f.result);
						}
					})
					else showMessage('Pick one or more sheets first!')
				}
				
				var importAnim = createButton('Import Anims',230,60);
				page.addActor(importAnim);
				importAnim.setPosition(-625,-160);
				importAnim.onBeginTouch = function() {
					if(sprite.atlas) b5.Utils.pickFile(false, 'application/json', function(files) {
					  	var r = new FileReader;
					  	r.readAsText(files[0]);
					  	ANIMS_NAME = files[0].name;
					  	r.onload = function() {
					  		sprite.atlas.anims = {};
					  		sprite.atlas.parseAnims(r.result);
					  	}
					});
					else showMessage('Pick one or more sheets first!')
				}
				
				var saveCsv = createButton('Save Frames',230,60);
				page.addActor(saveCsv);
				saveCsv.setPosition(-625,60);
				saveCsv.onBeginTouch = function() {
					if(sprite.atlas) { for(var i = 0, a = "bitmap_index,sx,sy,sw,sh,ox,oy\n";i<sprite.atlas.frames.length;i++) {
						var f = sprite.atlas.frames[i];
						a += f.bitmap + ","+f.x+","+f.y+","+f.w+","+f.h+","+f.ox+","+f.oy+"\n";
					}
					downloadText(a,CSV_NAME);
					}
					else showMessage('Pick one or more sheets first!')
				}
				
				var saveAnim = createButton('Save Anims',230,60);
				page.addActor(saveAnim);
				saveAnim.setPosition(-625,160);
				saveAnim.onBeginTouch = function() {
					if(sprite.atlas) downloadText(JSON.stringify(sprite.atlas.anims), ANIMS_NAME);
					else showMessage('Pick one or more sheets first!')
				}
				
				var backb = createButton('Back',230,100);
				page.addActor(backb);
				backb.setPosition(-625,340);
				
				backb.onBeginTouch = function() {
					loadPage('main');
				}
				
				//Frame control
				var prb = createButton('⏯︎',80,60);
				prb.y = 390
				prb.actors[0]._scale = 1.3
				page.addActor(prb);
				prb.onBeginTouch = function(e,t) {
					if(sprite.atlas && sprite.atlas.anims[sprite.current_anim]) {
						sprite.frame_speed ? sprite.frame_speed = 0 :
						sprite.frame_speed = sprite.atlas.anims[sprite.current_anim].speed;
					}
					sprite.frames_repeat = t.button === 2;
				}
				prb.onWheel = function(d) {
					var a = -Math.sign(d.deltaY);
					sprite.current_frame += a;
					sprite.current_frame < 0 && (sprite.current_frame = 0)
				}
				
				//Next frame 
				var nfb = createButton('▶️',80,60);
				nfb.y = 390
				nfb.x = 100;
				nfb.actors[0]._scale = 1.3
				page.addActor(nfb);
				nfb.onBeginTouch = function(e,t) {
					Math.round(sprite.current_frame) < sprite.getFramesLength() && sprite.current_frame++;
				}
		  	//Prev frame 
				var pfb = createButton('◀️︎',80,60);
				pfb.y = 390
				pfb.x = -100;
				pfb.actors[0]._scale = 1.3
				page.addActor(pfb);
				pfb.onBeginTouch = function(e,t) {
					sprite.current_frame > 0 && sprite.current_frame--;
				}
				
				//First frame 
				var ffb = createButton('⏮️︎',80,60);
				ffb.y = 390
				ffb.x = -200;
				ffb.actors[0]._scale = 1.3
				page.addActor(ffb);
				ffb.onBeginTouch = function(e,t) {
					sprite.current_frame = 0;
				}
				
				//Last frame 
				var lfb = createButton('⏭️︎',80,60);
				lfb.y = 390
				lfb.x = 200;
				lfb.actors[0]._scale = 1.3
				page.addActor(lfb);
				lfb.onBeginTouch = function(e,t) {
					sprite.current_frame = sprite.getFramesLength();
				}
				
				// Text info
				//Frame
				var fl = new b5.LabelActor;
				fl.fill_style = "black";
				fl._scale = 2;
				fl.setPosition(580,-400);
				fl.text = "Frame";
				page.addActor(fl);
				
				var fli = new b5.LabelActor;
				fli.fill_style = "black";
				fli._scale = 1.25;
				fli.setPosition(680,-340);
				fli.text_align = "right";
				fli.line_height = 34;
				fli.text = 
				  "SourceX:                  SourceY:\n"+
				  "SourceW:                 SourceH:\n"+
				  "OffsetX:                   OffsetY:";
			  page.addActor(fli);
			  
			  var flv1 = new b5.LabelActor;
				flv1.fill_style = "black";
				flv1._scale = 1.25;
				flv1.setPosition(560,-340);
				flv1.text_align = "right";
				flv1.line_height = 34;
				flv1.onTick = function() {
					if(sprite.atlas) {
						var f = sprite.atlas.getFrame( sprite.anim_frames ? sprite.anim_frames[Math.round(sprite.current_frame)] : Math.round(sprite.current_frame));
						if(f) this.text =
						  f.x+"\n"+
						  f.w+ "\n"+
						  f.ox + "\n";
					}
				}
			  page.addActor(flv1);
			  
			  var flv2 = new b5.LabelActor;
				flv2.fill_style = "black";
				flv2._scale = 1.25;
				flv2.setPosition(765,-340);
				flv2.text_align = "right";
				flv2.line_height = 34;
				flv2.onTick = function() {
					if(sprite.atlas) {
						var f = sprite.atlas.getFrame(Math.round(sprite.current_frame));
						if(f) this.text =
						  f.y+"\n"+
						  f.h+ "\n"+
						  f.oy + "\n";
					}
				}
			  page.addActor(flv2);
			  
			  //Sprite
				var sl = new b5.LabelActor;
				sl.fill_style = "black";
				sl._scale = 2;
				sl.setPosition(580,-160);
				sl.text = "Sprite";
				page.addActor(sl);
				
				//Buttons
				var cntb = createButton('Centered: Yes', 180,60);
				cntb.actors[0]._scale = 1.2;
				cntb.setPosition(470,-70);
				page.addActor(cntb);
				cntb.onBeginTouch = function() {
					sprite.center_atlas = !sprite.center_atlas;
					
					!sprite.center_atlas && (sprite.ow = sprite.oh =	undefined);
					
					this.actors[0].text = 'Centered: '+(sprite.center_atlas ? 'Yes' : 'No');
				}
				
				var alb = createButton('Set alignment', 150, 60);
				page.addActor(alb);
				alb.actors[0]._scale = 1.2;
				alb.setPosition(680,-70);
				alb.onBeginTouch = function() {
					sprite.ow = sprite.oh = undefined;
				}
				
				app.canvas_smoothing = true;
				sprite.smoothing = false;
				
				var smb = createButton('Aliasing: Yes', 150, 60);
				page.addActor(smb);
				smb.actors[0]._scale = 1.2;
				smb.setPosition(470,20);
				smb.onBeginTouch = function() {
					sprite.smoothing = !sprite.smoothing;
					
					this.actors[0].text = "Aliasing: " + (sprite.smoothing ? 'No' : 'Yes');
				}
				
			  //Animation
				var al = new b5.LabelActor;
				al.fill_style = "black";
				al._scale = 2;
				al.setPosition(580,100);
				al.text = "Animation";
				page.addActor(al);
				
				//Create anim button
				var cab = createButton('Create anim', 180,60);
				cab.actors[0]._scale = 1.2;
				cab.setPosition(470,180);
				page.addActor(cab);
				cab.onBeginTouch = showCreateAnimDialog;
				
				//Select anim button 
				var sab = createButton('Select anim', 180,60);
				sab.actors[0]._scale = 1.2;
				sab.setPosition(680,180);
				page.addActor(sab);
				sab.onBeginTouch = showAnimsListDialog;
				
				var eab = createButton('Edit', 180,60);
				eab.actors[0]._scale = 1.2;
				eab.setPosition(470, 270);
				page.addActor(eab);
				eab.onBeginTouch = ()=>{
					showCreateAnimDialog(sprite.current_anim);
				}
				
				var clab = createButton('Clear', 180,60);
				clab.actors[0]._scale = 1.2;
				clab.setPosition(680, 270);
				page.addActor(clab);
				clab.onBeginTouch = ()=>{
					sprite.anim_frames = null,
					sprite.current_frame = 0;
				}
				
				//Extra
				
				var dcs = new OffscreenCanvas(710,710).getContext('2d'),
				frame = {
					x: 445,
					y: 65,
					w: 710,
					h: 710
				}
				
				
				var cap = createButton('Capture Anim', 180,60);
				cap.actors[0]._scale = 1.2;
				cap.setPosition(470,370);
				page.addActor(cap);
				cap.onBeginTouch = ()=>{
					var u = setInterval(m => {
						app.display.clear();
						sprite.draw();
						dcs.clearRect(0,0,710,710);
						dcs.drawImage(app.display.context.canvas,frame.x,frame.y,frame.w,frame.h,0,0,710,710);
						downloadCanvas(dcs.canvas,'frame-'+Math.round(sprite.current_frame)+'.png');
						
						if(sprite.current_frame < sprite.anim_frames.length) sprite.current_frame++;
						if(sprite.current_frame >= sprite.anim_frames.length) clearInterval(u), alert('Done');
					},100);
				}
				
				break;
		}
	}
	
	showCreateAnimDialog = function(anim) {
		var bg = new b5.RectActor;
		bg.fill_style = "black";
		bg.setSize(scene.w,scene.h);
		bg.opacity=0.4;
		page.active = false;
		bg.touchable = true;
		scene.addActor(bg);
		
		var c = new b5.RectActor;
		c.setSize(scene.w/1.5, scene.h/1.5);
		c.use_parent_opacity = false;
		bg.addActor(c);
		c.touchable = true;
		
		var txts = new b5.LabelActor;
		txts._scale = 2;
		txts.fill_style = "black";
		txts.line_height = 70;
		txts.text = "Name:\nFrames:\nSpeed:";
		c.addActor(txts);
		txts.text_align = "left";
		txts.setPosition(-450,-190);
		
		//Text fields
		var cont = document.createElement('div'),
		cs = cont.style,
		acs = app.canvas.style,
		i1 = document.createElement('input'),
		i2 = document.createElement('input'),
		i3 = document.createElement('input'),
		an = null;
		
		cs.position = "absolute";
		cs.width = acs.width,
		cs.left = acs.left,
		cs.top = acs.top;
		
		cont.appendChild(i1);
		i1.style.position = "absolute"
		i1.style.margin = "15% 31%";
		i1.style.width = "25%";
		i1.style.backgroundColor = "transparent";
		i1.style.color = "black"
		
		cont.appendChild(i2);
		i2.style.position = "absolute";
		i2.style.margin = "24% 31%";
		i2.style.width = "45%";
		i2.style.backgroundColor = "transparent";
		i2.style.color = "black";
		
		cont.appendChild(i3);
		i3.style.position = "absolute";
		i3.style.margin = "33% 31%";
		i3.style.width = "10%"
		i3.style.backgroundColor = "transparent";
		i3.style.color = "black"
		
		//Edit anim
		if(sprite.atlas && (an = sprite.atlas.getAnim(anim))) {
			i1.value = anim,
			i2.value = an.indices,
			i3.value = an.speed;
		}
		
		document.body.appendChild(cont);
		
		var btnclose = createButton('Back', 180, 70);
		c.addActor(btnclose);
		btnclose.setPosition(-180, 235);
		btnclose.onBeginTouch = function() {
			scene.removeActor(bg);
			page.active = true;
			document.body.removeChild(cont);
		}
		
		var btnadd = createButton('Add', 180, 70);
		c.addActor(btnadd);
		btnadd.setPosition(180, 235);
		btnadd.onBeginTouch = function() {
			btnclose.onBeginTouch();
			for(var i = 0, a = i2.value.split(','); i < a.length; i++) a[i] = +a[i];
			if(sprite.atlas) sprite.atlas.addAnim(i1.value, a, +i3.value)
		}
	}
	
	showAnimsListDialog = function() {
		var bg = new b5.RectActor;
		bg.fill_style = "black";
		bg.setSize(scene.w,scene.h);
		bg.opacity=0.4;
		page.active = false;
		bg.touchable = true;
		scene.addActor(bg);
		
		var c = new b5.RectActor;
		c.setSize(scene.w/1.5, scene.h/1.5);
		c.use_parent_opacity = false;
		bg.addActor(c);
		c.touchable = true;
		
		var cont = document.createElement('div'),
		cs = cont.style,
		acs = app.canvas.style,
		ul = document.createElement('ul');
		
		cs.position = "absolute";
		cs.width = acs.width,
		cs.left = acs.left,
		cs.top = acs.top;
		
		ul.style.position = "absolute";
		ul.style.width = "63%";
		ul.style.height = (innerHeight * 0.66)+"px"
		ul.style.margin = "9.5% 17%";
		ul.style.overflowX = "hidden";
		ul.style.overflowY = "scroll"
		cont.appendChild(ul);
		
		document.body.appendChild(cont)
		
		var bbtn = createButton('Back', 180, 70);
		c.addActor(bbtn);
		bbtn._y = 360
		bbtn.onBeginTouch = function() {
			document.body.removeChild(cont);
			page.active = true;
			scene.removeActor(bg);
		}
		//Create list
		if(sprite.atlas) for(var i in sprite.atlas.anims) {
			var li = document.createElement('li');
			li.textContent = i;
			li.style.color = "black";
			li.style.backgroundColor = "#eaeaea";
			li.style.marginTop = "2px";
			li.focus();
			li.onclick = function() {
				bbtn.onBeginTouch();
				sprite.playAnim(this.textContent);
			}
			ul.appendChild(li)
		}
	}
	
	downloadCanvas = function(canvas,	name) {
		var procBlob = function(blob) {
			var url = URL.createObjectURL(blob);
			b5.Utils.saveFile(name, url);
			URL.revokeObjectURL(url);
		};
		if(canvas instanceof OffscreenCanvas) canvas.convertToBlob().then(e=>{procBlob(e)});
		else if(canvas instanceof HTMLCanvasElement) canvas.toBlob(procBlob);
	}
	downloadText = function(text, name) {
		var url = URL.createObjectURL(new File([text], name));
	  b5.Utils.saveFile(name, url);
	}
	
	framesToCsv = function(f) {
	  for(var i = 0, csv = "bitmap_index,sx,sy,sw,sh,ox,oy,notes\n"; i < f.length; i++) {
	  	csv += INDEX + "," + f[i].x + "," + f[i].y + "," + f[i].w + "," + f[i].h + ",0,0, " + f[i].name.replace(/.png|.jpg|.bmp|.jpeg/g,"") + '\n';
	  }
	  return csv;
	}

	createButton = function(text, w, h) {
		var btn = new b5.RectActor
		btn.fill_style = '#ccc'
		btn.corner_radius = 18
		btn.setSize(w,h);
		btn.touchable = true;
		btn.onHover = function () {
			if (!this.hover_start) {
				this.hover_start = true
				app.setCursor('pointer')
				this.TweenTo('_scale', 1.1, 0.1, b5.Ease.quadout, true)
			}
		}
		btn.onHoverEnd = function () {
			if (this.hover_start) {
				this.hover_start = false
				app.setCursor('default')
				this.TweenTo('_scale', 1, 0.1, b5.Ease.quadout, true)
			}
		}
		var lb = new b5.LabelActor
		lb.text = text
		btn.addActor(lb)
		lb._scale = 1.7;
		return btn;
	}

	showMessage = function(text) {
		page.active = false;

		var mbg = new b5.RectActor;
		mbg.fill_style = 'black';
		mbg.setSize(scene.w, scene.h)
		mbg.opacity = 0;
		mbg.touchable = true;

		var txt = new b5.LabelActor;
		txt.text = text +'\nClick to continue';
		txt._scale = 1.4;
		txt._y = -50;
		txt.line_height = 21;
		mbg.addActor(txt);
		txt.use_parent_opacity = false;

		scene.addActor(mbg);

		mbg.TweenToWithEnd('opacity', 0.4, 0.4, b5.Ease.linear, true, 0, function() {
			mbg.onBeginTouch = ()=> {
				mbg.TweenToWithEnd('opacity', 0, 0.4, b5.Ease.linear, true, 0, ()=> {
					mbg.destroy();
					page.active = true;
				})
			}
		})
	}


	createNavigationView = function(w, h) {
		var view = new b5.RectActor();
		view.setSize(w, h)
		view.clip_children = true
		view.touchable = true

		view.view = new b5.Actor;
		view.addActor(view.view)
		view.onWheel = function(e,b) {
			var d = Math.sign(e.deltaY)
			this.view._scale -= d * 0.1 * this.view._scale
			this.view._scale < 0.1 && (this.view._scale = 0.1)
		}

		view.onBeginTouch = function (p, m) {
			m.button != 2 ? (this.move2 = true):
			(this.view.setOrigin(0, 0),
				this.view._scale = 1)
		}
		view.onMoveTouch = function (p) {
			if (this.move2) {
				this.view._ox += this.touch_drag_x / this.view.scale
				this.view._oy += this.touch_drag_y / this.view.scale
			}
		}
		view.onEndTouch = function (p) {
			this.move2 = false
		}
		view.fill_style = 'lightgray'
		return view
	}

	loadPage('main')


	app.start()

}
Number.prototype.zfill = function(size, fill){
  var n = this.toString();
  !fill && (fill = "0");
  while (n.length < size) n = fill + n;
  return n;
};
