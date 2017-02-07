from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

config = {}
execfile("config.py", config)
#print(api.me().name)
class stdOutListener(StreamListener):
    def on_data(self, data):
        print data
        return True

    def on_error(self,status):
        print status
if __name__=='__main__':
    mystream=stdOutListener()
    auth=OAuthHandler(config["consumer_key"],config["consumer_secret"])
    auth.set_access_token(config["access_key"], config["access_secret"])
    stream=Stream(auth,mystream)

    stream.filter(track=['trump'])
