const inputs = Array.from(document.querySelectorAll(".form-control"));
const bookMarkForm = document.querySelector(".bookMarkForm");
const removeAllBtn=document.querySelector(".removeAll");
const searchInput=document.querySelector(".search-input");
const massegeAlertInput=Array.from(document.querySelectorAll(".error_input"));




// must be implemented outside the loop, because if it is inside a loop, a new array will be created on each click
// must check if there is data in localStorage, if not it will be [], same as in loop
let sites = JSON.parse(localStorage.getItem("sites")) || [];

bookMarkForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page refresh on submit

  //  to  ceak  the  inputes  is  it  valid  or  not 
  let isValid=true;
  if( !validateSiteNmae()){
    isValid=false;
  }
  

  if(isValid==false)return;



 // object to get and store data from form
  const site = {
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

removeAllBtn.addEventListener("click",function(){
  localStorage.removeItem("sites");
  sites=[];
  displaySites();
});


// function to display data in table
const displaySites = () => {
  // use map with  index  
  const result = sites
    .map((site ,index) => {
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
  document.querySelector(".sites_data").innerHTML = result; // put html result into element with class sites_data
};

displaySites();

//  cheak  the  site  name  
//  regex  is  bulid  from  zero  to  cheak  the  data  
const validateSiteNmae=()=>{

  const regex = /^[A-Z][a-zA-Z]{2,}$/;

  if( ! regex.test(inputs[0].value)){
       inputs[0].classList.add("is-invalid");
       inputs[0].classList.remove("is-valid");
       massegeAlertInput[0].textContent=" invaled  name  you  must  start  with  capital  liter";

       return false;

    }else{
       inputs[0].classList.add("is-valid");
       inputs[0].classList.remove("is-invalid");
       massegeAlertInput[0].textContent="";

       return true;
    }

}


//  its  work  whe  the  user  is  inter  the  data  in  site name  
//  input  /  or  blue  can  be  
inputs[0].addEventListener('blur',validateSiteNmae);


const removeBookMark=(index)=>{
  alert("  are  you  sure  to  remove the  item ?");

  sites.splice(index,1);
  localStorage.setItem("sites",JSON.stringify(sites));
  displaySites();



}


searchInput.addEventListener("input" , ()=>{
   const fiLterText=searchInput.value.toLowerCase();

   const fiLteredSites=sites.filter((site)=>{

    return site.siteName.toLowerCase().includes(fiLterText);
   }) ;

const result = fiLteredSites
    .map((site ,index) => {
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


