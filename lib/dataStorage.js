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
    var ajaxCallback = function ajaxCallback(data) {
        var allCompanies = deleteWhiteSpacesFromTags(data);
        localStorage.setItem('companies', JSON.stringify(allCompanies));
        callback();
    };

    var allCompanies = getCompanies();

    if (allCompanies === null || allCompanies === undefined) {
        $.get("companies.json", ajaxCallback);
    } else {
        callback();
    }
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