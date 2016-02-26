var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getData = function(artist) {
      var deferred = $q.defer();

      $http.jsonp("https://itunes.apple.com/search?term=" + artist + "&callback=JSON_CALLBACK").then(function(response) {      
        var songData = [];
        var result = response.data.results;

        for(var i = 0; i < result.length; i++) {

          var track = result[i];
          var song = {Artist: track.artistName,

            AlbumArt: track.artworkUrl100,

            Collection: track.collectionName,

            CollectionPrice: track.collectionPrice,

            Play: track.previewUrl,

            Type: track.kind
          };

          songData.push(song);
        }     
        console.log(songData);
        deferred.resolve(songData);   
      }); 
      return deferred.promise;  
    };
 
});


