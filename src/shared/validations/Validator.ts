export default interface Validator {
    onValidate: (...args: any[]) => boolean;
}