// Video Controls

var video           = document.getElementById('video');
var playPauseBtn    = document.getElementById('play-pause-btn');
var current         = document.getElementById('current');
var duration        = document.getElementById('duration');
var videoSpeedBtn   = document.getElementById('video-speed-btn');
var playSpeed;
var volumeIconBtn   = document.getElementById('volume-icon-btn');
var volumeSlider    = document.getElementById('volume-slider');
var cc              = document.getElementById('closedcaption-btn');
var fullscreenBtn   = document.getElementById('fullscreen-btn');
var progressBar     = document.getElementById('progress-bar');
var bufferBar       = document.getElementById('buffer-bar');
var $captions       = $('#caption-container span');
var singleLineText  = document.getElementById('singleClick');
var allText         = document.getElementById('dblClick');
var textSlider      = document.getElementById('text-slider');

// a function for calculating percentages and rounding to the second decimal

function getPercentage(current,duration){
      var percentage = (100 * (current / duration));
      percentage = percentage.toFixed(2);
      return percentage;
}

// Playing and Pausing the Video

function videoPlay(){
    video.play();
    $(playPauseBtn).css('background-image', "url('/video_player/icons/pause-icon.png')");
}

function videoPause(){
    video.pause();
    $(playPauseBtn).css('background-image', "url('/video_player/icons/play-icon.png')");
}

function togglePlayPause () {
    if(video.paused){
        videoPlay();
     }
    else {
        videoPause();
     }
}

$(playPauseBtn).click(function(){
    togglePlayPause(); 
});

$(video).click(function(){
    togglePlayPause(); 
});

// Setting the counters to 00:00 format

function timeOutput(seconds){
    var date = new Date(null); 
    var time;
  
    date.setSeconds(seconds);
    time = date.toISOString().substr(14,5);
    return time; 
}

//Updating the Current Time on the Counter

function currentTimeUpdate(){
    var time = timeOutput(video.currentTime);
    $(current).text(time);
}

video.addEventListener("timeupdate", function() {
        currentTimeUpdate();
});

// displaying duration of video on counter

video.addEventListener("canplay", function(){
        $(duration).text(timeOutput(video.duration));
});

//Setting the Playback Speed with a switch statement 

function playbackSpeed(){
    if(playSpeed < 2){
      playSpeed ++;
    }
    else{
      playSpeed = 0;
    }
  
    switch(playSpeed){
      case 0:
        video.playbackRate = 1;
        $(videoSpeedBtn).text('1X');
        break;
      case 1:
        video.playbackRate = 1.5;
        $(videoSpeedBtn).text('1.5X');
        break;
      case 2:
        video.playbackRate = 2;
        $(videoSpeedBtn).text('2X');
    }
}

$(videoSpeedBtn).click(function(){
      playbackSpeed();
});

// Getting the Volume Slider Value to change volume

function setVolume(){
    var value = $(volumeSlider).val() / 100;
    video.volume = value; 
  
    //aligning volume icon and volume mute with slider adjustment
  
    if(value === 0){
      volumeOff();
    }
    else if(value > 0){
      volumeOn();
    }
}

setVolume();      // this loads this function so that icon reflects volumeON of volumeOff

volumeSlider.addEventListener('click',setVolume,false);
volumeSlider.addEventListener('mousedown',setVolume,false);
volumeSlider.addEventListener('mouseup',setVolume,false);

// muting and unmuting video by clicking on volume icon button

function volumeOff(){
    video.muted = true;
    $(volumeIconBtn).css('background-image',"url('/video_player/icons/volume-off-icon.png')");
}

function volumeOn(){
    video.muted = false;
    $(volumeIconBtn).css('background-image',"url('/video_player/icons/volume-on-icon.png')");
}

function toggleVolumeMute(){
    if(video.muted){
        volumeOn();
        $(volumeSlider).val(75);
        volumeIconBtn.title = 'mute';
    }
    else{
        volumeOff();
        $(volumeSlider).val(0);
        volumeIconBtn.title = 'unmute';
    }
}

$(volumeIconBtn).click(function(){
      toggleVolumeMute();
});

//Turning the Closed Captioning On and Off

video.textTracks[0].mode = "hidden";  // Plays the video in the beggining without Closed Captioning

