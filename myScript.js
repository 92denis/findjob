loadCompanies();
var div = document.getElementById('result');

function loadCompanies() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'companies.json', true);

    xhr.onreadystatechange = function () { // (3)
        if (xhr.readyState != 4) {
            return;
        }


        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {

            companies = JSON.parse(xhr.responseText);
            showCompanies(companies);
            SelectionByTags();
            getTagsFromCompanies();



        }
    }
    xhr.send(); // (1)

}

function createNewElement(company, index) {

    var id = 'company' + index;
    var html =
        `<div class="card" id="` + id + `">                        
         <div class="card-header">` + company.Title + `</div>
         <div class="card-block">
             <h4 class="card-title">` + company.Name + `</h4>
             <p class="card-text">Направления: ` + company.Tags + `</p>
             <p class="card-text">Email: <a href="` + company.Email + '">' + company.Email.substring(7) + `</a></p>
             <p class="card-text">Телефон: ` + company.Phone + `</p>
             <p class="card-text">Сайт: <a href="` + company.Url + '">' + company.Url + `</a></p>
             <p class="card-text">Ссылка dev.by: <a href="` + company.DevByUrl + '">' + company.DevByUrl + `</a></p>
             <p class="card-text">Адрес: ` + company.Offices + `</p>
             <label> Заметка:<p class="card-text"></p></label>
              <textarea class="form-control" rows="3" id="comment"></textarea> 
              <button style="margin: 10px 0px;" class="col-lg-2 col-md-12 col-sm-12 btn btn-secondary" type="button">Добавить заметку</button>
             <button class="btn btn-primary" >Скрыть</button>
         </div>
     </div>`;
    var newElement = document.createElement('div');
    newElement.innerHTML = html;
    var doc = div.appendChild(newElement);
    doc.getElementsByClassName('btn')[0].onclick = addNoteAboutCompany;
    doc.getElementsByClassName('btn-primary')[0].onclick = hiddenCompany;

}

function showCompanies(companies) {
    var myCard = JSON.parse(localStorage.getItem('myCompany'));
    countCompanies = document.getElementById("count");
    countCompanies.innerHTML = "Найдено компаний: " + companies.length + " из " + companies.length;
    companies.forEach(function (company, index) {
        createNewElement(company, index);
    });
    if (localStorage.getItem('myCompany') !== null) {

        for (var i = 0; i < myCard.length; i++) {
            var myCardElement = document.getElementById(myCard[i]);
            myCardElement.parentNode.removeChild(myCardElement);
            document.getElementById('hiddenCompanies').appendChild(myCardElement);
        }
    }
}

function hiddenCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    card.parentNode.removeChild(card);
    var hiddenCompanies = document.getElementById("hiddenCompanies");
    hiddenCompanies.appendChild(card);
    var hiddenCompanyIds = JSON.parse(localStorage.getItem('myCompany'));
    if (hiddenCompanyIds == null || hiddenCompanyIds == undefined) {
        hiddenCompanyIds = [];
    }
    hiddenCompanyIds.push(card.id);
    var hiddenCompanyIdsJson = JSON.stringify(hiddenCompanyIds);
    localStorage.setItem('myCompany', hiddenCompanyIdsJson);
}

function searchByParam(companies) {

    var searchStringName = document.getElementById("searchByName").value;
    var searchStringTags = document.getElementById("selectTags").value;
    var myExpName = new RegExp(searchStringName, "i");
    var myExpTags = new RegExp(searchStringTags, "i");
    var count = 0;
    div.innerHTML = "";

    companies.forEach(function (company, index) {
        if (searchStringName && !searchStringTags) {
            if ((company.Name.search(myExpName) != -1)) {
                createNewElement(company, index);
                count++;
            }
        }
        else if (searchStringTags && !searchStringName) {
            for (var i = 0; i < company.Tags.length; i++) {
                if ((company.Tags[i].search(myExpTags) != -1)) {
                    createNewElement(company, index);
                    count++;
                }
            }
        }
        else if ((searchStringName = true) && (searchStringTags = true)) {
            for (var i = 0; i < company.Tags.length; i++) {
                if ((company.Name.search(myExpName) != -1) && (company.Tags[0].search(myExpTags) != -1)) {
                    createNewElement(company, index);
                    count++;
                }
            }
        }
        countCompanies.innerHTML = "Найдено компаний: " + count + " из " + companies.length;
    });
}

function SelectionByTags() {
    var myArray = createArrayTags();
    for (var i = 0; i < myArray.length; i++) {
        var options = selectTags.appendChild(document.createElement('option'));
        options.innerHTML = myArray[i];
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
    var noteAboutCompany = card.childNodes[3].childNodes[15].childNodes[1];
    noteAboutCompany.innerText += ' ' + newNote.value;
    newNote.value = " ";
}

function getTagsFromCompanies() {
    var getTagsCompanies = removeWhiteSpacesFromTags(companies);
    var myArray = createArrayTags();
    var arrayObjectTags = [];

    for (var i = 0; i < myArray.length; i++) {
        var count = 0;
        var tags = {};
        for (var j = 0; j < getTagsCompanies.length; j++) {
            if (myArray[i] == getTagsCompanies[j]) {
                count++;
            }
            tags.name = myArray[i];
            tags.count = count;
        }
        arrayObjectTags[i] = tags;
    }
    return arrayObjectTags;
}

function updateSelect() {
    for (var i = 1; i < option.length; i++) {
    }
}

function createArrayTags() {
    var addTags = removeWhiteSpacesFromTags(companies);
    var myArray = [];
    myArray = unique(addTags);// создание массива эксклюзивных значений направлений
    myArray.sort();
    return myArray;
}

function removeWhiteSpacesFromTags(companies) {
    var addTags = [];
    companies.forEach(function (company, index) {
        for (var i = 0; i < company.Tags.length; i++) {
            {
                company.Tags[i] = company.Tags[i].trim();
                addTags.push(company.Tags[i]);
            }
        }
    });
    return addTags;
}