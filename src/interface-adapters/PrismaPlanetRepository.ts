import { IPlanetData, IPlanetRepository } from "../use-cases/Planet";

export class PrismaPlanetRepository implements IPlanetRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    create(data: IPlanetData): Promise<IPlanetData> {
        return this.db.planet.create({ data });
    }

    findAll(): Promise<IPlanetData[]> {
        return this.db.planet.findMany();
    }
}

