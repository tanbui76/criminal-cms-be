import moment from 'moment';
import { ExecutionStatus } from 'src/features/criminals/enums/execution-status.enum';

export const daysBetween = (
  date1: Date | string,
  date2: Date | string
): number => {
  const momentDate1 = moment(date1);
  const momentDate2 = moment(date2);
  return momentDate1.diff(momentDate2, 'days');
};

export const getExecutionStatus = (
  endExecuteDate: Date,
  doneExecuteDate?: Date
): ExecutionStatus => {
  if (doneExecuteDate) {
    return ExecutionStatus.COMPLETED;
  }

  const today = moment();
  const endDate = moment(endExecuteDate);
  const daysRemaining = endDate.diff(today, 'days');

  if (daysRemaining < 0) {
    return ExecutionStatus.EXPIRED;
  }

  if (daysRemaining <= 30) {
    return ExecutionStatus.EXPIRING_SOON;
  }

  return ExecutionStatus.ACTIVE;
};
