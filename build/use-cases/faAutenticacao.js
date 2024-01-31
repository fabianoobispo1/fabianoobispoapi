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

// src/use-cases/faAutenticacao.ts
var faAutenticacao_exports = {};
__export(faAutenticacao_exports, {
  FaAutenticacaoUseCase: () => FaAutenticacaoUseCase
});
module.exports = __toCommonJS(faAutenticacao_exports);

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/faAutenticacao.ts
var import_bcryptjs = require("bcryptjs");
var FaAutenticacaoUseCase = class {
  constructor(faUsuarioRepository) {
    this.faUsuarioRepository = faUsuarioRepository;
  }
  async execute({ email, password }) {
    const faUsuario = await this.faUsuarioRepository.findByEmail(email);
    if (!faUsuario) {
      throw new InvalidCredentialsError();
    }
    const doestPasswordMatches = await (0, import_bcryptjs.compare)(password, faUsuario.password_hash);
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    return {
      faUsuario
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FaAutenticacaoUseCase
});
