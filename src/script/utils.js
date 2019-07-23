

exports.setAttributes = (el, attrs) => {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

exports.sidebarToggle = () => {
  Array.from(document.querySelectorAll("#click_filter, #close")).forEach((el) => {
    el.onclick = () => {
      document.querySelector("#wrapper").classList.toggle('menu_visible')
    }
  })
}
