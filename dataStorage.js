function getCompanies() {
    var allCompanies = JSON.parse(localStorage.getItem('companies'));

    if (allCompanies == null || allCompanies == undefined) {
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
        if (id == companies[i].DevByUrl) {
            return companies[i];
        }
    }
}

function updateCompany(сompany) {
    var companies = getCompanies();
    for (var i = 0; i < companies.length; i++) {
        if (companies[i].DevByUrl == сompany.DevByUrl) {
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
