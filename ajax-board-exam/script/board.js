

function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const users = JSON.parse(xhr.responseText);
                // console.log(typeof users);
                let tbodyHTML = "";
                users.forEach(ele => {
                    // console.dir(ele)
                    tbodyHTML += `
                        <tr>
                            <td>${ele.id}</td>
                            <td>${ele.name}</td>
                            <td>${ele.phone}</td>
                            <td>${ele.website}</td>
                        </tr>
                    `;
                });
                document.querySelector("#boardTbl > tbody").innerHTML = tbodyHTML;
            }
        }
    };
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.send();
};
