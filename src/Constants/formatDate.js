import moment from 'moment';

const Dateformat = (value) => {
    return moment(value).format('MM-DD-YYYY hh:mm A');
}

export {Dateformat};