export function task6(){
    console.log("Task 6\n")
    function randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
    function sampleArray(arr, count) {
        const result = [];
        const length = arr.length;
        for (let i = 0; i < count; i++) {
            const randomIndex = randomNumber(0, length - 1);
            result.push(arr[randomIndex]);
        }
        return result;
    }

    console.log(`Случайный массив:`)
    console.log(sampleArray([1,2,3,4], 2))
    console.log("\n")
}