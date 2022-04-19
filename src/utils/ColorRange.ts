abstract class ColorRange {
  abstract 50: string;
  abstract 100: string;
  abstract 200: string;
  abstract 300: string;
  abstract 400: string;
  abstract 500: string;
  abstract 600: string;
  abstract 700: string;
  abstract 800: string;
  abstract 900: string;
}

class Greys extends ColorRange {
  50: '#FAFAFA';
  100: '#F5F5F5';
  200: '#EEEEEE';
  300: '#E0E0E0';
  400: '#BDBDBD';
  500: '#9E9E9E';
  600: '#757575';
  700: '#616161';
  800: '#424242';
  900: '#212121';
}

export { Greys as GreysRange };
export default ColorRange;
