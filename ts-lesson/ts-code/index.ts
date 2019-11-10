interface Search {
  (str: string, keyword: string): boolean;
}
let mySearch: Search;
mySearch = function (strr: string, keyword: string) {
  let res = strr.indexOf(keyword);
  return res > -1;
}