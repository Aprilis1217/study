// import { Content } from "./content";
// import { Footer } from "./footer";
// import { Herader } from "./header";
namespace Home {
  export class Page {
    constructor () {
      new Components.Herader();
      new Components.Content();
      new Components.Footer()
    }
  }
}