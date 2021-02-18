class SlingShot{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.pointB = pointB
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
        //loading the slingsshot images
        this.sling1 = loadImage("sprites/sling1.png");
        this.sling2 = loadImage("sprites/sling2.png");
        this.sling3 = loadImage("sprites/sling3.png");
    }

    //it makes the bodyA empty, which actually releases bird
    fly(){
        this.sling.bodyA = null;
    }
    //added a function to add a body in the bodyA
    attach(body){
        this.sling.bodyA = body;
    }

    display(){
        //displaying the slingshot images
        image(this.sling1,180,20);
        image(this.sling2,153,15);    
        
        //to draw a line only when there is a bodyA
        if(this.sling.bodyA){
            //namespacing
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            push();
            //using color picker (ColorZilla)
            stroke(48,22,8);
            //to decrease the thickness of rubber when dragged on the right side
            if(pointA.x > 200){
                //thickness of the stroke
                strokeWeight(3);
                //creating the rubber bands
                line(pointA.x - 25, pointA.y, pointB.x - 25, pointB.y + 10);
                line(pointA.x - 25, pointA.y, pointB.x + 20, pointB.y + 10);
                //creating the support for the bird
                image(this.sling3,pointA.x - 25, pointA.y - 10, 10, 30);
            }
            //to increase the thickness of rubber when dragged on the right side
            else{
                strokeWeight(7);
                line(pointA.x - 25, pointA.y, pointB.x - 25, pointB.y + 10);
                line(pointA.x - 25, pointA.y, pointB.x + 20, pointB.y + 10);
                image(this.sling3,pointA.x - 25, pointA.y - 10, 10, 30);
            }
            pop();
        }
    }
    
}