package com.hello.chart.Controller;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import com.csvreader.CsvReader;
import com.csvreader.CsvWriter;

public class readCSV {

    private String file_path;

    readCSV(){}

    readCSV(String file_path){
        this.file_path = file_path;
    }

    public String getFile_path() {
        return file_path;
    }

    public void setFile_path(String file_path) {
        this.file_path = file_path;
    }

    public List<String> read() {

        List<String> result = new ArrayList<>();

        try {
            // 创建CSV读对象
            CsvReader csvReader = new CsvReader(file_path);

            while (csvReader.readRecord()){
                // 读取每一行数据，以逗号分开
                System.out.println(csvReader.getRawRecord());
                result.add(csvReader.getRawRecord());
            }

            csvReader.close();

            return result;

        } catch (IOException e) {
            e.printStackTrace();

            return result;
        }
    }

}
