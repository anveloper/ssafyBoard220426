function joininit(){
    document.getElementById("signinId").addEventListener("keyup",()=>{
        console.log(signinId.value);
        requestIdCheck(signinId.value);			
    })

    document.getElementById("signinPassword").addEventListener("keyup",()=>{
        requestPassCheck(signinPassword.value);			
    });

    document.getElementById("signinPasswordc").addEventListener("keyup",()=>{
        let ms = document.getElementById("passCCheckMsg");
        let next = document.getElementById("signinNickname");
        let p = document.getElementById("signinPassword").value;	
        let c = signinPasswordc.value;	
        next.readOnly = true; 
        ms.style.color = 'red';
        if(c.length==0) {
            ms.innerText = "";
        } else if(p != c) {
            ms.style.color = 'orange'; 
            ms.innerText = "비밀번호가 일치하지 않습니다.";
        } else if(p == c) {
            ms.innerText = "";
            next.readOnly = false;
        }
    });
    
    document.getElementById("signinNickname").addEventListener("keyup",()=>{
        requestNickCheck(signinNickname.value);			
    });
};
    
function requestIdCheck(idVal){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            const users = JSON.parse(xhr.responseText);
            let ms = document.getElementById("idCheckMsg");
            let next = document.getElementById("signinPassword");
            let resp = '';
            users.forEach(ele => {
                if(ele.username==idVal){
                    resp='exist';
                    return;
                }
            });            
            ms.style.color = 'orange';
            next.readOnly = true;
            let msg = "";
            if(resp == 'exist') {
                msg = "사용중인 아이디입니다.";
                ms.style.color = 'red';
            } else if(idVal.length < 5) {
                msg = "너무 짧습니다. 5자 이상만 가능합니다.";				
            } else if(idVal.length > 17) {
                msg = "너무 깁니다. 16자 이하만 가능합니다.";					
            } else {
                msg = "사용 가능한 아이디 입니다.";
                ms.style.color = 'green';
                next.readOnly = false;
            } 					
            ms.innerText = msg;
        }	
    }
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.send();
};

    
function requestPassCheck(passVal){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            let ms = document.getElementById("passCheckMsg");
            let next = document.getElementById("signinPasswordc");
            let resp = xhr.responseText;            
            ms.style.color = 'orange';
            next.readOnly = true;
            let msg = "";
            if(passVal.length<8) {
                msg = "너무 짧습니다. 8자 이상만 가능합니다.";				
            } else if(passVal.length>20) {
                msg = "너무 깁니다. 20자 이하만 가능합니다.";					
            } else if(chkSpc(passVal)) {
                msg = "영문 소문자와 숫자만 사용할 수 있습니다.";
                ms.style.color = 'red';
            } else {
                msg = "사용 가능한 비밀번호입니다.";
                ms.style.color = 'green';
                next.readOnly = false;
            } 					
            ms.innerText = msg;
        }	
    }
    xhr.open("GET", "");
    xhr.send();
};

function chkSpc(passVal) {
	var str = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

	if(str.test(passVal) == true) {
		return true;
	} else {
		return false;
	}
}

function requestNickCheck(nickVal){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            const users = JSON.parse(xhr.responseText);

            let ms = document.getElementById("nameCheckMsg");
            let next = document.getElementById("joinSubmit");
            let resp = '';
            users.forEach(ele => {
                if(ele.name==nickVal){
                    resp='exist';
                    return;
                }
            });            
            ms.style.color = 'orange';
            next.readOnly = true;
            let msg = "";
            if(resp == 'exist') {
                msg = "사용중인 닉네임입니다.";
                ms.style.color = 'red';
            } else if(nickVal.length < 2) {
                msg = "2자 이상 가능합니다.";	
            } else if(nickVal.length > 17) {
                msg = "8자 이하만 가능합니다.";						
            } else {
                msg = "사용 가능한 닉네임입니다.";
                ms.style.color = 'green';
                next.disabled = false;
            } 					
            ms.innerText = msg; 
        }	
    }
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.send();
};

function fail(){
    alert('따로 저장은 안됩니다.');
    history.back();
}


function reset(){
    let m = document.getElementById("signinId");
    m.value = '';
    m = document.getElementById("signinPassword");
    m.readOnly = false;
    m = document.getElementById("signinPasswordc");
    m.readOnly = false;
    m = document.getElementById("signinNickname");
    m.readOnly = false;
    let ms = document.getElementById("idCheckMsg");
    ms.innerText = '';
    ms.style.color = 'orange';
    ms = document.getElementById("passCheckMsg");
    ms.innerText = '';
    ms.style.color = 'orange';
    ms = document.getElementById("passCCheckMsg");
    ms.innerText = '';
    ms.style.color = 'orange';
    ms = document.getElementById("nameCheckMsg");
    ms.innerText = '';
    ms.style.color = 'orange';
}
