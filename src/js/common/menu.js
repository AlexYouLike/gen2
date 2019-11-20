

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

    var over = document.createElement('div')
    over.setAttribute('id', 'toggle-menu')
    menu.appendChild(over)

    document.body.onclick = (e) => {
      if(e.target.getAttribute('id') == 'toggle-menu') menu.classList.toggle('close-menu')
    }


    let burger = document.createElement('div')
    burger.setAttribute('class', 'burger')
    menu.appendChild(burger)

    let entryWrapper = document.createElement('div')
    entryWrapper.setAttribute('class', 'entry-wrapper')
    menu.appendChild(entryWrapper)

    entries.forEach(entry => {

      let redirect = (document.location.host == 'public.adyoulike.com') ? 'http://public.adyoulike.com/catalog' + entry.href : entry.href

      let a = document.createElement('a')
      a.setAttribute('href', redirect)
      a.setAttribute('title', entry.title)
      a.setAttribute('class', 'menu_entry')
      a.innerHTML = entry.title
      entryWrapper.appendChild(a)
    })

  }

  document.addEventListener('scroll', () => {

   let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
   if(scrollTop > 200) {
      document.getElementsByTagName('header')[0].classList.add('sticky')
   }
   else {
      document.getElementsByTagName('header')[0].classList.remove('sticky')
   }

 })

})()
