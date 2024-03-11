import { BG_IMG } from "../constants";
export default function Layout({ children }) {
  return (
    <div
      style={{
        backgroundImage: `url(${BG_IMG})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}>
      {children}
    </div>
  );
}
