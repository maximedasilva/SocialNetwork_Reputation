funciton ScraptheTweets()
{
  $.ajax({
    url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23macron',
        dataType: 'jsonp',
        success: function(data) {
                              }
        }
    });
}

$(document).ready(function(){

})
