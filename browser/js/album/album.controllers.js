/* global juke */
'use strict'; 

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, albumFactory, PlayerFactory) {

  albumFactory.fetchById(4)
  .then(function (album) {
    albumFactory.getCoverArt(album);
    albumFactory.getSongs(album);

    
    $scope.album = album;
    
    StatsFactory.totalTime(album).then(function(albumDuration){
      $scope.fullDuration = albumDuration / 60;
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound


  $scope.currentSong = PlayerFactory.getCurrentSong.bind(PlayerFactory);
  $scope.playing = PlayerFactory.isPlaying.bind(PlayerFactory);

  $scope.start = PlayerFactory.start.bind(PlayerFactory);

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  }
  function next () { skip(1); }
  function prev () { skip(-1); }

});

juke.controller('AlbumsCtrl', function($scope, albumFactory, StatsFactory){

  albumFactory.fetchAll()
    .then(function(albums){
      albums.forEach(function(album){
        
        albumFactory.getCoverArt(album);
        albumFactory.getSongs(album);
      });
     
      $scope.albums = albums;
    });



});


















