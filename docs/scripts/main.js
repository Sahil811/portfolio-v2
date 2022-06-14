const content = document.querySelector(".content");
const loadingOverlay = document.querySelector(".loading-overlay");
const navLinks = document.querySelector(".nav__links");
const navToggle = document.getElementById("nav-toggle");
const sections = document.querySelectorAll("section");
const navContact = document.querySelector("#nav-contact");
const nav = document.querySelector(".nav");

setTimeout(() => {
  content.classList.add("appear");
  loadingOverlay.classList.add("dissappear");
}, 2000);

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("toggled");
  navToggle.classList.toggle("toggled");
});

for (let i = 0; i < navLinks.children.length; i++) {
  navLinks.children[i].addEventListener("click", () => {
    navLinks.classList.toggle("toggled");
    navToggle.classList.toggle("toggled");
  });
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id !== "home") {
          navContact.style.opacity = "1";
          navContact.style.pointerEvents = "unset";
          nav.classList.add("bg-toggle");
        } else {
          navContact.style.opacity = "0";
          navContact.style.pointerEvents = "none";
          nav.classList.remove("bg-toggle");
        }
        entry.target.classList.add("visible");
        document
          .getElementById(`${entry.target.id}-link`)
          .classList.add("visible");
      } else {
        document
          .getElementById(`${entry.target.id}-link`)
          .classList.remove("visible");
        // entry.target.classList.remove('visible');
      }
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px ",
    // threshold: 0.25
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Experiences
let selectedExperience = 0;
const experiences = [
  `
  <div class="experience__title">
      Sofware Engineer @ <span>QBurst</span>
  </div>
  <div class="experience__duration">
     Nov 2021 - Current
  </div>
  <ul>
      <li>
         Help in Creating Proof of concept in advance technical requirements for client and initiate client approval for the required project.
      </li>
      <li>
         Insure implementation of project stack is up to date with latest, most suitable and future proof technologies is used.
      </li>
      <li>
          <span>Tools and Technologies : </span> Node.js, Express.js, Redis, React.js, Redux, (S)CSS, MongoDB.
      </li>
  </ul>
`,
  `
    <div class="experience__title">
        Software developer @ <span>Appknit</span>
    </div>
    <div class="experience__duration">
       Oct 2020 - Oct 2021
    </div>
    <ul>
        <li>
            Wrote UI Kit with react which consisted of highly reusable components which helped my teammates to pick up the pace.
        </li>
        <li>
           Converted design system to reusable react components with micro interactions.
        </li>
        <li>
          Wrote styles for the same with scss following BEM conventions.
        </li>
        <li>
          Worked with the backend team to integrate the frontend with backend APIs.
        </li>
        <li>
          Coded actions and reducers for redux stores that links components and enables efficient flow of data between the components.
        </li>
        <li>
            <span>Tools and Technologies : </span> Node.js, Express.js, Redis, React.js, Redux, (S)CSS, MongoDB.
        </li>
    </ul>
  `,
  `
  <div class="experience__title">
        Maintenance engineering Trainee @ <span>Nuvoco Vistas.</span>
    </div>
    <div class="experience__duration">
        Sept 2018 - Sep 2019
    </div>
    <ul>
        <li>
          Routing Check up and maintenance of
          heavy duty machine such as Raw mill, Preheater-
          Cyclone and Crusher.
        </li>
        <li>Handling man power for proper working of on site Machines.</li>
        <li>Find the ways to increase and usability of machine parts for cost control and to make operations more environment friendly.</li>
    </ul>
  `,
];
const experienceGrid = document.querySelector(".experience__grid");
const experienceDetails = document.createElement("div");
experienceDetails.classList.add("experience__details");
experienceDetails.innerHTML = experiences[selectedExperience];
experienceGrid.appendChild(experienceDetails);
const experienceButtons = document.querySelectorAll(".experience__button");

experienceButtons.forEach((experience, index) => {
  experience.addEventListener("click", () => {
    experienceButtons[selectedExperience].classList.remove("selected");
    selectedExperience = index;
    experienceDetails.innerHTML = experiences[selectedExperience];
    experienceGrid.appendChild(experienceDetails);
    experience.classList.add("selected");
  });
});

/////// Reuseable Project component ////////

