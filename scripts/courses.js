const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true, 
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in website design and development. It is a hands-on course where students participate in web design and programming projects.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "Students learn to research, call, and create their own functions, handle errors, and write modular code to solve practical problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces object-oriented programming principles including encapsulation, inheritance, and polymorphism.",
    technology: ["C#"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "Builds on Web Fundamentals to create interactive, dynamic websites using JavaScript for real-time updates and event handling.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "Focuses on frontend performance, accessibility, UX design, and API interaction for professional-level websites.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const courseContainer = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  let total = 0;

  courseList.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
    /* Testing card data
    * card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p><strong>${course.title}</strong></p>
      <p><small>${course.credits} credits</small></p>
    `;
    */

    courseContainer.appendChild(card);
    total += course.credits;
  });

  totalCredits.textContent = total;
}

// ====== Filtering ======
const btnAll = document.querySelector("#filter-all");
const btnCSE = document.querySelector("#filter-cse");
const btnWDD = document.querySelector("#filter-wdd");

btnAll.addEventListener("click", () => displayCourses(courses));
btnCSE.addEventListener("click", () =>
  displayCourses(courses.filter((c) => c.subject === "CSE"))
);
btnWDD.addEventListener("click", () =>
  displayCourses(courses.filter((c) => c.subject === "WDD"))
);

// ====== Initialize ======
displayCourses(courses);