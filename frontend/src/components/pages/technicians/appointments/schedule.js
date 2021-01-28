import React,{useEffect, useState, useCallback} from 'react';
import api from '../../../../api';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles , makeStyles} from '@material-ui/core/styles';
import {
  ViewState,
  EditingState,
} from '@devexpress/dx-react-scheduler';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const getAppointments= async (setData, setLoading) => {
    setLoading(true);
    const techId =localStorage.getItem('UsersId');
    try {
      await api.getTechnicianAppointments({
           techId
      }).then(res=> {
            const data = res.data;
            setTimeout (() =>{
                setData(data.appointments)
                setLoading(false);
            }, 600)
      });
     }
     catch {
      alert('Failed to get appointments');
     }
  }
const styles =  makeStyles((theme) => ({ 
   paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: '0.8',
  },
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
}));

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
});

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd ;


const mapAppointmentData = appointment => ({
  id: appointment.id,
  startDate: new Date(appointment.startDate.split(/[- :]/)[0], appointment.startDate.split(/[- :]/)[1]-1, 
  appointment.startDate.split(/[- :]/)[2], appointment.startDate.split(/[- :]/)[3], appointment.startDate.split(/[- :]/)[4], 
  appointment.startDate.split(/[- :]/)[5]),
  endDate: new Date(appointment.endDate.split(/[- :]/)[0], appointment.endDate.split(/[- :]/)[1]-1, 
  appointment.endDate.split(/[- :]/)[2], appointment.endDate.split(/[- :]/)[3], appointment.endDate.split(/[- :]/)[4], 
  appointment.endDate.split(/[- :]/)[5]),
  title: appointment.title,
  location: appointment.location,
});

const initialState = {
  data: [],
  loading: false,
  currentDate: today,
  currentViewName: 'Week',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setData':
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case 'setCurrentViewName':
      return { ...state, currentViewName: action.payload };
    case 'setCurrentDate':
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};
class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const applyChanges = () => this.commitAppointment('changed');

    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
    };

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('title')}
              />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  {...pickerEditorProps('startDate')}
                />
                <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps('endDate')}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('location')}
              />
            </div>
          </div>
          <div className={classes.buttonGroup}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => {
                visibleChange();
                applyChanges();
                }}
            >
             Save
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}
const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

export default function TechnicianSchedule() {
  const classes = styles();
  const [confirmationVisible, setConfirimationVisible] = useState(false);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
  const [editingAppointment, setEditingAppointment] = useState(undefined);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {
    data, loading, currentViewName, currentDate,
  } = state;

  const setCurrentViewName = useCallback(nextViewName => dispatch({
    type: 'setCurrentViewName', payload: nextViewName,
  }), [dispatch]);
  const setData = useCallback(nextData => dispatch({
    type: 'setData', payload: nextData,
  }), [dispatch]);
  const setCurrentDate = useCallback(nextDate => dispatch({
    type: 'setCurrentDate', payload: nextDate,
  }), [dispatch]);
  const setLoading = useCallback(nextLoading => dispatch({
    type: 'setLoading', payload: nextLoading,
  }), [dispatch]);

  const commitChanges = ({ changed, deleted }) => {
    if (changed) { //send request to edit here 
      const updatedData = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
     
      var results = updatedData.filter(appointment1 => 
        !data.some(appointment2 => (appointment2.id === appointment1.id 
          && appointment2.title === appointment1.title 
          && appointment2.startDate === appointment1.startDate
          && appointment2.endDate === appointment1.endDate
          && appointment2.location === appointment1.location)))
          
          console.log('results: ',results)
      if(results.length === 1) {
        const changedAppointment = results[0];
        const MOMENT= require( 'moment' );
        const newStartDate = MOMENT(changedAppointment.startDate).format( 'YYYY-MM-DD  HH:mm:ss.000' );
        const newEndDate = MOMENT(changedAppointment.endDate).format( 'YYYY-MM-DD  HH:mm:ss.000' );
        const id = changedAppointment.id;
        const newLocation = changedAppointment.location;
        const newTitle = changedAppointment.title;
     
        console.log('new StartDate: ', newStartDate);
        console.log('new EndDate: ', newEndDate);
        console.log('results: ', results);
        console.log('results title: ', results[0].title);
          
        (async () => {
          try {
            await api.technicianEditAppointment({id, newTitle, newStartDate, newEndDate, newLocation });
          
          }
          catch {
            alert('Failed to update appointment');
          } 
        })();

        getAppointments(setData, setLoading);
      }
    };
    if (deleted !== undefined) {
      setDeletedAppointmentId(deleted);
      toggleConfirmationVisible();
    }
  
  }
  const toggleEditingFormVisibility = () => {
    setEditingFormVisible(!editingFormVisible);
  }

  const toggleConfirmationVisible = () => {
    setConfirimationVisible(!confirmationVisible);
  }
  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  }

  const appointmentForm = connectProps(AppointmentFormContainer, () => {

    const currentAppointment = data
      .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0];

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges: commitChanges,
      visibleChange: toggleEditingFormVisibility,
      onEditingAppointmentChange: onEditingAppointmentChange ,
    };
  });
  

  const commitDeletedAppointment = async () => {
    
      const appointmentToDelete = data.filter(appointment => appointment.id === deletedAppointmentId);
      const appointmentToDeleteId = appointmentToDelete[0].id;
      console.log('appointment To Delete:', appointmentToDeleteId)
      toggleConfirmationVisible();
      try {
        await api.technicianDeleteAppointment(
             appointmentToDeleteId
        )
        
           
       }
       catch {
        alert('Failed to delete appointment.');
       }
      

      /* return { data: nextData, deletedAppointmentId: null }; */
    
    
    console.log('confirmationVisible: ',confirmationVisible);
    getAppointments(setData, setLoading);
  }

  
  useEffect(() => {
    getAppointments(setData, setLoading);
    appointmentForm.update();
  }, [setData, currentViewName, currentDate]);

  return (
    <Paper className={classes.paper}>
      <Scheduler
        data={data}
        height={660}
      >
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
        />
        <DayView
          startDayHour={8}
          endDayHour={18}
        />
        <WeekView
          startDayHour={8}
          endDayHour={18}
        />
        <MonthView
          startDayHour={8}
          endDayHour={18}
        />
        <Appointments />
        <Toolbar
          {...loading ? { rootComponent: ToolbarWithLoading } : null}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip
          showOpenButton
          showCloseButton
        />
        <AppointmentForm
          overlayComponent={appointmentForm}
          visible={editingFormVisible}
          onVisibilityChange={toggleEditingFormVisibility}
        />
        
        <AppointmentForm  />
      </Scheduler>

      <Dialog
          open={confirmationVisible}
        >
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
  );
};
