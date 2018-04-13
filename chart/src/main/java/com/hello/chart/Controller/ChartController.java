package com.hello.chart.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Controller
public class ChartController {

    @GetMapping("/chartplot")
    public String getForm(Model model) {
        model.addAttribute("chart", new Chart());
        return "chartplot";
    }

    @PostMapping("/chartplot")
    public String postSubmit(@ModelAttribute Chart chart, Map<String,Object> map) {
        System.out.println(chart.getXdata());
        System.out.println(chart.getYdata());
        System.out.println(chart.getTitle());
        System.out.println(chart.getXlabel());
        System.out.println(chart.getYlabel());
        String xdata1 = chart.getXdata();
        String ydata1 = chart.getYdata();
        String title1 = chart.getTitle();
        String xlabel1 = chart.getXlabel();
        String ylabel1 = chart.getYlabel();
        Chart chart1 = new Chart(xdata1, ydata1, title1, xlabel1, ylabel1);
        map.put("chart", chart1);
        return "chartplot";

    }
}
