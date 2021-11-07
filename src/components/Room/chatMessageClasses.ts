import { Theme } from "@material-ui/core";

export const chatMessageClasses = (theme : Theme) => ({
    messageLeft:{
      alignSelf: 'flex-start',
      borderRadius: '0 0.25em 0.25em 0.25em',
      maxWidth: '90%',
      padding: '0',
      marginInlineEnd: '0',
      marginLeft:'0.3em',
      marginBottom:'0.5em',
      marginTop: '0.5em',
    },
    messageRight:{
      alignSelf: 'flex-end',
      borderRadius: '0.25em 0.25em 0 0.25em',
      maxWidth: '90%',
      padding: '0',
      marginInlineStart: '0',
      marginRight:'0.3em',
      marginBottom:'0.5em',
      marginTop: '0.5em',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
  }) 