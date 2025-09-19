const inputs = Array.from(document.querySelectorAll(".form-control"));
const bookMarkForm = document.querySelector(".bookMarkForm");

// must be implemented outside the loop, because if it is inside a loop, a new array will be created on each click
// must check if there is data in localStorage, if not it will be [], same as in loop
let sites = JSON.parse(localStorage.getItem("sites")) || [];

bookMarkForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page refresh on submit
  const site = {
    // object to get and store data from form
    siteName: inputs[0].value,
    siteUrl: inputs[1].value,
    userName: inputs[2].value,
    sitepass: inputs[3].value,
  };
  // add object "site" to array "sites"
  sites.push(site);
  console.log(sites);

  // data will be lost on refresh, so it must be stored in localStorage as a string
  localStorage.setItem("sites", JSON.stringify(sites));
  bookMarkForm.reset(); // clear the form after submitting
  displaySites(); // call after each add to display data in table
});

// function to display data in table
const displaySites = () => {
  // use map
  const result = sites
    .map((site) => {
      // use map to add html using js
      return `<tr> 
          <td>${site.siteName}</td> 
          <td>${site.siteUrl}</td> 
          <td>${site.userName}</td> 
          <td>${site.sitepass}</td> 
        </tr>`;
    })
    .join(" "); // when using map, always use join to convert array to string and remove commas
  document.querySelector(".sites_data").innerHTML = result; // put html result into element with class sites_data
};

displaySites();
