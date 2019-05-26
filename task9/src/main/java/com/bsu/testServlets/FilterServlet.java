package com.bsu.testServlets;
import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class FilterServlet implements Filter {
    @Override
    public void destroy() {
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        long start=System.currentTimeMillis();
        chain.doFilter(request,response);
        long end=System.currentTimeMillis();

        HttpServletResponse httpServletResponse=(HttpServletResponse) response;
        HttpServletRequest httpRequest =(HttpServletRequest) request;
        String path=httpRequest.getRequestURI();
        String method=httpRequest.getMethod();
        System.out.println(String.format("%s -http://localhost:8080%s -  %d ms",method, path,end-start));
    }

    @Override
    public void init(FilterConfig config) throws ServletException {

    }

}
