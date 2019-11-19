

(() => {

  var menu = document.getElementById('bmenu')
  var entries = [
    {
      href: '/',
      title: 'Catalogue'
    },
    {
      href: '/study/',
      title: 'Study'
    },
    {
      href: '/documentation/',
      title: 'Technical Specs'
    },
    {
      href: '/demo/',
      title: 'Request demo'
    }
  ]

  if(menu) {

    menu.onclick = (e) => {
      if(e.target.getAttribute('class') == 'burger' || e.target.getAttribute('id') == 'bmenu') menu.classList.toggle('close-menu')
    }

    let burger = document.createElement('div')
    burger.setAttribute('class', 'burger')
    menu.appendChild(burger)

    let entryWrapper = document.createElement('div')
    entryWrapper.setAttribute('class', 'entry-wrapper')
    menu.appendChild(entryWrapper)

    entries.forEach(entry => {

      if(document.location.pathname == entry.href) return

      let a = document.createElement('a')
      a.setAttribute('href', entry.href)
      a.setAttribute('title', entry.title)
      a.setAttribute('class', 'menu_entry')
      a.innerHTML = entry.title
      entryWrapper.appendChild(a)
    })

  }

})()
