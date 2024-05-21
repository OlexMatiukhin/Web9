
const setError=(element, message)=>{
    const inputControl=element.parentElement;
    const errorDisplay= inputControl.querySelector('.info');
    const input=inputControl.querySelector('input');
    input.classList.remove('success');
    input.classList.add('error');
    errorDisplay.classList.remove('success');
    errorDisplay.classList.add('error');
    errorDisplay.innerText = message;
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.info');

    errorDisplay.innerText = 'Great value';
    errorDisplay.classList.add('success');
    errorDisplay.classList.remove('error');
    let input=inputControl.querySelector('input');
    input.classList.add('success');
    input.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}





/*if(localStorage.length>0){
   // window.location.assign('https://www.google.com/'); 
}
else{
    registration();
}*/
registration();
function registration(){
let tabs = Array.from(document.getElementsByClassName('tab'));
let forms = Array.from(document.getElementsByClassName('form'));
let resultSignSucces=true;
let resultLoginSucces=true;

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const toggleId = this.getAttribute('data-toggle-id');

        tabs.forEach(t => t.classList.remove('clicked'));
        this.classList.add('clicked');

        forms.forEach(form => {
            if (form.id === toggleId) {
                form.classList.add('active');
            } else {
                form.classList.remove('active');
            }
        });
    });
});
async function loading() {
    let loader_wrap = document.querySelector('.loader_wrap');
    loader_wrap.style.display = 'flex';
    await new Promise(resolve => setTimeout(resolve, 2000));
    await endloading();
}

async function endloading() {
    let loader_loading = document.querySelector('.loader_loading');
    loader_loading.style.display = "none";
    let loader_end = document.querySelector('.loader_end');
    loader_end.style.display = "block";
    await new Promise(resolve => setTimeout(resolve, 1000));
}
signup_form.addEventListener('submit', e=>{
    e.preventDefault();
    validateInputs();
    if(resultSignSucces){
         loading().then(()=>{
            const formData = new FormData(login_form);
            const formObject = {};
            
    
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
    
            localStorage.setItem('formData', JSON.stringify(formObject));
           window.location.assign('https://www.google.com/'); 
            login_form.reset();
            signup_form.reset();
         });      
    }
    

});
login_form.addEventListener('submit', e=>{
    e.preventDefault();
    validateLogin();
    if(resultLoginSucces){
        
        loading().then(()=>{
            const formData = new FormData(signup_form);
            const formObject = {};
    
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
    
        
            localStorage.setItem('formData', JSON.stringify(formObject));
           window.location.assign('https://www.google.com/'); 
           login_form.reset();
           signup_form.reset();
         });  
    }
});
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    resultSignSucces=true;

    if(usernameValue === '') {
        setError(username, 'Username is required');
        resultSignSucces=false;
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        resultSignSucces=false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        resultSignSucces=false;
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
        resultSignSucces=false;
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.');
        resultSignSucces=false;
    } else {
        setSuccess(password);
      
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
        resultSignSucces=false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
        resultSignSucces=false;
    } 
    else if(passwordValue.length < 8 ){
        
            setError(password2, "Passwords must be at least 8 character.");
            resultSignSucces=false;        
    }
     else {
            setSuccess(password2);}   
       
     
    

};
const validateLogin = () => {
 const usernameLoginValue = logusername.value.trim();
 const passwordLoginValue = logpassword.value.trim();
 resultSignSucces=true;
 if(usernameLoginValue==='') {
    setError(logusername, 'Username is required');
    resultLoginSucces=false;
} else {
    setSuccess(logusername);
    
}
 if(passwordLoginValue==='') {
    setError(logpassword, 'Password is required');
    resultLoginSucces=false;
} else if (passwordLoginValue.length < 8 ) {
    setError(logpassword, 'Password must be at least 8 character.');
    resultLoginSucces=false;
} else {
    setSuccess(logpassword);
} 
};
}
