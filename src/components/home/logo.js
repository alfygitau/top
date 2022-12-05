/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import { Link } from "components/home/link";

export default function Logo({ src, ...rest }) {
  return (
    <Link
      sx={{
        variant: "links.logo",
        display: "flex",
        cursor: "pointer",
        mr: 10,
      }}
      {...rest}
    >
      <Image src={src} alt="nextjs landing page logo" />
    </Link>
  );
}
