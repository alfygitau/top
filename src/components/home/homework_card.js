/** @jsx jsx */
import { Card, Heading, Text, jsx } from "theme-ui";

const HomeworkCard = ({ title, number, content }) => {
  return (
    <Card sx={styles.card}>
      {title && <h5>{title}</h5>}
      {number && <Heading sx={styles.number}>{number}</Heading>}
      <p style={{ fontSize: "16px" }}>{content}</p>
    </Card>
  );
};

export default HomeworkCard;

const styles = {
  card: {
    backgroundColor: "#ffffff",
    boxShadow: "10px 10px 10px  10px rgba(38, 78, 118, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    lineHeight: 1.5,
  },
  number: {
    fontSize: [30, 36, 40],
    ml: [0, null, 5],
    fontWeight: 600,
    color: "secondary",
  },
};
