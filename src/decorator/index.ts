const serializedNames = Symbol('serializedNames');

export function SerializedName(fieldName: string): PropertyDecorator {
  return (target: any, propertyKey) => {
    console.log(fieldName)
    console.log(target)
    console.log(propertyKey)
    // target[propertyKey]=fieldName
    // target[propertyKey]=fieldName
    // const map = target[serializedNames];
    // if (!target[serializedNames]) {
    //   target[serializedNames] = {};
    // }
    // target[serializedNames][propertyKey] = fieldName;
    // Object.defineProperty(target, fieldName, {
    //   configurable: true,

    //   get(): any {
    //     return this[propertyKey];
    //   },
    //   set(v: any): void {
    //     this[propertyKey] = v;
    //   },
    // });
    // console.log(Object.keys(this).reduce((res: any, key: string) => {
    //   console.log(key)
    //   // const mapKey = map[key];
    //   // res[mapKey !== undefined ? mapKey : key] = this[key];
    //   // return res;
    // }, {}));
  };
}
