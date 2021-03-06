import {Actor, CollisionType, Engine} from "excalibur";
import {Player} from "../Entity/Player";

interface IObject {
    gid: number;
    height: number;
    id: number;
    name: string;
    rotation: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

interface ILayer {
    name: string;
    type: string;
    objects?: Array<IObject>;
}

export class MapParser {
    public static OBJECT_LAYER: string = "objectgroup";
    public static TILE_LAYER: string = "tilelayer";
    public readonly layers: Map<string, ILayer> = new Map<string, ILayer>();
    private objects: Map<string, IObject> = new Map<string, IObject>();
    private collisions: Map<string, IObject> = new Map<string, IObject>();

    public static PLAYER_NAME = "player";

    constructor(private readonly engine: Engine, private data: any) {
        for (const layerData of data.layers) {
            this.layers.set(layerData.name, layerData);
        }

        this.parseObjectLayers();
    }

    public getLayer(name: string): ILayer | null {
        const layer = this.layers.get(name);

        return layer ? layer : null;
    }

    public getCollisionActors(): Array<Actor>
    {
        const actors = [];

        for(const collision of this.collisions.values()) {
            actors.push(new Actor({
                x: collision.x + (collision.width / 2),
                y: collision.y + (collision.height / 2),
                width: collision.width,
                height: collision.height,
                collisionType: CollisionType.Fixed
            }));
        }

        return actors;
    }

    public getPlayer(): Player {
        const playerData = this.objects.get(MapParser.PLAYER_NAME);

        if (!playerData) {
            throw new Error("No Player found in map.");
        }

        return new Player(this.engine, {
            x: playerData.x,
            y: playerData.y,
        });
    }

    private parseObjectLayers(): void {
        for (const layer of this.layers.values()) {
            if (layer.type === MapParser.OBJECT_LAYER && layer.objects) {
                if (layer.name.startsWith('object')) {
                    for (const object of layer.objects) {
                        this.objects.set(object.name, object);
                    }
                } else if (layer.name.startsWith('collision')) {
                    for (const object of layer.objects) {
                        this.collisions.set(object.id.toString(), object);
                    }
                }
            }
        }
    }
}
