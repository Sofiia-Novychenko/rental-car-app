import DatePicker from 'react-datepicker';
import css from './RentForm.module.css';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

function RentForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className={css.formWrapper}>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <form className={css.form}>
        <input
          type="text"
          name="name"
          // value={formik.values.minMileage}
          // onChange={formik.handleChange}
          placeholder="Name*"
          className={css.input}
        />
        <input type="email" name="email" placeholder="Email*" />
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          placeholderText="Booking date"
        />
        <textarea name="comment" rows="" placeholder="Comment" />
        <button type="submit" className={` blueBtn ${css.formBtn}`}>
          Send
        </button>
      </form>
    </div>
  );
}

export default RentForm;
