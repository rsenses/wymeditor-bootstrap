# Alignment Plugin

## About
This plugin adds four buttons to your toolbar which let you control the alignment of text. They'll add classes: *align_left*, *align_right*, *align_center*, *align_justify* to the container, you can then style these in your stylesheets to set the text align.

## Installing
Before you follow the details below, you'll need to follow the generic plugin installation details: [https://github.com/wymeditor/wymeditor/wiki/Plugins](https://github.com/wymeditor/wymeditor/wiki/Plugins)

Add the following code to the CSS page for your website (where you're code will be output):
```
#!CSS
 .align_left{
	text-align: left;
 }
 .align_right{
	text-align: right;
 }
 .align_center{
	text-align: center;
 }
 .align_justify{
	text-align: justify;
 }
```

If you want to see these the alignment in your WYMEditor itself, you'll need to edit your skin file (the default is *wymeditor/iframe/default/wymiframe.css*) and add the above CSS too.