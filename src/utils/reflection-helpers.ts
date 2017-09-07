import { IClass } from "./lang";

export function isInjectable(type: Function): boolean {
    return Reflect.getMetadataKeys(type).includes("annotations");
}

export function isDirective(type: Function): boolean {
    let metadata = Reflect.getMetadata("annotations", type);

    return metadata instanceof Array
        && (
            typeof (metadata[0]["selector"]) == "string" // component
            || typeof (metadata[0]["pure"]) == "boolean" // pipe
        );
}

export function isModule(type: Function): boolean {
    let metadata = Reflect.getMetadata("annotations", type);

    return metadata instanceof Array
        && "providers" in metadata[0]
        && "declarations" in metadata[0];
}

export function splitIntoModuleFriendly(types: Function[]): {
    directives: IClass[];
    providers: IClass[];
    modules: IClass[];
} {
    let directives: IClass[] = [];
    let providers: IClass[] = [];
    let modules: IClass[] = [];

    types.forEach(t => {
        if (isDirective(t)) {
            directives.push(t as IClass);
        } else if (isModule(t)) {
            modules.push(t as IClass);
        } else if (isInjectable(t)) {
            providers.push(t as IClass);
        }
    });

    return {
        directives: directives,
        providers: providers,
        modules: modules
    };
}
