export function task2() {
    let ingredients = {
        bread: 10,
        cheese: 6,
    }
    console.log("Task 2\n")
    if (ingredients.bread >= 2 && ingredients.cheese >= 1) {
        const sandwichesWithBread = Math.floor(ingredients.bread / 2);
        console.assert(Math.min(sandwichesWithBread, ingredients.cheese) === 5, "Неправильное значение");
        console.log(`Можно сделать ${Math.min(sandwichesWithBread, ingredients.cheese)} бутеров!`);
    } else {
        console.log(0);
    }
    console.log("\n")
}