
      fetch('https://api.covid19india.org/data.json')
     .then(res => res.json())
     .then(data => {
          covidData(data);
          covidDatawithMap(data);
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
     console.log(ActiveData);
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
                    borderColor : "lightblue",
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
                    borderWidth : 2,
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
                   borderWidth : 3,
                   fill : false,
                  
                   pointRadius : 2
              },
              {
                   label : "daily-active",
                   data : ActiveData2,
                   backgroundColor : "blue",
                   borderColor : "lightblue",
                   borderWidth : 3,
                   fill : false,
                 
                   pointRadius : 2
              },
              {
                   label : "daily-recoverd",
                   data : RecoverData2,
                   backgroundColor : "green",
                   borderColor : "rgba(0, 128, 0, 0.537)",
                   borderWidth : 3,
                   fill : false,
                  
                   pointRadius : 2
              }
          ]
     }
   

     

      

   
      var linechart = new Chart(myChart , {
           type : 'line',
           data : data,
          options : {
               animation : {
                     duration : 3000,
                     easing : 'easeInOutQuad'
               }
          }
      });

      var linechart2 = new Chart(myChart2 , {
           type : 'line',
           data : data2,
          options : {
               animation : {
                     duration : 3000,
                     easing : 'easeInOutQuad'
               }
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
     duration  : 1500,
     distance :'10%',
     origin : 'bottom',
  

    }

    var opc  = {
         opacity : .5,
         
    }

    ScrollReveal().reveal('.smooth1' , slideleft);
    ScrollReveal().reveal('.smooth2' , slideRight);
    ScrollReveal().reveal('.case-section' , slideFromBottom);

    ScrollReveal().reveal('.logo' , opc);