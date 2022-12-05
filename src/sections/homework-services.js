/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import HomeworkCard from "../components/home/homework_card";

const data = [
  {
    title: "Online Assignment Help",
    content:
      "Do you need urgent help with your assignment? " +
      "Topratedprofessors is your best help with all the solutions. " +
      "We have the best essay writers from USA, UK, and Australia. " +
      "Our writers are professors in various fields, which guarantees best grades",
  },
  {
    title: "Essay Writing Help for Students",
    content:
      "We will help you achieve your academic goals by customizing " +
      "your essay according to your instructions. We have expert writers " +
      "ready to take on any task given to them by students who have little " +
      "or no time to handle their assignments.",
  },
  {
    title: "Best Dissertation Writing Online",
    content:
      "We are a team of professors. We know exactly what you need" +
      " in your dissertation, and we deliver exactly that. We do thorough " +
      "research utilizing both primary and secondary scholarly articles to " +
      "come up with the best dissertation for you.",
  },
  {
    title: "Online Assignment Help",
    content:
      "At topratedprofessors, we have experts in various fields and subjects. " +
      "If you are stuck with your essay, research paper, dissertation, lab report, " +
      "math problem, book/movie critique, or any other assignment, just come to us.",
  },
];
const HomeworkServices = () => {
  return (
    <section
      id="homework"
      sx={{ fontFamily: "body", backgroundColor: "whitesmoke", p: "40px" }}
    >
      <h3 sx={styles.title}>Homework Help Services</h3>
      <Grid sx={styles.grid}>
        {data.map((item, index) => (
          <HomeworkCard key={index} title={item.title} content={item.content} />
        ))}
      </Grid>
    </section>
  );
};
export default HomeworkServices;

const styles = {
  grid: {
    pt: [0, null, null, null, null, null, 2],
    px: [5, 6, 0, null, 7, 8, 7],
    gridGap: [
      "40px 0",
      null,
      "45px 30px",
      null,
      "60px 50px",
      "70px 50px",
      null,
      "80px 90px",
    ],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      "repeat(2,1fr)",
      "repeat(2,1fr)",
      "repeat(4,1fr)",
    ],
  },
  title: {
    textAlign: "center",
  },
};
