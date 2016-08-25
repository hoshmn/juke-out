juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('albumFactory', function($http){
  var output = {};
  
  output.fetchAll = function(){
    return $http.get('/api/albums/')
      .then(function (res) { return res.data; })
  };

  output.fetchById = function(id){
    return $http.get('/api/albums/' + id)
      .then(function (res) { 
        return res.data; });
  };  

  output.getCoverArt = function(album){
    album.imageUrl = '/api/albums/' + album.id + '/image';
  };

  //gets #songs, song urls, and track #s
  output.getSongs = function(album){
      album.numSongs = album.songs.length;
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.trackNumber = i;
    });
  };



  return output;
});
