function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const users = JSON.parse(xhr.responseText);
              
                let tbodyHTML = "";
                
                users.forEach(ele => {
      
                    tbodyHTML += `
                        <tr>
                            <td><a class = "userId" href="#1" name = "${ele.id}">${ele.id}</a></td>
                            <td>${ele.name}</td>
                            <td>${ele.phone}</td>
                            <td>${ele.website}</td>
                        </tr>
                    `;

                });
               
                document.querySelector("#boardTbl > tbody").innerHTML = tbodyHTML;
                document.querySelector("#boardTbl > thead").innerHTML = `<th>ID</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>WEBSITE</th>`;
                document.querySelector(".return").innerHTML = ``;
                const userList = document.querySelectorAll(".userId");
                userList.forEach(function (item) {
                    item.addEventListener('click', (e) => {
                        const link = e.target;
                        getPosts(link.name);
                        

                    });
                  });
            }
        }
    };
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.send();
    
};

function getPosts(id){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                
                const posts = JSON.parse(xhr.responseText);
                let theadHTML = "";
                let tbodyHTML = "";
                posts.forEach(ele => {
                    // console.dir(ele)
                    if(ele.userId == id){
                        tbodyHTML += `
                            <tr>
                                <td  name = "${ele.id}">${ele.id}</a></td>
                                <td><a class = "postId" data-body = "${ele.body}" data-bs-toggle="modal" data-bs-target="#comments" name = "${ele.id}">${ele.title}</a></td>
                                <td>${ele.userId}</td>
                            </tr>
                        `;
                }
                });
                document.querySelector("#boardTbl > thead").innerHTML = `<th>글 번호</th>
                <th>제목</th>
                <th>작성자 아이디</th>
                `;
                document.querySelector("#boardTbl > tbody").innerHTML = tbodyHTML;
                document.querySelector(".return").innerHTML = `<a class = "re" href="#1">돌아가기</a>`;
                document.querySelector(".re").addEventListener('click',(e)=>{
                    getUsers()
                });


                const postList = document.querySelectorAll(".postId");
                
                postList.forEach(function (item) {
                    item.addEventListener('click', (e) => {
                        const link = e.target;
                        document.querySelector("#commentsLabel").innerHTML = `${link.dataset.body}`;
                        getComments(link.name);                        
                    });
                  });
            }
        }
    };
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send();
}

function getComments(id){
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                const comments = JSON.parse(xhr.responseText);

                let tbodyHTML = "";

                comments.forEach(ele => {
                    if(ele.postId == id){

                        tbodyHTML += `
                            <tr>
                                <td>${ele.name}</td>
                                <td>${ele.email}</td>
                                <td>${ele.body}</td>
                            </tr>
                        `;

                }

                });

               document.querySelector("#commentsBody >#boardTbl2 > tbody").innerHTML = tbodyHTML;




               
            }
        }
    };
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments');
    xhr.send();



}
