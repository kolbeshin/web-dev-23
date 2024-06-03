export function task7(){
    console.log("Task 7\n")
    function myFilterArray(array, filterFunc) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            if (filterFunc(array[i])) {
                result.push(array[i]);
            }
        }
        return result;
    }
    function isFirstV(name) {
        return name.startsWith('V');
    }
    // console.assert(String(myFilterArray(['Short', 'VeryLong'], isFirstV)) === "[ 'VeryLong' ]", "Ошибка: неправильный результат");
    console.log(myFilterArray(['Short', 'VeryLong'], isFirstV));
    console.log("\n")
}

