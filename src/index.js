/* для понимания:

http/1.1
запрос на страницу
запрос на стили
запрос на стили

*/

/* http/2

запрос на страницу
паралельный запрос на стили и скрипты

postman - запрос на бекенд без написания кода
SOAP API (более защищенная, тяжело парсится, базируется на формате XML, тяжело сформировать хттп-запрос)
REST API (максимально быстрая, передаёт данные в формате JSON, но не слишком большие и менее защищённая)

*/

/* 

ТИПЫ ЗАПРОСОВ

GET - ПОЛУЧЕНИЕ
POST - СОЗДАНИЕ
PUT/PATCH - ОБНОВЛЕНИЕ
DELETE - УДАЛЕНИЕ

*/

/* 

выбираем эндпоинт https://swapi.dev/api/films/ - (films - это эндпоинт (функция))
смотрим на request параметры (прийдут, как параметры функции) - формируется через ?
если больше 1 параметра, разделяем знаком &
*/

/* 

Кросс-доменные запросы - защита от посторонних запросов

есть домен ресурса: rozetka.com
вкладка network (отвечает за http-запросы)
вкладка Headers - referer: домен, с которого уходит запрос на бекенд
на бекенде есть массив с названиями сайтов, кому можна доверять
если сайта нет, будет CORS-ошибка (Request Header -> origin -> error)

POSTMAN - отдаст, но не факт, что будет работать через fetch.
*/