const projectHtml = `<article class="project-parent">
<div class="project-content">
    <div class="project-bg-overlay">
    </div>
    <img class="project-img" src=%imgSrc% alt=%title%>
    <div class="project-info" onmouseover="animateBoxOn('%codeId%', '%projectId%', %projectIndex%)"
        onmouseout="animateBoxOff('%codeId%', '%projectId%', %projectIndex%)">
        <div class="proj-title-desc">
            <h3>%title%</h3>
            <p>%description%</p>
        </div>
        <div id="%projectId%-icons" class="icons">
            <div id=%codeId% class="icon code-link" onmouseover="spinOut('%codeId%')"
                onmouseout="returnDefault('%codeId%')">
                <a class="fas fa-code code-ico"></a>
                <a class="fab fa-github-square github-ico spin-out"
                    href=%githubLink% target="_blank"></a>
            </div>
            <div id=%projectId% class="icon project-link" onmouseover="spinOut('%projectId%')"
                onmouseout="returnDefault('%projectId%')">
                <a class="far fa-folder folder-ico"></a>
                <a class="far fa-folder-open folder-open spin-out"
                    href=%liveLink% target="_blank"></a>
            </div>
        </div>
        <div class="concepts">
            <p>React - UI/UX</p>
            <p>Material UI - JSS - REST API</p>
        </div>
    </div>
</div>
</article>`;

let selectedProjects = 0;

let projectArray = [
  [
    {
      title: "Tik Tok",
      description:
        "A Simple Tik-Tok clone  build using React js.",
      imgSrc: "./assets/images/tik-tok-clone.png",
      githubLink: "https://github.com/Sahil811/tiktok",
      liveLink: "https://tiktok-855b6.web.app/",
    },
    {
      title: "Burger Builder",
      description:
        "A Simple React app to choose random what todo.",
      imgSrc: "./assets/images/indecision.JPG",
      githubLink: "https://github.com/Sahil811/indecision-app",
      liveLink: "https://sahil-indecision-app.herokuapp.com/",
    },
    {
      title: "Burger Builder",
      description:
        "A Burger builder Application built using React Js and ReduxJs. The application uses all the new features introduced in EcmaScript",
      imgSrc: "./assets/images/burger-builder.JPG",
      githubLink: "https://github.com/Sahil811/burger-builder",
      liveLink: "https://react-burger-dbc89.firebaseapp.com/",
    },
    {
      title: "Spotify",
      description:
        "A spotify clone build using React Js for you to play your favorite songs.",
      imgSrc: "./assets/images/spotify-clone.png",
      githubLink: "https://github.com/Sahil811/spotify",
      liveLink: "https://spotify-a9e3d.web.app/",
    },
    {
      title: "Netflix",
      description:
        "A Netflix landing page clone build using React js.",
      imgSrc: "./assets/images/netflix-clone.png",
      githubLink: "https://github.com/Sahil811/netflix",
      liveLink: "https://netflix-fea3a.web.app/",
    },
    {
      title: "Airbnb",
      description:
        "A Airbnb landing page clone build using React js.",
      imgSrc: "./assets/images/airbnb-clone.png",
      githubLink: "https://github.com/Sahil811/airbnb",
      liveLink: "https://airbnb-clone-3ccd5.web.app/",
    },
    {
      title: "Amazon",
      description:
        "A Amazon clone build using React Js.",
      imgSrc: "./assets/images/amazon-clone.png",
      githubLink: "https://github.com/Sahil811/amazon",
      liveLink: "https://fir-4a7fe.web.app/",
    },
    {
      title: "Facebook",
      description:
        "A Facebook clone build using React js with authorization and database access using firebase.",
      imgSrc: "./assets/images/facebook-clone.png",
      githubLink: "https://github.com/Sahil811/facebook",
      liveLink: "https://facebook-201eb.web.app/",
    },
    {
      title: "Covid-19 Tracker",
      description:
        "A Covid Tracking app that track number of covid cases all around the globe.",
      imgSrc: "./assets/images/covid-19-tracker.png",
      githubLink: "https://github.com/Sahil811/covid-19-tracker",
      liveLink: "https://covid-19-tracker-b1448.web.app/",
    },
 ],
 [ {
    title: "Forkify",
    description:
      "A Pizza Recipe Searching Application using Vanilla Js.",
    imgSrc: "./assets/images/forkify.JPG",
    githubLink: "https://github.com/Sahil811/forkify",
    liveLink: "https://forkify-21e1b.web.app/",
  },
  {
    title: "Budgety",
    description:
      "Small JavaScript application to manage budget income and expense.",
    imgSrc: "./assets/images/budgety.JPG",
    githubLink: "https://github.com/Sahil811/budgety",
    liveLink: "https://budgety-de264.web.app/",
  },
  {
    title: "Dice Game",
    description:
      "Pig is simple dice game in which, each turn, a player repeatedly rolls a die to score to set points, A player looses his ENTIRE score when he rolls two 6 in a row or one die is rolled as 1.",
    imgSrc: "./assets/images/dice-game.JPG",
    githubLink: "https://github.com/Sahil811/javascript-Dice-Game",
    liveLink: "https://dice-game-c6f13.web.app/",
  }
 ],
 [ 
   {
  title: "Ominfood",
  description:
    "A food ordering service based on subscription.",
  imgSrc: "./assets/images/omnifood.PNG",
  githubLink: "https://github.com/Sahil811/omnifood",
  liveLink: "https://omnifood-fc16b.web.app/",
  },
  {
    title: "Trillo",
    description:
      "A website to book best hotel for your comfort.",
    imgSrc: "./assets/images/trillo.JPG",
    githubLink: "https://github.com/Sahil811/trillo",
    liveLink: "https://trillo-d4c7f.web.app/",
  },
  {
    title: "Nexter",
    description:
      "A Real state website to find your dream home",
    imgSrc: "./assets/images/nexter.JPG",
    githubLink: "https://github.com/Sahil811/nexter",
    liveLink: "https://nexter-653c4.web.app/",
  },
  {
    title: "Natours",
    description:
      "A website to book you tour because sometimes outdoors where new life start.",
    imgSrc: "./assets/images/natours.JPG",
    githubLink: "https://github.com/Sahil811/natours",
    liveLink: "https://natours-334e3.web.app/",
  }
 ],
 [
  {
    title: "Flipdeal",
    description:
      "A Shopping app for people who love fashionable clothes. Build using Mongodb, NodeJs, Express and React JS.",
    imgSrc: "./assets/images/flipdeal.png",
    githubLink: "https://github.com/Sahil811/flipdeal",
    liveLink: "https://sahil-flipdeal.herokuapp.com/",
  },
 ],
 [
  {
    title: "Natours App",
    description:
      "A Tour booking & managing application built with Node.js, Express, and MongoDB based on the Node.js. Ejs is used as templating engine.",
    imgSrc: "./assets/images/natours-node.JPG",
    githubLink: "https://github.com/Sahil811/natours-node",
    liveLink: "https://natours-sahil.herokuapp.com/",
  },
 ]
];

