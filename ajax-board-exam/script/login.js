const loginBtn = document.getElementById("confirm-login")

const getIdPw = () =>{
  var pwInput = document.getElementById('inputPassword').value;
  var IdInput = document.getElementById('inputId').value;
  console.log(IdInput)
  console.log(pwInput)
  const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const user = JSON.parse(xhr.responseText);
                console.log(user);
                let tbodyHTML = "";
                if(user.username == pwInput){
                  document.getElementById('isWrong').innerHTML = "";
                  tbodyHTML += `
                        <h2>${user.username}님 환영합니다!</h2>
                    `;
                    document.getElementById('commentsBody').innerHTML = tbodyHTML;
                } else {
                  document.getElementById('isWrong').innerHTML = "<div>일치하는 정보가 없습니다.</div>";
                }
            }else{
              document.getElementById('isWrong').innerHTML = "<div>일치하는 정보가 없습니다.</div>";
            }
        }
    };
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/'+IdInput);
    xhr.send();
}
