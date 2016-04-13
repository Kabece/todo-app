# todo-app

Generalnie wygląda to tak:

Ściągacie sobie node.js i mongodb - znajdziecie na necie, to są zwykłe instalatory .msi.

Otwieracie dwa terminale Node.js command prompt, w jednym z nich przechodzicie do folderu, w którym macie aplikację robicie tam:

npm install

To ściągnie info z pliku package.json i załaduje wszystkie paczki (to jest taki jakby maven dla noda :P).

Później robicie sobie w tym samym miejscu: mkdir data - to będzie folder na dane z DB

W drugiej konsoli lecicie do folderu gdzie zainstalowaliście MongoDB, katalog /bin i tam odpalacie:

mongod --dbpath <absolutna sciezka wyzej utworzonego folderu data>

To odpala bazę danych, powinniście zobaczyć informację, że czeka na połączenia na localhost:27017

Możecie sobie też w tym samym folderze odpalić za pomocą komendy: mongo taki terminal bazodanowy, potem wpiszcie: use nodedb

Dzięki temu po dodaniu jakichś todosów będziecie mogli wyświetlić dane i sprawdzić że wszystko się zgadza, do tego używacie komendy:

db.todos.find().pretty()

No to skoro już wszystko ustawione to wracamy do konsoli, w które dawaliśmy to npm install i wpisujemy:

node server.js

Jeżeli wszystko poszło ok to na localhost:8080 powinniście już mieć najbardziej podstawową wersję apki.

Co wypadałoby zrobić:

- jakąś autentyfikację użytkownika,
- połączyć ten REST który teraz jest używany przez angulara z androidem,
- osobne bazy dla osobnych użytkowników?


Generalnie można jeszcze sporo ulepszyć, ale jakiś tam start to jest - jeżeli android by działał to może nie będzie tragedii ;)
