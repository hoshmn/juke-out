'use strict';

juke.factory('PlayerFactory', function(albumFactory, $rootScope){
	var output = {};
 	var progress = 0;
 	var audio = document.createElement('audio');
 	audio.addEventListener('timeupdate', function () {
		 progress = 100 * audio.currentTime / audio.duration;
		 console.log('current time: ', Math.floor(audio.currentTime));
		 $rootScope.$evalAsync();
 	});
 	var songs;

	var theCurrentSong = null;

	output.start = function(song, album){

		if (!songs) songs = album.songs;
		if (this.isPlaying() && song===theCurrentSong){
			//pause current song
			audio.pause();
		} else if (!this.isPlaying() && song === theCurrentSong) { 
			//resume current song
			audio.play();
		} else if (this.isPlaying() && song!==theCurrentSong) { 
			//pause current, play song other than current
			audio.pause();
			theCurrentSong = song;
			audio.src = song.audioUrl;
			audio.load();
			audio.play();
		} else { 
			//play song
			theCurrentSong = song;
			audio.src = song.audioUrl;
			audio.load();
			audio.play();
		}

	};


	output.isPlaying = function(){
		// console.log('is audio paused?', audio.paused);
		return !audio.paused;
	};

	output.getCurrentSong = function(){
		// console.log('the current song is', theCurrentSong);
		return theCurrentSong;
	};

	output.setCurrentSong = function(song){
		theCurrentSong = song;
	};

	output.next = function(){
		var self = this;
		var currentId = songs.indexOf(theCurrentSong);
		var newSong;
		if (currentId === songs.length-1){newSong = songs[0];}
		else {newSong = songs[currentId+1];}
		self.start(newSong);
		theCurrentSong = newSong;
	};

	output.previous = function(){

		var self = this;
		var currentId = songs.indexOf(theCurrentSong);
		var newSong;
		if (currentId === 0){newSong = songs[0]; }
		else {newSong = songs[currentId-1];}
		self.start(newSong);
		theCurrentSong = newSong;
	};

	output.getProgress = function(){
        return progress;
	};



return output;
 // .start, that loads and plays a song (or optional collection of songs)
 // .pause, that pauses any currently-playing song
 // .resume, that continues the current song after pause
 // .isPlaying, that returns a boolean
 // .getCurrentSong, be it playing or paused
 // .next, that moves to the next song in a list
 // .previous, that moves to the previous song in a list
 // .getProgress, which returns a value from 0 to 1

});