const projectContainer = document.getElementById("projects-group");
const projectButtons = document.querySelectorAll(".projects__buttons");

const renderProjects = (selectedProjectsIndex) => {
    projectArray[selectedProjectsIndex].map((el, index) => {
      let newHtml = projectHtml.replaceAll("%title%", el.title);
      newHtml = newHtml.replaceAll("%description%", el.description);
      newHtml = newHtml.replaceAll("%imgSrc%", el.imgSrc);
      newHtml = newHtml.replaceAll("%githubLink%", el.githubLink);
      newHtml = newHtml.replaceAll("%liveLink%", el.liveLink);
      newHtml = newHtml.replaceAll(
        "%codeId%",
        `${el.title.trim().replace(/\s+/g, "").toLocaleLowerCase()}-${index}-code`
      );
      newHtml = newHtml.replaceAll(
        "%projectId%",
        `${el.title
          .trim()
          .replace(/\s+/g, "")
          .toLocaleLowerCase()}-${index}-project`
      );
      newHtml = newHtml.replaceAll("%projectIndex%", index);
      projectContainer.insertAdjacentHTML("afterbegin", newHtml);
      projectButtons[selectedProjectsIndex].classList.add("projects__buttons-active");
    });
  }
  
  renderProjects(selectedProjects)
  
projectButtons.forEach((project, index) => {
  project.addEventListener("click", () => {
    projectButtons[selectedProjects].classList.remove("projects__buttons-active");
    selectedProjects = index;
    projectContainer.innerHTML = '';
    renderProjects(selectedProjects)
  });
});

//Project box animations

const projects = document.querySelectorAll(".project-info");

const getProjectIco = (projectId) => document.getElementById(projectId);
const getCodeIco = (codeId) => document.getElementById(codeId);
const getProjectBox = () => document.querySelectorAll(".project-info");
const getProjectParent = () => document.querySelectorAll(".project-parent");
const getProjectDesc = () => document.querySelectorAll(".proj-title-desc");
const getProjectConc = () => document.querySelectorAll(".concepts");
const getProjectOverlay = () =>
  document.querySelectorAll(".project-bg-overlay");
const getProjectContent = () => document.querySelectorAll(".project-content");
const getProjectImg = () => document.querySelectorAll(".project-img");

const animateBoxOn = (codeId, projectId, index) => {
  const codeIcon = getCodeIco(codeId);
  const projectIcon = getProjectIco(projectId);
  const projectBox = getProjectBox()[index];
  const projectParent = getProjectParent()[index];
  const projectDesc = getProjectDesc()[index];
  const projectConc = getProjectConc()[index];
  const projectOverlay = getProjectOverlay()[index];
  const projectContent = getProjectContent()[index];
  const projectImg = getProjectImg()[index];

  projectBox.classList.remove("box-anim-out");
  projectParent.classList.remove("box-anim-out");
  projectOverlay.classList.remove("box-anim-out");
  projectContent.classList.remove("box-anim-out");
  projectImg.classList.remove("box-anim-out");
  codeIcon.classList.remove("icon-anim-out");
  projectIcon.classList.remove("icon-anim-out");
  projectDesc.classList.remove("desc-anim-out");
  projectConc.classList.remove("conc-anim-out");

  projectBox.classList.add("box-anim-in");
  projectParent.classList.add("box-anim-in");
  projectOverlay.classList.add("box-anim-in");
  projectContent.classList.add("box-anim-in");
  projectImg.classList.add("box-anim-in");
  codeIcon.classList.add("icon-anim-in");
  projectIcon.classList.add("icon-anim-in");
  projectDesc.classList.add("desc-anim-in");
  projectConc.classList.add("conc-anim-in");
};

