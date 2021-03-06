import Color from '../utils/color';
import Vector from '../math/vector';

class Particle {
    constructor(pos, vel, acc, damp, mass, size, color) {
        this.pos = pos || new Vector();
        this.vel = vel || new Vector();
        this.acc = acc || new Vector();
        this.damp = damp || 0.98;
        this.mass = mass || 100;
        this.size = size || 1;
        this.color = color || Color.RANDOM;
    }

    update() {
        this.vel.add(this.acc);
        this.vel.multiply(this.damp);
        this.acc.divide(this.mass);
        this.pos.add(this.vel);
    }

    render(ctx, color) {
        ctx.fillStyle = color || this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    addForce(force, mass) {
        let tForce = this.calculateForce(force, mass);
        this.acc.add(tForce);
    }

    calculateForce(force, mass) {
        let fx = 0;
        let fy = 0;

        let vx = force.x - this.pos.x;
        let vy = force.y - this.pos.y;

        let tForce = mass / Math.pow(vx * vx + vy * vy, 1.5);

        fx += vx * tForce;
        fy += vy * tForce;

        return new Vector(fx, fy);
    }
}

export {Particle as default}