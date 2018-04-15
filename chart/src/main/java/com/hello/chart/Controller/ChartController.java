package com.hello.chart.Controller;

import com.sun.javafx.binding.StringFormatter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;


@Controller
public class ChartController {

    private String file_path;

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

    //Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "E://SpringUploadFile/";

    @GetMapping("/")
    public String index() {
        return "upload";
    }

    @PostMapping("/upload")
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "The file is empty! Please select a non-empty file to upload");
            return "redirect:uploadStatus";
        }

        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            file_path = UPLOADED_FOLDER + file.getOriginalFilename();

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "', the file is about " +bytes.length/1024+" KB.");

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

        for(int i=0; i < result.size(); i++){
            map.put("result", result);
        }

        return "review";
    }

}
