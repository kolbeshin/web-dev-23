export function task1(){
    let celsiusTemperature = 25;
    let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
    let fahrenheitTemperature2 = 32
    let convertedCelsiusTemperature = (fahrenheitTemperature2 - 32) * 5/9;
    console.log("Task 1\n")
    console.log(`${celsiusTemperature}°C по Цельсию равно ${fahrenheitTemperature}°F по Фаренгейту `);
    console.log(`${fahrenheitTemperature2}°F равно ${convertedCelsiusTemperature}°C`);
    console.log("\n")
}
