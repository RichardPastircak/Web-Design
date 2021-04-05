import Mustache from "./mustache.js";

/**
 * Class for  handling a list (an array) of visitor opinions in local storage
 * The list is filled from a form and rendered to html
 * A mustache template is used to render the opinions list
 * @extends OpinionsHandler
 * @author Stefan Korecko (2021)
 */
export default class OpinionsHandlerMustache{

    /**
     * constructor
     * @param formId - id of a form element where a new visitor opinion is entered
     * @param commentsList - id of a html element to which the list of visitor opinions is rendered
     * @param template - id of a html element with the mustache template
     */
    constructor(formId, commentsList,template) {

        this.opinions = [];
        this.oldComments = document.getElementById(commentsList);
        this.form = document.getElementById("form");
        this.mustacheTemplate=document.getElementById(template).innerHTML;
    }

    init(){
        if (localStorage.comments) {
            this.opinions = JSON.parse(localStorage.comments);
        }
        this.oldComments.innerHTML = this.opinionArray2html(this.opinions);
        this.form.addEventListener("submit", event => this.processOpnFrmData(event));
        this.form.addEventListener("reset", event => this.resetOpnFrmData());
        if (this.opinions.length == 0) document.getElementById("opinions").style.visibility = "hidden";
    }

    processOpnFrmData(event){
        //1.prevent normal event (form sending) processing
        event.preventDefault();

        //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
        const userName = document.getElementById("user_name").value.trim();
        const userEmail = document.getElementById("user_email").value.trim();
        const userPicture = document.getElementById("user_picture").value;
        const userRadioBox = document.getElementById("form").elements["radiobox"].value;
        const checkBox = document.getElementById("check_box_1").checked;
        const userComment = document.getElementById("textarea").value;
        const userKeyWord = document.getElementById("text-datalist").value;

        //3. Verify the data;
        let mistakes = 0

        //NAME
        if(userName == "") {
            document.getElementById("user_name").style.border = "medium solid red";
            mistakes++;
        }
        else if (document.getElementById("user_name").style.border == "medium solid red"){
            document.getElementById("user_name").style.border = "solid 4px rgb(34, 73, 40)";
        }

        //EMAIL
        if(userEmail == "" || !userEmail.includes("@")) {
            document.getElementById("user_email").style.border = "medium solid red";
            mistakes++;
        }
        else if (document.getElementById("user_email").style.border == "medium solid red"){
            document.getElementById("user_email").style.border = "solid 4px rgb(34, 73, 40)"
        }

        //COMMENT
        if(userComment.trim() == "") {
            document.getElementById("textarea").style.border = "medium solid red";
            mistakes++;
        }
        else if (document.getElementById("textarea").style.border == "medium solid red"){
            document.getElementById("textarea").style.border = "solid 4px rgb(34, 73, 40)";
        }

        //PICTURE
        if(userPicture.trim() != "" || (!userPicture.includes("https://") && !userPicture.includes("http://"))) {
            document.getElementById("user_picture").style.border = "medium solid red";
            mistakes++;
        }
        else if (document.getElementById("user_picture").style.border == "medium solid red"){
            document.getElementById("user_picture").style.border = "solid 2px rgb(34, 73, 40)";
        }

        if (mistakes > 0){
            document.getElementById("rate_my_site").textContent = ("It seems you filled " + mistakes + " fields wrongly");
            document.getElementById("rate_my_site").style.color = "red";
            return;
        }

        //3. Add the data to the array opinions and local storage
        if (document.getElementById("opinions").style.visibility == "hidden"){
            document.getElementById("opinions").style.visibility = "visible";
        }

        const userRating =
            {
                name: userName,
                email: userEmail,
                picture: userPicture,
                radioBox: userRadioBox,
                wouldRecommend: checkBox,
                comment: userComment,
                keyWord: userKeyWord,
                //created: new Date(2021,3,2, 0,0)
                created: new Date()
            };

        console.log("New opinion:\n "+JSON.stringify(userRating));

        this.opinions.push(userRating);

        localStorage.comments = JSON.stringify(this.opinions);


        //4. Update HTML
        this.oldComments.innerHTML+=this.opinion2html(userRating);

        //Reset correct input back
        if(document.getElementById("rate_my_site").style.color == "red") {
            document.getElementById("rate_my_site").style.color = "rgb(34, 73, 40)";
            document.getElementById("rate_my_site").textContent = "Rate my site";
        }

        //5. Reset the form
        this.form.reset(); //resets the form
    }

    /**
     * creates html code for one opinion using a mustache template
     * @param opinion - object with the opinion
     * @returns {string} - html code with the opinion
     */
    //an alternate version of the above function (method). Uses a separate object (opinionView) for HTML rendering
    opinion2html(opinion){
        //in the case of Mustache, we must prepare data beforehand:
        const opinionView ={
            name: opinion.name,
            email: opinion.email,
            comment: opinion.comment,
            image: opinion.picture,
            createdDate: (new Date(opinion.created)).toDateString(),
            rating: (opinion.radioBox === "0") ? "Good" : (opinion.radioBox === "1") ? "Mediocre" : (opinion.radioBox ==="2") ? "Bad" : "",
            wouldRecommend: (opinion.wouldRecommend)?"I would definitely recommend this page to friend" : "Sorry, I don't think this page is " +
                "interesting enough",
            keyWords: opinion.keyWord,
        };

        //use the Mustache and return the rendered HTML:
        return Mustache.render(this.mustacheTemplate,opinionView);
    }

    opinionArray2html(sourceData){

        let htmlWithOpinions="";

        for(const opn of sourceData){
            htmlWithOpinions += this.opinion2html(opn);
        }

        return htmlWithOpinions;
    }

    deleteOldComments(){
        //this.opinions = JSON.parse(localStorage.comments);
        for (let i = 0; i < this.opinions.length; i++){
            if((Date.now() - new Date(this.opinions[i].created))/(1000*60*60*24) > 1) {
                this.opinions.splice(i, 1);
            }
        }

        localStorage.comments = JSON.stringify(this.opinions);
        this.oldComments.innerHTML = this.opinionArray2html(this.opinions);

        //hide Opinions heading
        if (this.opinions.length == 0) document.getElementById("opinions").style.visibility = "hidden";
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



