
export function handleUserData(error, userData) {
    if (error) {
        console.error("Произошла ошибка:", error.message);
    } else {
        console.log("Данные о пользователе:", userData);
    }
}

export function handleSendEmailResult(error, result) {
    if (error) {
        console.error("Ошибка при отправке письма:", error.message);
    } else {
        console.log("Письмо успешно отправлено:", result);
    }
}
