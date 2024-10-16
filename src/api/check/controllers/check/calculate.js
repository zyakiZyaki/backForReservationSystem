'use strict'

module.exports = { calculateDays, calculateCost }

function calculateDays(checkIn, checkOut) {

    const data = {}

    calcEarlyCheckIn(checkIn, data)
    calcLateCheckOut(checkOut, data)
    calcFullDays(checkIn, checkOut, data)

    return data
}

function calculateCost(data, prices) {
    data.sum = 0
    for (const month in prices) {
        for (const atr in data)
            if (atr === month) {
                data.sum += prices[month] * data[atr]
                data[atr] = data[atr] + 'x' + prices[month] + '=' + prices[month] * data[atr]
            }
    }
    return data
}

function calcEarlyCheckIn(checkIn, data) {
    if (hourOf(checkIn) < 6) {
        data.borders = "Ранний заезд+"
        data[monthOf(checkIn)] = 1
        return data
    }
    if (hourOf(checkIn) < 14 && hourOf(checkIn) > 6) {
        data.borders = "Ранний заезд"
        data[monthOf(checkIn)] = 0.5
        return data
    }
    return
}

function calcLateCheckOut(checkOut, data) {
    if (hourOf(checkOut) > 12) {
        data.borders ? data.borders += "/Поздний выезд" : data.borders = "Поздний выезд"
        data[monthOf(checkOut)] += 0.5
        return data
    }
    return
}

function calcFullDays(checkIn, checkOut, data) {

    let numberDayOfCheckIn = new Date(checkIn).getDate()
    let days = amountDaysOfBooking(checkIn, checkOut)

    while (days) {
        let iterableDate = new Date(checkIn).setDate(numberDayOfCheckIn)
        data[monthOf(iterableDate)] ? data[monthOf(iterableDate)]++ : data[monthOf(iterableDate)] = 1
        numberDayOfCheckIn++
        days--
    }
    return data
}

function monthOf(date) {
    return new Date(date).toLocaleString('default', { month: 'long' }).toLowerCase()
}

function hourOf(date) {
    return new Date(date).getHours()
}

function amountDaysOfBooking(checkIn, checkOut) {
    return parseInt((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
}