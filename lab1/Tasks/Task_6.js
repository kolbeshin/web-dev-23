export function task6() {
    let month1 = 2;  // февраль
    let month2 = 6;  // июнь
    let month3 = 11; // ноябрь
    function getQuarter(month) {
        if (month >= 1 && month <= 3) {
            return 1;
        } else if (month >= 4 && month <= 6) {
            return 2;
        } else if (month >= 7 && month <= 9) {
            return 3;
        } else if (month >= 10 && month <= 12) {
            return 4;
        } else {
            return -1; // В случае неверного месяца
        }
    }

    console.log("Task 6\n")
    console.log(`месяц ${month1} => ${getQuarter(month1)} квартал`);
    console.log(`месяц ${month2} => ${getQuarter(month2)} квартал`);
    console.log(`месяц ${month3} => ${getQuarter(month3)} квартал`);
    console.log("\n")
}