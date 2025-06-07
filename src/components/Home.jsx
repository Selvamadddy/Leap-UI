import "../stylesheet/Home.css";
import Cover from "./Cover";
import Menu from "./Menu";
import Body from "./Body";

export default function Home(){
    return(
        <div class="homepage">
          <div class ="coversection">
            <Cover />
          </div>
          <div class="menusection">
            <Menu />
          </div>
          <div class = "tasksection">
            <Body />
          </div>
        </div>
    );
}