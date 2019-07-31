export function date() {
  let date = new Date()
    let day =  date.getDate()
    if( day.toString().length === 1) day = "0" + date.getDate()
    let year = date.getFullYear()
    let mounth = date.getMonth() + 1
    if(mounth.toString().length === 1) mounth = "0" + mounth

    return `${year}-${mounth}-${day}`
}