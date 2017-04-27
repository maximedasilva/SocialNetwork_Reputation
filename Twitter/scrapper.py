#!/usr/local/bin/python
# -*-coding:Latin-1 -*
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import csv
import sys

# -*-coding:Latin-1 -*
config = {}
execfile("config.py", config)#on recupere les credentials
_cpt=1
myfile="scrap.csv"
file=open(myfile,"ab")#on prépare le fichier pour l'écriture
fieldnames = ['candidate','placeName','date']#on affecte les nom de colonne
writer = csv.DictWriter(file, fieldnames=fieldnames)
#Affectation des mots clés pour chaque candidats
fillon=["#LR","#LESREPUBLICAINS","#FILLON","#FF2017","#FILLON2017","FILLON"]
dupontaignan=["#DEBOUTLAFRANCE","#DLF","#DUPONTAIGNAN","#DA2017","DUPONTAIGNAN"]
asselineau=["#UPR", "#ASSELINEAU2017", "#FA2017","ASSELINEAU"]
lepen=["#FN", "#AUNOMDUPEUPLE", "#MARINE2017","#LEPEN","LE PEN"]
cheminade=["#JC2017", "#CHEMINADE2017","CHEMINADE"]
lassalle=["#LASSALLE","LASSALLE"]
macron=["#MACRON", "#LAFRANCEENMARCHE", "#MACRON2017","MACRON"]
hamon=["#HAMON", "#HAMON", "#PS", "#PARTISOCIALISTE","HAMON"]
melenchon=["#JLM2017", "#AVENIRENCOMMUNN", "#MELENCHON","MELENCHON","MÉLENCHON".decode("utf-8")]
arthaud=["#LUTTEOUVRIERE", "#ARTHAUD","ARTHAUD"]
poutou=["#POUTOU", "#NPA","POUTOU"]



class stdOutListener(StreamListener):#on lance le listener
    print str(_cpt)
    _cpt=_cpt+1
    def on_status(self, status):
        if status.place!=None and status.place.country_code=="FR":#si on est en france
            print status.place.name.encode('utf8')

            fillon_match = [True for match in fillon if match in status.text.upper()]
            dupontAignan_match = [True for match in dupontaignan if match in status.text.upper()]
            asselineau_match = [True for match in asselineau if match in status.text.upper()]
            lepen_match = [True for match in lepen if match in status.text.upper()]
            cheminade_match = [True for match in cheminade if match in status.text.upper()]
            lassalle_match = [True for match in lassalle if match in status.text.upper()]
            macron_match = [True for match in macron if match in status.text.upper()]
            hamon_match = [True for match in hamon if match in status.text.upper()]
            melenchon_match = [True for match in melenchon if match in status.text.upper()]
            arthaud_match = [True for match in arthaud if match in status.text.upper()]
            poutou_match = [True for match in poutou if match in status.text.upper()]

#on écrit les lifnes pour chaque candidat
            if True in fillon_match:
                writer.writerow({'candidate': 'fillon', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in dupontAignan_match:
                writer.writerow({'candidate': 'dupontAignan', 'placeName': status.place.name.encode('utf8') ,'date':status.created_at})
            if True in lepen_match:
                writer.writerow({'candidate': 'lepen', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in asselineau_match:
                writer.writerow({'candidate': 'Asselineau', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in cheminade_match:
                writer.writerow({'candidate': 'Cheminade', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in lassalle_match:
                writer.writerow({'candidate': 'Lassalle', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in macron_match:
                writer.writerow({'candidate': 'Macron', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in hamon_match:
                writer.writerow({'candidate': 'Hamon', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in melenchon_match:
                writer.writerow({'candidate': 'Melenchon', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in arthaud_match:
                writer.writerow({'candidate': 'arthaud', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            if True in poutou_match:
                writer.writerow({'candidate': 'Poutou', 'placeName': status.place.name.encode('utf8'),'date':status.created_at})
            print status.place.id+' '+status.place.name
            return True
    def on_error(self,status):
        print status
if __name__=='__main__':
    _cpt=1
    mystream=stdOutListener()#on affecte le listener
    auth=OAuthHandler(config["consumer_key"],config["consumer_secret"])#on lui affecte les credentials
    auth.set_access_token(config["access_key"], config["access_secret"])
    stream=Stream(auth,mystream)#on crée le stream
    stream.filter(track=#on affecte les filtres
fillon+
dupontaignan+
asselineau+
lepen+
cheminade+
lassalle+
macron+
hamon+
melenchon+
arthaud+
poutou)
