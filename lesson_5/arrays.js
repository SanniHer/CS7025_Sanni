let myFood = ["Sushi", "fish and chips", "steak"]

for (let i = 0; i < myFood.length; i++){
    console.log(myFood[i]);
}

myFood.push("strawberry")

console.log(myFood)

extraFruit = myFood.pop()

console.log(extraFruit)
console.log(myFood)

let myFruit = ["banana", "pear", "raspberry"]

myFruit.push(extraFruit)
console.log(myFruit)

let joinedFood = [myFood, myFruit]

console.log(joinedFood)


for (let i = 0; i < joinedFood.length; i++){
    for (let j = 0; j < joinedFood[i].length; j++) {
        console.log(joinedFood[i][j])
    }
}
