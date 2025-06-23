import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate(props) {
  return (
    <div style={{ width: '90%' , marginLeft : "5%"}}>
      {props.displayText}<LinearProgress />
    </div>
  );
}