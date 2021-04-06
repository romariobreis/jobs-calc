let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 4,
    "total-hours": 40,
    created_at:Date.now(),
  },
  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 5,
    "total-hours": 5,
    created_at:Date.now(),
  }
]

module.exports = {
  get(){
    return data
  },
  update(newJob){
    data = newJob
  },
  delete(id){
    data = data.filter(job => Number(job.id) !== Number(id))
  }
}
