import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { swagger } from "@elysiajs/swagger";

import { PrismaPlanetRepository } from "./interface-adapters/PrismaPlanetRepository";
import { SWAPI } from "./interface-adapters/SWAPI";
import { CreatePlanet, ListPlanets } from "./use-cases/Planet";

const db = new PrismaClient();
const planetRepository = new PrismaPlanetRepository(db);
const externalAPI = new SWAPI();
const createPlanetUseCase = new CreatePlanet(planetRepository, externalAPI);
const listPlanetsUseCase = new ListPlanets(planetRepository);

const app = new Elysia()
  .use(swagger())
  .post(
    "/planet",
    async ({ body }) => {
      return await createPlanetUseCase.execute(body);
    },
    {
      body: t.Object({
        name: t.String(),
        climate: t.String(),
        terrain: t.String(),
      }),
    }
  )
  .get("/planets", async () => listPlanetsUseCase.execute())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
