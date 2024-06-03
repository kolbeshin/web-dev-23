export function task7(){
    let n = 5;
    function powerOfTwo(exponent) {
        return Math.pow(2, exponent);
    }
    let resultString = '';
    for (let i = 0; i < n; i++) {
        resultString += powerOfTwo(i);
        if (i < n-1) {
            resultString += ', ';
        }
    }
    console.log("Task 7\n")
    console.log(resultString);

}