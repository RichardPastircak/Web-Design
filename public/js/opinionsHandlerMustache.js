import OpinionsHandler from "./opinionsHandler.js";
import Mustache from "./mustache.js";

/**
 * Class for  handling a list (an array) of visitor opinions in local storage
 * The list is filled from a form and rendered to html
 * A mustache template is used to render the opinions list
 * @extends OpinionsHandler
 * @author Stefan Korecko (2021)
 */
export default class OpinionsHandlerMustache extends OpinionsHandler{

    /**
     * constructor
     * @param formId - id of a form element where a new visitor opinion is entered
     * @param commentsList - id of a html element to which the list of visitor opinions is rendered
     * @param template - id of a html element with the mustache template
     */
    constructor(formId, commentsList,template) { //("opnFrm","opinionsContainer","mTmplOneOpinion")

        //call the constructor from the superclass:
        super(formId, commentsList);

        //get the template:
        this.mustacheTemplate=document.getElementById(template).innerHTML;
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

}



