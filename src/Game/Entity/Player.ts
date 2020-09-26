import {Actor, CollisionType, Color, Engine, Input} from "excalibur";

interface IPlayerOptions {
    x: number;
    y: number;
}

export class Player extends Actor {
    public readonly velocity: number = 0.1;

    constructor(options: IPlayerOptions) {
        super({
            ...options,
            width: 20,
            height: 20,
            collisionType: CollisionType.Fixed,
            color: Color.Chartreuse
        });
    }

    public update(engine: Engine, delta: number) {
        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            this.pos.y -= this.velocity * delta
        }

        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            this.pos.y += this.velocity * delta
        }

        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            this.pos.x += this.velocity * delta
        }

        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            this.pos.x -= this.velocity * delta
        }
    }
}