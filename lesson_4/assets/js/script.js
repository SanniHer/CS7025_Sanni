const API_KEY = "05d9d13cb23e4db6b5c2b9eece3e492e";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded");

  const students = [
    { name: "Jim", age: 21, email: "j@j.com" },
    { name: "Maggie", age: 22, email: "m@m.com" },
    { name: "Bob", age: 20, email: "Bob@bob.com" },
  ];

  for (student in students) {
    let p = document.createElement("p");
    p.setAttribute("id", students[student].name.toLowerCase());
    p.classList.add("student");
    p.textContent = students[student].name;

    document.body.appendChild(p);
  }

  let dataSource = "assets/js/treats.json";
  console.log("getting treats");
  getData(dataSource, "json");

  let topic = "dublin";
  let dateFrom = "2024-09-30";
  let newsFeedURL = `https://newsapi.org/v2/everything?q=${topic}&from=${dateFrom}&sortBy=publishedAt&apiKey=${API_KEY}`;
  console.log("getting news");
  getData(newsFeedURL, "news");
});

async function getData(dataSource, dataType) {
  await fetch(dataSource)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (dataType == "json") {
        const treats = data;
        for (treat in treats) {
          let li = document.createElement("li");
          console.log("treat", treats[treat]);
          li.innerHTML = `<span class="treat_name">${treats[treat].name}</span><span class='treat_type'>${treats[treat].type}</span>`;

          document.getElementById("treats").appendChild(li);
        }
      }
      if (dataType == "news") {
        const news = data.articles;
        for (article in news) {
          let li = document.createElement("li");
          li.innerHTML = `<div class="title">${news[article].title}</div><div class="article">${news[article].content}</div>`;

          document.getElementById("news").appendChild(li);
        }
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}
