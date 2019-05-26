package com.bsu.servlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@MultipartConfig
public class servletUpload extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String photoLink = req.getParameter("photoLink");
        if (photoLink == null)
            req.getRequestDispatcher("/WEB-INF/UploadTest.html").forward(req, resp);
        else {
            if (photoLink.length() == 0) {
                resp.getWriter().write("Type smth\n");
                resp.setContentType("text/html");
                req.getRequestDispatcher("/WEB-INF/UploadTest.html").include(req, resp);
            } else {

                String appPath = req.getServletContext().getRealPath("");
                appPath = appPath.replace('\\', '/');
                String fullSavePath;

                if (appPath.endsWith("/"))
                    fullSavePath = appPath + "upload/";
                else
                    fullSavePath = appPath + "/" + "upload/";

                Path path = Paths.get(fullSavePath + photoLink + ".jpg");

                if (Files.exists(path)) {

                    resp.setContentType("text/html");
                    resp.getWriter().write("<img src=\"upload/" + photoLink + ".jpg\" width=\"200\" height=\"200\">");
                    req.getRequestDispatcher("/WEB-INF/UploadTest.html").include(req, resp);
                } else {

                    resp.getWriter().write("No such photo\n");
                    resp.setContentType("text/html");
                    req.getRequestDispatcher("/WEB-INF/UploadTest.html").include(req, resp);
                }
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String appPath = req.getServletContext().getRealPath("");
        appPath = appPath.replace('\\', '/');
        String fullSavePath;

        if (appPath.endsWith("/"))
            fullSavePath = appPath + "upload";
        else
            fullSavePath = appPath + "/" + "upload";


        File fileSaveDir = new File(fullSavePath);
        if (!fileSaveDir.exists())
            fileSaveDir.mkdir();

        Part part = req.getPart("fileName");

        if (part.getSize() != 0) {
            String fileName = Integer.toString(Math.abs(new Random().nextInt()));
            String filePath = fullSavePath + File.separator + fileName + ".jpg";
            Path path = Paths.get(filePath);

            while (Files.exists(path)) {
                fileName = Integer.toString(new Random().nextInt());
                filePath = fullSavePath + File.separator + fileName + ".jpg";
                path = Paths.get(filePath);
            }

            part.write(filePath);
        }
        doGet(req, resp);
    }
}
