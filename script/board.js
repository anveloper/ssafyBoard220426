function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                const users = JSON.parse(xhr.responseText);              
                let tbodyHtml = '';
                users.forEach((element) => {
                    tbodyHtml += `
                    <tr>
                        <td><a href="#">${element.id}</a></td>
                        <td>${element.name}</td>
                        <td>${element.phone}</td>
                        <td>${element.website}</td>
                    </tr>                    
                    `;
                });
                document.querySelector("#boardTbl > tbody").innerHTML = tbodyHtml;
            }
        }

    };
    xhr.open('GET','https://jsonplaceholder.typicode.com/users');
    xhr.send();
    
}