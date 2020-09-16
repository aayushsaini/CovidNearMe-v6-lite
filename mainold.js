document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
});

// $(document).ready(function () {
//     $('.modal').modal();
//     $('#modal1').modal('open');
// });



function draw_chart(confirm_cases, active_cases, recovered, deaths, chartId) {

    var ctx = document.getElementById(chartId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Confirmed Cases', 'Active Cases', 'Recovered Cases', 'Death'],
            datasets: [{
                label: '# of Votes',
                data: [confirm_cases, active_cases, recovered, deaths],
                backgroundColor: [
                    'rgba(7, 75, 201, 0.74)',
                    'rgba(26, 146, 239, 0.67)',
                    'rgba(27, 247, 178, 0.87)',
                    'rgba(247, 64, 27, 0.87)'
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {

        }
    });
}

function chart1(final_place) {
    console.log("success" + final_place);
    final_place = (final_place.replace(/\s/g,'')).toLowerCase();
    var confirm_cases = 0;
    var active_cases = 0;
    var deaths = 0;
    var recovered = 0;
    fetch("./plotting/district_count.json?ver=2.06")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var counter;
            flag = 0;
            for (counter = 0; counter < data.length; counter++) {
                if (((data[counter].district).toLowerCase()).replace(/\s/g,'') == final_place) {
                    console.log("SUCCESS");
                    flag = 1;
                    break;
                }
                else {
                    flag = 0;
                }
            }
            data[0].district;
            confirm_cases = data[counter].confirmed;
            active_cases = data[counter].active;
            recovered = data[counter].recovered;
            deaths = data[counter].death;
            console.log("ugh" + confirm_cases);
            document.getElementById('place_cases').innerHTML = confirm_cases;
            document.getElementById('place_recovered').innerHTML = recovered;
            document.getElementById('place_death').innerHTML = deaths;
            if (confirm_cases == 0) {
                document.getElementById('city_chart').innerHTML = "Zero cases found in our database";
            }
            else{
                draw_chart(confirm_cases, active_cases, recovered, deaths, 'myChart1');
            }
        });

}

function chart2(final_state) {
    final_state = (final_state.replace(/\s/g,'')).toLowerCase();
    var confirm_cases = 0;
    var active_cases = 0;
    var deaths = 0;
    var recovered = 0;
    fetch("./plotting/state_count.json?ver=2.06")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var counter;
            flag = 0;
            console.log(data[0].state);
            for (counter = 0; counter < data.length; counter++) {
                if (((data[counter].state).toLowerCase()).replace(/\s/g,'') == final_state) {
                    console.log(data[counter].state);
                    flag = 1;
                    break;
                }
                else {
                    flag = 0;
                }
            }
            data[0].district;
            confirm_cases = data[counter].confirmed;
            active_cases = data[counter].active;
            recovered = data[counter].recovered;
            deaths = data[counter].death;
            console.log("ugh" + deaths);
            document.getElementById('state_cases').innerHTML = confirm_cases;
            document.getElementById('state_recovered').innerHTML = recovered;
            document.getElementById('state_death').innerHTML = deaths;
            draw_chart(confirm_cases, active_cases, recovered, deaths, 'myChart2');
        });
}


function chart3() {
    var confirm_cases = 0;
    var active_cases = 0;
    var deaths = 0;
    var recovered = 0;
    fetch("./plotting/india.json?ver=2.3")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            confirm_cases = data[0].cnf;
            active_cases = data[0].active;
            recovered = data[0].recovered;
            deaths = data[0].death;
            console.log("ugh" + deaths);
            document.getElementById('country_cases').innerHTML = confirm_cases;
            document.getElementById('country_recovered').innerHTML = recovered;
            document.getElementById('country_death').innerHTML = deaths;
            draw_chart(confirm_cases, active_cases, recovered, deaths, 'myChart3');
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
//-----------------------------
function showError(error) {
    document.getElementById("error_location").style.display = "block";
    document.getElementById("wrapper").style.display = "none";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        document.getElementById("loc_error_message").innerHTML = " User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        document.getElementById("loc_error_message").innerHTML = " Location information is unavailable.";
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        document.getElementById("loc_error_message").innerHTML = " The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        document.getElementById("loc_error_message").innerHTML = " An unknown error occurred.";
        break;
    }
  }
