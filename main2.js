var user_place;
var user_state;var user_place,user_state;function getLocation(){navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition,showError):x.innerHTML="Geolocation is not supported by this browser."}function showError(e){switch(document.getElementById("error_location").style.display="block",document.getElementById("wrapper").style.display="none",e.code){case e.PERMISSION_DENIED:console.log("User denied the request for Geolocation."),document.getElementById("loc_error_message").innerHTML=" User denied the request for Geolocation.";break;case e.POSITION_UNAVAILABLE:console.log("Location information is unavailable."),document.getElementById("loc_error_message").innerHTML=" Location information is unavailable.";break;case e.TIMEOUT:console.log("The request to get user location timed out."),document.getElementById("loc_error_message").innerHTML=" The request to get user location timed out.";break;case e.UNKNOWN_ERROR:console.log("An unknown error occurred."),document.getElementById("loc_error_message").innerHTML=" An unknown error occurred."}}function showPosition(e){var t=e.coords.latitude,n=e.coords.longitude;console.log("Your current coordinates:Lat:"+t+" Long:"+n);var o={async:!0,crossDomain:!0,url:"https://us1.locationiq.com/v1/reverse.php?key=59503131102f5b&lat="+t+"&lon="+n+"&format=json",method:"GET"};$.ajax(o).done(function(e){console.log(e);var t,n,o=document.getElementsByClassName("user_city");e.address.state_district?(o[0].innerHTML=e.address.state_district,t=e.address.state_district):(o[0].innerHTML=e.address.city,t=e.address.city),document.getElementsByClassName("user_region")[0].innerHTML=e.address.state,n=e.address.state,document.getElementsByClassName("user_country")[0].innerHTML=e.address.country,fetch("./plotting/excep.json").then(function(e){return e.json()}).then(function(e){console.log(e[0]);var o=0;for(o=0;o<e.length;o++)if(e[o].district==t){t=e[o].district2;break}card1_info(t,n)})}),mapboxgl.accessToken="pk.eyJ1IjoiYWF5dXNoc2FpbmkiLCJhIjoiY2s4Zzl0cm0zMGFlNTNwbm9tZXJ5cThydiJ9.c8-bbolyM9LbA0zyO16wwg";var r=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/dark-v10",zoom:9,center:[n,t]});r.addControl(new mapboxgl.FullscreenControl);var d={width:200,height:200,data:new Uint8Array(16e4),onAdd:function(){var e=document.createElement("canvas");e.width=this.width,e.height=this.height,this.context=e.getContext("2d")},render:function(){var e=performance.now()%1e3/1e3,t=70*e+30,n=this.context;return n.clearRect(0,0,this.width,this.height),n.beginPath(),n.arc(this.width/2,this.height/2,t,0,2*Math.PI),n.fillStyle="rgba(255, 200, 200,"+(1-e)+")",n.fill(),n.beginPath(),n.arc(this.width/2,this.height/2,30,0,2*Math.PI),n.fillStyle="rgba(255, 100, 100, 1)",n.strokeStyle="white",n.lineWidth=2+4*(1-e),n.fill(),n.stroke(),this.data=n.getImageData(0,0,this.width,this.height).data,r.triggerRepaint(),!0}};r.on("load",function(){r.addImage("pulsing-dot",d,{pixelRatio:2}),r.addSource("points",{type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[n,t]}}]}}),r.addLayer({id:"points",type:"symbol",source:"points",layout:{"icon-image":"pulsing-dot"}}),r.addSource("earthquakes",{type:"geojson",data:"./plotting/map.geojson?ver=2.3",cluster:!0,clusterMaxZoom:14,clusterRadius:50}),r.addLayer({id:"clusters",type:"circle",source:"earthquakes",filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"rgba(29, 245, 195, 0.75)",100,"rgba(246, 168, 33, 0.77)",250,"rgba(245, 105, 29, 0.77)",600,"rgba(255, 15, 15, 0.84)"],"circle-radius":["step",["get","point_count"],20,100,30,750,40]}});document.getElementById("menu");r.addLayer({id:"cluster-count",type:"symbol",source:"earthquakes",filter:["has","point_count"],layout:{"text-field":"{point_count_abbreviated}","text-font":["DIN Offc Pro Medium","Arial Unicode MS Bold"],"text-size":12}}),r.addLayer({id:"unclustered-point",type:"circle",source:"earthquakes",filter:["!",["has","point_count"]],paint:{"circle-color":"#1df5c3","circle-radius":10,"circle-stroke-width":4,"circle-stroke-color":"#19c29b"}}),r.on("mouseenter","clusters",function(){r.getCanvas().style.cursor="pointer"}),r.on("mouseleave","clusters",function(){r.getCanvas().style.cursor=""});var e=new mapboxgl.Popup({closeButton:!1,closeOnClick:!1});r.on("mouseenter","unclustered-point",function(t){var n=t.features[0].geometry.coordinates.slice();r.getCanvas().style.cursor="pointer",e.setLngLat(n).setHTML("One Patient Registered Here").addTo(r)}),r.on("mouseleave","unclustered-point",function(){r.getCanvas().style.cursor="",e.remove()})})}function card1_info(e,t){fetch("https://api.covid19india.org/v2/state_district_wise.json").then(function(e){return e.json()}).then(function(n){e=e.replace(/\s/g,"").toLowerCase(),console.log(e,t);var o=0,r=0;for(o=0;o<n.length;o++)if(n[o].state==t)for(console.log("State Located: "+n[o].state),r=0;r<n[o].districtData.length;r++)n[o].districtData[r].district.toLowerCase().replace(/\s/g,"")==e&&(console.log("District Located: "+n[o].districtData[r].district.toLowerCase().replace(/\s/g,"")),console.log("District Cases: "+n[o].districtData[r].confirmed),document.getElementById("user_place_cnf").innerHTML=n[o].districtData[r].confirmed,document.getElementById("user_place_cnf").style.color="coral",document.getElementById("user_place_cnf").style.fontWeight="bold",document.getElementById("user_place_cnf").style.fontSize="1.12em")}),card2_info(t)}function card2_info(e){fetch("https://api.covid19india.org/data.json").then(function(e){return e.json()}).then(function(t){var n=1;for(document.getElementById("increased_count").innerHTML=t.statewise[0].deltaconfirmed,document.getElementById("cnf_arrow_home").innerHTML="arrow_upward",document.getElementById("cnf_arrow_home").style.color="red",n=1;n<t.statewise.length;n++)t.statewise[n].state==e&&(console.log(t.statewise[0].deltaconfirmed),document.getElementById("user_state_cnf").innerHTML=t.statewise[n].confirmed,document.getElementById("user_state_cnf").style.color="coral",document.getElementById("user_state_cnf").style.fontWeight="bold",document.getElementById("user_state_cnf").style.fontSize="1.12em",document.getElementById("user_state_act").innerHTML=t.statewise[n].active,document.getElementById("user_state_act").style.color="#ff7043",document.getElementById("user_state_act").style.fontWeight="bold",document.getElementById("user_state_act").style.fontSize="1.12em",document.getElementById("user_state_rec").innerHTML=t.statewise[n].recovered,document.getElementById("user_state_rec").style.color="#1de9b6",document.getElementById("user_state_rec").style.fontWeight="bold",document.getElementById("user_state_rec").style.fontSize="1.12em",document.getElementById("user_state_ded").innerHTML=t.statewise[n].deaths,document.getElementById("user_state_ded").style.color="#e53935 ",document.getElementById("user_state_ded").style.fontWeight="bold",document.getElementById("user_state_ded").style.fontSize="1.12em");document.getElementById("user_country_cnf").innerHTML=t.statewise[0].confirmed,document.getElementById("user_country_cnf").style.color="coral",document.getElementById("user_country_cnf").style.fontWeight="bold",document.getElementById("user_country_cnf").style.fontSize="1.12em",document.getElementById("user_country_act").innerHTML=t.statewise[0].active,document.getElementById("user_country_act").style.color="#ff7043",document.getElementById("user_country_act").style.fontWeight="bold",document.getElementById("user_country_act").style.fontSize="1.12em",document.getElementById("user_country_rec").innerHTML=t.statewise[0].recovered,document.getElementById("user_country_rec").style.color="#1de9b6",document.getElementById("user_country_rec").style.fontWeight="bold",document.getElementById("user_country_rec").style.fontSize="1.12em",document.getElementById("user_country_ded").innerHTML=t.statewise[0].deaths,document.getElementById("user_country_ded").style.color="#e53935 ",document.getElementById("user_country_ded").style.fontWeight="bold",document.getElementById("user_country_ded").style.fontSize="1.12em"})}function load_analytics(){get_data1(),get_data2()}document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".sidenav");M.Sidenav.init(e,{edge:"right"})});const x_axis_rec=[],y_axis_rec=[],x_axis_ded=[],y_axis_ded=[];function draw(e,t,n,o){Chart.defaults.global.defaultFontColor="#969696";var r=e,d=t,a=n,s=o;document.getElementById("load").style.display="none",new Chart(document.getElementById("line-chart_cnf"),{type:"line",data:{labels:r,datasets:[{data:d,label:"Confirmed cases in India",borderColor:"#de7e00",backgroundColor:"#edaf5c",fill:!0}]}}),document.getElementById("load_rec").style.display="none",new Chart(document.getElementById("line-chart_rec"),{type:"line",data:{labels:r,datasets:[{data:a,label:"Recovered cases in India",borderColor:"#09bd78",backgroundColor:"#71e3b7",fill:!0}]}}),document.getElementById("load_ded").style.display="none",new Chart(document.getElementById("line-chart_ded"),{type:"line",data:{labels:r,datasets:[{data:s,label:"Death cases in India",borderColor:"#db3030",backgroundColor:"#e38686",fill:!0}]}})}function draw2(e,t,n,o){x_axis_state=e,y_axis_state=t,y_axis_state_death=n,y_axis_state_rec=o,document.getElementById("load_state").style.display="none",new Chart(document.getElementById("line-chart_dedm"),{type:"horizontalBar",data:{labels:x_axis_state,datasets:[{data:y_axis_state,label:"No. of cases in each state",borderColor:"#a900e6",backgroundColor:"#cf7bed",fill:!0}]}})}function get_data1(){fetch("https://api.covid19india.org/data.json").then(function(e){return e.json()}).then(function(e){var t,n,o=[],r=[],d=[],a=[],s=e.cases_time_series.length,c=0;for(c=0;c<e.cases_time_series.length;c++)o[c]=e.cases_time_series[c].date,r[c]=Number(e.cases_time_series[c].totalconfirmed),d[c]=Number(e.cases_time_series[c].totalrecovered),a[c]=Number(e.cases_time_series[c].totaldeceased);t=e.cases_time_series[s-1].totalconfirmed,today_count_rec=e.cases_time_series[s-1].totalrecovered,today_count_ded=e.cases_time_series[s-1].totaldeceased;var i=today_count_rec/t*100,l=today_count_ded/t*100;i=i.toString().slice(0,6),l=l.toString().slice(0,6),document.getElementById("recovery_rate").innerHTML=i,document.getElementById("death_rate").innerHTML=l;var u=e.tested.length;document.getElementById("icmr_samples").innerHTML=e.tested[u-1].totalsamplestested,document.getElementById("icmr_individuals").innerHTML=e.tested[u-1].totalindividualstested,n=e.cases_time_series[s-2].totalconfirmed,yesterday_count_rec=e.cases_time_series[s-2].totalrecovered,yesterday_count_ded=e.cases_time_series[s-2].totaldeceased;var m=t-n,_=today_count_rec-yesterday_count_rec,y=today_count_ded-yesterday_count_ded;document.getElementById("cnf_no").innerHTML=t,document.getElementById("rec_no").innerHTML=today_count_rec,document.getElementById("ded_no").innerHTML=today_count_ded,draw(o,r,d,a),document.getElementById("cnf_no").style.color="coral",document.getElementById("rec_no").style.color="#1de9b6",document.getElementById("ded_no").style.color="#ff3838",m>0?(document.getElementById("daily_cnf_arrow").innerHTML="arrow_upward",document.getElementById("daily_cnf_arrow").style.color="red",document.getElementById("count_diff").innerHTML=m):(document.getElementById("daily_cnf_arrow").innerHTML="arrow_downward",document.getElementById("daily_cnf_arrow").style.color="green",document.getElementById("count_diff").innerHTML=m),_>0?(document.getElementById("daily_rec_arrow").innerHTML="arrow_upward",document.getElementById("daily_rec_arrow").style.color="#07b536",document.getElementById("count_diff_rec").innerHTML=_):(document.getElementById("daily_rec_arrow").innerHTML="arrow_downward",document.getElementById("daily_rec_arrow").style.color="red",document.getElementById("count_diff_rec").innerHTML=_),y>0?(document.getElementById("daily_ded_arrow").innerHTML="arrow_upward",document.getElementById("daily_ded_arrow").style.color="red",document.getElementById("count_diff_ded").innerHTML=y):(document.getElementById("daily_ded_arrow").innerHTML="arrow_downward",document.getElementById("daily_ded_arrow").style.color="#07b536",document.getElementById("count_diff_ded").innerHTML=y)})}function get_data2(){fetch("https://api.covid19india.org/data.json").then(function(e){return e.json()}).then(function(e){var t,n=[],o=[],r=[],d=[];for(t=1;t<e.statewise.length;t++)n[t]=e.statewise[t].state,o[t]=Number(e.statewise[t].confirmed),r[t]=Number(e.statewise[t].deaths),d[t]=Number(e.statewise[t].recovered);draw2(n,o,r,d)})}
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
//-----------------------------
function showError(error) {
    document.getElementById("error_location").style.display = "block";
    document.getElementById("wrapper").style.display = "none";
    switch (error.code) {
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
        console.log(response);
        var city = document.getElementsByClassName("user_city");
        var final_place;
        var final_state;
        if (response.address.state_district) {
            city[0].innerHTML = response.address.state_district;
            final_place = response.address.state_district;
        }
        else {
            city[0].innerHTML = response.address.city;
            final_place = response.address.city;
        }

        var state = document.getElementsByClassName("user_region");
        state[0].innerHTML = response.address.state;
        final_state = response.address.state;
        var country = document.getElementsByClassName("user_country");
        country[0].innerHTML = response.address.country;
        fetch("./plotting/excep.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                console.log(data[0]);
                var counter = 0;
                for (counter = 0; counter < data.length; counter++) {
                    if (data[counter].district == final_place) {
                        final_place = data[counter].district2;
                        break;
                    }
                    else {
                        continue;
                    }
                }
                card1_info(final_place, final_state);
            });
    });



    // console.log(typeof(user_lat));
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWF5dXNoc2FpbmkiLCJhIjoiY2s4Zzl0cm0zMGFlNTNwbm9tZXJ5cThydiJ9.c8-bbolyM9LbA0zyO16wwg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
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