function captionToggle (){
    if(video.textTracks[0].mode === "hidden"){
        video.textTracks[0].mode = "showing";
    }
    else{
        video.textTracks[0].mode = "hidden";
    }
}


$(cc).click(function(){
      captionToggle();
});

// Creating a fullscreen option for multiple browsers 

function toggleFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
}

$(fullscreenBtn).click(function(){
      toggleFullscreen();
});

// loading the progress bar with video's current time 

function progressBarUpdate(){
     var amount = getPercentage(video.currentTime, video.duration);
     progressBar.value = amount; 
}

video.addEventListener("timeupdate", function() {
        progressBarUpdate();
});

// updating buffered amount

function bufferUpdate(){
    if(video.buffered.length == 1){
          var amount = getPercentage(video.buffered.end(0), video.duration);
          bufferBar.value = amount; 
    }
}

video.addEventListener("progress", bufferUpdate);

// making the progress bar clickable with ability to load clicked position on progress bar

 for (i = 0; i < $($captions).length; i++) {
        $captions[i].addEventListener("click", captionSeek); 
    }

function captionSeek(){
    a = this.dataset.starttime;
    video.currentTime = a; 
}

// Highlighting text from the script while also making it single line and hidding rest of script

function highlight(num) {
    $('.highlight').removeClass("highlight");
    if (num !== null) {
        $(num).addClass("highlight");
    }     
}

function updateHighlightedCaption() {
    var time = video.currentTime.toFixed(2); 
    
    if (time >= 0.18 && time < 4.13) {
            highlight('#1'); 
    } else if (time >= 4.13 && time < 7.54) {
            highlight('#2');
    } else if (time >= 7.54 && time < 11.27) {
            highlight('#3');    
    } else if (time >= 11.27 && time < 13.96) {
            highlight('#4');    
    }  else if (time >= 13.96 && time < 17.94) {
            highlight('#5');    
    } else if (time >= 17.94 && time < 22.37) {
            highlight('#6');    
    } else if (time >= 22.37 && time < 26.88) {
            highlight('#7');    
    } else if (time >= 26.88 && time < 30.92) {
            highlight('#8');    
    } else if (time >= 32.10 && time < 34.73) {
            highlight('#9');    
    } else if (time >= 34.73 && time < 39.43) {
            highlight('#10');    
    } else if (time >= 39.43 && time < 41.19) {
            highlight('#11');    
    } else if (time >= 42.35 && time < 46.30) {
            highlight('#12');    
    } else if (time >= 46.30 && time < 49.27) {
            highlight('#13');   
    } else if (time >= 49.27 && time < 53.76) {
            highlight('#14');    
    } else if (time >= 53.76 && time < 57.78) {
            highlight('#15');    
    } else if (time >= 57.78 && time < 61) {
            highlight('#6');    
    } else {
            highlight(null); 
    }
}

// This code allows the user to see a single line of highlighted text at a time of the script.  As the 
// video plays,  the applicable line of text is shown and highlighted

var clickValue = 0; 

$(singleLineText).click(function(){
      clickValue = 2; 
 });

$(allText).dblclick(function(){
      clickValue = 1; 
 });

function showHideText () {

    if (clickValue > 1) {
    
 $(".caption-paragraph span").each(function(){
  if ($(this).hasClass("highlight")){
      $(this).show();
    }
  else if ($(this).not("highlight")) {
    $(this).hide();
  }
    });
    }
    
    else if (clickValue >= 1) {
      $(".caption-paragraph span").each(function(){
          $(this).show(); 
      });
    }
}

video.addEventListener("timeupdate", function() {
        updateHighlightedCaption();
        showHideText(); 
 });

//making text bigger and smaller

$(textSlider).mousedown(function(){ 
    
    var value = textSlider.value ; 
    var boxValue = (value + "px" );
  
$('.caption-paragraph span').css("font-size", boxValue );

$(textSlider).mousemove(function(){ 
    
    var value = textSlider.value ; 
    var boxValue = (value + "px" );
  
$('.caption-paragraph span').css("font-size", boxValue );

  });
});

//this is so that on the progress bar the user can click or drag to any new positiion
//within the video

progressBar.addEventListener('click', function(e) {
  var percent = e.offsetX * this.max / this.offsetWidth;
  console.log(percent);
  video.currentTime = video.duration * (percent / 100);
});


