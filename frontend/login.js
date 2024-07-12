const urlApi = "http://localhost:5678/api";

document.addEventListener("submit", (e) => {
    e.preventDefault();
    const formInfo = {
        email: document.getElementById("email"),
        password: document.getElementById("password"),
    };
    console.log(formInfo.email.value);
    console.log(formInfo.password.value);

    fetch(`${urlApi}/users/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: formInfo.email.value,
            password: formInfo.password.value,
        }),
        // A retirer pour la presentation.
        // body: JSON.stringify({
        //     email: "sophie.bluel@test.tld",
        //     password: "S0phie",
        // }),
    })
    .then((response) => {
        console.log(response);
        if (response.status !== 200) {
            alert("Email ou mot de passe incorrect");
        } else {
            return response.json();
        };
    })
    .then((data) => {
        console.log(data);
        window.localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error("Identifiants incorrects", error);
    });
});