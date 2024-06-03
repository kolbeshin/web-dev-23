
export function task1() {
    let student = {
        group: 201,
        last_name: "Иванов",
        first_name: "Иван"
    };

    let propertiesList = Object.keys(student).join(', ');
    console.log("Task 1\n")
    console.assert(propertiesList === "group, last_name, first_name", "Неправильный список свойств");
    console.log(`Список свойств: ${propertiesList}`);
    let studentInfo = `Студент ${student.first_name} ${student.last_name} учится в ${student.group} группе`;
    console.assert(studentInfo === "Студент Иван Иванов учится в 201 группе", "Неправильное сообщение о студенте");
    console.log(studentInfo);
    console.log("\n")
}
