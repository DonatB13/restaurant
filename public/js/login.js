function handleLoginBtn(){
    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        $.ajax({
            url: `${window.location.origin}/login`,
            method: "POST",
            data: {email: email, password: password},
            success: function(data) {
                window.location.href = "/";
            },
            error: function(err) {
                document.querySelector("#login-error").classList.add('active');
            }
        })
    });
}
$(document).ready(function() {
    handleLoginBtn();
});