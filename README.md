# Тестовое задание для sberseasons.
Фронт: React, Redux, redux-observable  
Бэк: Express, mongoose

# Запуск
## Сервер
Для работы сервера необходима база данных mongoDB, запущенная на стандартном порте (27017), и node.js.  
При первом запуске нужно из главной директории выполнить в консоли

```
    cd server
    npm install
```

После этого, для запуска сервера можно использовать: 
```
    npm run start
```

## Клиент
Для запуска клиентской части нужно выполнить из главной директории
```
    cd client
    npm install
```
Затем для dev - режима на localhost:8080:
```
    npm run dev
```
Для production(сервится на порте сервера, localhost:5000):
```
    npm run prod
```

# Работа с приложением
Для того, чтобы войти в приложение, необходимо создать пользователя.  
Для этой цели я сделал тестовый рут /api/auth/register.

```
method: POST
Content-Type: application/json
{
    "name": <имя>,
    "password": <пароль>
}
```

После создания пользователя можно полноценно пользоваться приложением.  

Приятной проверки :)