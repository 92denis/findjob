import * as dataStorage from "./dataStorage.js";

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
    let id = `company${index}`;
    let html =
        `<div class="card" id="${id}" data-company-url ="${company.DevByUrl}">                        
         <div class="card-header">${company.Title}</div>
         <div class="card-block">
             <h4 class="card-title">${company.Name}</h4>
             <p class="card-text">Направления: ${company.Tags} </p>
             <p class="card-text">Email: <a href="${company.Email}">${company.Email.substring(7)}</a></p>
             <p class="card-text">Телефон: ${company.Phone} </p>
             <p class="card-text">Сайт: <a href="${company.Url} ">${company.Url}</a></p>
             <p class="card-text">Ссылка dev.by: <a href="${company.DevByUrl}">${company.DevByUrl}</a></p>
             <p class="card-text">Адрес: ${company.Offices}</p>
             <label> Заметка:<p class="card-text">${company.Note} </p></label>
              <textarea class="form-control" rows="3" id="comment"></textarea> 
              <button style="margin: 10px 0px;" class="add col-lg-2 col-md-12 col-sm-12 btn btn-secondary" type="button">Добавить заметку</button>
              <button style="margin: 10px 0px;" class="edit col-lg-3 col-md-12 col-sm-12 btn btn-secondary" type="button">Редактировать</button>
             <button style="margin: 10px 0px; display: none" class="save col-lg-3 col-md-12 col-sm-12 btn btn-secondary"  type="button">Сохранить</button>
             <button class="btn btn-primary hide">Скрыть</button>
         </div>
     </div>`;

    let newElement = document.createElement('div');
    newElement.innerHTML = html;

    div.append(newElement);
    if (company.Note === " ") {
        $(newElement).find('.edit').css({ 'display': 'none' });
        $(newElement).find('.save').css({ 'display': 'none' });
    }
}

function showCompanies() {
    let div = $('#result');
    div.html(" ");
    showMoreCompanies();
}

function hiddenCompany(elem) {
    let card = elem.currentTarget.parentNode.parentNode;
    let attributeCards = $(card).attr("data-company-url");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Hidden = true;
    dataStorage.updateCompany(сompany);
    showCompanies();
}


function updateSelect() {
    let tagsFromCompanies = getTagsFromCompanies();
    for (let i = 0; i < tagsFromCompanies.length; i++) {
        let options = selectTags.appendChild(document.createElement('option'));
        if (i === 0) { options.innerHTML = tagsFromCompanies[i].name; }
        else {
            options.innerHTML = `${tagsFromCompanies[i].name}  (${tagsFromCompanies[i].count})`;
            options.value = tagsFromCompanies[i].name;
        }
    }
}

function addNoteAboutCompany(elem) {
    let card = elem.currentTarget.parentNode.parentNode;
    let newNote = card.childNodes[3].childNodes[17];
    let attributeCards = $(card).attr("data-company-url");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note += newNote.value;
    newNote.value = " ";
    dataStorage.updateCompany(сompany);
    showCompanies();
}

function editNoteAboutCompany(elem) {
    let card = elem.currentTarget.parentNode.parentNode;
    let newNote = card.childNodes[3].childNodes[17];
    let attributeCards = $(card).attr("data-company-url");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    newNote.value = сompany.Note;
    card.childNodes[3].childNodes[21].style.display = 'none';
    card.childNodes[3].childNodes[23].style.display = 'inline-block';

}
function saveNoteAboutCompany(elem) {
    let card = elem.currentTarget.parentNode.parentNode;
    let newNote = card.childNodes[3].childNodes[17];
    let attributeCards = $(card).attr("data-company-url");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note = newNote.value;
    card.childNodes[3].childNodes[21].style.display = 'inline-block';
    card.childNodes[3].childNodes[23].style.display = 'none';

    dataStorage.updateCompany(сompany);
    showCompanies();
}

function getTagsFromCompanies() {
    let getTagsCompanies = getTags(dataStorage.getCompanies());
    let myArray = createArrayTags();
    let arrayObjectTags = [];

    for (let i = 0; i < myArray.length; i++) {
        let count = 0;
        let tags = {};
        for (let j = 0; j < getTagsCompanies.length; j++) {
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
    let tags = getTags(dataStorage.getCompanies());
    let myArray = new Set(tags);// создание массива эксклюзивных значений направлений
    myArray = Array.from(myArray);
    myArray.sort();
    return myArray;
}

function getTags(companies) {
    let tags = [];
    companies.forEach((company) => {
        for (let i = 0; i < company.Tags.length; i++) {
            tags.push(company.Tags[i]);
        }
    });
    return tags;
}

function showHiddenCompanies() {
    let companies = dataStorage.getCompanies();

    let filteredCompanies = companies.filter((company) => {
        //searchByParam();

        if (company.Hidden) {
            // hidden company
            return true;
        }
        return false;
    });

    filteredCompanies.forEach((company, index) => {
        let div = $("#hiddenCompanies");
        createNewElement(company, index, div);
    });
}

function showMoreCompanies() {
    let companies = [];
    let allCompanies = dataStorage.getCompanies();
    let filteredCompanies = filtredCompanies(allCompanies);
    let n = filteredCompanies.length >= 50 ? 50 : filteredCompanies.length;
    // let showCompaniesButton = document.getElementById("show");
    for (let i = 0; i < n; i++) {
        companies.push(filteredCompanies[i]);
    }
    companies.forEach((company, index) => {
        let div = $('#result');
        createNewElement(company, index, div);
    });
    // showCompaniesButton.innerText = `${n} из ${filteredCompanies.length},показать еще...`;


    let countCompanies = $("#count");
    countCompanies.html(`Найдено компаний: ${filteredCompanies.length}  из  ${allCompanies.length}`);
}

function filtredCompanies(companies) {
    let filteredCompanies = companies.filter((company) => {
        if (company.Hidden === true) {
            // hidden company
            return false;
        }

        let searchStringName = $("#searchByName").val();
        let searchStringTags = $("#selectTags").val();

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