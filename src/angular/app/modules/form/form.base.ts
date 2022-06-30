export class FormBase {
  getI18N(name: string) {
    return name.replace(/[A-Z]/g, (s) => '_' + s).toUpperCase();
  }
}
