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

// src/http/controllers/app_fa/routes.ts
var routes_exports = {};
__export(routes_exports, {
  appFaRoutes: () => appFaRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controllers/app_fa/faUsuarios/faRegister.ts
var import_zod2 = require("zod");

// src/use-cases/errors/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail ja existe.");
  }
};

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET_GYM: import_zod.z.string(),
  JWT_SECRET_FA: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(8080)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.log("\u274C invalid environment variables.", _env.error.format());
  throw new Error("invalid environment variables.");
}
var env = _env.data;

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-faUsuario-repository.ts
var PrismaFausuarioRepository = class {
  async findByEmail(email) {
    const user = await prisma.faUsuario.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.faUsuario.create({
      data
    });
    return user;
  }
  async findById(id) {
    const user = await prisma.faUsuario.findUnique({
      where: {
        id
      }
    });
    return user;
  }
};

// src/use-cases/faUsuarioRegister.ts
var import_bcryptjs = require("bcryptjs");
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

// src/use-cases/factories/make-faUsuario-use-case.ts
function makefaUsuarioRegister() {
  const faUsuarioRepository = new PrismaFausuarioRepository();
  const useCase = new FaUsuarioRegister(faUsuarioRepository);
  return useCase;
}

// src/http/controllers/app_fa/faUsuarios/faRegister.ts
async function faRegister(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    nome: import_zod2.z.string(),
    data_nascimento: import_zod2.z.string().datetime(),
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6)
  });
  const { nome, email, password, data_nascimento } = registerBodySchema.parse(request.body);
  try {
    const faUsuarioRegister = makefaUsuarioRegister();
    await faUsuarioRegister.execute({
      nome,
      email,
      password,
      data_nascimento
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ mesage: err.message });
    }
    throw err;
  }
  return reply.status(201).send();
}

// src/http/controllers/app_fa/faUsuarios/faAutenticacao.ts
var import_zod3 = require("zod");

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/faAutenticacao.ts
var import_bcryptjs2 = require("bcryptjs");
var FaAutenticacaoUseCase = class {
  constructor(faUsuarioRepository) {
    this.faUsuarioRepository = faUsuarioRepository;
  }
  async execute({ email, password }) {
    const faUsuario = await this.faUsuarioRepository.findByEmail(email);
    if (!faUsuario) {
      throw new InvalidCredentialsError();
    }
    const doestPasswordMatches = await (0, import_bcryptjs2.compare)(password, faUsuario.password_hash);
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    return {
      faUsuario
    };
  }
};

// src/use-cases/factories/make-faAutenticacao-use-case.ts
function makeFaAutenticacaoUseCase() {
  const faUsuarioRepository = new PrismaFausuarioRepository();
  const useCase = new FaAutenticacaoUseCase(faUsuarioRepository);
  return useCase;
}

// src/http/controllers/app_fa/faUsuarios/faAutenticacao.ts
async function faAutenticacao(request, reply) {
  const authenticateBodySchema = import_zod3.z.object({
    email: import_zod3.z.string().email(),
    password: import_zod3.z.string().min(6)
  });
  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeFaAutenticacaoUseCase();
    const { faUsuario } = await authenticateUseCase.execute({
      email,
      password
    });
    const token = await reply.faSign(
      {},
      {
        sign: {
          sub: faUsuario.id
        }
      }
    );
    const refreshToken = await reply.faSign(
      {},
      {
        sign: {
          sub: faUsuario.id,
          expiresIn: "7d"
        }
      }
    );
    return reply.setCookie("refreshTokenFa", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true
    }).status(200).send({
      token
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/use-cases/get-faUsuario-perfil.ts
var GetFaUsuarioPerfilUseCase = class {
  constructor(faUsuarioRepository) {
    this.faUsuarioRepository = faUsuarioRepository;
  }
  async execute({
    userId
  }) {
    const faUsuario = await this.faUsuarioRepository.findById(userId);
    if (!faUsuario) {
      throw new ResourceNotFoundError();
    }
    return {
      faUsuario
    };
  }
};

// src/use-cases/factories/make-get-faUsuario-perfil-use.case.ts
function makeGetFaUsiarioPerfilUseCase() {
  const faUsuarioRepository = new PrismaFausuarioRepository();
  const useCase = new GetFaUsuarioPerfilUseCase(faUsuarioRepository);
  return useCase;
}

// src/http/controllers/app_fa/faUsuarios/faPerfil.ts
async function faPerfil(request, reply) {
  const getFaUsuarioPerfil = makeGetFaUsiarioPerfilUseCase();
  const { faUsuario } = await getFaUsuarioPerfil.execute({
    userId: request.user.sub
  });
  return reply.status(200).send({
    faUsuario: {
      ...faUsuario,
      password_hash: void 0
    }
  });
}

// src/http/middlewares/verifyFa-jwt.ts
async function verifyFaJwt(request, reply) {
  try {
    await request.faVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}

// src/http/controllers/app_fa/faUsuarios/faRefresh.ts
async function faRefresh(request, reply) {
  await request.faVerify({ onlyCookie: true });
  const token = await reply.faSign(
    {},
    {
      sign: {
        sub: request.user.sub
      }
    }
  );
  const refreshToken = await reply.faSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d"
      }
    }
  );
  return reply.setCookie("refreshTokenFa", refreshToken, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true
  }).status(200).send({
    token
  });
}

// src/http/controllers/app_fa/faUsuarios/routes.ts
async function faUsuarioRoutes(app) {
  app.post("/fausuario", faRegister);
  app.post("/fasesao", faAutenticacao);
  app.patch("/token/farefresh", faRefresh);
  app.get("/faperfil", { onRequest: [verifyFaJwt] }, faPerfil);
}

// src/http/controllers/app_fa/routes.ts
async function appFaRoutes(app) {
  app.register(faUsuarioRoutes);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appFaRoutes
});
