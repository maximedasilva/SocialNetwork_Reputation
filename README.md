# SocialNetwork_Reputation

Outil permettant de connaître qui est le politique le plus populaire sur twitter et Google.

Projet informatique de 2ème année à l'ENSC, en collaboration avec Quorum.
Le but du projet est de créer un outil qui analyse les tweets et les recherches google pour connaître quel homme politique est le plus populaire sur internet.

Réalisation d'une carte interactive de la France avec les données récupérées sur twitter et google trends, ainsi que plusieurs graphiques pour comprendre les élections.

Ce projet prend en compte toutes les candidatures à l'élection présidentielle de 2017 selon des mots clés spécifiques (pour twitter).

|Mouvance politique     | Parti politique/mouvement        | Candidat              | Mots clés |
|:---------------------:|:--------------------------------:|:---------------------:|-----------|
|Droite & extrême droite|                                  |                       |                                                           |
|                       | Les républicains                 | François Fillon       |    `#LR, #lesrepublicains, #Fillon, #FF2017, #fillon2017` |
|                       |        Debout la france          | Nicolas Dupont-Aignan |    `#deboutlafrance,#DLF #DupontAignan, #DA2017 `         |
|                       |     Une nouvelle france          | Michèle Alliot-Marie  |    `#NouvelleFrance, #alliotMarie`                        |
|                       |   Union populaire républicaine   | François Asselineau   |    `#UPR, #Asselineau2017, #FA2017`                       |
|                       |         Front National           | Marine Le Pen         |    `#FN, #AuNomDuPeuple, #Marine2017,#lePen`              |
|                       |       Solidarité et progrès      | Jacques Cheminade     |    `#JC2017, #Cheminade2017`                              |
|                       |     Parti national libéral       | Henry de Lesquen      |    `#lesquen2017, #lesquen`                               |
|                       |         la france qui ose        | Rama Yade             |    `#Rama2017, #LaFranceQuiOse`                           |
|Centre                 |                                  |                       |                                                           |
|                       |              MoDem               | François Bayrou       |    `#bayrou, #MoDem`                                      |
|                       |           Indépendant            | Jean Lassalle         |    `#lassalle`                                            |
|Gauche & extrême gauche|                                  |                       |                                                           |
|                       | Mouvement républicain et citoyen | Bastien Faudot        |    `#faudot2017, #mrc`                                    |
|                       | En Marche                        | Emmanuel Macron       |    `#macron, #lafranceenmarche, #macron2017`              |
|                       | Parti Socialiste                 | Benoît Hamon          |    `#hamon, #hamon, #PS, #PartiSocialiste`                |
|                       | Europe écologie les verts        | Yannick Jadot         |    `#jadot, #EELV`                                        |
|                       | Le Parti de gauche               | Jean-Luc Mélenchon    |    `#JLM2017, #AvenirEnCommunn, #Melenchon`               |
|                       | Lutte Ouvrière                   | Nathalie Artaud       |    `#lutteOuvriere, #artaud`                              |
|                       | Nouveau parti Anticapitaliste    | Philippe Poutou       |    `#Poutou, #npa`                                        |
|Inclassable            |                                  |                       |                                                           |
|                       |                                  |  Charlotte marchandise |`"#BONNESEVOLUTIONS2017", "#VOIECITOYENNE","#ARCHIPELCITOYEN"`|

### Mise a jour des candidats du 17 mars après la déposition officielle des candidatures
 ```diff

 - Charlotte marchandise
 - michèle Alliot-Marie
 - Henry De Lesquen
 - Rama Yade
 - François Bayrou
 - Bastien Faudot
 - Yannick Jadot
 + François Fillon
 + Nicolas Dupont-Aignan
 + François Asselineau
 + Marine Le Pen
 + Jacques Cheminade
 + Jean Lassalle
 + Emmanuel Macron
 + Benoît Hamon
 + Jean-Luc Mélenchon
 + Nathalie Artaud
 + Philippe Poutou


 ```



## Installation

Pour installer l'application il suffit de cloner le repo `git clone https://github.com/maximedasilva/SocialNetwork_Reputation.git`.
Attention aux dépendances (cf partie dépendance du readme).

## Usage
Lancer la recherche par le fichier scrapper.py
Un exemple du fichier généré par une recherche est diponible sur `Twitter/scrap.csv`.

Pour la représentation graphique, installez node.js et lancez le sur `geodata/`



## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Dépendances
Pour que l'application fonctionne correctement, il faut installer plusieurs fonctionnalités:

1. [API Tweepy pour Python](https://github.com/tweepy/tweepy) (pip install tweepy) La documentation complète est accessible sur [ce site](http://tweepy.readthedocs.io/en/v3.5.0/) .

2. NodeJS et toutes les dépendaces suivante :

 * [Turfjs](http://turfjs.org/)
 * [Express](http://expressjs.com/fr/)
 * [pug](https://pugjs.org/api/getting-started.html)
 * [fast-csv](http://c2fo.io/fast-csv/)
 * [fs](https://nodejs.org/api/fs.html)
 * [node-json-db](https://www.npmjs.com/package/node-json-db)


3. Remerciement spécial à [data.gouv.fr](https://www.data.gouv.fr/) pour la liste des communes françaises.


## Credits
Projet informatique de deuxième année à l'ENSC par [maxime Da Silva](https://github.com/maximedasilva) en collaboration avec [Quorum](https://www.quorum-impact.com/)
