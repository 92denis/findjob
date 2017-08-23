console.log("myScript");
import * as dataStorage from "./dataStorage.js";

dataStorage.getInitialCompnaies(init);

function init() {
    document.getElementById("search").onclick = showCompanies;
    showCompanies();
    updateSelect();
    getTagsFromCompanies();
    showHiddenCompanies();
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
              <button style="margin: 10px 0px;" class="col-lg-2 col-md-12 col-sm-12 btn btn-secondary" type="button">Добавить заметку</button>
              <button style="margin: 10px 0px;" class="col-lg-3 col-md-12 col-sm-12 btn btn-secondary" type="button">Редактировать</button>
             <button style="margin: 10px 0px; display: none" class="col-lg-3 col-md-12 col-sm-12 btn btn-secondary" type="button">Сохранить</button>
             <button class="btn btn-primary" >Скрыть</button>
         </div>
     </div>`;

    let newElement = document.createElement('div');
    newElement.innerHTML = html;

    let doc = div.appendChild(newElement);
    doc.getElementsByClassName('btn')[2].onclick = saveNoteAboutCompany;
    doc.getElementsByClassName('btn')[0].onclick = addNoteAboutCompany;
    doc.getElementsByClassName('btn')[1].onclick = editNoteAboutCompany;
    doc.getElementsByClassName('btn-primary')[0].onclick = hiddenCompany;
    if (company.Note === " ") {
        doc.getElementsByClassName('btn')[1].style.display = 'none';
        doc.getElementsByClassName('btn')[2].style.display = 'none';
    }
}

function showCompanies() {
    let div = document.getElementById('result');
    div.innerHTML = "";
    let companies = dataStorage.getCompanies();
    let filteredCompanies = companies.filter((company) => {

        if (company.Hidden === true) {
            // hidden company
            return false;
        }

        let searchStringName = document.getElementById("searchByName").value;
        let searchStringTags = document.getElementById("selectTags").value;

        if (searchStringName && company.Name.indexOf(searchStringName) === -1) {
            // name doesn't match
            return false;
        }
        if (searchStringTags && company.Tags.includes(searchStringTags) === false) {
            return false;

        }
        return true;
    });

    filteredCompanies.forEach((company, index) => {
        let div = document.getElementById('result');
        createNewElement(company, index, div);
    });
    let countCompanies = document.getElementById("count");
    countCompanies.innerHTML = `Найдено компаний: ${filteredCompanies.length}  из  ${companies.length}`;
}

function hiddenCompany(elem) {
    let card = elem.currentTarget.parentNode.parentNode;
    let attributeCards = card.getAttribute("data-company-url");
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
    let attributeCards = card.getAttribute("data-company-url");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note += newNote.value;
    newNote.value = " ";
    dataStorage.updateCompany(сompany);
    showCompanies();
}

function editNoteAboutCompany(elem) {
    let card = elem.currentTarget.parentNode.parentNode;
    let newNote = card.childNodes[3].childNodes[17];
    let attributeCards = card.getAttribute("data-company-url");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    newNote.value = сompany.Note;
    card.childNodes[3].childNodes[21].style.display = 'none';
    card.childNodes[3].childNodes[23].style.display = 'inline-block';

}
function saveNoteAboutCompany(elem) {
    let card = elem.currentTarget.parentNode.parentNode;
    let newNote = card.childNodes[3].childNodes[17];
    let attributeCards = card.getAttribute("data-company-url");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note = newNote.value;
    card.childNodes[3].childNodes[21].style.display = 'inline-block';
    card.childNodes[3].childNodes[23].style.display = 'none';
    dataStorage.updateCompany(сompany);
    showCompanies();
}

function getTagsFromCompanies() {
    let getTagsCompanies = removeWhiteSpacesFromTags(dataStorage.getCompanies());
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
    let tags = removeWhiteSpacesFromTags(dataStorage.getCompanies());
    let myArray = new Set(tags);// создание массива эксклюзивных значений направлений
    myArray = Array.from(myArray);
    myArray.sort();
    return myArray;
}

function removeWhiteSpacesFromTags(companies) {
    let tags = [];
    companies.forEach((company) => {
        for (let i = 0; i < company.Tags.length; i++) {
            company.Tags[i] = company.Tags[i].trim();
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
        let div = document.getElementById("hiddenCompanies");
        createNewElement(company, index, div);
    });
}
