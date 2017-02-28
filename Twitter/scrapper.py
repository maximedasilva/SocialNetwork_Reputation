#!/usr/local/bin/python
# -*-coding:Latin-1 -*
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
import csv
import sys

# -*-coding:Latin-1 -*
config = {}
execfile("config.py", config)
#print(api.me().name)
_cpt=1
myfile="scrap.csv"
file=open(myfile,"ab")
fieldnames = ['candidate','placeName','place','date']
writer = csv.DictWriter(file, fieldnames=fieldnames)



class stdOutListener(StreamListener):
    print str(_cpt)
    _cpt=_cpt+1
    def on_status(self, status):
        if status.place!=None and status.place.country_code=="FR":
            if ["LR","LesRepublicains","Fillon","FF2017","fillon2017"] in status.text:
                writer.writerow({'candidate': 'fillon', 'placeName': status.place.name,'place':status.place.coordinates,'date':status.created_at})
        return True
    def on_error(self,status):
        print status
if __name__=='__main__':
    _cpt=1
    mystream=stdOutListener()
    auth=OAuthHandler(config["consumer_key"],config["consumer_secret"])
    auth.set_access_token(config["access_key"], config["access_secret"])
    stream=Stream(auth,mystream)
    stream.filter(track=["LR","LesRepublicains","Fillon","FF2017","fillon2017",#François Fillon
    "#deboutlafrance","#DLF","#DupontAignan","#DA2017",#Nicolas Dupont-Aignan
    "#NouvelleFrance", "#alliotMarie",#Michèle Alliot-Marie
    "#UPR", "#Asselineau2017", "#FA2017",#François Asselineau
    "#FN", "#AuNomDuPeuple", "#Marine2017","#lePen",#Marine Le Pen
    "#JC2017", "#Cheminade2017",#Jacques Cheminade
    "#lesquen2017", "#lesquen",#Henry de Lesquen
    "#Rama2017", "#LaFranceQuiOse",#Rama Yade
    "#bayrou", "#MoDem",#François Bayrou
    "#lassalle",#Jean Lassalle
    "#faudot2017", "#mrc",#Bastien Faudot
    "#macron", "#lafranceenmarche", "#macron2017",#Emmanuel Macron
    "#hamon", "#hamon", "#PS", "#PartiSocialiste",#Benoît Hamon
    "#jadot", "#EELV",#Yannick Jadot
    "#JLM2017", "#AvenirEnCommunn", "#Melenchon",#Jean-Luc Mélenchon
    "#lutteOuvriere", "#artaud",#Nathalie Artaud
    "#Poutou", "#npa",#	Philippe Poutou
    "#BonnesEvolutions2017", "#VoieCitoyenne","#ArchipelCitoyen"])#Charlotte Marchandise
