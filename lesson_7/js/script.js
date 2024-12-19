// class Person{
//     name;
//     constructor(name){
//     this.name = name;
//     }
//     speak(){
//     console.log(`Hello, my name is ${this.name}`);
//     }
//     }
// let joris = new Person("Joris");
// joris.speak();



// class Fish extends Animal{
//     move(){
//     console.log("swim");
//     }
//     }
// let guppy = new Fish();
// guppy.move(); // "swim"


class Person{
    #name;
    constructor(name){
        this.#name = name;
    }
    getName(){
        return this.#name;
    }
}

let man = new Person("Sanni")
console.log(man.getName())

class Animal{
    name;
    constructor(name){
        this.name = name;
    }
        move(){
            console.log("moving!");
        }
    }

class Bird extends Animal{
    move(){
    console.log("Fly");
        }
    }

let pigeon = new Bird();
pigeon.move()


class Fish extends Animal{
    move(){
    console.log("Swim");
}
}
let goldfish = new Fish();
goldfish.move()


class Car{
        static drive(){
        console.log("vroom, vroom");
        }
        }
Car.drive(); 
        

        
let subaru = new Car("subaru");
    