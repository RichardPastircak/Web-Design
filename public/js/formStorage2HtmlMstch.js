import OpinionsHandlerMustache from "./opinionsHandlerMustache.js";
import ResetHandler from "./resetHandler.js";

window.opnsHndlr = new OpinionsHandlerMustache("form","usersComments","mustache");
window.opnsHndlr.init();

document.getElementById("delete_button").addEventListener("click", event => opnsHndlr.deleteOldComments());

window.rstHndlr = new ResetHandler("form");
rstHndlr.init();