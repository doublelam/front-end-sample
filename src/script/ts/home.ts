const sass = require("../../style/sass/home.sass");
const pug = require("../../docs/pugs/home.pug");
import { Dom } from "./utils/Dom";
import { Tool } from "./utils/Tool";

class Home {
  private container = document.getElementById("agents-container");
  private menuIcon = document.getElementById("menu-icon");
  private closeBtn = document.getElementById("nav-close");
  private sideNav = document.getElementById("side-nav");

  public start(): void {
    console.log("HOME IS LAUNCHING");
    this.navOperate();
    this.bindEvents();
  }

  private bindEvents(): void {
    this.container.onclick = e => {
      Dom.onClicked(e, {
        "add": (ev, dom) => {
          this.showPopup(dom);
        },
        "btn-add": (ev, dom) => {
          this.addTags(dom);
        },
        "btn-cancel": (ev, dom) => {
          const popup = Dom.getParent(dom, "popup");
          this.dismissPopup(popup);
        },
        "icon-close": (ev, dom) => {
          const popup = Dom.getParent(dom, "popup");
          this.dismissPopup(popup);
        },
        "icon-trash": (ev, dom) => {
          this.deleteTag(dom);
        },
        "mask": (ev, dom) => {
          const popup = Dom.getParent(dom, "popup");
          this.dismissPopup(popup);
        },

      });
    };
  }

  private deleteTag(tag: HTMLElement): void {
    tag.parentElement.remove();
  }

  private showPopup(dom: HTMLElement): void {
    const popup = dom.parentElement.getElementsByClassName("popup")[0] as HTMLElement;
    Dom.show(popup);
  }

  private dismissPopup(popup: HTMLElement) {
    Dom.hidden(popup);
  }

  private createTag(name: string): HTMLElement {
    const tagEle = document.createElement("li");
    tagEle.className = "package";
    const span = document.createElement("span");
    span.className = "name";
    span.innerText = name;
    const trash = document.createElement("i");
    trash.className = "icon-trash";
    tagEle.append(span);
    tagEle.append(trash);
    return tagEle;
  }

  private addTags(dom: HTMLElement): void {
    const inputDom = Dom.getParent(dom, "content").getElementsByClassName("input")[0] as HTMLInputElement;
    const val = inputDom.value.trim();
    if (!val) {
      return;
    }
    console.log("input", val);
    const names = Tool.getListFromChars(val);
    const tags = names.map(name => this.createTag(name)) as Node[];
    const packagesContainer = Dom.getParent(dom, "detail").getElementsByClassName("packages")[0];
    for (const tag of tags) {
      packagesContainer.append(tag);
    }
    inputDom.value = "";
    this.dismissPopup(Dom.getParent(dom, "popup"));
  }

  private navOperate(): void {
    this.menuIcon.onclick = e => {
      console.log("nav")
      this.sideNav.style.left = "0";
    };
    this.closeBtn.onclick = e => {
      this.sideNav.style.left = "-100%";
    };
  }
}

const home = new Home();
home.start();
