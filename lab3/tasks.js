export function calculateSquareRoot(number) {
    if (number < 0) {
        throw new Error("Отрицательное число не имеет квадратного корня");
    }
    return Math.sqrt(number);
}
// замыкание (функция возвращает внутреннюю функцию, которая захватывает внешнюю переменную count)
export function createCounter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

export function periodicLogger(message, interval) {
    let count = 0; // количества прошедших интервалов

    const timer = setInterval(() => {
        count++;
        console.log(message);
    }, interval);

    return function stopLogger() {
        clearInterval(timer); // Остановка таймера
        console.log(`Логгер остановлен после ${count} интервалов.`);
    };
}

export async function getUserData(userId) {
    if (typeof userId !== 'number') {
        throw new Error("userId должен быть числовым значением");
    }

    // Моделирование асинхронной выборки пользовательских данных
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (Math.random() < 0.5) {
        return {
            userId: userId,
            username: "George",
            email: "kolbeshin@mail.ru"
        };
    } else {
        throw new Error("Ошибка при получении данных пользователя");
    }
}


export function sendEmail(emailAddress, callback) {
    if (!emailAddress.includes('@')) {
        const error = new Error("Некорректный адрес электронной почты");
        callback(error, null);
        return;
    }

    setTimeout(() => {
        const result = "Письмо успешно отправлено на адрес: " + emailAddress;
        callback(null, result);
    }, 1000);
}