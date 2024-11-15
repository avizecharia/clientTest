export const misslilesNameSpeed = [
  { name: "Iron Dome", speed: 3 },
  { name: "David's Sling", speed: 4 },
  { name: "Patriot", speed: 5 },
  { name: "Arrow", speed: 5 },
  { name: "Qassam", speed: 12 },
  { name: "M-75", speed: 13 },
  { name: "Fajr-5", speed: 14 },
  { name: "Zelzal-2", speed: 15 },
  { name: "Shahab-3", speed: 15 },
  { name: "Fateh-110", speed: 14 },
  { name: "Badr-1", speed: 13 },
  { name: "Quds-1", speed: 14 },
];

export const getSpeedByName = (name:string):number => {
    const result =misslilesNameSpeed.find((x) => x.name == name)
    if(!result){
        return 0
    }
    return result.speed!
}
