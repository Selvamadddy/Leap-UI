import "../stylesheet/Home.css";
import Cover from "./Cover";
import Menu from "./Menu";

export default function Home(){
    return(
        <div class="homepage">
          <div class ="coversection">
            <Cover />
          </div>
          <div class="menusection">
            <Menu />
          </div>
          <div class = "tasksection">task</div>
        </div>
    );
}