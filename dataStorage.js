
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
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'companies.json', true);
        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                var companies = JSON.parse(xhr.responseText);
                allCompanies = companies;


                for (var i = allCompanies.length; i--;) {
                    for (var j = allCompanies[i].Tags.length; j--;) {
                        allCompanies[i].Tags[j] = allCompanies[i].Tags[j].trim();
                        allCompanies[i].Note = " ";
                    }
                }
                localStorage.setItem('companies', JSON.stringify(allCompanies));
            }
            callback();
        };
        xhr.send(); // (1)
    } else {
        callback();
    }
}
