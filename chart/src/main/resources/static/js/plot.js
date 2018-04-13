function draw(){
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

    var chart = document.getElementById("chart").innerHTML;
    obj = JSON.parse(chart);
    alert(typeof obj.xdata[0]);

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
