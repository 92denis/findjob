'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCompanies = getCompanies;
exports.getCompanyByDevUrl = getCompanyByDevUrl;
exports.updateCompany = updateCompany;
exports.getInitialCompnaies = getInitialCompnaies;
exports.showMoreCompanies = showMoreCompanies;
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
        ajaxGet("companies.json", callback);
    } else {
        callback();
    }
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
            var companiesJson = JSON.parse(xhr.responseText);
            var allCompanies = deleteWhiteSpacesFromTags(companiesJson);
            var companies = showCompanies(allCompanies);
            localStorage.setItem('companies', JSON.stringify(companies));
            // document.getElementById("show").onclick = showMoreCompanies(allCompanies);
        }
        callback();
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

function showCompanies(company) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    var companies = [];
    for (var i = companies.length; i < length; i++) {
        companies.push(company[i]);
    }
    return companies;
}

function showMoreCompanies(company) {
    var companies = getCompanies();
    var length = companies.length + 50;
    var allCompanies = showCompanies(company, length);
    localStorage.setItem('companies', JSON.stringify(allCompanies));
}