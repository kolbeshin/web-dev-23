export function task2(){
    let sideA = 5;
    let sideB = 7;
    let sideC = 10;
    console.log("Task 2\n")
    if (sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA) {
        console.log('Треугольник существует');
        let perimeter = sideA + sideB + sideC;
        console.log(`Периметр = ${perimeter}`);
        let semiPerimeter = perimeter / 2;
        let area = Math.sqrt(semiPerimeter * (semiPerimeter - sideA) * (semiPerimeter - sideB) * (semiPerimeter - sideC));
        console.log(`Площадь = ${area.toFixed(2)}`);
        let ratio = perimeter / area;
        console.log(`Соотношение = ${ratio.toFixed(2)}`);
    } else {
        console.log('Треугольника не существует');
    }
    console.log("\n")
}
