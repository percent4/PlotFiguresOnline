package com.hello.chart.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@Controller
public class ChartController {

    private String file_path;
    //Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "E://SpringUploadFile/";


    @GetMapping("/chartplot")
    public String getForm(Model model) {
        model.addAttribute("chart", new Chart());
        return "chartplot";

    }

    @PostMapping("/chartplot")
    public String postSubmit(@ModelAttribute Chart chart, Map<String,Object> map) {
        String chartType = chart.getChartType();
        String xdata = chart.getXdata();
        String ydata = chart.getYdata();
        String title = chart.getTitle();
        String xlabel = chart.getXlabel();
        String ylabel = chart.getYlabel();
        Chart chart1 = new Chart(chartType, xdata, ydata, title, xlabel, ylabel);
        map.put("chart", chart);

        return "chartplot";

    }

    @GetMapping("/csvplot")

    public String getCSV(Map<String,Object> map, HttpServletRequest request) {

        File file = new File(UPLOADED_FOLDER);
        String[] list2 = file.list();
        map.put("csvfiles", list2);

        String file_name = request.getParameter("csv");

        if(file_name == null){
            file_name = "debt.csv";
        }

        readCSV read_csv = new readCSV(UPLOADED_FOLDER+file_name);
        List<String> columns = Arrays.asList(read_csv.read().get(0).split(","));
        map.put("columns", columns);

        String xvar = request.getParameter("xvar");
        String yvar = request.getParameter("yvar");
        String title = request.getParameter("title");

        if(xvar == null){
            xvar = "x";
            yvar = "x";
            title = "";
        }

        if(xvar != "x" && yvar != "x" && title != ""){
            readCSV read_content = new readCSV(UPLOADED_FOLDER+file_name);
            List<String> content = read_content.read();

            List<String> headers = Arrays.asList(content.get(0).split(","));

            int x_index = headers.indexOf(xvar);
            int y_index = headers.indexOf(yvar);

            List<String> x = new ArrayList<>();
            List<Double> y = new ArrayList<>();

            for(int i=1; i < content.size(); i++){
                x.add(content.get(i).split(",")[x_index]);
                y.add(Double.valueOf(content.get(i).split(",")[y_index]));
            }

            map.put("xdata", x);
            map.put("xlabel", xvar);
            map.put("ydata", y);
            map.put("ylabel", yvar);
            map.put("title", title);
        }

        return "csvplot";
    }

    @PostMapping("/upload")
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "文件为空! 请选择非空文件上传！");
            return "redirect:uploadStatus";
        }

        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            file_path = UPLOADED_FOLDER + file.getOriginalFilename();

            redirectAttributes.addFlashAttribute("message",
                    "您已成功上传 '" + file.getOriginalFilename() + "', 该文件大小约为 " +bytes.length/1024+" KB.");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "redirect:/uploadStatus";
    }

    @GetMapping("/uploadStatus")
    public String uploadStatus() {
        return "uploadStatus";
    }

    @GetMapping("/review")
    public String review(Map<String, Object> map) {

        readCSV read_csv = new readCSV(file_path);
        List<String> result = read_csv.read();

        map.put("result", result);

        return "review";
    }

}
