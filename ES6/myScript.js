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
              <button style="margin: 10px 0px;" class="col-lg-2 col-md-12 col-sm-12 btn btn-secondary" id ="add" type="button">Добавить заметку</button>
              <button style="margin: 10px 0px;" class="col-lg-3 col-md-12 col-sm-12 btn btn-secondary" id="edit" type="button">Редактировать</button>
             <button style="margin: 10px 0px; display: none" class="col-lg-3 col-md-12 col-sm-12 btn btn-secondary" id = "save" type="button">Сохранить</button>
             <button class="btn btn-primary" id ="hide" >Скрыть</button>
         </div>
     </div>`;

    let newElement = document.createElement('div');
    newElement.innerHTML = html;
    div.appendChild(newElement);
    $('#save').onclick = saveNoteAboutCompany;
    $('#add').onclick = addNoteAboutCompany;
    $('#edit').onclick = editNoteAboutCompany;
    $('#hide').onclick = hiddenCompany;
    if (company.Note === " ") {
        $('#edit').style.display = 'none';
        $('#save').style.display = 'none';
    }
}

function showCompanies() {
    let div = document.getElementById('result');
    div.innerHTML = "";
    showMoreCompanies();
}

function hiddenCompany() {
    let attributeCards = $(".data-company-url", ".card");
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

function addNoteAboutCompany() {
    let newNote = $("#comment");
    let attributeCards = $(".data-company-url", ".card");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note += newNote.value;
    newNote.value = " ";
    dataStorage.updateCompany(сompany);
    showCompanies();
}

function editNoteAboutCompany() {
    let newNote = $("#comment");
    let attributeCards = $(".data-company-url", ".card");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    newNote.value = сompany.Note;
    $('#edit').style.display = 'none';
    $('#save').style.display = 'inline-block';

}
function saveNoteAboutCompany() {
    let newNote = $("#comment");
    let attributeCards = $(".data-company-url", ".card");
    let сompany = dataStorage.getCompanyByDevUrl(attributeCards);
    сompany.Note = newNote.value;
    $('#edit').style.display = 'inline-block';
    $('#save').style.display = 'none';
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
        let div =$('#result');
        createNewElement(company, index, div);
    });
    // showCompaniesButton.innerText = `${n} из ${filteredCompanies.length},показать еще...`;


    let countCompanies = $("#count");
    countCompanies.innerHTML = `Найдено компаний: ${filteredCompanies.length}  из  ${allCompanies.length}`;
}

function filtredCompanies(companies) {
    let filteredCompanies = companies.filter((company) => {
        if (company.Hidden === true) {
            // hidden company
            return false;
        }

        let searchStringName =$("#searchByName").value;
        let searchStringTags = $("#selectTags").value;

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