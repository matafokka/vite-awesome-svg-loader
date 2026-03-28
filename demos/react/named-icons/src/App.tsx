import { NamedIcon } from "@/NamedIcon.tsx";

export default function App() {
  return (
    <div className="images">
      <NamedIcon
        name="music"
        color="red"
      />
      <NamedIcon
        name="star"
        color="forestgreen"
      />
      <NamedIcon
        name="video"
        color="cornflowerblue"
      />
    </div>
  );
}
