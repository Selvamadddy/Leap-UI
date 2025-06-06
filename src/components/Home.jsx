import "../stylesheet/Home.css"
import Cover from "./Cover"

export default function Home(){
    return(
        <div class="homepage">
          <div class ="coversection">
            <Cover />
          </div>
          <div class="menusection">menu</div>
          <div class = "tasksection">task</div>
        </div>
    );
}