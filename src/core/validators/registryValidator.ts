
export class RegistryValidator {
  constructor(private readonly registry = new Map()) {}

  register(field: string, validator: any) {
    this.registry.set(field, validator);
  }

  getValidators() {
    return this.registry;
  }
}
