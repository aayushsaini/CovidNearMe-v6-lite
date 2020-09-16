function load_scripts() {
    draw();
}



const x_axis_cnf = [];
const y_axis_cnf = [];
const x_axis_rec = [];
const y_axis_rec = [];
const x_axis_ded = [];
const y_axis_ded = [];
const x_axis_state = [];
const y_axis_state = [];

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
                label: "No. of death cases in India",
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
    const rows = data.split('\n').slice(0);
    rows.forEach(row => {
        const columns = row.split(',');
        const date = columns[0];
        const confirm_cases = columns[2];
        const recover_cases = columns[4];
        const death_cases = columns[6];
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
        const confirm_cases = columns2[2];
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
        document.getElementById('count_diff_ded').innerHTML = differnce_rec;
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