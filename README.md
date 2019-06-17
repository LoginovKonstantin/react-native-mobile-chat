### React-native socket.io

####Использование
1. Зайти на [rest-server](https://rest-server-mobile-chat.herokuapp.com/) или [socket-server](https://sockets-server-mobile-chat.herokuapp.com/)
2. Скачать .apk файл
3. Установить
4. Залогиниться с login: 'guest_user', password: 'guest_password'

####Разработка
1. Склонировать репозиторий
2. Установить [node.js](https://nodejs.org) и [expo](https://expo.io/)
3. Зайти в папку client-mobile-chat и выполнить `$ npm install`
4. Зайти в папку rest-server-mobile-chat и выполнить `$ npm install`
5. Зайти в папку socket-server-mobile-chat и выполнить `$ npm install`
6. В папке socket-server-mobile-chat выполнить `$ npm run start:dev`, для запуска сервера с сокетами.
7. В папке rest-server-mobile-chat выполнить npm run `$ npm run start:dev`, для запуска рест сервера.
8. В папке client-mobile-chat выполнить `$ npm run web`, для сборки и запуска клиента в веб браузере. 
9. Для сборки андроид клиента выполнить команду `$ expo build:android`

####Хостинг
- Клиент `https://expo.io/@konstantinloginov/client-mobile-chat`
- Рест сервер `https://rest-server-mobile-chat.herokuapp.com`
- Сервер с сокетами `https://sockets-server-mobile-chat.herokuapp.com/`