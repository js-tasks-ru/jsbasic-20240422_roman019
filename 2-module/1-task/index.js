function sumSalary(salaries) {

  let totalSalary = 0;

  for (let key in salaries) {

    if (Number.isFinite(salaries[key])) {
      totalSalary += salaries[key];
    }
  }

  return totalSalary;
}