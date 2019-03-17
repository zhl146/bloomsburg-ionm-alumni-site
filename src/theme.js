import { createMuiTheme } from "@material-ui/core";
import DeepPurple from "@material-ui/core/colors/deepPurple";
import Teal from "@material-ui/core/colors/teal";

export default createMuiTheme({
  palette: {
    primary: DeepPurple,
    secondary: Teal,
    type: 'dark',
  },
  typography: {
    useNextVariants: true
  }
});
