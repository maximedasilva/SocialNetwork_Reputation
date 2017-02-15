from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
import csv
import sys
config = {}
execfile("config.py", config)
#print(api.me().name)
_cpt=1
myfile="scrap.csv"
file=open(myfile,"ab")
fieldnames = ['candidate', 'coordinates','place']
writer = csv.DictWriter(file, fieldnames=fieldnames)



class stdOutListener(StreamListener):
    print str(_cpt)
    _cpt=_cpt+1
    def on_status(self, status):
        writer.writerow({'candidate': 'macron', 'coordinates': status.coordinates,'place':status.place.country_code })
        return True
    def on_error(self,status):
        print status
if __name__=='__main__':
    _cpt=1
    mystream=stdOutListener()
    auth=OAuthHandler(config["consumer_key"],config["consumer_secret"])
    auth.set_access_token(config["access_key"], config["access_secret"])
    stream=Stream(auth,mystream)
    stream.filter(locations=[-4.9,42.43,51.6,90])
