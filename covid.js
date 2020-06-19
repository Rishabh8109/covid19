
               fetch('https://api.covid19india.org/data.json')
               .then(res => res.json())
               .then(data => {
                    covidData(data);
                    covidDatawithMap(data);
                    getStates(data);
                    getPerticularState(data);
               });

               var covidData = (data) => {
                    // get id form html page
                    const conform = document.getElementById("conform");
                    const act = document.getElementById("Active");
                    const recover = document.getElementById("Recovered");
                    const death = document.getElementById("Deaths");
                    const states = document.getElementById("states");
                    

               // get Data form api

               let conf = data.statewise[0].confirmed;
               let Act = data.statewise[0].active;
               let Death = data.statewise[0].deaths;
               let Recover = data.statewise[0].recovered;

               conform.innerHTML = conf;
                    act.innerHTML = Act;
                    death.innerHTML = Death;
                    recover.innerHTML = Recover;

                    // get data with prticular state

                    var stateWise = data.statewise;

                    stateWise.forEach(element => {
                    
                    let tr = document.createElement('tr');
                    tr.innerHTML =`
                         <td>${element.state}</td>
                         <td>${element.confirmed}</td>
                         <td>${element.active}</td>
                         <td>${element.recovered}</td>
                         <td>${element.deaths}</td>
                    `;
                    states.appendChild(tr);
               
                    });
               }

          function covidDatawithMap(CovidData) {
               var states = CovidData.statewise;
               
          
          
               var labels = [];
               var confirmData = [];
               var ActiveData = [];
          
               var RecoverData = [];
               var DeathData = [];
          

               states.forEach(element => {
               labels.push(element.state);
               confirmData.push(element.confirmed);
               ActiveData.push(element.active);
               RecoverData.push(element.recovered);
               DeathData.push(element.deaths);
               
               });

               
               var myChart = document.getElementById('myChart');
               var myChart2 = document.getElementById('myChart2');
               
               //   map(statewise)
               var data = {
                    labels : labels,
                    datasets : [
                         {
                              label : "Confirmed",
                              data : confirmData,
                              backgroundColor : "red",
                              borderColor : "rgba(255, 1, 1, 0.469)",
                              borderWidth : 3,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                         {
                              label : "Active",
                              data : ActiveData,
                              backgroundColor : "blue",
                              borderColor : "rgba(0, 34, 255, 0.258);",
                              borderWidth : 3,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                         {
                              label : "Recoverd",
                              data : RecoverData,
                              backgroundColor : "green",
                              borderColor : "rgba(0, 128, 0, 0.537)",
                              borderWidth : 3,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                         {
                              label : "Death",
                              data : DeathData,
                              backgroundColor : "black",
                              borderColor : "rgba(0, 0, 0, 0.537)",
                              borderWidth : 3,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         }

                    ]
               }
               
               // init variable
               var TimeSeriesCase = CovidData.cases_time_series;
               var labels2 = [];
               var confirmData2 = [];
               var ActiveData2 = [];
               var RecoverData2 = [];

               TimeSeriesCase.forEach(element => {
                    labels2.push(element.date);
                    confirmData2.push(element.dailyconfirmed);
                    ActiveData2.push(element.dailydeceased);
                    RecoverData2.push(element.dailyrecovered);
               
               });
               //   map(case-time-series)
               var data2 = {
                    labels : labels2,
                    datasets : [
                    {
                         label : "daily-Confirmed",
                         data : confirmData2,
                         backgroundColor : "red",
                         borderColor : "rgba(255, 1, 1, 0.469)",
                         borderWidth : 1,
                         fill : false,
                         lineTension : 0,
                         pointRadius : 1
                    },
                    {
                         label : "daily-active",
                         data : ActiveData2,
                         backgroundColor : "blue",
                         borderColor : "rgba(0, 34, 255, 0.258);",
                         borderWidth : 1,
                         fill : false,
                         lineTension : 0,
                         pointRadius : 1


                         
                    },
                    {
                         label : "daily-recoverd",
                         data : RecoverData2,
                         backgroundColor : "green",
                         borderColor : "rgba(0, 128, 0, 0.537)",
                         borderWidth : 1,
                         fill : false,
                         lineTension : 0,
                         pointRadius : 1
                    }
                    ]
               }
          

               Chart.defaults.global.defaultFontSize = 10;
               var linechart = new Chart(myChart , {
                    type : 'bar',
                    data : data,
                    options : {
                         animation : {
                              duration : 3000,
                              easing : 'easeInOutQuad'
                         },
                        responsive : true,
                        maintainAspectRatio : false
                    }
               });

               var linechart2 = new Chart(myChart2 , {
                    type : 'line',
                    data : data2,
                    options : {
                         animation : {
                              duration : 3000,
                              easing : 'easeInOutQuad'
                         },
                       responsive : true,
                        maintainAspectRatio : false
                    }
               });

          }


          //  Add animation on the text and image 

          var slideleft = {
               duration  : 1000,
               distance :'10%',
               origin : 'left',


          }
               var slideRight = {
               duration  : 1000,
               distance :'10%',
               origin : 'right',

          }
          var slideFromBottom = {
               duration  : 700,
               distance :'10%',
               origin : 'bottom',

          }

          var opc  = {
               opacity : .7 ,
               reset : true
               
          }

          ScrollReveal().reveal('.smooth1' , slideleft);
          ScrollReveal().reveal('.smooth2' , slideRight);
          ScrollReveal().reveal('.case-section' , slideFromBottom);
          ScrollReveal().reveal('.slideBottom' , slideFromBottom);

          ScrollReveal().reveal('.logo' , opc);



          // get states form database 

          function getStates(states) {
               const sel =  document.getElementById('getstates');
          
               let getstate = states.statewise;
               
               getstate.forEach((element , index) => {
                    var option = document.createElement('option');
               option.setAttribute('value' , `${index}`);
               option.innerText = `${element.state}`;
                    sel.appendChild(option);
          
               });

          // invoking function
          
               
          }
          

          
          function getPerticularState(getStateValue) {
               
                const sel =  document.getElementById('getstates');
                const getState =  getStateValue.statewise;
               
               sel.addEventListener('change' ,() => {
                    // inti var for state value

               // var confirmData = [];
               var ActiveData = [];
               var RecoverData = [];
               var DeathData = [];
               let stateVal = sel.value;   
                    
               
          
               // show data with perticluar state on map
               // push value in newlable
               //array iteration using forEase for taking case

          
               
               // get chart id
               var myChart_1 = document.getElementById('myChart-1');
               var myChart_2 = document.getElementById('myChart-2');
               var myChart_3 = document.getElementById('myChart-3');
               var myChart_4 = document.getElementById('myChart-4');

               // confiremd case chart
               var data3  = {
                    labels : [getState[stateVal].state],
                    datasets : [
                         {
                              label : "Confirmed",
                              data : [getState[stateVal].confirmed],
                              backgroundColor : "red",
                              borderColor : "rgba(255, 1, 1, 0.469)",
                              borderWidth : 3,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                    ]
               }
                    var linechart3 = new Chart(myChart_1 , {
                    type : 'line',
                    data : data3,
                    
               });


               //// Acitvated case chart
          
               var Data2  = {
                    labels : [getState[stateVal].state],
                    datasets : [
                         {
                              label : "Active",
                              data : [getState[stateVal].active],
                              backgroundColor : "blue",
                              borderColor : "lightblue",
                              borderWidth : 10,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                    ]
               }
                    var linechart4 = new Chart(myChart_2 , {
                    type : 'line',
                    data : Data2,
                      options : {  responsive : true,
                                   maintainAspectRatio : false
                                }
                    
               });

               // Recover cases chart
               var Data3 = {
                    labels : [getState[stateVal].state],
                    datasets : [
                         {
                              label : "Recoverd",
                              data : [getState[stateVal].recovered],
                              backgroundColor : "green",
                              borderColor : "rgba(0, 128, 0, 0.537)",
                              borderWidth : 6,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 3
                         },
                    ]
               } 
               var linechart5 = new Chart(myChart_3 , {
                    type : 'line',
                    data : Data3,
                 
                    
               });
               
          // Death cases chart
               var Data4  = {
                    labels : [getState[stateVal].state],
                    datasets : [
                         {
                              label : "Death",
                              data : [getState[stateVal].deaths],
                              backgroundColor : "black",
                              borderColor : "rgba(0, 0, 0, 0.537)",
                              borderWidth : 6,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                    ]
               }
               var linechart6 = new Chart(myChart_4 , {
               type : 'line',
               data : Data4,
                  options : {  responsive : true,
                                   maintainAspectRatio : false
                                }
               
          });
          });
               // invoking finciotn for show Total case chart
               AllStateChart(getState);
               
          }

    
           /// calling function for AllStatechart
          function AllStateChart(getState) {
               var myChart_1 = document.getElementById('myChart-1');
               var myChart_2 = document.getElementById('myChart-2');
               var myChart_3 = document.getElementById('myChart-3');
               var myChart_4 = document.getElementById('myChart-4');

               var Data  = {
                    labels : [getState[0].state],
                    datasets : [
                         {
                              label : "Confirmed",
                              data : [getState[0].confirmed],
                              backgroundColor : "red",
                              borderColor : "rgba(255, 1, 1, 0.469)",
                              borderWidth : 10,
                              fill : true,
                              lineTension: 0,
                              pointRadius : 2
                         },
                    ]
               }

               

               var linechart3 = new Chart(myChart_1 , {
                    type : 'line',
                    data : Data,
                  options : {  responsive : true,
                                   maintainAspectRatio : false
                                }
                    
               });

               var Data2  = {
                    labels : [getState[0].state],
                    datasets : [
                         {
                              label : "Active",
                              data : [getState[0].active],
                              backgroundColor : "blue",
                              borderColor : "lightblue",
                              borderWidth : 10,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                    ]
               }

               

               var linechart4 = new Chart(myChart_2 , {
                    type : 'line',
                    data : Data2,
                  options : {  responsive : true,
                                   maintainAspectRatio : false
                                }
                    
               });

               var Data3 = {
                    labels : [getState[0].state],
                    datasets : [
                         {
                              label : "Recoverd",
                              data : [getState[0].recovered],
                              backgroundColor : "green",
                              borderColor : "rgba(0, 128, 0, 0.537)",
                              borderWidth : 6,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 3
                         },
                    ]
               } 
               var linechart5 = new Chart(myChart_3 , {
                    type : 'line',
                    data : Data3,
                  options : {  responsive : true,
                                   maintainAspectRatio : false
                                }
                    
               });


               var Data4  = {
                    labels : [getState[0].state],
                    datasets : [
                         {
                              label : "Death",
                              data : [getState[0].deaths],
                              backgroundColor : "black",
                              borderColor : "rgba(0, 0, 0, 0.537)",
                              borderWidth : 6,
                              fill : false,
                              lineTension: 0,
                              pointRadius : 2
                         },
                    ]
               }

               

               var linechart6 = new Chart(myChart_4 , {
                    type : 'line',
                    data : Data4,
                  options : {  responsive : true,
                                   maintainAspectRatio : false
                                }
                    
               });
          }



        
