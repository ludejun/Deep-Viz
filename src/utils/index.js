// 千分位
export function comdify(n) {
  if (!n) return '';
  const re = /\d{1,3}(?=(\d{3})+$)/g;
  const n1 = n.toString().replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => {
    return s1.replace(re, '$&,') + s2;
  });
  return n1;
}
