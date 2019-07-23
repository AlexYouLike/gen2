module.exports = sidebar;
function sidebar() {
  Array.from(document.querySelectorAll("#click_filter, #close")).forEach((el) => {
    el.onclick=function() {
      document.querySelector("#wrapper").classList.toggle('menu_visible')
    }
})}
