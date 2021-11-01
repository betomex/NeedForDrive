export const dateFormat = (date, timeDif = null) => {
  const tempTimeDif = timeDif ? timeDif : date[1]?.toDate().getTime() - date[0]?.toDate().getTime()

  const tempTimes = {
    d: Math.round(tempTimeDif / 1000 / 60 / 60 / 24),
    h: Math.round(tempTimeDif / 1000 / 60 / 60 % 24),
    m: Math.round(tempTimeDif / 1000 / 60 % 60)
  }

  return {
    timeDif: tempTimeDif,
    times: tempTimes
  }
}