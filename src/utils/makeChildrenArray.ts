const makeChildrenArray = <T>(children: T | T[]): T[] => {
  return Array.isArray(children) ? children : [children];
};

export default makeChildrenArray;
