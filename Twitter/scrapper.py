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
_cpt=1
myfile="scrap.csv"
file=open(myfile,"ab")
fieldnames = ['candidate','placeName','place','date']
writer = csv.DictWriter(file, fieldnames=fieldnames)

fillon=["#LR","#LESREPUBLICAINS","#FILLON","#FF2017","#FILLON2017","FILLON"]
dupontaignan=["#DEBOUTLAFRANCE","#DLF","#DUPONTAIGNAN","#DA2017","DUPONTAIGNAN"]
alliotMarie=["#NOUVELLEFRANCE", "#ALLIOTMARIE","ALLIOTMARIE"]
asselineau=["#UPR", "#ASSELINEAU2017", "#FA2017","ASSELINEAU"]
lepen=["#FN", "#AUNOMDUPEUPLE", "#MARINE2017","#LEPEN","LE PEN"]
cheminade=["#JC2017", "#CHEMINADE2017","CHEMINADE"]
lesquen=["#LESQUEN2017", "#LESQUEN","DE LESQUEN"]
yade=["#RAMA2017", "#LAFRANCEQUIOSE","YADE"]
bayrou=["#BAYROU", "#MODEM","BAYROU"]
lassalle=["#LASSALLE","LASSALLE"]
faudot=["#FAUDOT2017", "#MRC","FAUDOT"]
macron=["#MACRON", "#LAFRANCEENMARCHE", "#MACRON2017","MACRON"]
hamon=["#HAMON", "#HAMON", "#PS", "#PARTISOCIALISTE","HAMON"]
jadot=["#JADOT", "#EELV","JADOT"]
melenchon=["#JLM2017", "#AVENIRENCOMMUNN", "#MELENCHON","MELENCHON","MÉLENCHON".decode("utf-8")]
artaud=["#LUTTEOUVRIERE", "#ARTAUD","ARTAUD"]
poutou=["#POUTOU", "#NPA","POUTOU"]
marchandise=["#BONNESEVOLUTIONS2017", "#VOIECITOYENNE","#ARCHIPELCITOYEN"]



class stdOutListener(StreamListener):
    print str(_cpt)
    _cpt=_cpt+1
    def on_status(self, status):
        if status.place!=None and status.place.country_code=="FR":


            fillon_match = [True for match in fillon if match in status.text.upper()]
            dupontAignan_match = [True for match in dupontaignan if match in status.text.upper()]
            alliotMarie_match = [True for match in alliotMarie if match in status.text.upper()]
            asselineau_match = [True for match in asselineau if match in status.text.upper()]
            lepen_match = [True for match in lepen if match in status.text.upper()]
            cheminade_match = [True for match in cheminade if match in status.text.upper()]
            lesquen_match = [True for match in lesquen if match in status.text.upper()]
            yade_match = [True for match in yade if match in status.text.upper()]
            bayrou_match = [True for match in bayrou if match in status.text.upper()]
            lassalle_match = [True for match in lassalle if match in status.text.upper()]
            faudot_match = [True for match in faudot if match in status.text.upper()]
            macron_match = [True for match in macron if match in status.text.upper()]
            hamon_match = [True for match in hamon if match in status.text.upper()]
            jadot_match = [True for match in jadot if match in status.text.upper()]
            melenchon_match = [True for match in melenchon if match in status.text.upper()]
            artaud_match = [True for match in artaud if match in status.text.upper()]
            poutou_match = [True for match in poutou if match in status.text.upper()]
            marchandise_match = [True for match in marchandise if match in status.text.upper()]



            if True in fillon_match:
                writer.writerow({'candidate': 'fillon', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in dupontAignan_match:
                writer.writerow({'candidate': 'dupontAignan', 'placeName': status.place.name.encode('utf8') ,'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in alliotMarie_match:
                writer.writerow({'candidate': 'Alliot-Marie', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in lepen_match:
                writer.writerow({'candidate': 'Le pen', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in asselineau_match:
                writer.writerow({'candidate': 'Asselineau', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in cheminade_match:
                writer.writerow({'candidate': 'Cheminade', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in lesquen_match:
                writer.writerow({'candidate': 'De Lesquen', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in yade_match:
                writer.writerow({'candidate': 'Yade', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in bayrou_match:
                writer.writerow({'candidate': 'Bayrou', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in lassalle_match:
                writer.writerow({'candidate': 'Lassalle', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in faudot_match:
                writer.writerow({'candidate': 'Faudot', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in macron_match:
                writer.writerow({'candidate': 'Macron', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in hamon_match:
                writer.writerow({'candidate': 'Hamon', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in jadot_match:
                writer.writerow({'candidate': 'Jadot', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in melenchon_match:
                writer.writerow({'candidate': 'Melenchon', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in artaud_match:
                writer.writerow({'candidate': 'Artaud', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in poutou_match:
                writer.writerow({'candidate': 'Poutou', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})
            if True in marchandise_match:
                writer.writerow({'candidate': 'Marchandise', 'placeName': status.place.name.encode('utf8'),'place': status.place.bounding_box.coordinates,'date':status.created_at})

            return True
    def on_error(self,status):
        print status
if __name__=='__main__':
    _cpt=1
    mystream=stdOutListener()
    auth=OAuthHandler(config["consumer_key"],config["consumer_secret"])
    auth.set_access_token(config["access_key"], config["access_secret"])
    stream=Stream(auth,mystream)
    stream.filter(track=["#LR","#LesRepublicains","#Fillon","#FF2017","#fillon2017","fillon",#François Fillon
    "#deboutlafrance","#DLF","#DupontAignan","#DA2017","Dupont-Aignan","DupontAignan",#Nicolas Dupont-Aignan
    "#NouvelleFrance", "#alliotMarie","Alliot marie",#Michèle Alliot-Marie
    "#UPR", "#Asselineau2017", "#FA2017","asselineau",#François Asselineau
    "#FN", "#AuNomDuPeuple", "#Marine2017","#lePen","le pen",#Marine Le Pen
    "#JC2017", "#Cheminade2017","cheminade",#Jacques Cheminade
    "#lesquen2017", "#lesquen","de lesquen",#Henry de Lesquen
    "#Rama2017", "#LaFranceQuiOse","Yade",#Rama Yade
    "#bayrou", "#MoDem","Bayrou",#François Bayrou
    "#lassalle","Lassalle",#Jean Lassalle
    "#faudot2017", "#mrc","Faudot",#Bastien Faudot
    "#macron", "#lafranceenmarche", "#macron2017","macron",#Emmanuel Macron
    "#hamon", "#hamon", "#PS", "#PartiSocialiste","Hamon",#Benoît Hamon
    "#jadot", "#EELV","jadot",#Yannick Jadot
    "#JLM2017", "#AvenirEnCommunn", "#Melenchon","melenchon","mélenchon".decode("utf-8"),#Jean-Luc Mélenchon
    "#lutteOuvriere", "#artaud","artaud",#Nathalie Artaud
    "#Poutou", "#npa","poutou",#	Philippe Poutou
    "#BonnesEvolutions2017", "#VoieCitoyenne","#ArchipelCitoyen"])#Charlotte Marchandise
