const sass = require("../../style/sass/home.sass");
const pug = require("../../docs/pugs/home.pug");

class Home {
  public start() {
    console.log("HOME IS LAUNCHING");
  }
}

const home = new Home();
home.start();
