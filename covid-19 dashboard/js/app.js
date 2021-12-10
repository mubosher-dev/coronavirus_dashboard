window.addEventListener("DOMContentLoaded", function() {
    let INTERNATIONAL_API = "https://disease.sh/v3/covid-19/all";
    let international_carona = document.querySelector("#corona");
    let international_corona_deaths = document.querySelector("#deaths");
    let international_corona_recovered = document.querySelector("#recovered");
    let all_countries_api = "https://disease.sh/v3/covid-19/countries/";
    let coronaWrapper = document.querySelector(".corona_item");
    let search = document.querySelector(".searchItem");
    let searchBtn = document.querySelector(".btn");
    let timeItem = document.querySelector("#time");
    let time = new Date();
    let days = time.getUTCDay();
    let year = time.getUTCFullYear();
    let month = time.getUTCMonth() + 1;

    function getApi(api){
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            results(international_carona,international_corona_deaths,international_corona_recovered,data);
        })
    }
    getApi(INTERNATIONAL_API);
 
    
    
    function results(iTitle,iDeaths,iRecovered,data){
        iTitle.textContent = data.cases;
        iDeaths.textContent = data.deaths;
        iRecovered.textContent = data.recovered;
    }

    function apiResult(api){
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach((data,i) => {
                let tr = document.createElement("tr");
                tr.classList.add("corona_score");
                tr.innerHTML = `
                    <th class="country-item">${i}</th>
                    <th class="country-item">${data.country}</th>
                    <th class="country-item">${data.cases}</th>
                    <th class="country-item">${data.todayCases}</th>
                    <th class="country-item">${data.deaths}</th>
                    <th class="country-item">${data.todayDeaths}</th>
                    <th class="country-item">${data.recovered}</th>
                    <th class="country-item">${data.todayRecovered}</th>
                    <th class="country-item">${data.active}</th>
                    <th class="country-item">${data.population}</th>
                `;
                coronaWrapper.appendChild(tr);  
            });
        })
    }
    apiResult(all_countries_api);

    searchBtn.addEventListener("click",function(e){
        e.preventDefault();
        var searchValue = search.value;
        search.value = "";
        var searchApi = `https://disease.sh/v3/covid-19/countries/${searchValue}`;
        coronaWrapper.innerHTML = "";
        lastApiFunction(searchApi);
        getApi(searchApi);
    });

    function lastApiFunction(api){
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data);
            if(data.country === undefined){
                alert("Iltimos Davlat nomini Ingliz tilida yozing");
            }
            else{
            coronaWrapper.innerHTML = `
            <tr class="country_score">
                <th class="country-item"></th>
                <th class="country-item">${data.country}</th>
                <th class="country-item">${data.cases}</th>
                <th class="country-item">${data.todayCases}</th>
                <th class="country-item">${data.deaths}</th>
                <th class="country-item">${data.todayDeaths}</th>
                <th class="country-item">${data.recovered}</th>
                <th class="country-item">${data.todayRecovered}</th>
                <th class="country-item">${data.active}</th>
                <th class="country-item">${data.population}</th>
            </tr>
            `;
            }
        });
    }
    timeItem.innerHTML = `Oxirgi marta ${year}-yil ${month}-oyining ${days} kunida yangilandi`;


});
