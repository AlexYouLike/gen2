module.exports = sidebar;
function sidebar()
{Array.from(document.querySelectorAll("#click_filter, #close")).forEach(function(el){
el.onclick=function() {  
document.querySelector("#wrapper").classList.toggle('menu_visible') 
}
}) }

