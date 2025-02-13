function initTabNav() {
    const tabmenu = document.querySelectorAll('.js-tabmenu li');
    const tabcontent = document.querySelectorAll('.js-tabcontent section');

    // Achei mais pratico colocar uma class ativo no Esquilo
    //tabcontent[0].classList.add('ativo');

    function activeTab(index) {
        tabcontent.forEach((section) => {
        section.classList.remove('ativo');   
        });
        tabcontent[index].classList.add('ativo');    
    }

    tabmenu.forEach((itemMenu, index) => { // Um Loop para cada li
        itemMenu.addEventListener('click', () => { //Em cada item adicinou o evento click
            activeTab(index); // Em cada vez clicado adiciona a função que recebe como arqgumento o index
        })
    });
}
initTabNav();


function initAccordion() {
    const accordionList = document.querySelectorAll('.js-accordion dt');
    const activeClass = 'ativo';
    
    if(accordionList.length) {
      accordionList[0].classList.add(activeClass);
      accordionList[0].nextElementSibling.classList.add(activeClass);
  
      function activeAccordion() {
        this.classList.toggle(activeClass);
        this.nextElementSibling.classList.toggle(activeClass);
      }
  
      accordionList.forEach((item) => {
        item.addEventListener('click', activeAccordion);
      });
    }
}
initAccordion();


function initScrollSuave() {
    const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]');
  
    function scrollToSection(event) {
      event.preventDefault();
      const href = event.currentTarget.getAttribute('href');
      const section = document.querySelector(href);
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  
      // forma alternativa
      // const topo = section.offsetTop;
      // window.scrollTo({
      //   top: topo,
      //   behavior: 'smooth',
      // });
}
  
linksInternos.forEach((link) => {
    link.addEventListener('click', scrollToSection);
});
}
initScrollSuave();


function initAnimacaoScroll() {
    const sections = document.querySelectorAll('.js-scroll');
    if(sections.length) {
      const windowMetade = window.innerHeight * 0.6;
  
      function animaScroll() {
        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top;
          const isSectionVisible = (sectionTop - windowMetade) < 0;
          if(isSectionVisible)
            section.classList.add('ativo');
          else 
            section.classList.remove('ativo');
        })
      }
  
      animaScroll();
  
      window.addEventListener('scroll', animaScroll);
    }
}
initAnimacaoScroll();