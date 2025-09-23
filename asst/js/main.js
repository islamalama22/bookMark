const inputs = Array.from(document.querySelectorAll(".form-control"));
const bookMarkForm = document.querySelector(".bookMarkForm");
const addBtn = document.querySelector(".addBtn");
const removeAllBtn = document.querySelector(".removeAll");
const searchInput = document.querySelector(".search-input");
const massegeAlertInput = Array.from(document.querySelectorAll(".error_input"));
// must be implemented outside the loop, because if it is inside a loop, a new array will be created on each click
// must check if there is data in localStorage, if not it will be [], same as in loop
let sites = JSON.parse(localStorage.getItem("sites")) || [];
let editeingIndex = -1; // القيمة الافتراضية: لا تعديل




const AddValid = (e) =>{
  e.preventDefault();

console.log(` the  editeingindex  begin in bookform = ${editeingIndex }`);

  //  to  ceak  the  inputes  is  it  valid  or  not 
  let isValid = true;
  if (!(validateSiteNmae() && validatePassword() && validateSiteUrl() && validateEmail())) {
    isValid = false;
  }

  if (isValid == false) return;


  // object to get and store data from form
  const site = {
    siteName: inputs[0].value,
    siteUrl: inputs[1].value,
    userName: inputs[2].value,
    sitepass: inputs[3].value
  };

  if ( (editeingIndex === -1) )  {
    
    console.log(" add ");
    console.log(` the  editeingindex  if in bookform = ${editeingIndex }`);

    // add object "site" to array "sites"
    sites.push(site);
  }else if (editeingIndex >=0) {
    console.log(` the  editeingindex  ifelse in bookform = ${editeingIndex }`);
    sites.splice(editeingIndex, 1, site);
    console.log("edite");
    editeingIndex=-1;
  } 
   else{
    return console.log(` the  editeingindex  in  else  in bookform = ${editeingIndex }`);
  }

  // data will be lost on refresh, so it must be stored in localStorage as a string
  localStorage.setItem("sites", JSON.stringify(sites));
  bookMarkForm.reset(); // clear the form after submitting
  console.log(` the  editeingindex  if in bookform  befor  display = ${editeingIndex }`);

  displaySites();

return console.log(" i  am  out  of  add  fun")

};

bookMarkForm.addEventListener("submit", AddValid);

removeAllBtn.addEventListener("click", function () {
  localStorage.removeItem("sites");
  sites = [];
  displaySites();
});


// function to display data in table
const displaySites = () => {
  // use map with  index  
  const result = sites
    .map((site, index) => {
      // use map to add html using js
      return `<tr> 
          <td>${site.siteName}</td> 
          <td>${site.siteUrl}</td> 
          <td>${site.userName}</td> 
          <td>${site.sitepass}</td> 
          <td>
          <button class=" btn   text-danger border-danger  rounded-0 text-uppercase "  onclick='removeBookMark(${index})'>remove  </button>
          <button class=" editedBtn btn text-success border-success rounded-0 text-uppercase "  onclick='editeBookMark(${index})'>Edite  </button></td> 

        </tr>`;
    })
    .join(" "); // when using map, always use join to convert array to string and remove commas
  document.querySelector(".sites_data").innerHTML = result; // put html result into element with class sites_data

};

displaySites();

//  regex  is  bulid  from  zero  to  cheak  the  data  
const validateSiteNmae = () => {

  const regex = /^[A-Z][a-zA-Z]{2,}$/;

  if (!regex.test(inputs[0].value)) {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
    massegeAlertInput[0].textContent = " start with captial case";

    return false;

  } else {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    massegeAlertInput[0].textContent = "";

    return true;
  }

}

const validateSiteUrl = () => {

  const regex = /^https:\/\/.+$/;

  if (!regex.test(inputs[1].value)) {

    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
    massegeAlertInput[1].textContent = "Enter full URL (e.g. https://example.com) ";
    return false;
  } else {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    massegeAlertInput[1].textContent = "";
    return true;

  }
}

const validateEmail = () => {

  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (regex.test(inputs[2].value)) {

    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    massegeAlertInput[2].textContent = "";
    return true;


  } else {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    massegeAlertInput[2].textContent = "Please enter a valid email, like name@example.com";
    return false;

  }


}
const validatePassword = () => {

  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regex.test(inputs[3].value)) {

    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    massegeAlertInput[3].textContent = "";
    return true;


  } else {
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    massegeAlertInput[3].textContent = "Password must be at least 8 characters and include letters and numbers";
    return false;

  }


}



//  its  work  whe  the  user  is  inter  the  data  in  site name  
inputs[0].addEventListener('blur', validateSiteNmae);
inputs[1].addEventListener("blur", validateSiteUrl);
inputs[2].addEventListener("blur", validateEmail);
inputs[3].addEventListener("blur", validatePassword);


const removeBookMark = (index) => {
  alert("  are  you  sure  to  remove the  item ?");

  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();



}


searchInput.addEventListener("input", () => {
  const fiLterText = searchInput.value.toLowerCase();

  const fiLteredSites = sites.filter((site) => {

    return site.siteName.toLowerCase().includes(fiLterText);
  });

  const result = fiLteredSites
    .map((site, index) => {
      // use map to add html using js
      return `<tr> 
          <td>${site.siteName}</td> 
          <td>${site.siteUrl}</td> 
          <td>${site.userName}</td> 
          <td>${site.sitepass}</td> 
          <td><button class=" btn text-danger border-danger rounded-0 text-uppercase "  onclick='removeBookMark(${index})'>remove  </button></td> 

        </tr>`;
    })
    .join(" "); // when using map, always use join to convert array to string and remove commas
  document.querySelector(".sites_data").innerHTML = result;
});

//  get  index  of  what  is  row  edited 
const editeBookMark = (index) => {

  addBtn.textContent = "edit";
  const edited = sites[index];

  inputs[0].value = edited.siteName;
  inputs[1].value = edited.siteUrl;
  inputs[2].value = edited.userName;
  inputs[3].value = edited.sitepass;

   editeingIndex = index;
  console.log(` the  editeingindex  in editemark  and send  it  to  add  fun = ${editeingIndex }`);



};