function card1_info(final_place, final_state) {
    fetch("https://api.covid19india.org/v2/state_district_wise.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            final_place = (final_place.replace(/\s/g, '')).toLowerCase();
            console.log(final_place, final_state);
            var counter = 0;
            var counter2 = 0;
            for (counter = 0; counter < data.length; counter++) {
                if (data[counter].state == final_state) {
                    console.log("State Located: " + data[counter].state);
                    for (counter2 = 0; counter2 < data[counter].districtData.length; counter2++) {
                        if (((data[counter].districtData[counter2].district).toLowerCase()).replace(/\s/g, '') == final_place) {

                            console.log("District Located: " + ((data[counter].districtData[counter2].district).toLowerCase()).replace(/\s/g, ''));
                            console.log("District Cases: " + data[counter].districtData[counter2].confirmed);
                            document.getElementById('user_place_cnf').innerHTML = data[counter].districtData[counter2].confirmed;
                            document.getElementById('user_place_cnf').style.color = 'coral';
                            document.getElementById('user_place_cnf').style.fontWeight = 'bold';
                            document.getElementById('user_place_cnf').style.fontSize = '1.12em';
                        }
                    }
                }
            }
        });
    card2_info(final_state)
}

function card2_info(final_state) {
    fetch("https://api.covid19india.org/data.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var counter = 1;

            document.getElementById('increased_count').innerHTML = data.statewise[0].deltaconfirmed;
            document.getElementById('cnf_arrow_home').innerHTML = "arrow_upward";
            document.getElementById('cnf_arrow_home').style.color = "red";
            for (counter = 1; counter < data.statewise.length; counter++) {
                if (data.statewise[counter].state == final_state) {
                    console.log(data.statewise[0].deltaconfirmed);  
                    document.getElementById('user_state_cnf').innerHTML = data.statewise[counter].confirmed;
                    document.getElementById('user_state_cnf').style.color = 'coral';
                    document.getElementById('user_state_cnf').style.fontWeight = 'bold';
                    document.getElementById('user_state_cnf').style.fontSize = '1.12em';

                    document.getElementById('user_state_act').innerHTML = data.statewise[counter].active;
                    document.getElementById('user_state_act').style.color = '#ff7043';
                    document.getElementById('user_state_act').style.fontWeight = 'bold';
                    document.getElementById('user_state_act').style.fontSize = '1.12em';

                    document.getElementById('user_state_rec').innerHTML = data.statewise[counter].recovered;
                    document.getElementById('user_state_rec').style.color = '#1de9b6';
                    document.getElementById('user_state_rec').style.fontWeight = 'bold';
                    document.getElementById('user_state_rec').style.fontSize = '1.12em';

                    document.getElementById('user_state_ded').innerHTML = data.statewise[counter].deaths;
                    document.getElementById('user_state_ded').style.color = '#e53935 ';
                    document.getElementById('user_state_ded').style.fontWeight = 'bold';
                    document.getElementById('user_state_ded').style.fontSize = '1.12em';

                }
            }
            document.getElementById('user_country_cnf').innerHTML = data.statewise[0].confirmed;
            document.getElementById('user_country_cnf').style.color = 'coral';
            document.getElementById('user_country_cnf').style.fontWeight = 'bold';
            document.getElementById('user_country_cnf').style.fontSize = '1.12em';

            document.getElementById('user_country_act').innerHTML = data.statewise[0].active;
            document.getElementById('user_country_act').style.color = '#ff7043';
            document.getElementById('user_country_act').style.fontWeight = 'bold';
            document.getElementById('user_country_act').style.fontSize = '1.12em';

            document.getElementById('user_country_rec').innerHTML = data.statewise[0].recovered;
            document.getElementById('user_country_rec').style.color = '#1de9b6';
            document.getElementById('user_country_rec').style.fontWeight = 'bold';
            document.getElementById('user_country_rec').style.fontSize = '1.12em';

            document.getElementById('user_country_ded').innerHTML = data.statewise[0].deaths;
            document.getElementById('user_country_ded').style.color = '#e53935 ';
            document.getElementById('user_country_ded').style.fontWeight = 'bold';
            document.getElementById('user_country_ded').style.fontSize = '1.12em';
        });
} 


