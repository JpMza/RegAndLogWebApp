export const parseJwt = (token) => {
  if (!token) return;
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const getDaysArray = () => {

  let daysNumbers = [];
  let date = new Date()
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let days = new Date(year, month, 0).getDate();
  for (let index = 1; index <= days; index++) {
    daysNumbers.push(index.toString());
  }
  return daysNumbers;
}


const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];


export const getMonth = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return monthNames[d.getMonth()];

}