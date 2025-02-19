import { ENTITIES } from "../../../constants/ENTITIES";
import { RegistryValidator } from "../../../core/validators/registryValidator";
import {
  EmailValidator,
  ImageValidator,
  NameValidator,
  PasswordValidator,
  RolesValidator,
} from "../../../core/validators/validators";

const userValidatorRegistry = new RegistryValidator();
userValidatorRegistry.register(ENTITIES.USER.PROPERTIES.FULLNAME, new NameValidator());
userValidatorRegistry.register(ENTITIES.USER.PROPERTIES.PASSWORD, new PasswordValidator());
userValidatorRegistry.register(ENTITIES.USER.PROPERTIES.EMAIL, new EmailValidator());
userValidatorRegistry.register(ENTITIES.USER.PROPERTIES.IMG, new ImageValidator());
userValidatorRegistry.register(ENTITIES.USER.PROPERTIES.ROLES, new RolesValidator());

export const userValidators = userValidatorRegistry.getValidators();


const loginValidatorRegistry = new RegistryValidator();
loginValidatorRegistry.register("email", new EmailValidator());
loginValidatorRegistry.register("password", new PasswordValidator());
export const loginValidators = loginValidatorRegistry.getValidators();