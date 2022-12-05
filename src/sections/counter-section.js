/** @jsx jsx */
import { jsx, Grid, Heading, Box, Text } from "theme-ui";
import PatternBG from "../assets/patternBG.png";
import CountUp from "react-countup";

const data = [
  {
    number: 120751,
    content: "COMPLETED ORDERS",
  },
  {
    number: 128,
    content: "ACTIVE WRITERS",
  },
  {
    number: 98.4,
    content: "POSITIVE FEEDBACKS",
  },
  {
    number: 15,
    content: "SUPPORT REPRESENTATIVES",
  },
];
const CounterSection = () => {
  return (
    <section sx={styles.counter}>
      <Grid sx={styles.counter.grid}>
        {data.map((item, index) => (
          <Box key={index} sx={styles.counter.vertical}>
            <center>
              <h1 style={{ color: "white" }}>
                <CountUp start={10} duration={30} end={item.number} />
              </h1>
            </center>
            <Text sx={styles.counter.content}>{item.content}</Text>
          </Box>
        ))}
      </Grid>
    </section>
  );
};

export default CounterSection;

const styles = {
  counter: {
    backgroundColor: "primary",
    backgroundImage: `url(${PatternBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "relative",
    mt: ["50px", null, "-50px"],
    py: [6, null, 8, null, null, 6],
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
    content: {
      fontFamily: "body",
      textAlign: "center",
      fontSize: [4, null, 16],
    },
    vertical: {
      borderLeft: "2px solid green",
      height: "80px",
    },
  },
};
