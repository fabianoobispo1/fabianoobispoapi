"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_cookie = __toESM(require("@fastify/cookie"));
var import_zod12 = require("zod");

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

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));

// src/http/middlewares/verifyGym-jwt.ts
async function verifyGymJwt(request, reply) {
  try {
    await request.gymVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}

// src/http/controllers/app_gym/check-ins/create.ts
var import_zod2 = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-check-ins-repository.ts
var import_dayjs = __toESM(require("dayjs"));
var PrismaCheckInsRepository = class {
  async findById(id) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    });
    return checkIn;
  }
  async findByUserIdOnDate(userId, date) {
    const startOfTheDay = (0, import_dayjs.default)(date).startOf("date");
    const endOfTheDay = (0, import_dayjs.default)(date).endOf("date");
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    });
    return checkIn;
  }
  async findManyByUserId(userId, page) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      skip: (page - 1) * 20,
      take: 20
    });
    return checkIns;
  }
  async countByUserId(userId) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    });
    return count;
  }
  async create(data) {
    const checkIn = await prisma.checkIn.create({
      data
    });
    return checkIn;
  }
  async save(data) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    });
    return checkIn;
  }
};

// src/repositories/prisma/prisma-gyms-repository.ts
var PrismaGymsRepository = class {
  async findById(id) {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    });
    return gym;
  }
  async findManyNearby({ latitude, longitude }) {
    const gyms = await prisma.$queryRaw`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    return gyms;
  }
  async searchMany(query, page) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    });
    return gyms;
  }
  async create(data) {
    const gym = await prisma.gym.create({
      data
    });
    return gym;
  }
};

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/utils/get-distance-between-coordinates.ts
function getDistanceBetweenCoordinates(from, to) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }
  const fromRadian = Math.PI * from.latitude / 180;
  const toRadian = Math.PI * to.latitude / 180;
  const theta = from.longitude - to.longitude;
  const radTheta = Math.PI * theta / 180;
  let dist = Math.sin(fromRadian) * Math.sin(toRadian) + Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}

// src/use-cases/errors/max-number-of-check-ins-error.ts
var MaxNumberOfCheckInsError = class extends Error {
  constructor() {
    super("Max number of check-ins reached.");
  }
};

// src/use-cases/errors/max-distance-error.ts
var MaxDistanceError = class extends Error {
  constructor() {
    super("Max distance reached.");
  }
};

// src/use-cases/check-in.ts
var CheckInUseCase = class {
  constructor(checkInsRepository, gymsRepository) {
    this.checkInsRepository = checkInsRepository;
    this.gymsRepository = gymsRepository;
  }
  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }) {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      }
    );
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      /* @__PURE__ */ new Date()
    );
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });
    return {
      checkIn
    };
  }
};

// src/use-cases/factories/make-check-in-use.case.ts
function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);
  return useCase;
}

// src/http/controllers/app_gym/check-ins/create.ts
async function create(request, reply) {
  const createCheckInParamsSchema = import_zod2.z.object({
    gymId: import_zod2.z.string().uuid()
  });
  const createCheckInBodySchema = import_zod2.z.object({
    latitude: import_zod2.z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod2.z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);
  const checkInUseCase = makeCheckInUseCase();
  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  });
  return reply.status(201).send();
}

// src/http/controllers/app_gym/check-ins/validate.ts
var import_zod3 = require("zod");

// src/use-cases/validate-check-in.ts
var import_dayjs2 = __toESM(require("dayjs"));

// src/use-cases/errors/late-check-in-validation-error.ts
var LateCheckInValidationError = class extends Error {
  constructor() {
    super(
      "The check-in can only be validated until 20 minutes of its creation."
    );
  }
};

// src/use-cases/validate-check-in.ts
var ValidateCheckInUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  async execute({
    checkInId
  }) {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) {
      throw new ResourceNotFoundError();
    }
    const distanceInMinutesFromCheckInCreation = (0, import_dayjs2.default)(/* @__PURE__ */ new Date()).diff(
      checkIn.created_at,
      "minutes"
    );
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }
    checkIn.validated_at = /* @__PURE__ */ new Date();
    await this.checkInsRepository.save(checkIn);
    return {
      checkIn
    };
  }
};

// src/use-cases/factories/make-validate-check-in-use-case.ts
function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);
  return useCase;
}

// src/http/controllers/app_gym/check-ins/validate.ts
async function validate(request, reply) {
  const validateCheckInParamsSchema = import_zod3.z.object({
    checkInId: import_zod3.z.string().uuid()
  });
  const { checkInId } = validateCheckInParamsSchema.parse(request.params);
  const validateCheckInUseCase = makeValidateCheckInUseCase();
  await validateCheckInUseCase.execute({
    checkInId
  });
  return reply.status(204).send();
}

// src/http/controllers/app_gym/check-ins/history.ts
var import_zod4 = require("zod");

// src/use-cases/fetch-user-check-ins-history.ts
var FetchUserCheckInsHistoryUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  async execute({
    userId,
    page
  }) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );
    return {
      checkIns
    };
  }
};

// src/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts
function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  return useCase;
}

// src/http/controllers/app_gym/check-ins/history.ts
async function history(request, reply) {
  const checkInHistoryQuerySchema = import_zod4.z.object({
    page: import_zod4.z.coerce.number().min(1).default(1)
  });
  const { page } = checkInHistoryQuerySchema.parse(request.query);
  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();
  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub
  });
  return reply.status(200).send({
    checkIns
  });
}

// src/use-cases/get-user-metrics.ts
var GetUserMetricsUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  async execute({
    userId
  }) {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    return {
      checkInsCount
    };
  }
};

// src/use-cases/factories/make-get-user-metrics-use-case.ts
function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);
  return useCase;
}

// src/http/controllers/app_gym/check-ins/metrics.ts
async function metrics(request, reply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub
  });
  return reply.status(200).send({
    checkInsCount
  });
}

// src/http/middlewares/verify-user-role.ts
function verifyUserRole(roleToVerify) {
  return async (request, reply) => {
    const { role } = request.user;
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized." });
    }
  };
}

// src/http/controllers/app_gym/check-ins/routes.ts
async function checkInsRoutes(app2) {
  app2.addHook("onRequest", verifyGymJwt);
  app2.get("/check-ins/history", history);
  app2.get("/check-ins/metrics", metrics);
  app2.post("/gyms/:gymId/check-ins", create);
  app2.patch("/check-ins/:checkInId/validate", { onRequest: [verifyUserRole("ADMIN")] }, validate);
}

// src/http/controllers/app_gym/users/register.ts
var import_zod5 = require("zod");

// src/use-cases/errors/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail ja existe.");
  }
};

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
};

// src/use-cases/register.ts
var import_bcryptjs = require("bcryptjs");
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ name, email, password }) {
    const password_hash = await (0, import_bcryptjs.hash)(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    });
    return {
      user
    };
  }
};

// src/use-cases/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(usersRepository);
  return useCase;
}

// src/http/controllers/app_gym/users/register.ts
async function register(request, reply) {
  const registerBodySchema = import_zod5.z.object({
    name: import_zod5.z.string(),
    email: import_zod5.z.string().email(),
    password: import_zod5.z.string().min(6)
  });
  const { name, email, password } = registerBodySchema.parse(request.body);
  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      name,
      email,
      password
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ mesage: err.message });
    }
    throw err;
  }
  return reply.status(201).send();
}

// src/http/controllers/app_gym/users/authenticate.ts
var import_zod6 = require("zod");

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doestPasswordMatches = await (0, import_bcryptjs2.compare)(password, user.password_hash);
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    return {
      user
    };
  }
};

// src/use-cases/factories/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateUseCase(usersRepository);
  return useCase;
}

// src/http/controllers/app_gym/users/authenticate.ts
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod6.z.object({
    email: import_zod6.z.string().email(),
    password: import_zod6.z.string().min(6)
  });
  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({
      email,
      password
    });
    const token = await reply.gymSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      }
    );
    const refreshToken = await reply.gymSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d"
        }
      }
    );
    return reply.setCookie("refreshTokenGym", refreshToken, {
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

// src/use-cases/get-user-profile.ts
var GetUserProfileUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user
    };
  }
};

// src/use-cases/factories/make-get-user-profile-use.case.ts
function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);
  return useCase;
}

// src/http/controllers/app_gym/users/profile.ts
async function profile(request, reply) {
  const getUserProfile = makeGetUserProfileUseCase();
  const { user } = await getUserProfile.execute({
    userId: request.user.sub
  });
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: void 0
    }
  });
}

// src/http/controllers/app_gym/users/refresh.ts
async function refresh(request, reply) {
  await request.gymVerify({ onlyCookie: true });
  const { role } = request.user;
  const token = await reply.gymSign(
    { role },
    {
      sign: {
        sub: request.user.sub
      }
    }
  );
  const refreshToken = await reply.gymSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d"
      }
    }
  );
  return reply.setCookie("refreshTokenGym", refreshToken, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true
  }).status(200).send({
    token
  });
}

// src/http/controllers/app_gym/users/routes.ts
async function usersRoutes(app2) {
  app2.post("/users", register);
  app2.post("/sessions", authenticate);
  app2.patch("/token/refresh", refresh);
  app2.get("/me", { onRequest: [verifyGymJwt] }, profile);
}

// src/http/controllers/app_gym/gyms/search.ts
var import_zod7 = require("zod");

// src/use-cases/search-gyms.ts
var SearchGymsUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  async execute({
    query,
    page
  }) {
    const gyms = await this.gymsRepository.searchMany(query, page);
    return {
      gyms
    };
  }
};

// src/use-cases/factories/make-search-gyms-use-case.ts
function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);
  return useCase;
}

// src/http/controllers/app_gym/gyms/search.ts
async function search(request, reply) {
  const searchGymsQuerySchema = import_zod7.z.object({
    q: import_zod7.z.string(),
    page: import_zod7.z.coerce.number().min(1).default(1)
  });
  const { q, page } = searchGymsQuerySchema.parse(request.query);
  const searchGymsUseCase = makeSearchGymsUseCase();
  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page
  });
  return reply.status(200).send({
    gyms
  });
}

// src/http/controllers/app_gym/gyms/nearby.ts
var import_zod8 = require("zod");

// src/use-cases/fetch-nearby-gyms.ts
var FetchNearbyGymsUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  async execute({
    userLatitude,
    userLongitude
  }) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    });
    return {
      gyms
    };
  }
};

// src/use-cases/factories/make-fetch-nearby-gyms-use-case.ts
function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);
  return useCase;
}

// src/http/controllers/app_gym/gyms/nearby.ts
async function nearby(request, reply) {
  const nearbyGymsQuerySchema = import_zod8.z.object({
    latitude: import_zod8.z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod8.z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();
  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  });
  return reply.status(200).send({
    gyms
  });
}

// src/http/controllers/app_gym/gyms/create.ts
var import_zod9 = require("zod");

// src/use-cases/create-gym.ts
var CreateGymUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }) {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    });
    return {
      gym
    };
  }
};

// src/use-cases/factories/make-create-gym-use-case.ts
function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);
  return useCase;
}

// src/http/controllers/app_gym/gyms/create.ts
async function create2(request, reply) {
  const createGymBodySchema = import_zod9.z.object({
    title: import_zod9.z.string(),
    description: import_zod9.z.string().nullable(),
    phone: import_zod9.z.string().nullable(),
    latitude: import_zod9.z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod9.z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body);
  const createGymUseCase = makeCreateGymUseCase();
  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude
  });
  return reply.status(201).send();
}

// src/http/controllers/app_gym/gyms/routes.ts
async function gymsRoutes(app2) {
  app2.addHook("onRequest", verifyGymJwt);
  app2.get("/gyms/search", search);
  app2.get("/gyms/nearby", nearby);
  app2.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create2);
}

// src/http/controllers/app_gym/routes.ts
async function appGymRoutes(app2) {
  app2.register(checkInsRoutes);
  app2.register(usersRoutes);
  app2.register(gymsRoutes);
}

// src/http/controllers/app_fa/faUsuarios/faRegister.ts
var import_zod10 = require("zod");

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
var import_bcryptjs3 = require("bcryptjs");
var FaUsuarioRegister = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ nome, email, password, data_nascimento }) {
    const password_hash = await (0, import_bcryptjs3.hash)(password, 6);
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
  const registerBodySchema = import_zod10.z.object({
    nome: import_zod10.z.string(),
    data_nascimento: import_zod10.z.string().datetime(),
    email: import_zod10.z.string().email(),
    password: import_zod10.z.string().min(6)
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
var import_zod11 = require("zod");

// src/use-cases/faAutenticacao.ts
var import_bcryptjs4 = require("bcryptjs");
var FaAutenticacaoUseCase = class {
  constructor(faUsuarioRepository) {
    this.faUsuarioRepository = faUsuarioRepository;
  }
  async execute({ email, password }) {
    const faUsuario = await this.faUsuarioRepository.findByEmail(email);
    if (!faUsuario) {
      throw new InvalidCredentialsError();
    }
    const doestPasswordMatches = await (0, import_bcryptjs4.compare)(password, faUsuario.password_hash);
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
  const authenticateBodySchema = import_zod11.z.object({
    email: import_zod11.z.string().email(),
    password: import_zod11.z.string().min(6)
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
async function faUsuarioRoutes(app2) {
  app2.post("/fausuario", faRegister);
  app2.post("/fasesao", faAutenticacao);
  app2.patch("/token/farefresh", faRefresh);
  app2.get("/faperfil", { onRequest: [verifyFaJwt] }, faPerfil);
}

// src/http/controllers/app_fa/routes.ts
async function appFaRoutes(app2) {
  app2.register(faUsuarioRoutes);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_jwt.default, {
  secret: env.JWT_SECRET_GYM,
  cookie: {
    cookieName: "refreshTokenGym",
    signed: false
  },
  namespace: "gym",
  jwtVerify: "gymVerify",
  jwtSign: "gymSign",
  sign: {
    expiresIn: "10m"
  }
});
app.register(import_jwt.default, {
  secret: env.JWT_SECRET_FA,
  cookie: {
    cookieName: "refreshTokenFa",
    signed: false
  },
  namespace: "fa",
  jwtVerify: "faVerify",
  jwtSign: "faSign",
  sign: {
    expiresIn: "10m"
  }
});
app.register(import_cookie.default);
app.register(appGymRoutes);
app.register(appFaRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof import_zod12.ZodError) {
    return reply.status(400).send({ message: "Validation error.", issues: error.format() });
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
  }
  return reply.status(500).send({ message: "Internal server error." });
});

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log("Servidor rodadndo.\u2714");
});
