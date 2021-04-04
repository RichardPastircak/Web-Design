import OpinionsHandlerMustache from "./opinionsHandlerMustache.js";

window.opnsHndlr = new OpinionsHandlerMustache("form","usersComments","mustache");
window.opnsHndlr.init();

document.getElementById("delete_button").addEventListener("click", event => opnsHndlr.deleteOldComments());