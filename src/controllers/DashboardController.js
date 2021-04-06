const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  index(req, res){
    const jobs = Job.get()
    const profile = Profile.get()
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas por dia de cada job em progress
    let jobInProgressTotalHours = 0
    
    const updatedJobs = jobs.map((job)=>{
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      statusCount[status] += 1

      // incrementando o total de horas por dia de cada job em progress
      jobInProgressTotalHours = status === 'progress' ? jobInProgressTotalHours += Number(job["daily-hours"]) : jobInProgressTotalHours
  
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })

    //qtd de horas que quero trabalhar/dia MENOS qtd de horas de cada job em progress
    const freeHours = profile["hours-per-day"] - jobInProgressTotalHours

    return res.render('index',{profile: profile, jobs: updatedJobs, statusCount: statusCount, freeHours: freeHours})
  }  
}