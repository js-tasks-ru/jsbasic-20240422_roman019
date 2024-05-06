function showSalary(users, age) {

  let result = '';

  users.forEach(element => {
    if (element.age <= age) {
      if (result.length > 0) result += '\n';
      result += `${element.name}, ${element.balance}`;
    };
  });

  return result;
}
