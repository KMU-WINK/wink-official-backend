package com.github.kmu_wink.wink_official_backend.common.util;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

public class ImageUtil {

    public static int getWidth(InputStream input) throws IOException {

        BufferedImage image = ImageIO.read(input);

        return image.getWidth();
    }

    public static int getHeight(InputStream input) throws IOException {

        BufferedImage image = ImageIO.read(input);

        return image.getHeight();
    }
}
