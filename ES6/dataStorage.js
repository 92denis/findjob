export function getCompanies() {
    let allCompanies = JSON.parse(localStorage.getItem('companies'));
    return allCompanies;
}

export function getCompanyByDevUrl(id) {
    let companies = getCompanies();

    for (let i = 0; i < companies.length; i++) {
        if (id === companies[i].DevByUrl) {
            return companies[i];
        }
    }
}

export function updateCompany(сompany) {
    let companies = getCompanies();

    for (let i = 0; i < companies.length; i++) {
        if (companies[i].DevByUrl === сompany.DevByUrl) {
            companies.splice(i, 1, сompany);
            break;
        }
    }
    localStorage.setItem('companies', JSON.stringify(companies));
}

export function getInitialCompnaies(callback) {
    let ajaxCallback = function (data) {
        let allCompanies = deleteWhiteSpacesFromTags(data);
        localStorage.setItem('companies', JSON.stringify(allCompanies));
        callback();
    };

    let allCompanies = getCompanies();

    if (allCompanies === null || allCompanies === undefined) {
        $.get("companies.json", ajaxCallback);

    } else {
        callback();
    }
}

function deleteWhiteSpacesFromTags(allCompanies) {
    for (let i = allCompanies.length; i--;) {
        for (let j = allCompanies[i].Tags.length; j--;) {
            allCompanies[i].Tags[j] = allCompanies[i].Tags[j].trim();
            allCompanies[i].Note = " ";
        }
    }
    return allCompanies;
}
