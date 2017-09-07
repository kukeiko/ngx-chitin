export interface ITypeOf<T> extends Function {
    new (...args: any[]): T;
}

export interface IClass extends Function {
    new (...args: any[]): any;
}
