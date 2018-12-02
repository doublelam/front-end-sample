interface EventMap {
  [x: string]: (e: MouseEvent, dom: HTMLElement) => void;
}
export class Dom {
  public static show(dom: HTMLElement, duration = 200, display = "block"): void {
    dom.style.display = display;
    dom.style.opacity = "0";
    dom.style.transitionProperty = "opacity";
    dom.style.transitionDuration = String(duration / 1000) + "s";
    dom.style.opacity = "1";
  }

  public static hidden(dom: HTMLElement, duration = 200): void {
    dom.style.transitionProperty = "opacity";
    dom.style.transitionDuration = String(duration / 1000) + "s";
    dom.style.opacity = "0";
    window.setTimeout(() => {
      dom.style.display = "none";
    }, duration);
  }

  public static onClicked(e: MouseEvent, eMap: EventMap): void {
    const keys = Object.keys(eMap);
    const tarDom = e.target as HTMLElement;
    const domParents = Dom.getParents(tarDom);
    for (const val of keys) {
      loopInner:
      for (const parent of domParents) {
        if (parent.className.split(/\s+/).indexOf(val) !== -1) {
          if (typeof eMap[val] === "function") {
            eMap[val].call(parent, e, parent);
          }
          break loopInner;
        }
      }
    }
  }

  public static getParent(dom: HTMLElement, parentClassname: string): HTMLElement | null {
    const parents = Dom.getParents(dom);
    const nameRE = new RegExp(parentClassname);
    for (const val of parents) {
      if (nameRE.test(val.className)) {
        return val;
      }
    }
    return null;
  }

  public static getParents(dom: HTMLElement): HTMLElement[] {
    const getParentsI = (d: HTMLElement, pds: HTMLElement[]) => {
      const parentElement = d.parentElement;
      const sumParents = pds.concat([parentElement]);
      if (parentElement.tagName === "HTML") {
        return pds.concat([parentElement]);
      }
      return getParentsI(parentElement, sumParents);
    };
    return getParentsI(dom, [dom]);
  }
}
