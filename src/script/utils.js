
function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

exports.setAttributes = setAttributes

exports.sidebarToggle = () => {
  Array.from(document.querySelectorAll("#click_filter, #close")).forEach((el) => {
    el.onclick = () => {
      document.querySelector("#wrapper").classList.toggle('menu_visible');
      document.querySelector("#menu").classList.toggle('menu_visible')
    }
  })
}

function getParentWithClass(element, classname) {
  if (element.className && element.className.split(' ').indexOf(classname) >= 0) {
		return element
	}
	return element.parentNode && getParentWithClass(element.parentNode, classname);
}

exports.getParentWithClass = getParentWithClass


exports.tilesGeneration = (json) => {
	for(var i = 0; i < json.length; i++) {
		let el = document.createElement('div')
		let innerWrapper = document.createElement('div')
		let thumbnail = document.createElement('img')
		let logo = document.createElement('img')
		let footer = document.createElement('div')
		let text = document.createElement('div')
		let title = document.createElement('div')
		let category = document.createElement('div')
		let linksContainer = document.createElement('nav')
		let eyeLogo = document.createElement('img')
		eyeLogo.setAttribute("src", "image/eye.svg")

		setAttributes(el, {
			'class': 'tile',
			'data-shape': json[i].format.toLowerCase(),
			'data-color': json[i].geo.toLowerCase(),
			'data-category': json[i].category.toLowerCase(),
			'data-url': json[i].clip_url,
		})

		setAttributes(innerWrapper, {
			'class': 'inner-wrapper'
		})

		setAttributes(thumbnail, {
			'class': 'thumbnail lazyload',
			'data-src': json[i].thumbnail
		})

		setAttributes(footer, {
			'class': 'footer'
		})

		setAttributes(logo, {
			'class': 'logo lazyload',
			'data-src': json[i].logo
		})

		setAttributes(text, {
			'class': 'text-wrapper'
		})

		setAttributes(title, {
			'class': 'tile-title'
		})

		setAttributes(category, {
			'class': 'tile-category'
		})

		setAttributes(linksContainer, {
			'class': 'links-container'
		})

		setAttributes(eyeLogo, {
			'class': 'eye'
		})

		el.appendChild(innerWrapper)
		innerWrapper.appendChild(thumbnail)
		innerWrapper.appendChild(footer)
		footer.appendChild(logo)
		footer.appendChild(text)
		footer.appendChild(linksContainer)
		text.appendChild(title)
		title.innerHTML = json[i].brand_name.toLowerCase()
		text.appendChild(category)
		linksContainer.appendChild(eyeLogo)
		category.innerHTML = '#' + json[i].category.toLowerCase()

		document.getElementById('main_container').appendChild(el);
	}
}
