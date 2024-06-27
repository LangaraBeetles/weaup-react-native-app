import DatePicker from "react-native-date-picker";

const DatePickerModal = (props: any) => {
  const { mode, date, open, setOpen, onChangeText } = props;
  return (
    <DatePicker
      modal
      minimumDate={date}
      mode={mode}
      open={open}
      date={date}
      onConfirm={(d) => {
        setOpen(false);
        onChangeText(d);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    />
  );
};

export default DatePickerModal;