//-----------------------------------
function showPosition(position) {
    var user_lat = position.coords.latitude;
    var user_long = position.coords.longitude;

    console.log("Your current coordinates:" + "Lat:" + user_lat + " Long:" + user_long)
    var flag = 0;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://us1.locationiq.com/v1/reverse.php?key=59503131102f5b&lat=" + user_lat + "&lon=" + user_long + "&format=json",
        "method": "GET"
    }


    $.ajax(settings).done(function (response) {
        var city = document.getElementsByClassName("user_city");
        var final_place;
        var final_state;
        if (response.address.state_district) {
            city[0].innerHTML = response.address.state_district;
            city[1].innerHTML = response.address.state_district;
            final_place = response.address.state_district;
        }
        else {
            city[0].innerHTML = response.address.city;
            city[1].innerHTML = response.address.city;
            final_place = response.address.city;
        }

        var state = document.getElementsByClassName("user_region");
        state[0].innerHTML = response.address.state;
        state[1].innerHTML = response.address.state;
        final_state = response.address.state;
        var country = document.getElementsByClassName("user_country");
        country[0].innerHTML = response.address.country;
        country[1].innerHTML = response.address.country;
        chart1(final_place);
        chart2(final_state);
        chart3();
    });



    // console.log(typeof(user_lat));
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWF5dXNoc2FpbmkiLCJhIjoiY2s4Zzl0cm0zMGFlNTNwbm9tZXJ5cThydiJ9.c8-bbolyM9LbA0zyO16wwg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 9,
        center: [user_long, user_lat]
    });
    var size = 200;
    map.addControl(new mapboxgl.FullscreenControl());

    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        // called once before every frame where the icon will be used
        render: function () {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;

            var radius = (size / 2) * 0.3;
            var outerRadius = (size / 2) * 0.7 * t + radius;
            var context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
        }
    };

    map.on('load', function () {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
        map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [user_long, user_lat]
                        }
                    }
                ]
            }
        });
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                'icon-image': 'pulsing-dot'
            }
        });

        map.addSource('earthquakes', {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data:
                './plotting/map.geojson?ver=2.3',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    'rgba(29, 245, 195, 0.75)',
                    100,
                    'rgba(246, 168, 33, 0.77)',
                    250,
                    'rgba(245, 105, 29, 0.77)',
                    600,
                    'rgba(255, 15, 15, 0.84)'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        });

        var renderOptions = document.getElementById('menu');
        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });


        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'earthquakes',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#1df5c3',
                'circle-radius': 10,
                'circle-stroke-width': 4,
                'circle-stroke-color': '#19c29b'
            }
        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        map.on('mouseenter', 'unclustered-point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            map.getCanvas().style.cursor = 'pointer';
            popup
                .setLngLat(coordinates)
                .setHTML("One Patient Registered Here")
                .addTo(map);
        });
        map.on('mouseleave', 'unclustered-point', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });
}
              // mapboxgl.accessToken = 'pk.eyJ1IjoiYWF5dXNoc2FpbmkiLCJhIjoiY2s4Zzl0cm0zMGFlNTNwbm9tZXJ5cThydiJ9.c8-bbolyM9LbA0zyO16wwg';
              // var map = new mapboxgl.Map({ 
              // container: 'map',
              // style: 'mapbox://styles/mapbox/streets-v11',
              // zoom: 2,
              // center: [92.0369, 38.9072]
              // });
              // map.flyTo({
              //   center: [
              //   response.lon ,
              //   response.lat
              //   ],
              //   essential: true // this animation is considered essential with respect to prefers-reduced-motion
              // });
          // },

const x_axis_cnf = [];
const y_axis_cnf = [];
const x_axis_rec = [];
const y_axis_rec = [];
const x_axis_ded = [];
const y_axis_ded = [];
const x_axis_state = [];
const y_axis_state = [];

function load_analytics(){
    draw();
}

async function draw() {
    await get_data();
    document.getElementById('load').style.display = 'none';
    new Chart(document.getElementById("line-chart_cnf"), {
        type: 'line',
        data: {
            labels: x_axis_cnf,
            datasets: [{
                data: y_axis_cnf,
                label: "No. of confirmed cases in India",
                borderColor: "#de7e00",
                backgroundColor: "#edaf5c",
                fill: true
            }
            ]
        }
    });

    document.getElementById('load_rec').style.display = 'none';
    new Chart(document.getElementById("line-chart_rec"), {
        type: 'line',
        data: {
            labels: x_axis_cnf,
            datasets: [{
                data: y_axis_rec,
                label: "No. of recovered cases in India",
                borderColor: "#13d68b",
                backgroundColor: "#71e3b7",
                fill: true
            }
            ]
        }
    });
    document.getElementById('load_ded').style.display = 'none';
    new Chart(document.getElementById("line-chart_ded"), {
        type: 'line',
        data: {
            labels: x_axis_cnf,
            datasets: [{
                data: y_axis_ded,
                label: "No. of death cases in India",
                borderColor: "#db3030",
                backgroundColor: "#e38686",
                fill: true
            }
            ]
        }
    });
    document.getElementById('load_state').style.display = 'none';
    new Chart(document.getElementById("line-chart_ded1"), {
        type: 'bar',
        data: {
            labels: x_axis_state,
            datasets: [{
                data: y_axis_state,
                label: "No. of cases in each state",
                borderColor: "#a900e6",
                backgroundColor: "#cf7bed",
                fill: true
            }
            ]
        }
    });
    new Chart(document.getElementById("line-chart_dedm"), {
        type: 'bar',
        data: {
            labels: x_axis_state,
            datasets: [{
                data: y_axis_state,
                label: "No. of cases in each state",
                borderColor: "#a900e6",
                backgroundColor: "#d593ed",
                fill: true
            }
            ]
        }
    });
}


