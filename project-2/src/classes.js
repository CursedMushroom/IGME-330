class Base {
    constructor(x, y, fwd = 1, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.fwd = fwd;
    }

}

class Mushroom extends Base {
    constructor(x, y, fwd, image) {
        super(x, y, fwd, image);

        this.spriteWidth = 64;
        this.height = 100
        this.status = "awake";
        this.type = "Mushroom";

        this.speed = 200;

        this.frozen = false;
        this.walking = true;
        this.flung = false;
        this.falling = false;


    }
    draw(ctx) {

        ctx.save();
        ctx.drawImage(this.image, this.x, this.y);
        ctx.restore();
    }
    wander(dt = 1 / 60,) {
        //add flip on if wandering, standing, and changing directions.
        let r = Math.random();


        if (r < .07) {
            this.status = "standing";
            if (Math.random() < .5) {
                this.fwd = -this.fwd;
            }

        } else {
            this.x += this.fwd * this.speed * dt;
            this.status = "wandering";
        }


    }
    reflectX() {
        this.fwd *= -1;
    }
    sleep() {
        this.x = this.x;
        this.y = this.y;
        this.status = "sleeping";

    }
    fling(dt = 1 / 60) {
        if (this.y > 0) {
            this.y -= 60;
            this.x += this.fwd * 600 * dt;
        } else {

            this.fall();
            this.falling = true;
            this.flung = false;
        }


    }
    fall(dt = 1 / 60) {
        if (this.y < 430) {
            this.y += 70;
        }
        else {
            this.falling = false;
            return;
        }

    };
    freeze() {
        this.x = this.x;
        this.y = this.y;
        this.status = "frozen";

    }

    seek(wantX = 500, rightBound, dt = 1 / 60) {
        

        let desired = wantX - this.x;
        let t = Math.floor(desired - this.speed);
        this.status = "Finding shelter";


        //if t is positve this.x-this.speed;
        //if t is negative this.x+this.speed
        //if within point:stop: lead to wander within bounds.

        if (t > - 250 && t < 250) {//new wander will be with the t bounds


            if (this.x > rightBound) {

                this.x -= this.speed * dt;

                if (this.fwd == 1) {
                    this.fwd = -1;
                }


            } else {
                this.wander();
            }



        } else {
            if (Math.sign(t) == -1) {
                this.x -= this.speed * dt;
            }
            if (Math.sign(t) == 1) {
                this.x += this.speed * dt;
            }

        }


    }

}

class Scary extends Base {
    constructor(x, y, fwd, imageL,imageR) {
        super(x, y, fwd);

        this.spriteWidth = 128;
        this.type = "Scary";

        this.speed = 100;
        this.left=imageL;
        this.right=imageR;


    }
    draw(ctx) {
        
       
        ctx.save();
        if(this.fwd==1){
            ctx.drawImage(this.right, this.x, this.y);
        }
        if(this.fwd==-1){
            ctx.drawImage(this.left, this.x, this.y);
        }
       
        ctx.restore();
    }
    wander(dt = 1 / 60,) {
        let r = Math.random();


        if (r < .02) {
            this.status = "standing";
            if (Math.random() < .5) {
                this.fwd = -this.fwd;
            }

        } else {
            this.x += this.fwd * this.speed * dt;
            this.status = "wandering";
        }


    }
    reflectX() {
        this.fwd *= -1;
    }
}

export { Base, Mushroom, Scary };