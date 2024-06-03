export function task4(){
    let levels = 10;
    let tree = '';
    console.log("Task 4\n")
    for (let i = 1; i <= levels; i++) {
        for (let j = 1; j <= i; j++) {
            tree += (i % 2 === 0) ? '#' : '*';
        }
        tree += '\n';
    }
    tree += '||';
    console.log(tree);
    console.log("\n")
}
