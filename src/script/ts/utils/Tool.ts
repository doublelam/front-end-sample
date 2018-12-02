export class Tool {
  public static getListFromChars(chars: string, split = new RegExp("\\s*,\\s*", "g")): string[] {
    return chars.split(split);
  }
}
