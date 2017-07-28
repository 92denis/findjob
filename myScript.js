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
            SelectionByTags(companies);

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
             <button class="btn btn-primary" >Скрыть</button>
         </div>
     </div>`;

    var newElement = document.createElement('div');
    newElement.innerHTML = html;

    var doc = div.appendChild(newElement);

    doc.getElementsByClassName('btn')[0].onclick = hiddenCompany;
   
}

function showCompanies(companies) {
    countCompanies = document.getElementById("count");
    countCompanies.innerHTML = "Найдено компаний: " + companies.length + " из " + companies.length;
    companies.forEach(function (company, index) {
      createNewElement(company, index);
    });
      
         if (localStorage.getItem('myCompany')!== null){
        var myCard = localStorage.getItem('myCompany');
        var myCardElement = document.getElementById(myCard);
        myCardElement.parentNode.removeChild(myCardElement);
        document.getElementById('hiddenCompanies').appendChild(myCardElement);
    }
}

function hiddenCompany(elem) {
    var card = elem.currentTarget.parentNode.parentNode;
    card.parentNode.removeChild(card);
    var hiddenCompanies = document.getElementById("hiddenCompanies");
    hiddenCompanies.appendChild(card);
    localStorage.setItem('myCompany', card.id);
}


function searchByParam(companies) {

    var searchStringName = document.getElementById("search1").value;
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
            if ((company.Tags[0].search(myExpTags) != -1)) {
                createNewElement(company, index);
                count++;
            }
        }
        else if ((searchStringName = true) && (searchStringTags = true)) {
            if ((company.Name.search(myExpName) != -1) && (company.Tags[0].search(myExpTags) != -1)) {
                createNewElement(company, index);
                count++;
            }
        }
        countCompanies.innerHTML = "Найдено компаний: " + count + " из " + companies.length;
    });
}

function SelectionByTags(companies) {
    var addTags = [];
    var myArray = [];
    var selectTags = document.getElementById('selectTags');
    companies.forEach(function (company, index) {
        addTags.push(company.Tags);
    });
    addTags.reduce(function (flat, current) { return flat.concat(current); }, []);   // делаю одномерный массив из многомерного
    myArray = unique(addTags.reduce(function (flat, current) { return flat.concat(current); }, []));// создание массива эксклюзивных значений направлений
    myArray.sort();
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