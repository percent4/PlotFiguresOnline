function load(){
     var test = window.location.search;

     csv_file = "debt.csv"
     xvar = "x";
     yvar = "y";
     title = "";

     if(test != ""){
         csv_file = test.split("=")[1].split("&")[0];
         xvar = test.split("=")[2].split("&")[0];
         yvar = test.split("=")[3].split("&")[0];
         title = test.split("=")[4];
     }

     var k = document.getElementById("csv_select").options;
     for (var i=0; i<k.length; i++) {
          if (k[i].value == csv_file) {
              k[i].selected = true;
              break;
          }
     }

     if(xvar != "x" && yvar != "y" && title != ""){
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