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
    let allCompanies = getCompanies();
    if (allCompanies === null || allCompanies === undefined) {
        ajaxGet("companies.json", ajaxCallback);
    } else {
        callback();
    }
}

function ajaxCallback(data) {
    let companiesJson = JSON.parse(data);
    let allCompanies = deleteWhiteSpacesFromTags(companiesJson);
    localStorage.setItem('companies', JSON.stringify(allCompanies));
}

function ajaxGet(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            callback(xhr.responseText);
        }
        callback();
    };
    xhr.send();
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
