import { calculateSquareRoot, createCounter, getUserData, periodicLogger, sendEmail } from "./tasks.js";
import { handleSendEmailResult, handleUserData } from "./callbacks.js";

async function program() {
    console.log("Task 1");
    try {
        const result = calculateSquareRoot(9);
        console.log("Квадратный корень:", result);
    } catch (error) {
        console.error("Ошибка:", error.message);
    }
    console.log("\n");

    console.log("Task 2");
    const counter1 = createCounter();
    const counter2 = createCounter();

    console.log("Counter 1:", counter1());
    console.log("Counter 1:", counter1());
    console.log("Counter 2:", counter2());
    console.log("Counter 1:", counter1());
    console.log("Counter 2:", counter2());
    console.log("\n");

    console.log("Task 3");

    const stopLogger = periodicLogger("logger", 1000);

    await new Promise(resolve => setTimeout(resolve, 6000));
    stopLogger();
    console.log("\n");

    console.log("Task 4");
    try {
        const userData = await getUserData(123);
        handleUserData(null, userData);
    } catch (error) {
        handleUserData(error, null);
    }
    console.log("\n");

    console.log("Task 5");
    sendEmail("da.ru", handleSendEmailResult);
    sendEmail("da@mail.ru", handleSendEmailResult);
}

program();