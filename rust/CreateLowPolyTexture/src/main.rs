use image::{RgbImage, Rgb};

fn main() {
    let mut img = RgbImage::new(1024, 1024);
  
    let mut x_x = 0;
    let mut y_y = 0;
    let mut x_x_x = 0;
    for r in 0..9 {
        for g in 0..9 {
            for b in 0..9 {
                for x in 0..32 {
                    for y in 0..32 {
                        let mut color_r = r*32;
                        let mut color_g = g*32;
                        let mut color_b = b*32;
                        if color_r == 256 {
                            color_r = 255;
                        }
                        if color_g == 256 {
                            color_g = 255;
                        }
                        if color_b == 256 {
                            color_b = 255;
                        }
                        img.put_pixel(x+x_x, y+y_y, Rgb([color_r as u8, color_g as u8 , color_b as u8]));
                    }
                }
                x_x = x_x+32;
            }
            y_y = y_y+32;
            if y_y>32*9*3-1 
            {
                y_y = 0;
                x_x_x = x_x_x+32*9;
            }
            x_x = x_x_x;

        }
        
    }

    img.save("test.png");
}
