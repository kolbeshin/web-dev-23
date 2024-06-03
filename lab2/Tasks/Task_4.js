export function task4(){
    let x = -30
    console.log("Task 4\n")
    function absValue(x) {
        if (x < 0) {
            console.log(`Абсолютное значение: ${-x}`);
            console.assert(-x === 2, "ОШИБКА")
        } else {
            console.log(`Абсолютное значение: ${x}`);
        }
    }
    absValue(x)
    console.log("\n")
}
