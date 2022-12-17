import {Typography} from "@mui/material";
import {Grid} from "@mui/material";

const TitleLabel = () => {
    return (
        <Grid item xs={3}>


        <Typography variant={"h3"} display={"block"} align="center" compact="h3" color="primary">
            Welcome to Consellify!
        </Typography>
        <Typography color="secondary" align="center">
            I would like to recommend you some music based on your listening history.

        </Typography>
        </Grid>
    )
}


export default  TitleLabel;