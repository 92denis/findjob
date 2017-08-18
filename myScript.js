loadCompanies();

function loadCompanies() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'companies.json', true);

    xhr.onreadystatechange = function () { // (3)
        if (xhr.readyState !== 4) {
            return;
        }


        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {

            // var companies = JSON.parse(xhr.responseText);
            showCompanies();
            updateSelect();
            getTagsFromCompanies();
            showHiddenCompanies();
        }
    };
    xhr.send(); // (1)

}

function createNewElement(company, index, div) {

    var id = 'company' + index;
    var html =
        `<div class="card" id="` + id + `" data-company-url ="` + company.DevByUrl + `">                        
         <div class="card-header">` + company.Title + `</div>
         <div class="card-block">
             <h4 class="card-title">` + company.Name + `</h4>
             <p class="card-text">Направления: ` + company.Tags + `</p>
             <p class="card-text">Email: <a href="` + company.Email + '">' + company.Email.substring(7) + `</a></p>
             <p class="card-text">Телефон: ` + company.Phone + `</p>
             <p class="card-text">Сайт: <a href="` + company.Url + '">' + company.Url + `</a></p>
             <p class="card-text">Ссылка dev.by: <a href="` + company.DevByUrl + '">' + company.DevByUrl + `</a></p>
             <p class="card-text">Адрес: ` + company.Offices + `</p>
             <label> Заметка:<p class="card-text"> `+ company.Note + `</p></label>
              <textarea class="form-control" rows="3" id="comment"></textarea> 
              <button style="margin: 10px 0px;" class="col-lg-2 col-md-12 col-sm-12 btn btn-secondary" type="button">Добавить заметку</button>
              <button style="margin: 10px 0px;" class="col-lg-3 col-md-12 col-sm-12 btn btn-secondary" type="button">Редактировать</button>
             <button style="margin: 10px 0px; display: none" class="col-lg-3 col-md-12 col-sm-12 btn btn-secondary" type="button">Сохранить</button>
             <button class="btn btn-primary" >Скрыть</button>
         </div>
     </div>`;
    var newElement = document.createElement('div');
    newElement.innerHTML = html;

    var doc = div.appendChild(newElement);
    doc.getElementsByClassName('btn')[2].onclick = saveNoteAboutCompany;
    doc.getElementsByClassName('btn')[0].onclick = addNoteAboutCompany;
    doc.getElementsByClassName('btn')[1].onclick = editNoteAboutCompany;
    doc.getElementsByClassName('btn-primary')[0].onclick = hiddenCompany;

}

function showCompanies() {
    var div = document.getElementById('result');
    div.innerHTML = "";

    var companies = getCompanies();

    var filteredCompanies = companies.filter(function (company, index) {

        if (company.Hidden === true) {
            // hidden company
            return false;
        }

        var searchStringName = document.getElementById("searchByName").value;
        var searchStringTags = document.getElementById("selectTags").value;

        if (searchStringName && company.Name.indexOf(searchStringName) === -1) {
            // name doesn't match
            return false;
        }
        if (searchStringTags && company.Tags.includes(searchStringTags) === false) {
            return false;

        }
        return true;
    });

    filteredCompanies.forEach(function (company, index) {
        var div = document.getElementById('result');
        createNewElement(company, index, div);
    });
    countCompanies = document.getElementById("count");
    countCompanies.innerHTML = "Найдено компаний: " + filteredCompanies.length + " из " + companies.length;
}

function hiddenCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var attributeCards = card.getAttribute("data-company-url");
    var сompany = getCompanyByDevUrl(attributeCards);
    сompany.Hidden = true;
    updateCompany(сompany);
    showCompanies();
}


function updateSelect() {
    var tagsFromCompanies = getTagsFromCompanies();
    for (var i = 0; i < tagsFromCompanies.length; i++) {
        var options = selectTags.appendChild(document.createElement('option'));
        options.innerHTML = tagsFromCompanies[i].name + ' (' + tagsFromCompanies[i].count + ')';
        options.value = tagsFromCompanies[i].name;
    }
}
// функция для удаления одинаковых значений массива
function unique(arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}

function addNoteAboutCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var newNote = card.childNodes[3].childNodes[17];
    var attributeCards = card.getAttribute("data-company-url");
    var сompany = getCompanyByDevUrl(attributeCards);
    сompany.Note += ' ' + newNote.value;
    newNote.value = " ";
    updateCompany(сompany);
    showCompanies();
}

function editNoteAboutCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var newNote = card.childNodes[3].childNodes[17];
    var attributeCards = card.getAttribute("data-company-url");
    var сompany = getCompanyByDevUrl(attributeCards);
    newNote.value = сompany.Note;
    var edit = card.childNodes[3].childNodes[21].style.display = 'none';
    var save = card.childNodes[3].childNodes[23].style.display = 'inline-block';

}
function saveNoteAboutCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    var newNote = card.childNodes[3].childNodes[17];
    var attributeCards = card.getAttribute("data-company-url");
    var сompany = getCompanyByDevUrl(attributeCards);
    сompany.Note = newNote.value;
    updateCompany(сompany);
    showCompanies();
    var edit = card.childNodes[3].childNodes[21].style.display = 'inline-block';
    var save = card.childNodes[3].childNodes[23].style.display = 'none';
    newNote.value = " ";

}

function getTagsFromCompanies() {
    var getTagsCompanies = removeWhiteSpacesFromTags(getCompanies());
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
    var tags = removeWhiteSpacesFromTags(getCompanies());
    var myArray = [];
    myArray = unique(tags);// создание массива эксклюзивных значений направлений
    myArray.sort();
    return myArray;
}

function removeWhiteSpacesFromTags(companies) {
    var tags = [];
    companies.forEach(function (company, index) {
        for (var i = 0; i < company.Tags.length; i++) {
            company.Tags[i] = company.Tags[i].trim();
            tags.push(company.Tags[i]);
        }
    });
    return tags;
}

function showHiddenCompanies() {
    var companies = getCompanies();

    var filteredCompanies = companies.filter(function (company, index) {
        //searchByParam();

        if (company.Hidden) {
            // hidden company
            return true;
        }
        return false;
    });

    filteredCompanies.forEach(function (company, index) {
        var div = document.getElementById("hiddenCompanies");
        createNewElement(company, index, div);
    });
}
