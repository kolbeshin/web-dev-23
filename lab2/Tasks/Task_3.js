
export function task3(){
    let temp = {
        Temp: 10,
        CF: 'toF'
    }
    function convertTemperature(temp){
        console.log("Task 3\n")
        if (temp.CF === 'toC') {
            let fahrenheitTemperature2 = temp.Temp
            let convertedCelsiusTemperature = (fahrenheitTemperature2 - 32) * 5/9;
            console.assert(convertedCelsiusTemperature === 0, "ОШИБКА")
            console.log(`${fahrenheitTemperature2}°F равно ${convertedCelsiusTemperature}°C`);
        } else if (temp.CF === 'toF') {
            let celsiusTemperature = temp.Temp;
            let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
            console.assert(fahrenheitTemperature === 50, "ОШИБКА")
            console.log(`${celsiusTemperature}°C по Цельсию равно ${fahrenheitTemperature}°F по Фаренгейту `);
        }
        console.log("\n")
    }
    convertTemperature(temp)
}
