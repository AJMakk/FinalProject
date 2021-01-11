import  React,{useState,useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from './today-appointments';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: '0.8',
  },
  
}));

export default function CustomerSchedule() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(appointments);
  }, [])

  return (
    <Paper className={classes.paper}>
      <Scheduler
        data={data}
        height={660}
      >
        <WeekView
          startDayHour={9}
          endDayHour={19}
        />

        <Appointments />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
        />
        <AppointmentForm
          readOnly
        />
      </Scheduler>
    </Paper>
  );
}
/* export default class TechnicianSchedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />

          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
        </Scheduler>
      </Paper>
    );
  }
} */