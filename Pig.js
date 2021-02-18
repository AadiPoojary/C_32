class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,50,50);
    this.image = loadImage("sprites/enemy.png");
    //created a property to make it fully visible
    this.visibility = 255;
  }

  display(){
    //to call display from the constructor
    //if this.body.speed is less than 3 than the pigs are visible
    if(this.body.speed <3){
      super.display();
    }
    else{
      //pushes the changes from this point
      push();
      //removes the object from the world
      World.remove(world, this.body);
      //slowly tintes the object by reducing the visibility
      this.visibility = this.visibility - 5;
      //this.visibility-= 5;
      //it tints the object
      tint(255,this.visibility);
      image(this.image,this.body.position.x, this.body.position.y,50,50);
      //pops out the changes so that they don't leak to other classes
      pop();
    }
    
    //console.log(this.body.speed);
  }

    score(){
      if(this.visibility<0 && this.visibility > -1005){
        score ++;
      }
  }


};
