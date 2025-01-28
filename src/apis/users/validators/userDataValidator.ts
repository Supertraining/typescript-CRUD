import { RegistryValidator } from "../../../core/validators/registryValidator";
import {
  EmailValidator,
  ImageValidator,
  NameValidator,
  PasswordValidator,
  RolesValidator,
} from "../../../core/validators/validators";

const userValidatorRegistry = new RegistryValidator();
userValidatorRegistry.register("fullname", new NameValidator());
userValidatorRegistry.register("password", new PasswordValidator());
userValidatorRegistry.register("email", new EmailValidator());
userValidatorRegistry.register("img", new ImageValidator());
userValidatorRegistry.register("roles", new RolesValidator());

export const userValidators = userValidatorRegistry.getValidators();


const loginValidatorRegistry = new RegistryValidator();
loginValidatorRegistry.register("email", new EmailValidator());
loginValidatorRegistry.register("password", new PasswordValidator());
export const loginValidators = loginValidatorRegistry.getValidators();