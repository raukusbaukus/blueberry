function formValidation()
{
var uid = document.registration.displayName;
var passid = document.registration.passid;
var uname = document.registration.username;

var uzip = document.registration.zip;
var uemail = document.registration.email;
 if(userid_validation(uid,5,12)){
   if(passid_validation(passid,7,12)){

     if(allLetter(uname)){
       if(allnumeric(uzip)){
          if(ValidateEmail(uemail)){
             }
           }
         }

     }
   }
   return false;
  }


 function userid_validation(uid,mx,my){
   var uid_len = uid.value.length;
    if (uid_len == 0 || uid_len >= my || uid_len < mx){
      alert("Display Name should not be empty / length be between "+mx+" to "+my);
      uid.focus();
      return false;
      }
      return true;
      }
  function passid_validation(passid,mx,my){
    var passid_len = passid.value.length;
      if (passid_len == 0 ||passid_len >= my || passid_len < mx){
        alert("Password should not be empty / length be between "+mx+" to "+my);
        passid.focus();
        return false;
      }
        return true;
      }
  function allLetter(uname){
    var letters = /^[A-Za-z]+$/;
    if(uname.value.match(letters)){
      return true;
    }
    else{
      alert('Name must have alphabet characters only');
      uname.focus();
      return false;
    }
  }


    function allnumeric(uzip){
      var numbers = /^[0-9]+$/;
      if(uzip.value.match(numbers)){
        return true;
      }
      else{
        alert('ZIP code must have numeric characters only');
        uzip.focus();
        return false;
      }
    }

    function ValidateEmail(uemail){
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(uemail.value.match(mailformat)){
        alert('Form Succesfully Submitted');
        window.location.reload()
        return true;
        }else{
          alert("You have entered an invalid email address!");
          return false;
        }
      }
