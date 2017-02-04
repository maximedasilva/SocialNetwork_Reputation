from twitter import *
import csv
#-----------------------------------------------------------------------
# load our API credentials
#-----------------------------------------------------------------------
config = {}
execfile("config.py", config)

#-----------------------------------------------------------------------
# create twitter API object
#-----------------------------------------------------------------------
twitter = Twitter(
		        auth = OAuth(config["access_key"], config["access_secret"], config["consumer_key"], config["consumer_secret"]))


#-----------------------------------------------------------------------
# perform a basic search
# Twitter API docs:
# https://dev.twitter.com/docs/api/1/get/search
#-----------------------------------------------------------------------
query = twitter.search.tweets(q = "#Macron",count="100")

#-----------------------------------------------------------------------
# How long did this query take?
#-----------------------------------------------------------------------
file = open("file.json","w")
print "Search complete (%.3f seconds)" % (query["search_metadata"]["completed_in"])

#-----------------------------------------------------------------------
# Loop through each of the results, and print its content.
#-----------------------------------------------------------------------
for result in query["statuses"]:
	#print "(%s) @%s %s" % (result["created_at"], result["user"]["screen_name"], result["text"])
    file.write(str.encode(str(result["user"]["location"]),'utf-8'))
file.close()
