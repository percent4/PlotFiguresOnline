$(document).ready(function(){
     $("#btn").click(function(){
          alert("数据提交成功！");
     });
});

$(document).ready(function(){
  $("#chart").click(function(){
    $(this).empty();
  });
});

function draw(){
    var chart = $("#chart").text();
    obj = JSON.parse(chart);

    var chartType = obj.chartType;

    if(chartType == "折线图"){
        drawLineChart();
    }

    if(chartType == "饼图"){
        drawPieChart();
    }

    if(chartType == "柱形图"){
        drawBarChart();
    }
}

function drawLineChart(){
    Highcharts.setOptions({
        lang:{
            contextButtonTitle:"图表导出菜单",
            decimalPoint:".",
	        printChart:"打印图表",
            downloadJPEG:"下载JPEG图片",
            downloadPDF:"下载PDF文件",
            downloadPNG:"下载PNG文件",
            downloadSVG:"下载SVG文件",
        }
    });

    var chart = $("#chart").text();
    obj = JSON.parse(chart);

    $(document).ready(function() {

        var title = {
            text: obj.title
        };

        var xAxis = {
	        title: {
		        text: obj.xlabel
	        },
            categories: obj.xdata
        };

        var yAxis = {
            title: {
                text: obj.ylabel
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        };

        var legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        };

        var series =  [
            {
                name: obj.ylabel,
                data: obj.ydata
            }
        ];

        var credits = {enabled: false};

        var exporting = {
                          enabled:true,
                          filename: obj.title
                         };

        var json = {};

        json.title = title;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.legend = legend;
        json.series = series;
        json.credits = credits;
        json.exporting = exporting;

        $('#container').highcharts(json);
 });

}

function drawPieChart(){

    Highcharts.setOptions({
        lang:{
            contextButtonTitle:"图表导出菜单",
            decimalPoint:".",
	        printChart:"打印图表",
            downloadJPEG:"下载JPEG图片",
            downloadPDF:"下载PDF文件",
            downloadPNG:"下载PNG文件",
            downloadSVG:"下载SVG文件",
        }
    });

    $(document).ready(function() {

        var chart = $("#chart").text();
        obj = JSON.parse(chart);

        var x = obj.xdata;
        var y = obj.ydata ;
        var data = new Array();

        for(var i=0; i< x.length; i++){
            data[i] = new Array(x[i], y[i]);
        }


        var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        };

        var title = {
            text: obj.title
        };

        var plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
		            useHTML: true,
                    enabled: true,
                    formatter: function() {
							return '<b>' + x[this.point.x] + '</b>: ' + this.point.y
					},
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
            },
		        showInLegend: true
            }
        };


        var series= [{
            type: 'pie',
            name: obj.ylabel,
            data: data
        }];

        var credits = {enabled: false};
        var exporting = {enabled:true};

        var json = {};
        json.chart = chart;
        json.title = title;
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;
        json.exporting = exporting;

        $('#container').highcharts(json);

    });
}

function drawBarChart(){

    Highcharts.setOptions({
        lang:{
            contextButtonTitle:"图表导出菜单",
            decimalPoint:".",
	        printChart:"打印图表",
            downloadJPEG:"下载JPEG图片",
            downloadPDF:"下载PDF文件",
            downloadPNG:"下载PNG文件",
            downloadSVG:"下载SVG文件",
        }
    });

    $(document).ready(function() {

        var chart = $("#chart").text();
                obj = JSON.parse(chart);

        var chart = {
            type: 'column'
        };

        var title = {
            text: obj.title
        };

        var xAxis = {
            title: {text: obj.xlabel},
            categories: obj.xdata,
            crosshair: true
        };

        var yAxis = {
            title: {
                text: obj.ylabel
            }
        };


        var tooltip = {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        };

        var plotOptions = {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        };

        var series= [{
                name: obj.ylabel,
                data: obj.ydata
            }];

        var credits = {enabled: false};
        var exporting = {enabled:true};

        var json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;
        json.exporting = exporting;
        $('#container').highcharts(json);

});
}
