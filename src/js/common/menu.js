

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
    },
    {
      href: '/deck/',
      title: 'Product'
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

      let redirect = (document.location.host == 'public.adyoulike.com') ? 'http://public.adyoulike.com/story-catalogue' + entry.href : entry.href

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

  if(document.location.href.indexOf('nativestories.io') == -1 && document.location.href.indexOf('study') == -1 && document.location.href.indexOf('deck') == -1) {

    let colors = [
      {
        'name': 'Bleached Coral',
        'value': '#f4f8fb'
      },
      {
        'name': 'Deep Blue',
        'value': '#4D6995'
      },
      {
        'name': 'Manhattan',
        'value': '#F5C19A'
      },
      {
        'name': 'White',
        'value': '#FFFFFF'
      }
    ]

    let toggles = document.createElement('div');
    toggles.setAttribute('style', 'position:fixed;left:-3px;top:50%;transform:translateY(-50%);padding:20px;display:flex;flex-direction:column;')
    toggles.id = 'toggleswrapper'
    colors.forEach((color) => {
      let col = document.createElement('div');
      col.setAttribute('style', 'background-color:' + color.value + ';border-color:' + color.value + ';')
      col.setAttribute('data-name', color.name)
      col.setAttribute('data-value', color.value)
      toggles.appendChild(col)
      col.addEventListener('click', (t) => {
        console.log('click');
        Array.from(document.getElementsByClassName('background-color')).forEach(bg => {
          bg.style.backgroundColor = color.value;
        })
      })
    })
    document.body.appendChild(toggles)

  }

})()
