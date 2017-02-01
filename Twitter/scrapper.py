import tweepy

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
#print(api.me().name)

# If the application settings are set for "Read and Write" then
# this line should tweet out the message to your account's
# timeline. The "Read and Write" setting is on https://dev.twitter.com/apps
#api.update_status(status='Updating using OAuth authentication via Tweepy!')
for tweet in tweepy.Cursor(api.search, q="#macron", lang="fr").items(1):
    print tweet
#for tweet in tweepy.Cursor(api.search, q="#macron", lang="fr").items():
