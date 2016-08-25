/* global juke */
'use strict';
 
juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  $scope.currentSong = PlayerFactory.getCurrentSong.bind(PlayerFactory);
  $scope.playing = PlayerFactory.isPlaying.bind(PlayerFactory);

  $scope.start = PlayerFactory.start.bind(PlayerFactory);

  $scope.next = PlayerFactory.next.bind(PlayerFactory);
  $scope.prev = PlayerFactory.previous.bind(PlayerFactory);


  $scope.progress = PlayerFactory.getProgress;

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };





});
