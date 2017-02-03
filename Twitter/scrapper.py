import tweepy

access_token = "1109916354-sfxbp6PqiGsABK5HCjaznIhUr2cL3cjlpHP2sHy"
access_token_secret = "3hcT86WztX86KJyzYgAPtXmeMU6J9QM7b6HCTAo0JfBdq"
consumer_key = "M4n1TsoHezWA4Gg3Cd0el7XVZ"
consumer_secret = "MLjGqCZLQGRNHcYQETl7UMT04Qrb5LWdKyTzzbd2J64V1fD9ir"


auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
#print(api.me().name)
file= open("file.json","w")


# If the application settings are set for "Read and Write" then
# this line should tweet out the message to your account's
# timeline. The "Read and Write" setting is on https://dev.twitter.com/apps
#api.update_status(status='Updating using OAuth authentication via Tweepy!')
for tweet in tweepy.Cursor(api.search, q="#macron", lang="fr").items(1):
    file.write(str(tweet))
#for tweet in tweepy.Cursor(api.search, q="#macron", lang="fr").items():
file.close()
