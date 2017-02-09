from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
import sys
config = {}
execfile("config.py", config)
#print(api.me().name)
_cpt=1
myfile="file.json"
file=open(myfile,"wb")

class stdOutListener(StreamListener):
    print str(_cpt)
    _cpt=_cpt+1
    def on_status(self, status):
        print(status.text)
    def on_data(self, data):
        json_data = json.loads(data)
        file.write(str(json_data))
        return True

    def on_error(self,status):
        print status
if __name__=='__main__':
    _cpt=1
    mystream=stdOutListener()
    auth=OAuthHandler(config["consumer_key"],config["consumer_secret"])
    auth.set_access_token(config["access_key"], config["access_secret"])
    stream=Stream(auth,mystream)
    stream.filter(track=['#macron'])
