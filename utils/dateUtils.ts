import { Day } from 'react-modern-calendar-datepicker'

export function addDays(numberOfDays: number, date = new Date()) {
	date = new Date(date)
	date.setDate(date.getDate() + numberOfDays)
	return date
}

export function addMonths(numOfMonths: number, date = new Date()) {
	date = new Date(date)
	date.setMonth(date.getMonth() + numOfMonths)

	return date
}

export function parseCalendarDate(date: Date): Day {
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	}
}

export function getListOfDates(startDate: Date, stopDate: Date): Array<Date> {
	var dateArray = new Array()
	var currentDate = new Date(startDate)
	while (currentDate <= new Date(stopDate)) {
		dateArray.push(new Date(currentDate))
		currentDate = addDays(1, currentDate)
	}
	return dateArray
}
