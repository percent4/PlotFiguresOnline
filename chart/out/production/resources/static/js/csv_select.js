function load(){
     var test = window.location.search;

     var csv_file = "debt.csv"
     var xvar = "x";
     var yvar = "y";
     var title = "";

     if(test != ""){
         csv_file = test.split("=")[1].split("&")[0];
         var charttype = test.split("=")[2].split("&")[0];
         xvar = test.split("=")[3].split("&")[0];
         yvar = test.split("=")[4].split("&")[0];
         title = decodeURI(test.split("=")[5]);
     }

     var k = document.getElementById("csv_select").options;
     for (var i=0; i<k.length; i++) {
          if (k[i].value == csv_file) {
              k[i].selected = true;
              break;
          }
     }

     if(xvar != "x" && yvar != "y" && title != ""){

         var charttypes = document.getElementById("chartType").options;
         for (var i=0; i<charttypes.length; i++) {
              if (charttypes[i].value == charttype) {
                   charttypes[i].selected = true;
                   break;
              }
         }

         var x = document.getElementById("xvar").options;
         for (var i=0; i<x.length; i++) {
             if (x[i].value == xvar) {
                 x[i].selected = true;
                 break;
             }
         }

         var y = document.getElementById("yvar").options;
         for (var i=0; i<y.length; i++) {
              if (y[i].value == yvar) {
                   y[i].selected = true;
                   break;
              }
         }

         document.getElementById("title").value = title;
     }

}