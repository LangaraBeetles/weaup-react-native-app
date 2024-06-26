import DatePicker from "react-native-date-picker";

const DatePickerModal = (props: any) => {
  const { mode, date, setDate, open, setOpen } = props;
  return (
    <DatePicker
      modal
      minimumDate={date}
      mode={mode}
      open={open}
      date={date}
      onConfirm={(d) => {
        setOpen(false);
        setDate(d);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    />
  );
};

export default DatePickerModal;
