/**
 * Class for  handling a list (an array) of visitor opinions in local storage
 * The list is filled from a form and rendered to html
 * A template literal is used to render the opinions list
 * @author Stefan Korecko (2021)
 */
export default class OpinionsHandler {

    /**
     * constructor
     * @param formId - id of a form element where a new visitor opinion is entered
     * @param commentsList - id of a html element to which the list of visitor opinions is rendered
     */
    constructor(formId, commentsList){ //("opnFrm","opinionsContainer")
        this.opinions = [];
        this.oldComments = document.getElementById(commentsList);
        this.form = document.getElementById("form");
    }

    /**
     * initialisation of the list of visitor opinions and form submit setup
     */
    init(){
        if (localStorage.comments) {
            this.opinions = JSON.parse(localStorage.comments);
        }
        this.oldComments.innerHTML = this.opinionArray2html(this.opinions);
        this.form.addEventListener("submit", event => this.processOpnFrmData(event));
    }

    /**
     * Processing of the form data with a new visitor opinion
     * @param event - event object, used to prevent normal event (form sending) processing
     */
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

        //3. Verify the data
        if (userName == "" || userEmail == "" || userComment.trim() == "") {
            //mistake do sth
            return;
        }

        //3. Add the data to the array opinions and local storage
        const userRating =
            {
                name: userName,
                email: userEmail,
                picture: userPicture,
                radioBox: userRadioBox,
                wouldRecommend: checkBox,
                comment: userComment,
                keyWord: userKeyWord,
                created: new Date()
            };

        console.log("New opinion:\n "+JSON.stringify(userRating));

        this.opinions.push(userRating);

        localStorage.comments = JSON.stringify(this.opinions);


        //4. Update HTML
        this.oldComments.innerHTML+=this.opinion2html(userRating);


        //5. Reset the form
        this.form.reset(); //resets the form
    }

    /**
     * creates html code for one opinion using a template literal
     * @param opinion - object with the opinion
     * @returns {string} - html code with the opinion
     */
    opinion2html(opinion){

      /*  const opinionTemplate=
            `
                <section>
                   <h3>${opinion.name} <i>(${(new Date(opinion.created)).toDateString()})</i></h3>

                   <p>${opinion.comment}</p>
                </section>`;

        return opinionTemplate;*/
    }

    /**
     * creates html code for all opinions in an array using the opinion2html method
     * @param sourceData -  an array of visitor opinions
     * @returns {string} - html code with all the opinions
     */
    opinionArray2html(sourceData){

        let htmlWithOpinions="";

        for(const opn of sourceData){
            htmlWithOpinions += this.opinion2html(opn);
        }

        return htmlWithOpinions;
    }
}



