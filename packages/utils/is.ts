const toString = Object.prototype.toString;
export const isString = (value: any): boolean => {
  return toString.call(value) === "[Object String]";
};
