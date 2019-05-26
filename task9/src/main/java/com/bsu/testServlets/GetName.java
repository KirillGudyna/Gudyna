package com.bsu.testServlets;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GetName extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str = request.getQueryString();
        if(str.length()<=100){
        response.getOutputStream().println(str.substring(0,1).toUpperCase()+str.substring(1,str.length()));
        }
        else{
            response.getOutputStream().println("Name very long, check you URL-Address");
        }
    }

}
