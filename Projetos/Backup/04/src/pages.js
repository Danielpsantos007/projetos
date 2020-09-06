const Database = require('./database/db')

const { subjects, 
        weekdays,
        getSubject,
        convertHoursToMinutes
 } = require('./utils/format')

function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){
    const filters = req.query //"query" mostra os dados na url
    //const filters = req.body

    if (!filters.subject || !filters.weekday || !filters.time ){
        console.log("Temos campos em branco")
        return res.render("study.html", { filters, subjects, weekdays })
    }

    //Convertando horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
       SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    //Verificar se ha erro na consulta do banco
    
    try{
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.dubject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }
}   

function pageGiveClasses(req, res){
    return res.render('give-classes.html', {subjects, weekdays})
}

function pageSucess (req, res) {
    return res.render('pageSucess.html')
}

async function saveClasses(req, res){

    //Adicionando dados cadastrados
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })
    
    //Tratamento de erro de conexão com o Banco
    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect('/sucesso' + queryString)

        } catch (error) {
            console.log(error)
        }
    
    }
    
//Exportando
module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSucess
}