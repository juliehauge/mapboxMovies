function createX(x) {
    x.classList.toggle("change");
    document.getElementById("filmer").classList.toggle("show");
}

const filmer = document.querySelector("#filmer");
const movie = document.querySelector(".film")

mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWVoYXVnZSIsImEiOiJjazUzbHVtNDYwOG5uM21xdHc1dW5hOHJvIn0.KujRaoDzyv3ehKHQaUxqAw';

const map = new mapboxgl.Map({
    container: 'map',
    center: [-1.257889, 51.759109],
    zoom: 10,
    style: 'mapbox://styles/juliehauge/ck5dro2550nxa1ilo9vx8e7ds'
});

const marker = [];

filmer.onclick = (evt) => {
    const lng = Number(evt.target.dataset.lng);
    const lat = Number(evt.target.dataset.lat);
    const bilde = evt.target.dataset.bilde;
    const text = evt.target.dataset.text;
    const klasse = evt.target.dataset.klasse;


    const point = [lng, lat];

    map.easeTo({
        center: point,
        zoom: 18,
        duration: 3000
    })

    const addMarker = () => {

        const marker = new mapboxgl.Marker({
            draggable: false,
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<img src="${bilde}"><p>${text}</p>`

            // <img class="${klasse}" src="./images/video-player.png">
        );
        
        marker.setLngLat([lng, lat]);
        marker.setPopup(popup);
        marker.addTo(map);
    }

    addMarker();



    const filmIcon = document.querySelector(".filmIcon");
    const icon = {
        showIcon: true
    }
    if (icon.showIcon){
        filmIcon.style.display ="block";
    } else {
        filmIcon.style.display ="none";
    }
    


    
    // const showIcon = () => {
    //     const filmIcon = document.querySelector(".filmIcon");
        
    //     if (movie.onclick = filmIcon.style.display === "none") {
    //         filmIcon.style.display = "block";
    //       } else {
    //         filmIcon.style.display = "none";
    //       };
    //       console.log(movie);
    // }
    // showIcon();
}


Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Popularity'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>'
            }
        }
    },
    series: [{
        name: 'Prosentandel',
        colorByPoint: true,
        data: [{
            name: "102 Dalmations",
            y: 4.9
        }, {
            name: "Harry Potter and the Sorcerer's Stone",
            y: 7.6
        }, {
            name: 'The Golden Compass',
            y: 6.1
        }, {
            name: 'The Riot Club',
            y: 6.0
        }, {
            name: 'Doctor Strange',
            y: 7.5
        }, {
            name: 'Transformers: The Last Knight',
            y: 5.2
        }, {
            name: 'Mamma Mia! Here We Go Again',
            y: 6.7
        }]
    }]
});

const info = document.querySelector(".info");
const container = document.querySelector("#container");

const visInfo = () => {
    container.style.display = "block";
}

info.addEventListener("click", visInfo);

const fjernInfo = () => {
    container.style.display = "none";
}

container.addEventListener("click", fjernInfo);


map.on("load", () => {
    gsap.to("h1", {duration: 3.5, scale: 1.5})
    
});





