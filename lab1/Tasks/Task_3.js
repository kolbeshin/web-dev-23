export function task3(){
    let endValue = 10;
    console.log("Task 3\n")
    for (let i = 0; i <= endValue; i++) {
        if (i === 0){
            console.log(`${i} buzz`);
        } else if (i % 5 === 0) {
            console.log(`${i} fizz buzz`);
        } else if (i % 2 === 0) {
            console.log(`${i} buzz`);
        } else if (i % 2 !== 0) {
            console.log(`${i} fizz`);
        }
    }
    console.log("\n")
}