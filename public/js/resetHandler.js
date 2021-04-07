export default class ResetHandler{
    constructor(formId) {
        this.form = document.getElementById(formId);
    }

    init(){
        this.form.addEventListener("reset", event => this.resetOpnFrmData());
    }

    resetOpnFrmData(){
        document.getElementById("user_name").style.border = "solid 4px rgb(34, 73, 40)";
        document.getElementById("user_email").style.border = "solid 4px rgb(34, 73, 40)";
        document.getElementById("textarea").style.border = "solid 4px rgb(34, 73, 40)";
        document.getElementById("user_picture").style.border = "solid 2px rgb(34, 73, 40)";

        document.getElementById("rate_my_site").style.color = "rgb(34, 73, 40)";
        document.getElementById("rate_my_site").textContent = "Rate my site";
    }
}