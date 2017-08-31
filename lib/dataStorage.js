'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCompanies = getCompanies;
exports.getCompanyByDevUrl = getCompanyByDevUrl;
exports.updateCompany = updateCompany;
exports.getInitialCompnaies = getInitialCompnaies;
function getCompanies() {
    var allCompanies = JSON.parse(localStorage.getItem('companies'));
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
function getInitialCompnaies(callback) {
    var allCompanies = getCompanies();
    if (allCompanies === null || allCompanies === undefined) {
        ajaxGet("companies.json", ajaxCallback);
        callback();
    } else {
        callback();
    }
}

function ajaxCallback(data) {
    var companiesJson = JSON.parse(data);
    var allCompanies = deleteWhiteSpacesFromTags(companiesJson);
    localStorage.setItem('companies', JSON.stringify(allCompanies));
}

function ajaxGet(url, callback) {
    var xhr = new XMLHttpRequest();
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
    };
    xhr.send();
}

function deleteWhiteSpacesFromTags(allCompanies) {
    for (var i = allCompanies.length; i--;) {
        for (var j = allCompanies[i].Tags.length; j--;) {
            allCompanies[i].Tags[j] = allCompanies[i].Tags[j].trim();
            allCompanies[i].Note = " ";
        }
    }
    return allCompanies;
}