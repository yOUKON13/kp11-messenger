function filterByProp(arr: Array<any>, prop: string) {
  const seen: any = {};
  const result = arr.filter(item => {
    if (seen[item[prop]]) {
      return false;
    } else {
      seen[item[prop]] = true;
      return true;
    }
  });
  return result;
}

export default filterByProp;
