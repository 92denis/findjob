function getCompanies() {
    var allCompanies = JSON.parse(localStorage.getItem('companies'));
    if (allCompanies == null || allCompanies == undefined) {
        allCompanies = [{
            "Title": "*instinctools",
            "Name": "ООО &quot;Инстинктулс&quot;",
            "Tags": [
                "ИТ-аутсорсинг",
                " Веб-разработка",
                " Разработка ПО на заказ",
                " Собственные продукты",
                " Мобильная разработка",
                " ИТ-консалтинг"
            ],
            "Email": "mailto:resume@instinctools.ru",
            "Phone": "+375 152 68 03 03",
            "Url": "http://www.instinctools.by",
            "DevByUrl": "https://companies.dev.by/instinctools",
            "Year": 0,
            "Employees": 0,
            "TechnicalEmployees": 0,
            "BelarussianEmployees": 0,
            "Offices": [
                "Гродно, Лермонтова 29/2",
                "Минск, Амураторская, 4"
            ]
        }, {
            "Title": "//CODEMASTER",
            "Name": "ООО &quot;Кодемастер&quot;",
            "Tags": [
                "ИТ-аутсорсинг",
                " Разработка ПО на заказ",
                " Веб-разработка",
                " Собственные продукты",
                " Мобильная разработка",
                " Тестирование"
            ],
            "Email": "mailto:info@codemaster.by",
            "Phone": "+375297012296",
            "Url": "http://codemaster.by/",
            "DevByUrl": "https://companies.dev.by/codemaster",
            "Year": 0,
            "Employees": 0,
            "TechnicalEmployees": 0,
            "BelarussianEmployees": 0,
            "Offices": [
                "ул. Лещинского 55, офис 7Н"
            ]
        }];
        return allCompanies;
    }
}