import "./Header.css";
import react, { useRef, useEffect } from "react";
export const Header = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    props.setHeight(ref.current.clientHeight); //save the height of the header
  }, []);

  return (
    <div className="header" ref={ref}>
      <div class="neato-header">
        <h1>Infinit Scroll</h1>
      </div>
    </div>
  );
};
