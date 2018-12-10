var selectedBorough =  $("#dropdown1 option:selected").val();
var selectedTime = $("#dropdown2 option:selected").val();
var highlightColor = "#D4000D";
var start = -0.5;
var end = 0.5;

function changeBoroughForLineChart() {
  selectedBorough =  $("#dropdown1 option:selected").val();
  selectedTime = $("#dropdown2 option:selected").val();
  if (selectedTime!=0.0){
    start = parseFloat(selectedTime);
  }
  else{
    start = -0.5;
  }
  end = start+1.0;

  $.ajax({
    type:"GET",
    url:
    "./js/nypd.json",
    dataType: "json",
    async:true,
    success:function(data){
      console.log(data);
      doLogic(data);
      buildChart(data);
    },
    error:function(error){
      console.log(error);
    }
  })
}

function changeTimeForLineChart() {
  selectedBorough =  $("#dropdown1 option:selected").val();
  selectedTime = $("#dropdown2 option:selected").val();
  if (selectedTime!=0.0){
    start = parseFloat(selectedTime);
  }
  else{
    start = -0.5;
  }
  end = start+1.0;

  $.ajax({
    type:"GET",
    url:
    "./js/nypd.json",
    dataType: "json",
    async:true,
    success:function(data){
      console.log(data);
      doLogic(data);
      buildChart(data);
    },
    error:function(error){
      console.log(error);
    }
  })
}


console.log ('DOM loaded');

// Set up variables needed for the chart
var peopleInvolvedBRONX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var peopleInvolvedMANHATTAN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var peopleInvolvedQUEENS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var peopleInvolvedBROOKLYN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var peopleInvolvedSTATENISLAND = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


$.ajax({
  type:"GET",
  url:
  "./js/nypd.json",
  dataType: "json",
  async:true,
  success:function(data){
    console.log(data);
    doLogic(data);
    buildChart(data);
  },
  error:function(error){
    console.log(error);
  }
})

// Function to do logic
// Set up data needed for building the chart
function doLogic(data){

  for(var m = 0; m < data.results.length; m++) {
    var timeArray = data.results[m].time.split(":");
    var hour = parseInt(timeArray[0]);
    var timeData = Date.UTC(0, 0, 0, parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]));
    var timeSection = ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM', '12AM'];

    if (hour>=23 || hour<1){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[0]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
        peopleInvolvedBRONX[12]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[0]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
        peopleInvolvedMANHATTAN[12]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[0]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
        peopleInvolvedQUEENS[12]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[0]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
        peopleInvolvedBROOKLYN[12]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[0]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
        peopleInvolvedSTATENISLAND[12]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=1 && hour<3){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[1]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[1]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[1]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[1]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[1]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=3 && hour<5){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[2]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[2]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[2]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[2]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[2]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=5 && hour<7){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[3]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[3]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[3]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[3]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[3]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=7 && hour<9){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[4]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[4]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[4]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[4]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[4]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=9 && hour<11){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[5]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[5]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[5]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[5]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[5]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=11 && hour<13){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[6]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[6]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[6]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[6]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[6]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=13 && hour<15){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[7]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[7]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[7]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[7]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[7]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=15 && hour<17){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[8]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[8]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[8]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[8]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[8]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=17 && hour<19){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[9]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[9]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[9]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[9]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[9]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=19 && hour<21){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[10]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[10]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[10]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[10]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[10]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
    else if (hour>=21 && hour<23){
      if (data.results[m].borough == "BRONX"){
        peopleInvolvedBRONX[11]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/42.47;
      }
      else if (data.results[m].borough == "MANHATTAN"){
        peopleInvolvedMANHATTAN[11]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/22.82;
      }
      else if (data.results[m].borough == "QUEENS"){
        peopleInvolvedQUEENS[11]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/108.1;
      }
      else if (data.results[m].borough == "BROOKLYN"){
        peopleInvolvedBROOKLYN[11]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/69.5;
      }
      else if (data.results[m].borough == "STATEN ISLAND"){
        peopleInvolvedSTATENISLAND[11]+=parseInt(data.results[m].number_of_persons_injured+data.results[m].number_of_persons_killed)/58.69;
      }
    }
  }
  console.log(peopleInvolvedBRONX);
  console.log(peopleInvolvedMANHATTAN);
  console.log(peopleInvolvedQUEENS);
  console.log(peopleInvolvedBROOKLYN);
  console.log(peopleInvolvedSTATENISLAND);
}


// Function to build charts
function buildChart(data){

  console.log(selectedBorough);

  Highcharts.chart('chart-3', {
    chart: {
      type: 'line',
      style: {
            fontFamily: 'Open Sans'
        },
      height:'334px'
    },
    title: {
      text: 'People Involved in Collisions By Borough',
      style: {
            fontWeight: '600'
        }
    },
    subtitle: {
      text: 'Source: NYC Open Data'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM', '12AM'],
      plotBands: [{ // mark the selected time period
        color: selectedTime=="0.0" ? 'white':'#D46C75',
        from: start,
        to: end
      }]
    },
    yAxis: {
      title: {
        text: 'Number of People Involved Per Square Mile'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Highcharts.numberFormat(this.y,1);
          }
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'Bronx',
      data: peopleInvolvedBRONX,
      color: selectedBorough=="BRONX" ? highlightColor : "#D9CBA3"
    }, {
      name: 'Manhattan',
      data: peopleInvolvedMANHATTAN,
      color: selectedBorough=="MANHATTAN" ? highlightColor : "#9ACFEB"
    }, {
      name: 'Brooklyn',
      data: peopleInvolvedBROOKLYN,
      color: selectedBorough=="BROOKLYN" ? highlightColor : "#D5FFDF"
    }, {
      name: 'Queens',
      data: peopleInvolvedQUEENS,
      color: selectedBorough=="QUEENS" ? highlightColor : "#FFD5D8"
    }, {
      name: 'Staten Island',
      data: peopleInvolvedSTATENISLAND,
      color: selectedBorough=="STATEN ISLAND" ? highlightColor : "#AAB0AA"
    }]
  });


}