const animateBoxOff = (codeId, projectId, index) => {
  const codeIcon = getCodeIco(codeId);
  const projectIcon = getProjectIco(projectId);
  const projectBox = getProjectBox()[index];
  const projectParent = getProjectParent()[index];
  const projectDesc = getProjectDesc()[index];
  const projectConc = getProjectConc()[index];
  const projectOverlay = getProjectOverlay()[index];
  const projectContent = getProjectContent()[index];
  const projectImg = getProjectImg()[index];

  projectBox.classList.add("box-anim-out");
  projectParent.classList.add("box-anim-out");
  projectOverlay.classList.add("box-anim-out");
  projectContent.classList.add("box-anim-out");
  projectImg.classList.add("box-anim-out");
  codeIcon.classList.add("icon-anim-out");
  projectIcon.classList.add("icon-anim-out");
  projectDesc.classList.add("desc-anim-out");
  projectConc.classList.add("conc-anim-out");
};

const spinOut = (iconName) => {
  const hoverState = document.getElementById(iconName).childNodes;
  hoverState[1].classList.remove("return-ico");
  hoverState[3].classList.remove("spin-out");
  hoverState[1].classList.add("spin-out");
  hoverState[3].classList.add("return-ico");
};

const returnDefault = (iconName) => {
  const defaultState = document.getElementById(iconName).childNodes;
  defaultState[1].classList.remove("spin-out");
  defaultState[3].classList.remove("return-ico");
  defaultState[1].classList.add("return-ico");
  defaultState[3].classList.add("spin-out");
};

//blog animation and functionality

const getBlog = (name) => document.getElementById(name);
const getBlogContent = (blog) => blog.querySelectorAll(".modal-content");
const getBlogContainer = () => document.querySelectorAll(".blog-post");
const getBlogButton = () => document.querySelectorAll(".close-modal");

const showBlog = (name, index) => {
  const blogContainer = getBlogContainer()[index];
  if (blogContainer.classList.contains("ignore-mouse")) {
    null;
  } else {
    document.getElementsByTagName("body")[0].classList.add("no-scroll");
    const blog = getBlog(name);
    const blogContent = getBlogContent(blog);
    const blogButton = getBlogButton()[index];

    ignorePointer(blogContainer);
    blog.classList.remove("hide-blog");
    blogButton.classList.add("show-blog-btn");
    blog.classList.add("show-blog");
    for (let i = 0; i < blogContent.length; i++) {
      blogContent[i].classList.add("show-modal-content");
    }
  }
};


// SENDING EMAIL

const loader = document.getElementById('page-loader')

function sendEmailHandler(nameInput, emailInput, subjectInput, messageInput) {
  loader.style.display = "block"
  Email.send({
      SecureToken: "f31c9937-cafa-4266-afe0-8c8b465ffa82",
      To : 'sahilsiddiui.dev@gmail.com',
      From: 'sahilsiddiqui813@gmail.com',
      Subject: `${nameInput} send you a message.`,
      Body: `Name: ${nameInput} <br/> Email: ${emailInput} <br/> Subject: ${subjectInput} <br /> Message: ${messageInput}`
  }
  ).then(
    message => {
    loader.style.display = "none"
    setTimeout(function(){
      if (message === 'OK') {
          alert('Your message was send successfully.')
      } else {
          alert('There was an error while sending your message.')   
      }
    }, 10)
    document.getElementById('nameInput').value = "";
    document.getElementById('emailInput').value = "";
    document.getElementById('subjectInput').value = "";
    document.getElementById('messageInput').value = "";
  });
}

const submitButton = document.getElementById('submit-button')

submitButton.addEventListener("click", function(e) {
  e.preventDefault()
  const nameInput = document.getElementById('nameInput').value;
  const emailInput = document.getElementById('emailInput').value;
  const subjectInput = document.getElementById('subjectInput').value;
  const messageInput = document.getElementById('messageInput').value;

  if (!nameInput.trim() || !emailInput.trim() || !messageInput.trim()) {
      alert('Name, Email and message are required!')
  } else {
      sendEmailHandler(nameInput.trim(), emailInput.trim(), subjectInput.trim(), messageInput.trim()) 
  }
});