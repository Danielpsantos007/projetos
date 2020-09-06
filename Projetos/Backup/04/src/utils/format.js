const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Fisíca",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

//Funcionalidades
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time) {
  const [hours, minutes] = time.split(":")
  return Number((hours * 60) + minutes)

}

//Exportando
module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}