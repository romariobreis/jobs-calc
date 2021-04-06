const Profile = require('../model/Profile')

module.exports={
  index(req, res) {
    return res.render("profile", { profile: Profile.get() })
  },
  update(req, res) {
    //req.body pegaar os dados
    const data = req.body

    //define quantas semanas tem 1 ano: 52
    const weeksPerYear = 52

    //remove as semanas de ferias do ano e pega quantas semanas tem 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"])/12

    //total de horas trabalhadas na semanas
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

    //horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    //calcula o valor da horas
    const valueHour = data["monthly-budget"] / monthlyTotalHours

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
    })

    return res.redirect('/profile')

  }
}
