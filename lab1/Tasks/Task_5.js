 export function task5(){
    let n1 = 3, x1 = 1, y1 = 3;
    let n2 = 12, x2 = 2, y2 = 6;
    let n3 = 100, x3 = 5, y3 = 3;
    let n4 = 12, x4 = 7, y4 = 5;
    console.log("Task 5\n")
    function isDivisible(n, x, y) {
        return n % x === 0 && n % y === 0;
    }
    console.log(`n = ${n1}, x = ${x1}, y = ${y1} => ${isDivisible(n1, x1, y1)}`);
    console.log(`n = ${n2}, x = ${x2}, y = ${y2} => ${isDivisible(n2, x2, y2)}`);
    console.log(`n = ${n3}, x = ${x3}, y = ${y3} => ${isDivisible(n3, x3, y3)}`);
    console.log(`n = ${n4}, x = ${x4}, y = ${y4} => ${isDivisible(n4, x4, y4)}`);
    console.log("\n")
}