async function get_data() {
    const response = fetch('./plotting/analytics_aoi_dw.csv');
    const data = await (await response).text();
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        const columns = row.split(',');
        const date = columns[0];
        const confirm_cases = columns[2];
        const recover_cases = columns[4];
        const death_cases = columns[6];
        console.log(columns);
        x_axis_cnf.push(date);
        y_axis_cnf.push(confirm_cases);
        y_axis_rec.push(recover_cases);
        y_axis_ded.push(death_cases);
    });
    const response2 = fetch('./plotting/state_count.csv');
    const state_data = await (await response2).text();
    const rows2 = state_data.split('\n').slice(1);
    rows2.forEach(row2 => {
        const columns2 = row2.split(',');
        const date = columns2[0];
        const confirm_cases = columns2[1];
        x_axis_state.push(date);
        y_axis_state.push(confirm_cases);
    });

    
    const today_count_cnf = rows[rows.length - 1].split(",");
    const yesterday_count_cnf = rows[rows.length - 2].split(",");
    const today_count_rec = rows[rows.length - 1].split(",");
    const yesterday_count_rec = rows[rows.length - 2].split(",");
    const today_count_ded = rows[rows.length - 1].split(",");
    const yesterday_count_ded = rows[rows.length - 2].split(",");

    document.getElementById('cnf_no').innerHTML = today_count_cnf[2];
    document.getElementById('cnf_no').style.color = "#e68300";
    document.getElementById('rec_no').innerHTML = today_count_rec[4];
    document.getElementById('rec_no').style.color = "#13d68b";
    document.getElementById('ded_no').innerHTML = today_count_rec[6];
    document.getElementById('ded_no').style.color = "#db3030";

    console.log(today_count_cnf, yesterday_count_cnf);

    const differnce_cnf = today_count_cnf[2] - yesterday_count_cnf[2];
    const differnce_rec = today_count_rec[4] - yesterday_count_rec[4];
    const differnce_ded = today_count_ded[6] - yesterday_count_ded[6];

    console.log(differnce_cnf);
    if (differnce_cnf > 0) {
        document.getElementById('daily_cnf_arrow').innerHTML = "arrow_upward";
        document.getElementById('daily_cnf_arrow').style.color = "red";
        document.getElementById('count_diff').innerHTML = differnce_cnf;
    }
    else {
        document.getElementById('daily_cnf_arrow').innerHTML = "arrow_downward";
        document.getElementById('daily_cnf_arrow').style.color = "green";
        document.getElementById('count_diff').innerHTML = differnce_cnf;
    }
    if (differnce_rec > 0) {
        document.getElementById('daily_rec_arrow').innerHTML = "arrow_upward";
        document.getElementById('daily_rec_arrow').style.color = "green";
        document.getElementById('count_diff_rec').innerHTML = differnce_rec;
    }
    else {
        document.getElementById('daily_rec_arrow').innerHTML = "arrow_downward";
        document.getElementById('daily_rec_arrow').style.color = "red";
        document.getElementById('count_diff_rec').innerHTML = differnce_rec;
    }
    if (differnce_ded > 0) {
        document.getElementById('daily_ded_arrow').innerHTML = "arrow_upward";
        document.getElementById('daily_ded_arrow').style.color = "red";
        document.getElementById('count_diff_ded').innerHTML = differnce_ded;
    }
    else {
        document.getElementById('daily_ded_arrow').innerHTML = "arrow_downward";
        document.getElementById('daily_ded_arrow').style.color = "green";
        document.getElementById('count_diff_ded').innerHTML = differnce_ded;
    }


    const d = "3:00PM - 12 Apr";
    document.getElementById('data_update_date_cnf').innerHTML = d;
    document.getElementById('data_update_date_rec').innerHTML = d;
    document.getElementById('data_update_date_ded').innerHTML = d;
    document.getElementById('data_update_date_state').innerHTML = d;
}
