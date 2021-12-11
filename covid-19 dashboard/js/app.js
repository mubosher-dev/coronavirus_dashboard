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
    let array = [
        "Bu loyiha koronavirus haqida malumot berish uchun MubosherDev tomonidan tayyorlangan"
    ]
    const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=60";
    function getApi(api){
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
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
        const searchApi = `https://disease.sh/v3/covid-19/countries/${searchValue}`;
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

    async function fetchJson(api){
        const response = await fetch(api);
        const datapoint = await response.json();
        return datapoint ;
    }

    fetchJson(url).then(datapoint => {
        let cases = datapoint.cases
        let deaths = datapoint.deaths;
        console.log(cases);

        myChart.config.data.datasets[0].data = cases;
        myChart.update();
        myCharts.config.data.datasets[0].data = deaths;
        myCharts.update();    
    })
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:[],
            datasets: [{
                label: 'Coronavirus kasallanish statistikasi',
                data: [],
                backgroundColor: [
                    'green',
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1
            }]
        },
        animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxs = document.getElementById('myDeath').getContext('2d');
    const myCharts = new Chart(ctxs, {
        type: 'bar',
        data: {
            labels:[],
            datasets: [{
                label:"Coronavirus o'lim holati statistikasi",
                data: [],
                backgroundColor: [
                    '#333',
                ],
                borderColor: [
                    "white",
                ],
                borderWidth: 1
            }]
        },
        animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

     window.alert(array);
    
});
