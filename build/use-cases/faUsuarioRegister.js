"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/faUsuarioRegister.ts
var faUsuarioRegister_exports = {};
__export(faUsuarioRegister_exports, {
  FaUsuarioRegister: () => FaUsuarioRegister
});
module.exports = __toCommonJS(faUsuarioRegister_exports);
var import_bcryptjs = require("bcryptjs");

// src/use-cases/errors/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail ja existe.");
  }
};

// src/use-cases/faUsuarioRegister.ts
var FaUsuarioRegister = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ nome, email, password, data_nascimento }) {
    const password_hash = await (0, import_bcryptjs.hash)(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    const faUsuario = await this.usersRepository.create({
      nome,
      email,
      password_hash,
      data_nascimento
    });
    return {
      faUsuario
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FaUsuarioRegister
});
