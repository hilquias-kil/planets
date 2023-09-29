export interface IPlanetData {
  name: string;
  climate: string;
  terrain: string;
  filmes?: number;
}

export interface IPlanetRepository {
  create(data: IPlanetData): Promise<IPlanetData>;
  findAll(): Promise<IPlanetData[]>;
}

export interface IExternalAPI {
  fetchPlanetByName(name: string): Promise<any>;
}

export class CreatePlanet {
  private planetRepository: IPlanetRepository;
  private externalAPI: IExternalAPI;

  constructor(planetRepository: IPlanetRepository, externalAPI: IExternalAPI) {
    this.planetRepository = planetRepository;
    this.externalAPI = externalAPI;
  }

  async execute(planetData: IPlanetData): Promise<IPlanetData> {
    let filme = await this.externalAPI.fetchPlanetByName(planetData.name);
    planetData.filmes = filme.results.length
      ? filme.results[0].films.length
      : 0;

    return this.planetRepository.create(planetData);
  }
}

export class ListPlanets {
  private planetRepository: IPlanetRepository;

  constructor(planetRepository: IPlanetRepository) {
    this.planetRepository = planetRepository;
  }

  execute(): Promise<IPlanetData[]> {
    return this.planetRepository.findAll();
  }
}
