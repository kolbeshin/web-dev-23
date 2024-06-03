export function task5(){
    let min = -10
    let max = 10
    console.log("Task 5\n")
    function randomNumber(min, max) {
        console.log(`Случайное число: ${Math.round(Math.random() * (max - min) + min)}`);
    }
    randomNumber(min, max);
    console.log("\n")
}