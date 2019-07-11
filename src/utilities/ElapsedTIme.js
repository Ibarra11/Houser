import moment from "moment";
export default function(
  workOrderDate,
  workOrderMonth,
  workOrderYear,
  workOrderHours,
  workOrderMinutes
) {
  let currentDate = moment().toObject();
  currentDate.months += 1;

  let elapsedTime = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0
  };

  console.log(currentDate);
  console.log(workOrderMinutes);

  if (currentDate.years > workOrderYear) {
    elapsedTime.years = currentDate.years - workOrderYear;
  }
  if (currentDate.months > workOrderMonth) {
    elapsedTime.months = currentDate.months - workOrderMonth;
  }
  if (currentDate.date > workOrderDate) {
    elapsedTime.date = currentDate.date - workOrderDate;
  }
  if (currentDate.hours > workOrderHours) {
    elapsedTime.hours = currentDate.hours - workOrderHours;
  }
  if (currentDate.minutes > workOrderMinutes) {
    elapsedTime.minutes = currentDate.minutes - workOrderMinutes;
  }

  console.log(elapsedTime);
}
