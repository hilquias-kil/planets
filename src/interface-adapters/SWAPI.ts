import { IExternalAPI } from "../use-cases/Planet";

const apiUrl = "https://swapi.dev/api/planets/";

export class SWAPI implements IExternalAPI {
  async fetchPlanetByName(name: string): Promise<any> {
    return await fetch(`${apiUrl}?search=${name}`).then((T) => T.json());
  }
}