function load_analytics() {

    get_data1();
    get_data2();
}

const x_axis_rec = [];
const y_axis_rec = [];
const x_axis_ded = [];
const y_axis_ded = [];

function draw(x_axis_cnf1, y_axis_cnf1, y_axis_rec1, y_axis_ded1) {
    Chart.defaults.global.defaultFontColor='#969696';

    var x_axis_cnf = x_axis_cnf1;
    var y_axis_cnf = y_axis_cnf1;
    var y_axis_rec = y_axis_rec1;
    var y_axis_ded = y_axis_ded1;
    document.getElementById('load').style.display = 'none';
    new Chart(document.getElementById("line-chart_cnf"), {
        type: 'line',
        data: {
            labels: x_axis_cnf,
            datasets: [{
                data: y_axis_cnf,
                label: "Confirmed cases in India",
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
                label: "Recovered cases in India",
                borderColor: "#09bd78",
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
                label: "Death cases in India",
                borderColor: "#db3030",
                backgroundColor: "#e38686",
                fill: true
            }
            ]
        }
    });
    
    // new Chart(document.getElementById("line-chart_dedm"), {
    //     type: 'bar',
    //     data: {
    //         labels: x_axis_state,
    //         datasets: [{
    //             data: y_axis_state,
    //             label: "No. of cases in each state",
    //             borderColor: "#a900e6",
    //             backgroundColor: "#d593ed",
    //             fill: true
    //         }
    //         ]
    //     }
    // });
}

