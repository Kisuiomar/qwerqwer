
# Task Management System

## Установка и запуск

### 1. Установите зависимости
```sh
npm install
npm install --prefix client
```

### 2. Запустите проект
```sh
npm run dev
```

### Структура проекта
- `index.js` — главный файл backend'а (Node.js, Express, MongoDB)
- `controllers/`, `models/`, `utils/` — логика работы с API
- `client/` — frontend (React.js)

### Переменные окружения (.env)
Создайте `.env` в корневой папке и укажите:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
Git
https://github.com/Kisuiomar/qwerqwer
Deploy
https://qwerqwer-xmsq.onrender.com
