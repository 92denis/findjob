function getCompanies() {
    var allCompanies = JSON.parse(localStorage.getItem('companies'));

    if (allCompanies === null || allCompanies === undefined) {
        allCompanies = getInitialCompnaies();

        for (var i = 0; i < allCompanies.length; i++) {
            for (var j = 0; j < allCompanies[i].Tags.length; j++) {
                allCompanies[i].Tags[j] = allCompanies[i].Tags[j].trim();
                allCompanies[i].Note = " ";
            }
        }
    }
    return allCompanies;
}

function getCompanyByDevUrl(id) {
    var companies = getCompanies();
    for (var i = 0; i < companies.length; i++) {
        if (id === companies[i].DevByUrl) {
            return companies[i];
        }
    }
}

function updateCompany(сompany) {
    var companies = getCompanies();
    for (var i = 0; i < companies.length; i++) {
        if (companies[i].DevByUrl === сompany.DevByUrl) {
            companies.splice(i, 1, сompany);
            break;
        }
    }
    localStorage.setItem('companies', JSON.stringify(companies));
}

function getInitialCompnaies() {
    allCompanies = [{
        "Title": "*instinctools",
        "Name": "ООО &quot;Инстинктулс&quot;",
        "Tags": [
            "Веб-разработка",
            " ИТ-аутсорсинг",
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
    }, 
    {
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
    },
    {
        "Title": "12devs",
        "Name": "ООО &quot;Девкрафт&quot;",
        "Tags": [
            "ИТ-аутсорсинг",
            "Веб-разработка",
            "Разработка и внедрение ERP-систем"
        ],
        "Email": "mailto:jobs@12devs.com",
        "Phone": "+375 (44) 531-45-05",
        "Url": "http://www.12devs.com/",
        "DevByUrl": "https://companies.dev.by/12devs",
        "Year": 0,
        "Employees": 0,
        "TechnicalEmployees": 0,
        "BelarussianEmployees": 0,
        "Offices": [
            "ул. Врублевского, д.5а, "
        ]
    },
    {
        "Title": "3Seven Studio",
        "Name": "3Seven Studio",
        "Tags": [
            "Веб-разработка",
            "Рекламные услуги"
        ],
        "Email": "mailto:3seven@tut.by",
        "Phone": "+375 29 218 78 04",
        "Url": "http://3seven.by",
        "DevByUrl": "https://companies.dev.by/3seven-studio",
        "Year": 0,
        "Employees": 0,
        "TechnicalEmployees": 0,
        "BelarussianEmployees": 0,
        "Offices": [
            "Пр. Независимости 131"
        ]
    },
    {
        "Title": "4D (Четыре Д)",
        "Name": "ОДО &quot;Четыре Д&quot;",
        "Tags": [
            "ИТ-аутсорсинг",
            "Веб-разработка",
            "Прочие ИТ-услуги"
        ],
        "Email": "mailto:office@4d.by",
        "Phone": " +375 (29) 189-58-88",
        "Url": "http://www.4d.by",
        "DevByUrl": "https://companies.dev.by/4d-chetyre-d",
        "Year": 0,
        "Employees": 0,
        "TechnicalEmployees": 0,
        "BelarussianEmployees": 0,
        "Offices": [
            "ул. 17 Сентября, д. 49, к. 310"
        ]
    },
    {
        "Title": "5media",
        "Name": "ООО &quot;Файфмедиа&quot;",
        "Tags": [
            "Веб-разработка",
            "Белорусский рынок",
            "Рекламные услуги",
            "ИТ-консалтинг"
        ],
        "Email": "mailto:info@5media.by",
        "Phone": "+375(29)637-55-37",
        "Url": "http://5media.by",
        "DevByUrl": "https://companies.dev.by/5media",
        "Year": 0,
        "Employees": 0,
        "TechnicalEmployees": 0,
        "BelarussianEmployees": 0,
        "Offices": [
            "Некрасова 28"
        ]
    }];
    return allCompanies;

}