function draw2(x_axis_cnf1, y_axis_cnf1, y_axis_death, y_axis_rec)
{
    x_axis_state = x_axis_cnf1;
    y_axis_state = y_axis_cnf1;
    y_axis_state_death = y_axis_death;
    y_axis_state_rec = y_axis_rec;
    // console.log(x_axis_state, y_axis_state);
    document.getElementById('load_state').style.display = 'none';
    new Chart(document.getElementById("line-chart_dedm"), {
        type: 'horizontalBar',
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
}




function get_data1() {
    fetch("https://api.covid19india.org/data.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // console.log(data.cases_time_series[74]);
            var x_axis_cnf1 = [];
            var y_axis_cnf1 = [];
            var y_axis_rec1 = [];
            var y_axis_ded1 = [];
            var today_count_cnf;
            var yesterday_count_cnf;
            var len = data.cases_time_series.length;
            var counter = 0;
            for (counter = 0; counter < (data.cases_time_series.length); counter++) {
                x_axis_cnf1[counter] = data.cases_time_series[counter].date;
                y_axis_cnf1[counter] = Number(data.cases_time_series[counter].totalconfirmed)
                y_axis_rec1[counter] = Number(data.cases_time_series[counter].totalrecovered);
                y_axis_ded1[counter] = Number(data.cases_time_series[counter].totaldeceased);
                // console.log(parseInt(data.cases_time_series[counter].totalconfirmed));
            }
            today_count_cnf = data.cases_time_series[len - 1].totalconfirmed;
            today_count_rec = data.cases_time_series[len - 1].totalrecovered;
            today_count_ded = data.cases_time_series[len - 1].totaldeceased;

            var rec_rate = (today_count_rec/today_count_cnf)*100;
            var dead_rate = (today_count_ded/today_count_cnf)*100;
            rec_rate = (rec_rate.toString()).slice(0,6);
            dead_rate = (dead_rate.toString()).slice(0,6);
            document.getElementById("recovery_rate").innerHTML = rec_rate;
            document.getElementById("death_rate").innerHTML = dead_rate;
            var len_tested = data.tested.length; 
            document.getElementById("icmr_samples").innerHTML = data.tested[len_tested-1].totalsamplestested; 
            document.getElementById("icmr_individuals").innerHTML = data.tested[len_tested-1].totalindividualstested; 

            yesterday_count_cnf = data.cases_time_series[len - 2].totalconfirmed;
            yesterday_count_rec = data.cases_time_series[len - 2].totalrecovered;
            yesterday_count_ded = data.cases_time_series[len - 2].totaldeceased;

            var differnce_cnf = today_count_cnf - yesterday_count_cnf;
            var differnce_rec = today_count_rec - yesterday_count_rec;
            var differnce_ded = today_count_ded - yesterday_count_ded;

            document.getElementById("cnf_no").innerHTML = today_count_cnf;
            document.getElementById("rec_no").innerHTML = today_count_rec;
            document.getElementById("ded_no").innerHTML = today_count_ded;
            draw(x_axis_cnf1, y_axis_cnf1, y_axis_rec1, y_axis_ded1);
            document.getElementById("cnf_no").style.color = 'coral';
            document.getElementById("rec_no").style.color = '#1de9b6';
            document.getElementById("ded_no").style.color = '#ff3838';
            if (differnce_cnf > 0) {
                document.getElementById('daily_cnf_arrow').innerHTML = "arrow_upward";
                document.getElementById('daily_cnf_arrow').style.color = "red";
                document.getElementById('count_diff').innerHTML = differnce_cnf;
            }
            else {
                document.getElementById('daily_cnf_arrow').innerHTML = "arrow_downward";
                document.getElementById('daily_cnf_arrow').style.color = "green";
                document.getElementById('count_diff').innerHTML = differnce_cnf;
                // }
            }
            if (differnce_rec > 0) {
                document.getElementById('daily_rec_arrow').innerHTML = "arrow_upward";
                document.getElementById('daily_rec_arrow').style.color = "#07b536";
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
                document.getElementById('daily_ded_arrow').style.color = "#07b536";
                document.getElementById('count_diff_ded').innerHTML = differnce_ded;
            }
            // console.log(data.cases_time_series[73].date) ;
        });


    // const response = fetch('https://api.covid19india.org/data.json');
    // const data = await (await response).text();
    // const rows = data.split('\n').slice(1);
    // rows.forEach(row => {
    //     const columns = row.split(',');
    //     const date = columns[0];
    //     const confirm_cases = columns[2];
    //     const recover_cases = columns[4];
    //     const death_cases = columns[6];
    //     console.log(columns);
    //     x_axis_cnf.push(date);
    //     y_axis_cnf.push(confirm_cases);
    //     y_axis_rec.push(recover_cases);
    //     y_axis_ded.push(death_cases);
    // });
    // const response2 = fetch('./plotting/state_count.csv');
    // const state_data = await (await response2).text();
    // const rows2 = state_data.split('\n').slice(1);
    // rows2.forEach(row2 => {
    //     const columns2 = row2.split(',');
    //     const date = columns2[0];
    //     const confirm_cases = columns2[1];
    //     x_axis_state.push(date);
    //     y_axis_state.push(confirm_cases);
    // });


    // const today_count_cnf = rows[rows.length - 1].split(",");
    // const yesterday_count_cnf = rows[rows.length - 2].split(",");
    // const today_count_rec = rows[rows.length - 1].split(",");
    // const yesterday_count_rec = rows[rows.length - 2].split(",");
    // const today_count_ded = rows[rows.length - 1].split(",");
    // const yesterday_count_ded = rows[rows.length - 2].split(",");

    // document.getElementById('cnf_no').innerHTML = today_count_cnf[2];
    // document.getElementById('cnf_no').style.color = "#e68300";
    // document.getElementById('rec_no').innerHTML = today_count_rec[4];
    // document.getElementById('rec_no').style.color = "#13d68b";
    // document.getElementById('ded_no').innerHTML = today_count_rec[6];
    // document.getElementById('ded_no').style.color = "#db3030";

    // console.log(today_count_cnf, yesterday_count_cnf);

    // const differnce_cnf = today_count_cnf[2] - yesterday_count_cnf[2];
    // const differnce_rec = today_count_rec[4] - yesterday_count_rec[4];
    // const differnce_ded = today_count_ded[6] - yesterday_count_ded[6];

    // console.log(differnce_cnf);
    // if (differnce_cnf > 0) {
    //     document.getElementById('daily_cnf_arrow').innerHTML = "arrow_upward";
    //     document.getElementById('daily_cnf_arrow').style.color = "red";
    //     document.getElementById('count_diff').innerHTML = differnce_cnf;
    // }
    // else {
    //     document.getElementById('daily_cnf_arrow').innerHTML = "arrow_downward";
    //     document.getElementById('daily_cnf_arrow').style.color = "green";
    //     document.getElementById('count_diff').innerHTML = differnce_cnf;
    // }
    // if (differnce_rec > 0) {
    //     document.getElementById('daily_rec_arrow').innerHTML = "arrow_upward";
    //     document.getElementById('daily_rec_arrow').style.color = "green";
    //     document.getElementById('count_diff_rec').innerHTML = differnce_rec;
    // }
    // else {
    //     document.getElementById('daily_rec_arrow').innerHTML = "arrow_downward";
    //     document.getElementById('daily_rec_arrow').style.color = "red";
    //     document.getElementById('count_diff_rec').innerHTML = differnce_rec;
    // }
    // if (differnce_ded > 0) {
    //     document.getElementById('daily_ded_arrow').innerHTML = "arrow_upward";
    //     document.getElementById('daily_ded_arrow').style.color = "red";
    //     document.getElementById('count_diff_ded').innerHTML = differnce_ded;
    // }
    // else {
    //     document.getElementById('daily_ded_arrow').innerHTML = "arrow_downward";
    //     document.getElementById('daily_ded_arrow').style.color = "green";
    //     document.getElementById('count_diff_ded').innerHTML = differnce_ded;
    // }


    // const d = "3:00PM - 12 Apr";
    // document.getElementById('data_update_date_cnf').innerHTML = d;
    // document.getElementById('data_update_date_rec').innerHTML = d;
    // document.getElementById('data_update_date_ded').innerHTML = d;
    // document.getElementById('data_update_date_state').innerHTML = d;
}

function get_data2() {
    fetch("https://api.covid19india.org/data.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var x_axis_cnf1 = [];
            var y_axis_cnf1 = [];
            var y_axis_death = [];
            var y_axis_rec = [];
            var counter;
            for(counter = 1; counter < data.statewise.length; counter++){
                x_axis_cnf1[counter] = data.statewise[counter].state; 
                y_axis_cnf1[counter] = Number(data.statewise[counter].confirmed);
                y_axis_death[counter] = Number(data.statewise[counter].deaths);
                y_axis_rec[counter] = Number(data.statewise[counter].recovered);

            }
            draw2(x_axis_cnf1, y_axis_cnf1, y_axis_death, y_axis_rec);

})
}
