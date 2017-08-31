"use strict";

var _dataStorage = require("./dataStorage.js");

var dataStorage = _interopRequireWildcard(_dataStorage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

dataStorage.getInitialCompnaies(init);

function init() {
    showCompanies();
    updateSelect();
    getTagsFromCompanies();
    showHiddenCompanies();

    $("#search").on('click', showCompanies);
    $('#home').on('click', '.save', saveNoteAboutCompany);
    $('#home').on('click', '.add', addNoteAboutCompany);
    $('#home').on('click', '.edit', editNoteAboutCompany);
    $('#home').on('click', '.hide', hiddenCompany);
}

function createNewElement(company, index, div) {
    var id = "company" + index;
    var html = "<div class=\"card\" id=\"" + id + "\" data-company-url =\"" + company.DevByUrl + "\">                        \n         <div class=\"card-header\">" + company.Title + "</div>\n         <div class=\"card-block\">\n             <h4 class=\"card-title\">" + company.Name + "</h4>\n             <p class=\"card-text\">\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F: " + company.Tags + " </p>\n             <p class=\"card-text\">Email: <a href=\"" + company.Email + "\">" + company.Email.substring(7) + "</a></p>\n             <p class=\"card-text\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D: " + company.Phone + " </p>\n             <p class=\"card-text\">\u0421\u0430\u0439\u0442: <a href=\"" + company.Url + " \">" + company.Url + "</a></p>\n             <p class=\"card-text\">\u0421\u0441\u044B\u043B\u043A\u0430 dev.by: <a href=\"" + company.DevByUrl + "\">" + company.DevByUrl + "</a></p>\n             <p class=\"card-text\">\u0410\u0434\u0440\u0435\u0441: " + company.Offices + "</p>\n             <label> \u0417\u0430\u043C\u0435\u0442\u043A\u0430:<p class=\"card-text\">" + company.Note + " </p></label>\n              <textarea class=\"form-control\" rows=\"3\" id=\"comment\"></textarea> \n              <button style=\"margin: 10px 0px;\" class=\"add col-lg-2 col-md-12 col-sm-12 btn btn-secondary\" type=\"button\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443</button>\n              <button style=\"margin: 10px 0px;\" class=\"edit col-lg-3 col-md-12 col-sm-12 btn btn-secondary\" type=\"button\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n             <button style=\"margin: 10px 0px; display: none\" class=\"save col-lg-3 col-md-12 col-sm-12 btn btn-secondary\"  type=\"button\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n             <button class=\"btn btn-primary hide\">\u0421\u043A\u0440\u044B\u0442\u044C</button>\n         </div>\n     </div>";

    var newElement = document.createElement('div');
    newElement.innerHTML = html;

    div.append(newElement);
    if (company.Note === " ") {
        $(newElement).find('.edit').css({ 'display': 'none' });
        $(newElement).find('.save').css({ 'display': 'none' });
    }
}

function showCompanies() {
    var div = $('#result');
    div.html(" ");
    showMoreCompanies();
}

function hiddenCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var attributeCards = $(card).attr("data-company-url");
    var сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Hidden = true;
    dataStorage.updateCompany(сompany);
    showCompanies();
}

function updateSelect() {
    var tagsFromCompanies = getTagsFromCompanies();
    for (var i = 0; i < tagsFromCompanies.length; i++) {
        var options = selectTags.appendChild(document.createElement('option'));
        if (i === 0) {
            options.innerHTML = tagsFromCompanies[i].name;
        } else {
            options.innerHTML = tagsFromCompanies[i].name + "  (" + tagsFromCompanies[i].count + ")";
            options.value = tagsFromCompanies[i].name;
        }
    }
}

function addNoteAboutCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var newNote = card.childNodes[3].childNodes[17];
    var attributeCards = $(card).attr("data-company-url");
    var сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note += newNote.value;
    newNote.value = " ";
    dataStorage.updateCompany(сompany);
    showCompanies();
}

function editNoteAboutCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var newNote = card.childNodes[3].childNodes[17];
    var attributeCards = $(card).attr("data-company-url");
    var сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    newNote.value = сompany.Note;
    card.childNodes[3].childNodes[21].style.display = 'none';
    card.childNodes[3].childNodes[23].style.display = 'inline-block';
}
function saveNoteAboutCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var newNote = card.childNodes[3].childNodes[17];
    var attributeCards = $(card).attr("data-company-url");
    var сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note = newNote.value;
    card.childNodes[3].childNodes[21].style.display = 'inline-block';
    card.childNodes[3].childNodes[23].style.display = 'none';

    dataStorage.updateCompany(сompany);
    showCompanies();
}

function getTagsFromCompanies() {
    var getTagsCompanies = getTags(dataStorage.getCompanies());
    var myArray = createArrayTags();
    var arrayObjectTags = [];

    for (var i = 0; i < myArray.length; i++) {
        var count = 0;
        var tags = {};
        for (var j = 0; j < getTagsCompanies.length; j++) {
            if (myArray[i] === getTagsCompanies[j]) {
                count++;
            }
            tags.name = myArray[i];
            tags.count = count;
        }
        arrayObjectTags[i] = tags;
    }
    return arrayObjectTags;
}

function createArrayTags() {
    var tags = getTags(dataStorage.getCompanies());
    var myArray = new Set(tags); // создание массива эксклюзивных значений направлений
    myArray = Array.from(myArray);
    myArray.sort();
    return myArray;
}

function getTags(companies) {
    var tags = [];
    companies.forEach(function (company) {
        for (var i = 0; i < company.Tags.length; i++) {
            tags.push(company.Tags[i]);
        }
    });
    return tags;
}

function showHiddenCompanies() {
    var companies = dataStorage.getCompanies();

    var filteredCompanies = companies.filter(function (company) {
        //searchByParam();

        if (company.Hidden) {
            // hidden company
            return true;
        }
        return false;
    });

    filteredCompanies.forEach(function (company, index) {
        var div = $("#hiddenCompanies");
        createNewElement(company, index, div);
    });
}

function showMoreCompanies() {
    var companies = [];
    var allCompanies = dataStorage.getCompanies();
    var filteredCompanies = filtredCompanies(allCompanies);
    var n = filteredCompanies.length >= 50 ? 50 : filteredCompanies.length;
    // let showCompaniesButton = document.getElementById("show");
    for (var i = 0; i < n; i++) {
        companies.push(filteredCompanies[i]);
    }
    companies.forEach(function (company, index) {
        var div = $('#result');
        createNewElement(company, index, div);
    });
    // showCompaniesButton.innerText = `${n} из ${filteredCompanies.length},показать еще...`;


    var countCompanies = $("#count");
    countCompanies.html("\u041D\u0430\u0439\u0434\u0435\u043D\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439: " + filteredCompanies.length + "  \u0438\u0437  " + allCompanies.length);
}

function filtredCompanies(companies) {
    var filteredCompanies = companies.filter(function (company) {
        if (company.Hidden === true) {
            // hidden company
            return false;
        }

        var searchStringName = $("#searchByName").val();
        var searchStringTags = $("#selectTags").val();

        if (searchStringName && company.Name.indexOf(searchStringName) === -1) {
            // name doesn't match
            return false;
        }
        if (searchStringTags && company.Tags.includes(searchStringTags) === false) {
            return false;
        }
        return true;
    });
    return filteredCompanies;
}